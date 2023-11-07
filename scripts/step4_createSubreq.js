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

var subreqToolbox = {};


subreqToolbox.createReqIndex = function (entryObj){
/* function 
input : entryObj (from entriesArr. Each entryObj is an object from one row of excel of req list)
output: subrequirementMapObj (reqID, reqIndex, parentreqIndex)
*/
	var reqID    = entryObj.ID;
	var reqIndex = entryObj.SubReqRelation;
	var reqLevel = (reqIndex+"").toString().split(schema.req.excel.SubrequirementSplit).length;
	// transform reqIndex from object to string. otherwise it doesn't support split(), length ...etc.

	var subrequirementMapObj = {reqID: reqID, reqIndex: reqIndex, reqLevel: reqLevel};
	return subrequirementMapObj;
};

subreqToolbox.getParentreqID = function (subrequirementsMapArr){
/* function 
input : subrequirementsMapArr (an array indicating reqIDs, reqIndeice, parentreqIndeice)
output: subrequirementsMapArrUnique(reqID, parentreqID)
since parentreqIndeice are not unique, it is necessary to turn them into the unique parentreqIDs.
*/
	var subrequirementsMapArrUnique = [];
	var currentSubreqLevel = '';
	var nearestReqs = [];
	for (var subrequirementMap in subrequirementsMapArr){		
		currentSubreqLevel                      = subrequirementsMapArr[subrequirementMap].reqLevel;
		nearestReqs[currentSubreqLevel]         = subrequirementsMapArr[subrequirementMap].reqID;
		subrequirementsMapArrUnique.push({
			reqID: subrequirementsMapArr[subrequirementMap].reqID,
			parentreqID:nearestReqs[currentSubreqLevel-1]
		});
		// subrequirementsMapArrUnique.reqID       = subrequirementsMapArr[subrequirementMap].reqID;
		// subrequirementsMapArrUnique.parentreqID = nearestReqs[currentSubreqLevel-1];
	}
	return subrequirementsMapArrUnique;
};

subreqToolbox.subreqCreate = function (childReqID, parentReqID){
/* function 
input : subrequirementsMapArrUnique
input : childReqID, parentReqID
output: none
action: change the container of srequirement to correct parentreq.
*/
	var upperReq = Global.getFinder(selection[0]).find("identifier", parentReqID).toArray()[0];
	var lowerReq = Global.getFinder(selection[0]).find("identifier", childReqID).toArray()[0];
	lowerReq.container = upperReq;
	
	console.log(parentReqID + ' is now parent req of ' + childReqID);
};

subreqToolbox.subreqMap2medini = function (parentChildReqPair){
	for (var i in parentChildReqPair){
		var childReqID  = parentChildReqPair[i].reqID;
		var parentReqID = parentChildReqPair[i].parentreqID;
		if(childReqID && parentReqID){
			subreqToolbox.subreqCreate(childReqID, parentReqID);
		}
	}
};

if (!userReadAgreement()){
	alert(messages[lang].readAgreement);
}
else if (!(selection[0] instanceof Metamodel.safetygoals.SafetyRequirementsModel)){
	alert(messages[lang].wrongSelection);
}
else {
	var reqSheet = new LoadSheet();
	// sgSheet.readFile(); // this line doesn't work. need to check with Jan

	var callback = reqSheet.callback;
	var importer = new ExcelImporter(reqSheet.callback);
	importer.run();

	var entriesArr         = reqSheet.excelRowArr.map(function (i){return excelEntry2obj(i, schema.req.excel);});
	var subreqMapArr       = entriesArr.map(function(i){return subreqToolbox.createReqIndex(i);});
	var parentChildReqPair = subreqToolbox.getParentreqID(subreqMapArr);
	// console.log(parentChildReqPair[1]);
	subreqToolbox.subreqMap2medini(parentChildReqPair);
	
	alert(messages[lang].importComplete);
}