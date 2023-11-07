/**
 * 
 */


const messages = {
	en:{
		wrongSelection: "The selected model is not a Requirements model. Please select the correct requirement model and try again.",

		importComplete: "The import process has been completed. If this is not the expected outcome, you can undo the process by pressing CTRL + Z or clicking Edit -> Undo in the toolbar.",

		agreement: "By using these scripts, you agree to the MIT license. You can find the full details in the source code of step0_README.js.\n\n" + 
			"You are solely responsible for the usage of these scripts, and Ansys is not liable for any accidents caused by them.",

		recommendedWorkflow: "It is recommended to execute the scripts from step 1 to step 4 in the following workflow. \n\n"+
		"Make sure to select a requirements model as the target; otherwise, the script will not be executed. \n"+
		"Requirements models can be identified by their light blue folder icon.\n\n"+ 
		"It is also advisable to create an empty requirements model as the target to avoid any conflicts with your existing requirements/goals. In case of any unexpected issues, you can press CTRL + Z or click Edit -> Undo in the toolbar.",

		defaultSgExcel: "The Excel file for safety goals should follow the same format as the template.\n"+ 
			"Specifically, the layout should be as follows:\n\n"+
			"ID:		Column A\n"+
			"Name:		Column B\n"+
			"SafeState:		Column C\n"+
			"ASIL:		Column D\n"+
			"FTTI:		Column E\n"+
			"EOTI:		Column F\n"+
			"DriverActions:	Column G\n\n "+
			"If the format does not match, you can modify the settings in parameter.js.",

		defaultReqExcel: "The Excel file for safety requirements should follow the same format as the template. Specifically, the layout should be as follows:\n\n"+
			"SubReqRelation:	Column A\n"+
			"ID:		Column B\n"+
			"Name:		Column C\n"+
			"Description:	Column D\n"+
			"TimeConstraint:	Column E\n"+
			"PhysicalConstraint:	Column F\n"+
			"Kind:		Column G\n"+
			"ASIL:		Column H\n"+
			"Status:		Column I\n"+
			"Comment:	Column N\n"+
			"RelatedGoals:	Column J\n"+
			"Contributions:	Column K\n\n"+
			"If the format does not match, you can modify the settings in parameter.js.",

		contributionFormat: "For step 3, which involves creating relations between requirements and safety goals, it is important to format the data correctly. \n"+
			"Please note the following:\n\n"+
			"1. Goals are obtained from the \"Related Goals\" column (default: Column J), and contributions are extracted from the \"Contributions\" column (default: Column K).\n"+
			"2. Each goal/requirement should be on a separate line. If this is not the case, you can change the line separator in parameter.js.\n"+
			"3. Valid formats for goals/requirements are as follows:\n"+
			"• SG-001 (ASIL B)\n"+
			"• SR-001 (ASIL C)\n\n"+
			"Please note that using the • symbol or other characters at the beginning of each line is optional, as is specifying the ASIL level.\n"+
			"Therefore, SG-001 is also considered valid. Additionally, SG-01 with a 2-digit (or 4, 5, etc.) format is also accepted.\n"+
			"However, starting with FSR or other words is not valid, but you can adjust this setting in parameter.js.",

		subreqFormat: "For step 4, which involves creating sub-requirements, if your Excel file contains requirements with contribution relations, it is necessary to format the data appropriately. The format is as follows: \n\n"+
		"3.1 represents the first sub-requirement of requirement 3, and 3.1.2 represents the second sub-requirement of 3.1.\n\n"+
		"Please note that the numbering system used for sub-requirements is different from the IDs of the requirements. If your format differs from this, you can modify the settings in parameter.js."	,
		
		readAgreement: "It appears that you haven't run step0_README.js yet. Please run it once and make sure to read through the agreement.\n\n"+
			"Il semblerait que vous n'ayez pas encore exécuté step0_README.js. Veuillez l'exécuter une fois et assurez-vous de lire attentivement l'accord.\n\n"+
			"Es scheint, dass du step0_README.js noch nicht ausgeführt hast. Bitte führe es einmal aus und achte darauf, die Vereinbarung gründlich zu lesen.\n\n" +
			"step0_README.jsをまだ実行していないようです。一度実行し、契約書を必ず読んでください。\n\n"+
			"step0_README.js를 아직 실행하지 않은 것 같습니다. 한 번 실행하고 동의서를 꼭 읽어보세요.\n\n"+
			"看起来您还没有运行 step0_README.js。请运行一次并确保阅读完整的协议。\n\n",
			
		askLang: "Please indicate your language preference as 'en' for English.\n\n" + 
			"Veuillez indiquer votre préférence linguistique en tant que 'fr' pour le français.\n\n" + 
			"Bitte geben Sie Ihre Sprachpräferenz als 'de' für Deutsch an.\n\n" + 
			"日本語の場合は、言語の選択肢として 'ja' を指定してください。\n\n" + 
			"영어로 사용할 언어 설정을 'ko'로 지정해주세요.\n\n" + 
			"请将您的语言偏好设为 'zh'，表示中文。\n\n"
	},
	ja:{
		wrongSelection: "選択したモデルは要件モデルではありません。正しい要件モデルを選択して、もう一度試してください。",

		importComplete: "インポートプロセスが完了しました。もし予期しない結果である場合は、CTRL + Zを押すか、ツールバーの編集 -> 元に戻すをクリックしてプロセスを元に戻すことができます。",

		agreement: "これらのスクリプトを使用することで、MIT ライセンスに同意するものとします。詳細は step0_README.js のソースコードで確認できます。\n\nこれらのスクリプトの使用に関しては、全責任があなたにあります。 Ansys はこれらのスクリプトによって引き起こされるいかなる事故についても責任を負いません。",

		recommendedWorkflow: "以下のワークフローでステップ1からステップ4までのスクリプトの実行が推奨されています。\n\n"+
		"ターゲットとして要件モデルを選択してください。そうしないと、スクリプトは実行されません。\n"+
		"要件モデルはライトブルーのフォルダアイコンで識別できます。\n\n"+
		"既存の要件/ゴールとの競合を避けるために、空の要件モデルをターゲットとして作成することも推奨されています。予期しない問題が発生した場合は、CTRL + Z を押すか、ツールバーの編集 -> 元に戻すをクリックしてください。",

		defaultSgExcel: "安全ゴールのExcelファイルは、テンプレートと同じ形式に従う必要があります。\n"+
		"具体的には、以下のレイアウトに従う必要があります:\n\n"+
		"ID:		列A\n"+
		"Name:		列B\n"+
		"SafeState:		列C\n"+
		"ASIL:		列D\n"+
		"FTTI:		列E\n"+
		"EOTI:		列F\n"+
		"DriverActions:	列G\n\n"+
		"形式が一致しない場合は、parameter.jsで設定を変更することができます。",

		defaultReqExcel: "安全要件のExcelファイルは、テンプレートと同じ形式に従う必要があります。\n"+
		"具体的には、以下のレイアウトに従う必要があります:\n\n"+
		"SubReqRelation:	列A\n"+
		"ID:		列B\n"+
		"Name:		列C\n"+
		"Description:	列D\n"+
		"TimeConstraint:	列E\n"+
		"PhysicalConstr:	列F\n"+
		"Kind:		列G\n"+
		"ASIL:		列H\n"+
		"Status:		列I\n"+
		"Comment:	列N\n"+
		"RelatedGoals:	列J\n"+
		"Contributions:	列K\n\n"+
		"形式が一致しない場合は、parameter.jsで設定を変更することができます。",

		contributionFormat: "ステップ3では、要件と安全ゴールの関係を作成するため、データの形式を正しくすることが重要です。\n"+
		"以下の点に注意してください:\n\n"+
		"1. ゴールは「RelatedGoals」列から取得されます（デフォルト: 列J）、貢献度は「Contributions」列から抽出されます（デフォルト: 列K）。\n"+
		"2. 各ゴール/要件は別の行に記述する必要があります。そうでない場合は、parameter.jsで改行の区切り文字を変更することができます。\n"+
		"3. ゴール/要件の有効な形式は次の通りです:\n"+
		"• SG-001（ASIL B）\n"+
		"• SR-001（ASIL C）\n\n"+
		"各行の先頭に•または他の文字を使用することはオプションであり、ASILレベルの指定もオプションです。\n"+
		"したがって、SG-001も有効な形式とみなされます。また、2桁（または4、5など）の形式を持つSG-01も受け入れられます。\n"+
		"ただし、FSRや他の単語で始まる場合は無効ですが、parameter.jsでこの設定を調整することができます。",

		subreqFormat: "ステップ4では、サブ要件の作成が含まれています。Excelファイルに貢献関係を持つ要件が含まれる場合、データの形式を適切にする必要があります。形式は以下の通りです: \n\n"+
		"3.1は要件3の最初のサブ要件を表し、3.1.2は3.1の2番目のサブ要件を表します。\n\n"+
		"サブ要件の番号付けは要件のIDとは異なるシステムを使用することに注意してください。形式が異なる場合は、parameter.jsで設定を変更することができます。"
	},
	zh:{
		wrongSelection: "所选模型不是一个需求模型。请重新选择正确的需求模型并重试。",
		
		importComplete: "导入过程已完成。如果结果与预期不符，您可以通过按下CTRL + Z或在工具栏中点击编辑->撤消来撤销该过程。",
		
		agreement: "通过使用这些脚本，您同意遵守 MIT 许可证。您可以在 step0_README.js 的源代码中找到完整的详细信息。\n\n" +
			"您对这些脚本的使用负有全部责任，Ansys对由其引起的任何意外事故不承担任何责任。",
		
		recommendedWorkflow: "建议按照以下工作流程执行步骤1到步骤4的脚本。\n\n" +
			"请确保将需求模型选择为目标；否则，脚本将不会执行。\n" +
			"需求模型可以通过其浅蓝色文件夹图标进行识别。\n\n" +
			"还建议将空的需求模型作为目标创建，以避免与现有的需求/目标产生冲突。如果出现任何意外问题，您可以按下CTRL + Z或在工具栏中点击编辑->撤消。",
		
		defaultSgExcel: "安全目标的Excel文件应遵循与模板相同的格式。\n" +
			"具体而言，布局应如下所示：\n\n" +
			"ID:		列A\n" +
			"Name:		列B\n" +
			"SafeState:		列C\n" +
			"ASIL:		列D\n" +
			"FTTI:		列E\n" +
			"EOTI:		列F\n" +
			"DriverActions:	列G\n\n" +
			"如果格式不匹配，您可以在parameter.js中修改设置。",
		
		defaultReqExcel: "安全要求的Excel文件应遵循与模板相同的格式。具体而言，布局应如下所示：\n\n" +
			"SubReqRelation:	列A\n"+
			"ID:		列B\n"+
			"Name:		列C\n"+
			"Description:	列D\n"+
			"TimeConstraint:	列E\n"+
			"PhysicalConstr:	列F\n"+
			"Kind:		列G\n"+
			"ASIL:		列H\n"+
			"Status:		列I\n"+
			"Comment:	列N\n"+
			"RelatedGoals:	列J\n"+
			"Contributions:	列K\n\n"+
			"如果格式不匹配，您可以在parameter.js中修改设置。",

		contributionFormat: "在第3步中，涉及到创建需求和安全目标之间的关系，正确格式化数据非常重要。\n" +
			"请注意以下事项：\n\n" +
			"1. 目标从\"RelatedGoals\"列（默认为列J）获取，贡献度从\"Contributions\"列（默认为列K）提取。\n" +
			"2. 每个目标/需求应在单独的行上。如果不是这种情况，您可以在parameter.js中更改行分隔符。\n" +
			"3. 目标/需求的有效格式如下所示：\n" +
			"• SG-001（ASIL B）\n" +
			"• SR-001（ASIL C）\n\n" +
			"请注意，在每行的开头使用•符号或其他字符是可选的，指定ASIL级别也是可选的。\n" +
			"因此，SG-001也被视为有效。此外，接受以2位数（或4位数、5位数等）格式的SG-01。\n" +
			"但以FSR或其他单词开头是无效的，但您可以在parameter.js中调整此设置。",

		subreqFormat: "第4步涉及创建子要求，如果您的Excel文件中包含具有贡献关系的需求，需要适当地格式化数据。格式如下：\n\n" +
			"3.1表示需求3的第一个子要求，3.1.2表示3.1的第二个子要求。\n\n" +
			"请注意，用于子要求的编号系统与需求的ID不同。如果您的格式与此不同，可以在parameter.js中修改设置。"
				
	},
	kr:{
		wrongSelection: "선택한 모델은 요구 사항 모델이 아닙니다. 올바른 요구 사항 모델을 선택하고 다시 시도하세요.",

		importComplete: "가져오기 과정이 완료되었습니다. 이것이 예상된 결과가 아닌 경우에는 CTRL + Z를 누르거나 툴바에서 편집 -> 실행 취소를 클릭하여 과정을 되돌릴 수 있습니다.",

		agreement: "이 스크립트를 사용함으로써 MIT 라이선스에 동의합니다. 자세한 내용은 step0_README.js의 소스 코드에서 찾을 수 있습니다.\n\n" +
		"이 스크립트의 사용에 대한 모든 책임은 본인에게 있으며, Ansys는 이로 인해 발생하는 어떠한 사고에 대해서도 책임지지 않습니다.",

		recommendedWorkflow: "다음 워크플로우에서 스크립트를 1단계부터 4단계까지 실행하는 것이 권장됩니다. \n\n" +
			"대상으로 요구 사항 모델을 선택하도록 주의하십시오. 그렇지 않으면 스크립트가 실행되지 않습니다. \n" +
			"요구 사항 모델은 연한 파란색 폴더 아이콘으로 식별할 수 있습니다.\n\n" +
			"기존의 요구 사항/목표와 충돌을 피하기 위해 빈 요구 사항 모델을 대상으로 생성하는 것도 권장됩니다. 예기치 않은 문제가 발생하는 경우에는 CTRL + Z를 누르거나 툴바에서 편집 -> 실행 취소를 클릭할 수 있습니다.",

		defaultSgExcel: "안전 목표용 Excel 파일은 템플릿과 동일한 형식을 따라야 합니다.\n" +
			"구체적으로 레이아웃은 다음과 같아야 합니다:\n\n" +
			"ID:		A열\n" +
			"Name:		B열\n" +
			"SafeState:		C열\n" +
			"ASIL:		D열\n" +
			"FTTI:		E열\n" +
			"EOTI:		F열\n" +
			"DriverActions:	G열\n\n" +
			"형식이 일치하지 않는 경우 parameter.js에서 설정을 수정할 수 있습니다.",

		defaultReqExcel: "안전 요구 사항용 Excel 파일은 템플릿과 동일한 형식을 따라야 합니다. 구체적으로 레이아웃은 다음과 같아야 합니다:\n\n" +
			"SubReqRelation:	A열\n"+
			"ID:		B열\n"+
			"Name:		C열\n"+
			"Description:	D열\n"+
			"TimeConstraint:	E열\n"+
			"PhysicalConstr:	F열\n"+
			"Kind:		G열\n"+
			"ASIL:		H열\n"+
			"Status:		I열\n"+
			"Comment:	N열\n"+
			"RelatedGoals:	J열\n"+
			"Contributions:	K열\n\n"+
			"형식이 일치하지 않는 경우 parameter.js에서 설정을 수정할 수 있습니다.",

		contributionFormat: "요구 사항과 안전 목표 간의 관계를 생성하는 단계인 3단계에서는 데이터를 올바르게 형식화하는 것이 중요합니다. \n" +
			"다음 사항을 참고하세요:\n\n" +
			"1. 목표는 \"RelatedGoals\" 열(기본값: J열)에서 얻고, 기여는 \"Contributions\" 열(기본값: K열)에서 추출됩니다.\n" +
			"2. 각 목표/요구 사항은 개별 행에 있어야 합니다. 그렇지 않은 경우 parameter.js에서 줄 구분자를 변경할 수 있습니다.\n" +
			"3. 목표/요구 사항의 유효한 형식은 다음과 같습니다:\n" +
			"• SG-001 (ASIL B)\n" +
			"• SR-001 (ASIL C)\n\n" +
			"각 줄의 시작에 • 기호나 다른 문자를 사용하는 것은 선택 사항이며, ASIL 레벨을 지정하는 것도 선택 사항입니다.\n" +
			"따라서 SG-001도 유효한 형식으로 간주됩니다. 또한 2자리 (또는 4자리, 5자리 등) 형식의 SG-01도 허용됩니다.\n" +
			"그러나 FSR 또는 다른 단어로 시작하는 것은 유효하지 않으며, parameter.js에서 이 설정을 조정할 수 있습니다.",

		subreqFormat: "하위 요구 사항을 생성하는 4단계에서는 Excel 파일에 기여 관계가 있는 요구 사항이 포함되어 있는 경우 데이터를 적절하게 형식화해야 합니다. 형식은 다음과 같습니다: \n\n" +
			"3.1은 3번 요구 사항의 첫 번째 하위 요구 사항을 나타내며, 3.1.2는 3.1의 두 번째 하위 요구 사항을 나타냅니다.\n\n" +
			"하위 요구 사항에 사용되는 번호 체계는 요구 사항의 ID와는 다릅니다. 형식이 이와 다른 경우 parameter.js에서 설정을 수정할 수 있습니다."
			
	},
	fr:{
		wrongSelection: "Le modèle sélectionné n'est pas un modèle de besoins. Veuillez sélectionner le modèle de besoins correct et réessayer.",

		importComplete: "Le processus d'importation est terminé. Si ce n'est pas le résultat attendu, vous pouvez annuler le processus en appuyant sur CTRL + Z ou en cliquant sur Édition -> Annuler dans la barre d'outils.",

		agreement: "En utilisant ces scripts, vous acceptez la licence MIT. Vous pouvez trouver tous les détails dans le code source de step0_README.js.\n\n" +
			"Vous êtes seul responsable de l'utilisation de ces scripts et Ansys décline toute responsabilité en cas d'accident causé par ceux-ci.",

		recommendedWorkflow: "Il est recommandé d'exécuter les scripts de l'étape 1 à l'étape 4 selon le flux de travail suivant. \n\n" +
			"Assurez-vous de sélectionner un modèle de besoins comme cible ; sinon, le script ne sera pas exécuté. \n" +
			"Les modèles de besoins peuvent être identifiés par leur icône de dossier bleu clair.\n\n" +
			"Il est également conseillé de créer un modèle de besoins vide comme cible pour éviter tout conflit avec vos besoins/objectifs existants. En cas de problèmes inattendus, vous pouvez appuyer sur CTRL + Z ou cliquer sur Édition -> Annuler dans la barre d'outils.",

		defaultSgExcel: "Le fichier Excel pour les objectifs de sécurité doit suivre le même format que le modèle.\n" +
			"Plus précisément, la disposition doit être la suivante:\n\n" +
			"ID:		Colonne A\n"+
			"Name:		Colonne B\n"+
			"SafeState:		Colonne C\n"+
			"ASIL:		Colonne D\n"+
			"FTTI:		Colonne E\n"+
			"EOTI:		Colonne F\n"+
			"DriverActions:	Colonne G\n\n "+
			"Si le format ne correspond pas, vous pouvez modifier les paramètres dans parameter.js.",

		defaultReqExcel: "Le fichier Excel pour les exigences de sécurité doit suivre le même format que le modèle. Plus précisément, la disposition doit être la suivante:\n\n" +
			"SubReqRelation:	Colonne A\n"+
			"ID:		Colonne B\n"+
			"Name:		Colonne C\n"+
			"Description:	Colonne D\n"+
			"TimeConstraint:	Colonne E\n"+
			"PhysicalConstraint:	Colonne F\n"+
			"Kind:		Colonne G\n"+
			"ASIL:		Colonne H\n"+
			"Status:		Colonne I\n"+
			"Comment:	Colonne N\n"+
			"RelatedGoals:	Colonne J\n"+
			"Contributions:	Colonne K\n\n"+
			"Si le format ne correspond pas, vous pouvez modifier les paramètres dans parameter.js.",

		contributionFormat: "Pour l'étape 3, qui consiste à créer des relations entre les exigences et les objectifs de sécurité, il est important de formater les données correctement. \n" +
			"Veuillez noter ce qui suit:\n\n" +
			"1. Les objectifs sont obtenus à partir de la colonne \"RelatedGoals\" (par défaut : Colonne J) et les contributions sont extraites de la colonne \"Contributions\" (par défaut : Colonne K).\n" +
			"2. Chaque objectif/exigence doit être sur une ligne séparée. Si ce n'est pas le cas, vous pouvez modifier le séparateur de ligne dans parameter.js.\n" +
			"3. Les formats valides pour les objectifs/exigences sont les suivants:\n" +
			"• SG-001 (ASIL B)\n" +
			"• SR-001 (ASIL C)\n\n" +
			"Veuillez noter que l'utilisation du symbole • ou d'autres caractères au début de chaque ligne est facultative, tout comme la spécification du niveau ASIL.\n" +
			"Par conséquent, SG-001 est également considéré comme valide. De plus, SG-01 avec un format à 2 chiffres (ou 4, 5, etc.) est également accepté.\n" +
			"Cependant, commencer par FSR ou d'autres mots n'est pas valide, mais vous pouvez ajuster ce paramètre dans parameter.js.",

		subreqFormat: "Pour l'étape 4, qui consiste à créer des sous-exigences, si votre fichier Excel contient des exigences avec des relations de contribution, il est nécessaire de formater les données correctement. Le format est le suivant: \n\n" +
			"3.1 représente la première sous-exigence de l'exigence 3, et 3.1.2 représente la deuxième sous-exigence de 3.1.\n\n" +
			"Veuillez noter que le système de numérotation utilisé pour les sous-exigences est différent des identifiants des exigences. Si votre format diffère de celui-ci, vous pouvez modifier les paramètres dans parameter.js."
				
	},
	de:{
		
		wrongSelection: "Das ausgewählte Modell ist kein Anforderungsmodell. Bitte wählen Sie das richtige Anforderungsmodell und versuchen Sie es erneut.",

		importComplete: "Der Importvorgang wurde abgeschlossen. Falls dies nicht das erwartete Ergebnis ist, können Sie den Vorgang rückgängig machen, indem Sie STRG + Z drücken oder auf Bearbeiten -> Rückgängig in der Symbolleiste klicken.",

		agreement: "Durch die Verwendung dieser Skripte stimmen Sie der MIT-Lizenz zu. Die vollständigen Details finden Sie im Quellcode von step0_README.js.\n\n" +
		"Sie sind allein für die Verwendung dieser Skripte verantwortlich, und Ansys haftet nicht für Unfälle, die durch sie verursacht werden.",

		recommendedWorkflow: "Es wird empfohlen, die Skripte von Schritt 1 bis Schritt 4 in folgendem Ablauf auszuführen. \n\n"+
		"Stellen Sie sicher, dass Sie ein Anforderungsmodell als Ziel auswählen, da das Skript sonst nicht ausgeführt wird. \n"+
		"Anforderungsmodelle können anhand ihres hellblauen Ordnersymbols erkannt werden.\n\n"+
		"Es ist auch ratsam, ein leeres Anforderungsmodell als Ziel zu erstellen, um Konflikte mit Ihren vorhandenen Anforderungen/Zielen zu vermeiden. Falls unerwartete Probleme auftreten, können Sie STRG + Z drücken oder auf Bearbeiten -> Rückgängig in der Symbolleiste klicken.",

		defaultSgExcel: "Die Excel-Datei für Sicherheitsziele sollte das gleiche Format wie die Vorlage haben.\n"+
		"Speziell sollte das Layout wie folgt aussehen:\n\n"+
					"ID:		Column A\n"+
			"Name:		Column B\n"+
			"SafeState:		Column C\n"+
			"ASIL:		Column D\n"+
			"FTTI:		Column E\n"+
			"EOTI:		Column F\n"+
			"DriverActions:	Column G\n\n "+
		"Wenn das Format nicht übereinstimmt, können Sie die Einstellungen in parameter.js anpassen.",

		defaultReqExcel: "Die Excel-Datei für Sicherheitsanforderungen sollte das gleiche Format wie die Vorlage haben. Speziell sollte das Layout wie folgt aussehen:\n\n"+
					"SubReqRelation:	Column A\n"+
			"ID:		Spalte B\n"+
			"Name:		Spalte C\n"+
			"Description:	Spalte D\n"+
			"TimeConstraint:	Spalte E\n"+
			"PhysicalConstraint:	Spalte F\n"+
			"Kind:		Spalte G\n"+
			"ASIL:		Spalte H\n"+
			"Status:		Spalte I\n"+
			"Comment:	Spalte N\n"+
			"RelatedGoals:	Spalte J\n"+
			"Contributions:	Spalte K\n\n"+
			"Wenn das Format nicht übereinstimmt, können Sie die Einstellungen in parameter.js anpassen.",


		contributionFormat: "Für Schritt 3, bei dem es darum geht, Beziehungen zwischen Anforderungen und Sicherheitszielen zu erstellen, ist es wichtig, die Daten korrekt zu formatieren. \n"+
		"Bitte beachten Sie Folgendes:\n\n"+
		"1. Ziele werden aus der Spalte \"Verwandte Ziele\" (Standard: Spalte J) entnommen, und Beiträge werden aus der Spalte \"Beiträge\" (Standard: Spalte K) extrahiert.\n"+
		"2. Jedes Ziel/Anforderung sollte in einer separaten Zeile stehen. Wenn dies nicht der Fall ist, können Sie den Zeilentrenner in parameter.js ändern.\n"+
		"3. Gültige Formate für Ziele/Anforderungen sind wie folgt:\n"+
		" • SG-001 (ASIL B)\n"+
		" • SR-001 (ASIL C)\n\n"+
		"Bitte beachten Sie, dass die Verwendung des •-Symbols oder anderer Zeichen am Anfang jeder Zeile optional ist, ebenso wie die Angabe der ASIL-Stufe.\n"+
		"Daher wird SG-001 ebenfalls als gültig betrachtet. Zusätzlich wird auch SG-01 im 2-stelligen (oder 4, 5 usw.) Format akzeptiert.\n"+
		"Jedoch ist der Beginn mit FSR oder anderen Wörtern ungültig, aber Sie können diese Einstellung in parameter.js anpassen.",

		subreqFormat: "Für Schritt 4, bei dem es darum geht, Unteranforderungen zu erstellen, ist es erforderlich, die Daten entsprechend zu formatieren, wenn Ihre Excel-Datei Anforderungen mit Beitragsbeziehungen enthält. Das Format ist wie folgt: \n\n"+
		"3.1 repräsentiert die erste Unteranforderung von Anforderung 3, und 3.1.2 repräsentiert die zweite Unteranforderung von 3.1.\n\n"+
		"Bitte beachten Sie, dass das Nummerierungssystem für Unteranforderungen von den IDs der Anforderungen abweicht. Wenn Ihr Format hiervon abweicht, können Sie die Einstellungen in parameter.js anpassen."
				
		
	}
};
