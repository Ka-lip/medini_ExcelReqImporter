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

var createReqRelation = {};

createReqRelation.getReqArr = function (findType, findScope/* findScope is OPTIONAL */){
	if(!findType){findType = Metamodel.safetygoals.SafetyRequirement;}
	//findType = Metamodel.safetygoals.SafetyRequirement; for requirements
	//findType = Metamodel.safetygoals.SafetyGoal; for goals
	
	if(!findScope){findScope = selection[0];}
	
	var myFindResult = Global.getFinder(findScope).findByType(findType).toArray();
	return myFindResult;	
};

createReqRelation.getReqSgRelation = function (entryObj){
	var contributionRelationObj = {};
	function stripReqSg(str,regex){
		var result = str.match(regex)?str.match(regex)[0]:'';
		return result;
	}
	
	contributionRelationObj.entryID          = entryObj.ID;
	contributionRelationObj.relatedGoals     = entryObj.RelatedGoals ? entryObj.RelatedGoals:""; //avoid null undefined ...etc.
	contributionRelationObj.contributions    = entryObj.Contributions ? entryObj.Contributions:""; //avoid null undefined ...etc.
	contributionRelationObj.relatedGoalsArr  = contributionRelationObj.relatedGoals.split(schema.req.excel.ContributionsSplit).map(function(i){return stripReqSg(i, schema.req.excel.RelatedGoalsFormat);});
	contributionRelationObj.contributionsArr = contributionRelationObj.contributions.split(schema.req.excel.ContributionsSplit).map(function(i){return stripReqSg(i, schema.req.excel.ContributionsForat);});
	
	return contributionRelationObj;
};

createReqRelation.linkReq = function (reqObj, goalOrReq, createScope /* createScope is OPTIONAL */){
	if(!createScope){createScope = selection[0];} // note that both source and target requirement should be in this scope.	
	if (!goalOrReq){goalOrReq = 'req';} 
	
	var reqInfo = createReqRelation.getReqSgRelation(reqObj);
	var tarID   = reqInfo.entryID;
	var srcIDs  = reqInfo.contributionsArr;
	var goalIDs = reqInfo.relatedGoalsArr;
	
	function createReqRelationsByID(sourceReqID, targetReqID, findScope /* findScope is OPTIONAL */){
		if(!findScope){findScope = selection[0];}
		
		function findByID(ID, findScope /* findScope is OPTIONAL */){
			if(!findScope){findScope = selection[0];}
			var myFindResult = Global.getFinder(findScope).find("identifier", ID).toArray(); 
			return myFindResult?myFindResult[0]:'';
		}
		
		var sourceReq = findByID(sourceReqID);
		var targetReq = findByID(targetReqID);
		if (targetReq && sourceReq){
				Factory.createRelation(sourceReq, targetReq, Metamodel.safetygoals.SafetyReqRelation);}
	}
	
	if (goalOrReq == 'req'){srcIDs.map(function(i) {createReqRelationsByID(i, tarID);});}
	if (goalOrReq == 'sg') {goalIDs.map(function(i){createReqRelationsByID(tarID, i);});}
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

	var entriesArr = reqSheet.excelRowArr.map(function (i){return excelEntry2obj(i, schema.req.excel);});
	entriesArr.forEach(function(i){createReqRelation.linkReq(i);});
	entriesArr.forEach(function(i){createReqRelation.linkReq(i,'sg');});

	alert(messages[lang].importComplete);
}