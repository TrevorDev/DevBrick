var rek = require('rekuire');
var pageObject = rek('pageObject.js');

exports.page = function(acc) {
    pageObject.page.call(this, 'includes/style', 'includes/style');
    this.publicFileName = "style.css";
    this.backgroundColor = "#FFFFFF";
    this.secondaryColor = "#eeeeee";
    this.font = "";
    this.open = '<@';
    this.close = '@>';
    this.customStyle = '';
};