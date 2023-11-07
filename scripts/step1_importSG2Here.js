// $EXPERIMENTAL$ $STRICT_MODE$ $WARNING_AS_ERROR$ $ENHANCED_JAVA_ACCESS$ $ENHANCED_CONTAINMENT_ACCESS$


/**
 *
 */

load(".private/ui.js"); 	// required if excel sheet is browsed
load(".private/excel.js");
load("../.lib/factory.js");

load(".private/languagePackage.js");
load(".private/parameters.js"); //schemas are from this file.
load(".private/commonFunc.js");




if (!userReadAgreement()){
	alert(messages[lang].readAgreement);
}
else if (!(selection[0] instanceof Metamodel.safetygoals.SafetyRequirementsModel)){
	alert(messages[lang].wrongSelection);
}

else {
	var sgSheet = new LoadSheet();
	// sgSheet.readFile(); // this line doesn't work. need to check with Jan

	var callback = sgSheet.callback;
	var importer = new ExcelImporter(sgSheet.callback);
	importer.run();

	var entriesArr = sgSheet.excelRowArr.map(function (i){return excelEntry2obj(i, schema.sg.excel);});
	// Every object in this array is one entry, which is a safety goal in object format

	entriesArr.slice(1).forEach(function (i){obj2mediniEntry(i, schema.sg.medini, Metamodel.safetygoals.SafetyGoal);}); 
	// Skip the first one since it should be the title.

	alert(messages[lang].importComplete);
}