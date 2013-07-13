exports.removeTrailingSlash = function(view) {
    if (!view) {
        view = '';
    }
    if (view.slice(-1) === '/') {
        view = view.substring(0, view.length - 1);
    }
    if (view === '') {
        view = 'home';
    }
    return view;
};