// $EXPERIMENTAL$ $STRICT_MODE$ $WARNING_AS_ERROR$
/* 
 * Copyright (c) 2018 ANSYS medini Technologies AG
 * All rights reserved.
 * 
 * The script is provided "as is" without warranty of any kind. 
 * ANSYS medini Technologies AG disclaims all warranties, either express or implied, 
 * including the warranties of merchantability and fitness for a particular purpose.
 */
load(".lib/excel.js");

/*
 * This script is a sample script to explain the usage of the Excel library. It
 * opens a fixed Excel file without any user intervention.
 */

// the counter
var rows = 0;

// the callback object which we pass to the Excel API
var callback = {

	/*
	 * Callback: called by the Excel importer to determine the Excel file to
	 * import. The method should return a valid and existing absolute file path.
	 * This function is OPTIONAL and does not need to be defined at all. If NOT
	 * defined, the importer tries to open a file browser dialog.
	 */
	getFileName : function() {
		return "C:\\sample.xlsx";
	},

	/*
	 * Callback: called by the Excel importer to determine the Excel sheet to
	 * import. The method should return a valid sheet name. This function is
	 * OPTIONAL and does not need to be defined at all. If NOT defined, the
	 * importer tries to open a choice dialog.
	 */
	getSheetName : function() {
		return "Sheet1";
	},
	
	/*
	 * Callback: called by the Excel for each processed row. The function may do
	 * arbitrary stuff here. This function is MANDATORY.
	 */
	handleRow : function(index, row) {
		console.log("Handle row {0}...", index);
		rows = rows + 1;
		
		// Note: this part of the API is still experimental
		console.log("Text in column A: {0}", getTextInCell(row, 1));
		console.log("Text in column B: {0}", getTextInCell(row, 2));
	}
};

var importer = new ExcelImporter(callback);
if (!importer.run()) {
	console.log("Import was canceled");
	undefined;
} else {
	"Number of handled rows: " + rows;
}
