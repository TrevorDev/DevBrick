var rek = require('rekuire');
var pageObject = rek('pageObject.js');

exports.page = function() {
    pageObject.page.call(this, 'includes/footer', 'includes/footer');
};