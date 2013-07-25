exports.removeTrailingSlash = function(view) {
    if (!view) {
        view = '';
    }
    if (view.slice(-1) === '/') {
        view = view.substring(0, view.length - 1);
    }
    return view;
};

exports.replaceNewlineWithBR = function (str){
    return str.replace(/\n/g, '<br>');
}