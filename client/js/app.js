var htmlEditor = ace.edit('html');
htmlEditor.session.setMode('ace/mode/html');
htmlEditor.session.setUseWrapMode(true);
htmlEditor.setTheme('ace/theme/tomorrow_night');
htmlEditor.setOption('enableEmmet', true);
htmlEditor.$blockScrolling = Infinity;
var cssEditor = ace.edit('css');
cssEditor.session.setMode('ace/mode/css');
cssEditor.session.setUseWrapMode(true);
cssEditor.setTheme('ace/theme/tomorrow_night');
cssEditor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: false,
    enableLiveAutocompletion: true
});
cssEditor.$blockScrolling = Infinity;
var preview = document.getElementById('preview');
var iframe = document.createElement('iframe');
iframe.setAttribute('frameborder', 0);
preview.appendChild(iframe);

var htmlText = '';
var cssText = '';
htmlEditor.on('change', function(){
    htmlText = htmlEditor
        .getValue()
        .replace('</head>', cssText + '</head>');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(htmlText);
    iframe.contentWindow.document.close();
});
cssEditor.on('change', function(){
    cssText = '<style>' + cssEditor.getValue() + '</style>';
    htmlText = htmlEditor
        .getValue()
        .replace('</head>', cssText + '</head>');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(htmlText);
    iframe.contentWindow.document.close();
});
