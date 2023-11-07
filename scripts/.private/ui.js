/*
 * Copyright (c) 2016 ANSYS medini Technologies AG
 * All rights reserved.
 * 
 * The script is provided "as is" without warranty of any kind. 
 * ANSYS medini Technologies AG disclaims all warranties, either express or implied, 
 * including the warranties of merchantability and fitness for a particular purpose.
 * 
 * v2016-11-14 - initial version
 */
if (!bind) {
	throw "This script requires extended API";
}

// bind UI utility (NOT OFFICIAL API YET)
var UI = bind("de.ikv.medini.util.eclipse", "de.ikv.medini.util.eclipse.MediniUIUtil", false);
var AnalyzeUI = bind("de.ikv.analyze.ui.common", "de.ikv.analyze.ui.common.util.AnalyzeUIUtil", false);
var Dialogs = bind("de.ikv.medini.util.eclipse", "de.ikv.medini.util.eclipse.dialogs.MediniDialogUtil", false);
var SelectElementTreeDialog = bind("de.ikv.medini.cockpit.ui", "de.ikv.medini.cockpit.ui.dialogs.SelectModelElementTreeDialog", false);
var SWT = bind("org.eclipse.swt", "org.eclipse.swt.SWT", false);
var SWTPoint = bind("org.eclipse.swt", "org.eclipse.swt.graphics.Point", false);
var SWTButton = bind("org.eclipse.swt", "org.eclipse.swt.widgets.Button", false);
var InputDialog = bind("org.eclipse.jface", "org.eclipse.jface.dialogs.InputDialog", false);
var StructuredSelection = bind("org.eclipse.jface", "org.eclipse.jface.viewers.StructuredSelection", false);
var ArrayTreeContentProvider = bind("de.ikv.medini.util.eclipse", "de.ikv.medini.util.eclipse.jface.viewers.ArrayTreeContentProvider", false);
var VanillaAction = bind("de.ikv.medini.util.eclipse", "de.ikv.medini.util.eclipse.jface.action.VanillaAction", false);
var WidgetUtil = bind("de.ikv.medini.util.swt", "de.ikv.medini.util.swt.widgets.WidgetUtil", false);

function openFile(extensions) {
	var fileName = undefined;
	UI.execute(function select(monitor) {
		var shell = UI.getWorkbenchWindowShell();
		fileName = Dialogs.openFileDialog(shell, SWT.OPEN, extensions);
	});
		
	if (fileName) {
		return new java.io.File(fileName);
	}
	return undefined;
}

/*
 * Opens the editor for the given semantic element.
 */
function openEditor(semanticElement, delay) {
	var openFunc = function open(monitor) {
		AnalyzeUI.INSTANCE.openEditorForSemanticElement(semanticElement, true,
				false, false, true);
	};
	
	if (delay != undefined) {
		UI.executeDelayed(delay, openFunc);
	} else {
		UI.executeNonBlocking(openFunc);
	}
}

/*
 * It is rather difficult to decide whether a given object 
 * is an array with Rhino.
 */
function isArray(object) {
	if (object == undefined) {
		return false;
	}
	if (typeof object != "object") {
		return false;
	}
	if (object.length == undefined) {
		return false;
	}
	if (typeof object.length != "number") {
		return false;
	}
	
	return true;
}

/**
 * Opens an element selection dialog, either single selection or multi-selection. 
 * An optional root element can be passed.
 * 
 * @param {String} title
 * @param {EClass} type
 * @param {Boolean} multiple
 * @param {Object} root
 * @returns a single object or an array of objects or undefined
 */
function selectElement(title, type, multiple, root) {
	var selected = undefined;
	UI.execute(function select(monitor) {
		var shell = UI.getWorkbenchWindowShell();
		var dialog = new SelectElementTreeDialog(shell, title, type, multiple);
		AnalyzeUI.INSTANCE.preparate(dialog);
		dialog.setStyle(SelectElementTreeDialog.CHECKBOX);
		if (multiple) {
			dialog.setStyle(SelectElementTreeDialog.PROPAGATE_CHECKED_STATE);
		}
		// use global variable "project" as input if none was defined
		if (root == undefined) {
			root = finder.getProject();
		} else if (isArray(root)) {
			dialog.setTreeContentProvider(new ArrayTreeContentProvider());
			dialog.clearStyle(1 << 12); // <- filter does not work in this case
		}
		dialog.setTreeInput(root);
		var result = Dialogs.openDialog(dialog);
		
		if (result == 0) { // Window.OK = 0
			selected = dialog.getSelectedModelElements();
			if (!multiple) {
				selected = selected[0];
				// FIXME This should be normally done by the dialog already, why isn't?
				if (selected.prototype == Metamodel.projectmodel.PJProxyModel) {
					selected = selected.originalModel;
				}
			}
		}
	});
		
	return selected;
}

/*
 * Input filter which accepts all.
 */
function acceptAll(input) {
	return null;
}

function inputText(title, message, initialValue, validator) {
	var selected = undefined;
	if (validator == undefined) {
		validator = acceptAll;
	}
	UI.execute(function select(monitor) {
		var shell = UI.getWorkbenchWindowShell();
		var dialog = new InputDialog(shell, title, message, initialValue,
				validator);
		var result = dialog.open();
		if (result == 0) { // Window.OK = 0
			selected = dialog.getValue();
		}
	});

	return selected;
}

/**
 * Opens an option dialog with a message and buttons for each option.
 * 
 * @param {String} title
 * @param {String} message
 * @param [{String}] options an array of strings aka options
 * @returns the index of the selected option or -1 (cancel)
 */
function selectOption(title, message, buttons) {
	// API says: "can be called from any thread" but not true
	// TODO assert that buttons is an array
	var selected = -1;
	UI.execute(function select(monitor) {
		selected = UI.displayQuestion(title, message, buttons);
	});
	
	return selected;
}

function runHandler(handler, object, label) {
	// use a vanilla action to satisfy the handler
	var action = new VanillaAction(label);
	// we have to run in UI thread
	UI.execute(function run(monitor) {
		// simulate a selection
		handler.selectionChanged(action, new StructuredSelection(object));
		handler.run(action);
	});
}

function setHandlerSelection(handler, object, label) {
	// use a vanilla action to satisfy the handler
	var action = new VanillaAction(label ? label : "set selection");
	handler.selectionChanged(action, new StructuredSelection(object));
}
