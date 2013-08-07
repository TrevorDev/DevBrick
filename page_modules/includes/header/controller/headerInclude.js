var rek = require('rekuire');
var pageObject = rek('pageObject.js');

exports.page = function(acc) {
    pageObject.page.call(this, 'includes/header', 'includes/header');
    this.siteName=acc.global.siteName;
    this.email=acc.email;
    this.open = '<@';
    this.close = '@>';
};