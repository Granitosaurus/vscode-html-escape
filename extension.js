const vscode = require('vscode');
const he = require('he');

function activate(context) {
    let escapeDisposable = vscode.commands.registerCommand('htmlEscape.escape', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const escapedText = he.encode(selectedText, {useNamedReferences: true});

        editor.edit((editBuilder) => {
            editBuilder.replace(selection, escapedText);
        });
    });

    let unescapeDisposable = vscode.commands.registerCommand('htmlEscape.unescape', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const unescapedText = he.decode(selectedText);

        editor.edit((editBuilder) => {
            editBuilder.replace(selection, unescapedText);
        });
    });

    context.subscriptions.push(escapeDisposable, unescapeDisposable);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate
};