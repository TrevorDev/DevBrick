var rek = require('rekuire');
var pageObject = rek('pageObject.js');

exports.page = function() {
    pageObject.page.call(this, 'includes/header', 'includes/header');
    this.open = '<@';
    this.close = '@>';
};