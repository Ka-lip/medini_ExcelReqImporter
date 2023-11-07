/* 
 * Copyright (c) 2018 ANSYS medini Technologies AG
 * All rights reserved.
 * 
 * The script is provided "as is" without warranty of any kind. 
 * ANSYS medini Technologies AG disclaims all warranties, either express or implied, 
 * including the warranties of merchantability and fitness for a particular purpose.
 * 
 * v2018-01-07 - Initial version
 */
if (!bind) {
	throw "This script requires extended API";
}
	
// bind Excel library (NOT OFFICIAL API YET)
var ExcelDocument = bind("de.ikv.medini.docgen.openxml", "de.ikv.medini.docgen.openxml.document.excel.ExcelDocument", false);
var CellAddress = bind("de.ikv.medini.docgen.openxml", "de.ikv.medini.docgen.openxml.document.excel.CellAddress", false);

/*
 * Trim helper
 */
function _T(t) {
	if (t) {
		var old = t;
		t = t.trim();
//		if (old.length() != t.length()) {
//			console.error("Text trimmed from ''{0}'' to ''{1}''", old, t);
//		}
	}
	// return null instead of ""
	if (t && t.length() == 0) {
		return null;
	}
	return t;
}

/*
 * Excel helper.
 */
function set(sheet, rowIndex, columnIndex, value) {
	var row = sheet.getOrCreateRow(rowIndex);
	var cell = row.getOrCreateCell(columnIndex);
	cell.setSharedStringValue(value);
	console.log("Wrote string ''{0}'' to cell {1}", value, cell.getAddress());
}

/*
 * Excel helper.
 */
function setNumber(sheet, rowIndex, columnIndex, value) {
	var row = sheet.getOrCreateRow(rowIndex);
	var cell = row.getOrCreateCell(columnIndex);
	cell.setNumberValue(value);
	console.log("Wrote number ''{0}'' to cell {1}", value, cell.getAddress());
}

/*
 * Excel helper.
 */
function extractImageName(image, defaultValue) {
	try {
		uri = image.getPackagePart().getPartName().getURI();
		name = uri.getPath();
		lastSlash = name.lastIndexOf('/');
		if (lastSlash >= 0) {
			name = name.substring(lastSlash + 1);
		}
		return name;
	} catch (exception) {
		return defaultValue;
	}
}

/*
 * Excel helper.
 */
function getTextInCell(row, columnIndex, trim /* = true */) {
	if (trim == undefined) {
		trim = true;
	}
	var cell = row.getCell(columnIndex);
	if (!cell) {
		return undefined;
	}
	var text = cell.toString();
	if (trim) {
		text = _T(text);
	}
	return text;
}

/*
 * Excel helper.
 */
function getTextInCellOrAbove(row, columnIndex, trim /* = true */) {
	if (trim == undefined) {
		trim = true;
	}
	while (row) {
		var cell = row.getCell(columnIndex);
		if (cell && cell.toString() != null) {
			// console.log("Row {0} has cell in column {1}: {2}", row.getRowIndex(), columnIndex, cell);
			var text = cell.toString();
			if (trim) {
				text = _T(text);
			}
			if (!text) {
				throw("BUG-E1");
			}
			return text;
		}
		// console.log("Row {0} has no cell in column {1}, check above", row.getRowIndex(), columnIndex);
		row = row.getWorksheet().getRow(row.getRowIndex() - 1); 
	}
	
	return undefined;
}

/*
 * Excel helper.
 */
function cellAddress(row, columnIndex) {
	return new CellAddress(row.getRowIndex(), columnIndex).toString(); 
}

/*
 * Excel helper.
 */
function collectVisibleRows(ws, start, stopWhen) {
	return collectRows(ws, start, stopWhen, true);
}

/*
 * Excel helper.
 */
function collectRows(ws, start, stopWhen, onlyVisible) {
	console.log("Start collecting rows, beginning with {0}...", start);
	var collectedRows = [];
	// Note: we cannot use ws.getRows() because it just returns *existing* rows
	var max = ws.getDimension().getBottomRight().getRow();
	for (var i = start; i <= max; i++) {
		var row = ws.getRow(i);
		if (row == undefined) {
			console.log("Ignore row at index {0} because it does not exist", i);
			continue;
		}
		// console.log("Handle row {0}...", row.getRowIndex());
		if (onlyVisible && row.getHidden()) {
			console.log("Ignore row {0} because its hidden", i);
			continue;
		}
		
		if (stopWhen && typeof(stopWhen) == 'function' && stopWhen(row)) {
			console.log("Stopped in row {0}, collected {1} rows so far", row
					.getRowIndex(), collectedRows.length);
			break;
		}

		var rowView = {
			handle : row,
			index : row.getRowIndex()
		};
		collectedRows.push(rowView);
	}	
	
	return collectedRows;
}

ExcelImporter.prototype = {
		
		// default first row with data (1 based!)
		DEFAULT_START_ROW : 1,
		
		callback : undefined,
		
		assertCallback : function () {
			// TODO Assert that the callback object fits the minimum 
		},
		
		/*
		 * Helper: returns true if the given sheet is empty.
		 */
		isWorksheetEmpty : function (sheet) {
			var dim = sheet.getDimension();
			var br = dim.getBottomRight();
			
			if (br.row > 1) {
				return false;
			}
			if (br.column > 1) {
				return false;
			}
			
			// obviously empty
			return true;
		}, 
		
		run : function () {
			// 1. get input file
			var file = undefined;
			if (callback["getFile"]) {
				file = callback["getFile"].call(callback);
			} else if (callback["getFileName"]) {
				var fileName = callback["getFileName"].call(callback);
				file = new java.io.File(fileName);
			} else if (typeof __excel_importer_file__ != 'undefined') {
				file = __excel_importer_file__;
			} else {
				// assert that "ui.js" was imported
				if (typeof openFile != 'function') {
					throw "Library 'ui.js' was not imported but is required to interact with the user";
				}
				file = openFile([ "*.xlsx", "*.xlsm" ]);
				if (!file) {
					return undefined;
				}
			}
			
			if (!file) {
				throw "A file is missing or was not correctly defined.";
			}
			
			// 2. assert file exists
			if (!file.exists()) {
				throw "The file '" + file + "' does not exists or cannot be read.";
			}
			
			console.log("Importing from {0}", file);
			
			progressMonitor.setTaskName("Loading data from Excel...");
			var document = ExcelDocument.open(file, true);
			try {
				// callback
				if (callback["afterOpen"]) {
					callback["afterOpen"].call(callback, document);
				}
				
				var wb = document.getWorkbook();

				var sheet = undefined; 
				if (callback["getSheet"]) {
					sheet = callback["getSheet"].call(callback, wb);
				}
				else if (callback["getSheetName"]) {
					var sheetName = callback["getSheetName"].call(callback, wb);
					sheet = wb.getWorksheet(sheetName);
					if (!sheet) {
						throw "Sheet '" + sheetName + "' is missing in the Workbook";
					}
				} 
				else if (typeof __excel_importer_sheet_name__ != 'undefined') {
					sheetName = __excel_importer_sheet_name__;
					sheet = wb.getWorksheet(sheetName);
					if (!sheet) {
						throw "Sheet '" + sheetName + "' is missing in the Workbook";
					}
				}
				else {
					// ignore empty sheets?
					var ignoreEmpty = false;
					if (callback["ignoreEmptySheets"]) {
						ignoreEmpty = callback["ignoreEmptySheets"].call(callback);
					}

					// let the user select a sheet
					var sheets = wb.getWorksheets();
					var names = [];
					sheets.forEach(function (s) {
						// do not list hidden sheets
						if (s.isHidden()) {
							return;
						}
						// ignore if sheet is empty and callback wants it
						if (ignoreEmpty && this.isWorksheetEmpty(s)) {
							return;
						}
						names.push(s.name);
					}, this);
					
					// handle the case there is no non-hidden or empty sheet
					if (names.length == 0) {
						throw "Workbook has no worksheets to import";
					}
					
					var index = 0;
					if (names.length > 1) {
						// assert that "ui.js" was imported
						if (typeof selectOption != 'function') {
							throw "Library 'ui.js' was not imported but is required to interact with the user";
						}
						index = selectOption("Select Worksheet", "Please select the worksheet you want to import", names);
					}
					if (index == -1) {
						return undefined;
					}
					sheet = wb.getWorksheet(names[index]);
					if (!sheet) {
						throw "Sheet '" + names[index] + "' is missing in the Workbook";
					}
				}
				
				
				if (!sheet) {
					throw "Cannot open sheet in the Workbook";
				}

				// callback
				if (callback["beforeHandle"]) {
					callback["beforeHandle"].call(callback, sheet);
				}
				
				progressMonitor.setTaskName("Checking rows...");
				var startRow = this.DEFAULT_START_ROW;
				if (callback["getStartRowIndex"]) {
					startRow = callback["getStartRowIndex"].call(callback);
				}
				
				// start row is 1 based, "collectRows" as well
				var rows = collectRows(sheet, startRow, callback["isStopRow"], false);
				rows.forEach(function (row) {
					// callback
					if (callback["handleRow"]) {
						callback["handleRow"].call(callback, row.index, row.handle);
					}
					
					// TODO Can we do more?
				});

				// callback
				if (callback["afterHandle"]) {
					callback["afterHandle"].call(callback, sheet);
				}
				
			} finally {
				// callback
				if (callback["beforeClose"]) {
					callback["beforeClose"].call(callback, document);
				}
				
				// make sure we close the file, otherwise its locked by the process.
				progressMonitor.setTaskName("Closing Excel...");
				document.close();
			}
			
			return true;
		}
};

/**
 * Constructor.
 * @param callback
 */
function ExcelImporter(callback) {
	this.callback = callback;
	this.assertCallback();
}