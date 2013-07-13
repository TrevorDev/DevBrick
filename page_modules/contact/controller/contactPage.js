var rek = require('rekuire');
var pageObject = rek('pageObject.js');

exports.page = function() {
    pageObject.page.call(this, 'contact', 'Contact');
    this.phone = '9058864628';
    this.email = 'email@email.com';
    this.name = 'trev';
};

exports.save = function(form, dbPage) {

}