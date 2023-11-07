/*
 * Copyright (c) 2018 ANSYS medini Technologies AG
 * All rights reserved.
 * 
 * The script is provided "as is" without warranty of any kind. 
 * ANSYS medini Technologies AG disclaims all warranties, either express or implied, 
 * including the warranties of merchantability and fitness for a particular purpose.
 * 
 * v2018-04-13 - initial version published
 * 
 * This script exemplary extracts information from a selected system model
 * and exports it as "comma separated list" (CSV) to the system clipboard.   
 */

var NL = "\n"; // newline character
var SEP = ";"; // separator
var headline = "Name" + SEP + "Kind" + SEP + "Part Number" + NL; // first line
var text = headline; // text to export

/*
 * Handle each element. You may extract arbitrary attributes (element is of type
 * SysMLElement)
 */
function handleElement(element) {
	text += element.name || "";
	text += SEP;
	text += element.typeCode || "";
	text += SEP;
	text += element.partNumber || "";
	text += NL;
}

/*
 * Main function doing the "main" job. 
 */
function main() {
	if (!selection || selection.length == 0) {
		return "Please select a single element to export a complete tree or multiple elements to export just the selected elements.";
	}
	
	var scope = selection;
	if (selection.length == 1) {
		scope = selection[0];
	}
	var myFinder = Global.getFinder(scope);
	var elements = myFinder.findByType(Metamodel.sysml.SysMLElement, false).asArray();
	
	elements.forEach(handleElement);
	copyToClipboard(text);
	

	return "Text was extracted and put into the system clipboard. "
		+ elements.length + " elements were handled.";
}

/*
 * Helper to fill the text into the clipboard.
 */
function copyToClipboard(text) {
	var toolkit = java.awt.Toolkit.getDefaultToolkit();
	var clipboard = toolkit.getSystemClipboard();
	var transfer = new java.awt.datatransfer.StringSelection(text);
	clipboard.setContents(transfer, null);
}

// do it!
main();