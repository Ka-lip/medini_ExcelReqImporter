// $EXPERIMENTAL$ $STRICT_MODE$ $WARNING_AS_ERROR$ $ENHANCED_JAVA_ACCESS$ $ENHANCED_CONTAINMENT_ACCESS$

/**
 * 
 */
 
const agreementFilePath = __filedir+'\\.private\\' + 'readAgreement.txt';
const uiLangFilePath = __filedir+'\\.private\\' + 'uiLang.txt';
const lang = loadLangSetting(uiLangFilePath);
 
function LoadSheet(){
// this is a constructor
// to use this constructor, don't forget to load ui.js and excel.js
	var outerObj = this; // for methods and properties outside of callback can be used in callback
	this.excelRowArr = [];
	this.rows = 0;
	this.sheetDimension = {startCol:undefined, endCol:undefined};
	this.callback = {
		
		// we want to start at row 1 by default
		// start : 1,
		
		/*
		 * Callback: called by the Excel importer to determine the Excel file to
		 * import. The method should return a valid and existing absolute file path.
		 * This function is OPTIONAL and does not need to be defined at all. If NOT
		 * defined, the importer tries to open a file browser dialog.
		 */
		// getFileName : function() {
			// return "C:\\test.xlsx";
		// },
		
		/*
		 * Callback: called by the Excel importer to determine whether empty sheets
		 * should be ignored or not. The default is false. This function is OPTIONAL
		 * and does not need to be defined at all.
		 */
		ignoreEmptySheets : function() {
			return true;
		},

		/*
		 * Callback: called by the Excel importer to determine from which row in a
		 * sheet the import should start. The default is 1. This function is
		 * OPTIONAL and does not need to be defined at all.
		 */
		getStartRowIndex : function() {
			// return this.start;
			//return Number(prompt(messages[lang].askStartRow,'1'));
			return schema.startRow;
		},

		/*
		 * Callback: called by the Excel importer to determine whether the import
		 * shall stop at the given row. The default is false. This function is
		 * OPTIONAL and does not need to be defined at all.
		 */
		isStopRow : function(row) {
			return false;
		},

		/*
		 * Callback: called by the Excel importer after an Excel document has been
		 * (successfully) opened. The function may do arbitrary stuff here. This
		 * function is OPTIONAL and does not need to be defined at all.
		 */
		afterOpen : function(document) {
			console.log("Document opened (Title: {0})", "" + document.getTitle());
		},

		/*
		 * Callback: called by the Excel importer before a given Excel sheet is
		 * actually handled, i.e. its rows get processed. The function may do
		 * arbitrary stuff here. This function is OPTIONAL and does not need to be
		 * defined at all.
		 */
		beforeHandle : function(sheet) {
			console.log("Sheet {0} was selected (dimension {1})", ""
					+ sheet.getName(), sheet.getDimension());
			this.start = sheet.getDimension().getTopLeft().row;
			outerObj.sheetDimension.startCol = sheet.getDimension().getTopLeft().column;
			outerObj.sheetDimension.endCol   = sheet.getDimension().getBottomRight().column;
		},

		/*
		 * Callback: called by the Excel importer after a given Excel sheet was
		 * actually handled, i.e. its rows have been processed. The function may do
		 * arbitrary stuff here. This function is OPTIONAL and does not need to be
		 * defined at all.
		 */
		afterHandle : function(sheet) {
			console.log("Sheet {0} was imported", "" + sheet.getName());
		},

		/*
		 * Callback: called by the Excel for each processed row. The function may do
		 * arbitrary stuff here. This function is MANDATORY.
		 */
		handleRow : function(index, row) {
			console.log("Handle row {0}...", index);		
			// console.log(readEachCellsForARow(row).toString());
			outerObj.excelRowArr.push(outerObj.readEachCellsForARow(row));
			outerObj.rows += 1;
		}
	};

	this.readEachCellsForARow = function(row){
	// the input is a row object. the return object is an array of that row.
	var columnInt  = 1;
	var columnData = [];
	for (var i = 1; i <= this.sheetDimension.endCol; i++){ //excel API is 1-based
		columnData.push(getTextInCell(row, columnInt));
		columnInt += 1;
	}
		return columnData;
	};
	
	this.readFile = function(){
		var importer = new ExcelImporter(outerObj.callback);
		importer.run();
	};
}


//Metamodel.safetygoals.SafetyGoal
function obj2mediniEntry(obj, mediniSchema, entryType, mediniScope){ /* mediniScope is OPTIONAL*/
// This function writes 1 safety goal into medini
// to use this function, don't forget to load .lib/factory.js and parameters.js
	if (!mediniScope){mediniScope = selection[0];}
	var mediniEntry = Factory.createElement(mediniScope, entryType);
	for (var i in mediniSchema){
		mediniEntry[mediniSchema[i]] = obj[i];		
	}
	// return mediniEntry;
}

function excelEntry2obj(excelEntryArr, excelSchema){
	var obj = Object.create(excelSchema);

	for (var i in obj){
		obj[i] = excelEntryArr[excelSchema[i]-1]; //since schema is 1-based but javascript is 0-based.
	}
	
	return obj; 
}

function userReadAgreement(){
	return checkFileExist(agreementFilePath);
}


function checkFileExist(fileFullPath){
	var file = new java.io.File(fileFullPath);
	var f = new java.io.File(fileFullPath);
	if(f.exists() && !f.isDirectory()) {return true;}
	return false;
}

function loadLangSetting(fileName) {
	if (!checkFileExist(fileName)){return 'en';}
	var file = new java.io.File(fileName);
	var reader = new java.io.FileReader(file);
	var buffer;
	var content = '';
	do {buffer = reader.read();
	content += String.fromCharCode(buffer);
	}
	while (buffer != -1)
	reader.close();
	return content.slice(0,2);
}


