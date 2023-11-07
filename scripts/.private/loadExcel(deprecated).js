// $EXPERIMENTAL$ $STRICT_MODE$ $WARNING_AS_ERROR$

/**
 * 
 */



load(".private/ui.js"); 	// required if excel sheet is browsed
load(".private/excel.js");
load(".private/languagePackage.js");


function readRequirements(){
	
}

function readEachCellsForARow(row){
	var column_int = 1;
	var column_data = [];
	while (getTextInCell(row, column_int)){
		column_data.push(getTextInCell(row, column_int));
		column_int += 1;
		}
	return column_data;
}
		

//the counter
var rows = 0;

// the callback object which we pass to the Excel API
var callback = {
		
	// we want to start at row 1 by default
	start : 2,
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
		return Number(prompt(multiLang[guiLang].askStartRow,'2'));
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
		console.log(readEachCellsForARow(row).toString());
		rows = rows + 1;
	}
};


// var importer = new ExcelImporter(callback);
// if (!importer.run()) {
	// console.log("Import was canceled");
	// undefined;
// } else {
	// "Number of handled rows: " + rows;
// }