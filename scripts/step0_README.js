/*Copyright (c) 2023 Ansys

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/*changelog 
2023/05/17: v0.5 released by Ka-lip Chu.
*/


load(".private/parameters.js"); //schemas are from this file.
load(".private/languagePackage.js");

var uiLang = prompt(messages['en'].askLang,'en');

alert(messages[uiLang].agreement);
alert(messages[uiLang].recommendedWorkflow);
alert(messages[uiLang].defaultSgExcel);
alert(messages[uiLang].defaultReqExcel);
alert(messages[uiLang].contributionFormat);
alert(messages[uiLang].subreqFormat);

var agreementFilePath = __filedir+'\\.private\\' + 'readAgreement.txt';
var uiLangFilePath = __filedir+'\\.private\\' + 'uiLang.txt';

function writeToFile(text, fileName, append) {
	var file = new java.io.File(fileName);
	if(append){
		var writer = new java.io.FileWriter(file, true);
		writer.append(text);
	}
	else{
		var writer = new java.io.FileWriter(file);
		writer.write(text);
	}
	writer.close();
}

writeToFile('read agreement: '+ Date() + '\n',agreementFilePath, true);
writeToFile(uiLang, uiLangFilePath, false);