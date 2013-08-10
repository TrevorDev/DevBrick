var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var stringUtil = rek('stringUtil.js');
var auth = rek('auth.js');
var fs = require('fs');

exports.page = function() {
    pageObject.page.call(this, 'blog', 'Blog');
    this.blogPosts = [];
    this.blogPosts.push(new exports.blogPost("Sample Post Title", "Sample blog text"));
    this.blogPosts.push(new exports.blogPost("Sample Post Title2", "Sample blog text2"));
    //this.blogName="blog name";
};

exports.save = function(req, res, dbPage, callback) {
    if(req.body.deletePost){
        dbPage.blogPosts.splice(req.body.deletePost,1);
    }else if(req.body.submit){
        dbPage.blogPosts.push(new exports.blogPost(req.body.postTitle, req.body.postText, req.body.postVideo));
    }else{
        //dbPage.blogName=req.body.blogName;
    }
    callback("/editPage/"+dbPage.pageType+"/"+dbPage.displayName);
}

exports.blogPost = function(heading, text, video, picture) {
    this.heading=heading;
    this.text=text;
    this.video='';
    if(video){
        var match = video.match(/v=(.*?)($| |&)/);
        if(match.length >= 2){
            this.video = '<iframe style="width:100%;max-width:560px;height:315px;" src="//www.youtube.com/embed/'+match[1]+'?rel=0" frameborder="0" allowfullscreen></iframe>';
        }
    }
}