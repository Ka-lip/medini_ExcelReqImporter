/**
 * 
 */

const schema = {};
schema.startRow = 1;

schema.sg = {
	excel : {
		ID           : 'A', //excel column name, only support A ~ AZ column.
		Name         : 'B', //excel column name, only support A ~ AZ column.
		SafeState    : 'C', //excel column name, only support A ~ AZ column.
		ASIL         : 'D', //excel column name, only support A ~ AZ column.
		FTTI         : 'E', //excel column name, only support A ~ AZ column.
		EOTI         : 'F', //excel column name, only support A ~ AZ column.
		DriverActions: 'G'  //excel column name, only support A ~ AZ column.		
	},
	medini : {
		ID           : 'identifier',
		Name         : 'name',
		SafeState    : 'safeState',
		ASIL         : 'integrityLevel',
		FTTI         : 'user_fault_tolerant_time_level',
		EOTI         : 'user_emergency_operation_interval',
		DriverActions: 'user_necessary_driver_actions'
	}					
};

schema.req = {
	excel : {
		SubReqRelation     : 'A', //excel column name, only support A ~ AZ column.
		ID                 : 'B', //excel column name, only support A ~ AZ column.
		Name               : 'C', //excel column name, only support A ~ AZ column.
		Description        : 'D', //excel column name, only support A ~ AZ column.
		TimeConstraint     : 'E', //excel column name, only support A ~ AZ column.
		PhysicalConstraint : 'F', //excel column name, only support A ~ AZ column.
		Kind               : 'G', //excel column name, only support A ~ AZ column.
		ASIL               : 'H', //excel column name, only support A ~ AZ column.
		Status             : 'I', //excel column name, only support A ~ AZ column.
		Comment            : 'N', //excel column name, only support A ~ AZ column.
		RelatedGoals       : 'J', //excel column name, only support A ~ AZ column.
		Contributions      : 'K', //excel column name, only support A ~ AZ column.
		RelatedGoalsFormat : 'SG-[0-9]*', //express RelatedGoals field in regular expression
		ContributionsForat : 'SR-[0-9]*', //express Contributions field inregular expression
		ContributionsSplit : '\n', //how the requirements/goals splitted in contribution cells
		SubrequirementSplit: '.'
	},
	medini : {
		SubReqRelation    : '',
		ID                : 'identifier',
		Name              : 'name',
		Description       : 'description',
		TimeConstraint    : 'user_Time_constraint',
		PhysicalConstraint: 'user_Physical_constraint',
		Kind              : 'kind',
		ASIL              : 'integrityLevel',
		Status            : 'state',
		Comment           : 'user_Note'
	}					
};


// avoid editing the below code if you don't understand it.
schema.excelCoordinates = {
	A: 1,
	B: 2,
	C: 3,
	D: 4,
	E: 5,
	F: 6,
	G: 7,
	H: 8,
	I: 9,
	J: 10,
	K: 11,
	L: 12,
	M: 13,
	N: 14,
	O: 15,
	P: 16,
	Q: 17,
	R: 18,
	S: 19,
	T: 20,
	U: 21,
	V: 22,
	W: 23,
	X: 24,
	Y: 25,
	Z: 26,
	AA: 27,
	AB: 28,
	AC: 29,
	AD: 30,
	AE: 31,
	AF: 32,
	AG: 33,
	AH: 34,
	AI: 35,
	AJ: 36,
	AK: 37,
	AL: 38,
	AM: 39,
	AN: 40,
	AO: 41,
	AP: 42,
	AQ: 43,
	AR: 44,
	AS: 45,
	AT: 46,
	AU: 47,
	AV: 48,
	AW: 49,
	AX: 50,
	AY: 51,
	AZ: 52
};

schema.sg.excel.ID            = schema.excelCoordinates[schema.sg.excel.ID];
schema.sg.excel.Name          = schema.excelCoordinates[schema.sg.excel.Name];
schema.sg.excel.SafeState     = schema.excelCoordinates[schema.sg.excel.SafeState];
schema.sg.excel.ASIL          = schema.excelCoordinates[schema.sg.excel.ASIL];
schema.sg.excel.FTTI          = schema.excelCoordinates[schema.sg.excel.FTTI];
schema.sg.excel.EOTI          = schema.excelCoordinates[schema.sg.excel.EOTI];
schema.sg.excel.DriverActions = schema.excelCoordinates[schema.sg.excel.DriverActions];
	
	
schema.req.excel.SubReqRelation     = schema.excelCoordinates[schema.req.excel.SubReqRelation    ];
schema.req.excel.ID                 = schema.excelCoordinates[schema.req.excel.ID                ];
schema.req.excel.Name               = schema.excelCoordinates[schema.req.excel.Name              ];
schema.req.excel.Description        = schema.excelCoordinates[schema.req.excel.Description       ];
schema.req.excel.TimeConstraint     = schema.excelCoordinates[schema.req.excel.TimeConstraint    ];
schema.req.excel.PhysicalConstraint = schema.excelCoordinates[schema.req.excel.PhysicalConstraint];
schema.req.excel.Kind               = schema.excelCoordinates[schema.req.excel.Kind              ];
schema.req.excel.ASIL               = schema.excelCoordinates[schema.req.excel.ASIL              ];
schema.req.excel.Status             = schema.excelCoordinates[schema.req.excel.Status            ];
schema.req.excel.Comment            = schema.excelCoordinates[schema.req.excel.Comment           ];
schema.req.excel.RelatedGoals       = schema.excelCoordinates[schema.req.excel.RelatedGoals      ];
schema.req.excel.Contributions      = schema.excelCoordinates[schema.req.excel.Contributions     ];