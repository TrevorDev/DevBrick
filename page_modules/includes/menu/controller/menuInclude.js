var rek = require('rekuire');
var pageObject = rek('pageObject.js');

exports.page = function(acc) {
    pageObject.page.call(this, 'includes/menu', 'includes/menu');
    this.siteName=acc.global.siteName;
    this.pages = (acc.pages.map(function(page){
        return '<li <% if ("'+page.displayName+'"==displayName) { %> class="active" <% } %> >  <a href="'+acc.domain+'/'+page.displayName+'">'+page.displayName+'<i class="icon-home"></i></a> </li>';
    }).join(''));
    this.open = '<@';
    this.close = '@>';
};