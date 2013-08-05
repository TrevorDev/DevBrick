var nodemailer = require("nodemailer");
// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "devbrickhelper@gmail.com",
        pass: "tinystompg"
    }
});

exports.sendEmail = function(to,subject,text){
	var mailOptions = {
	    from: "DevBrick <devbrickhelper@gmail.com>", // sender address
	    to: "tbaron@uoguelph.ca", // list of receivers
	    subject: subject, // Subject line
	    text: text, // plaintext body
	    html: "<b>"+text+"</b>" // html body
	}
	smtpTransport.sendMail(mailOptions, function(err, response){
		if(err){
        console.log(err);
	    }else{
	        console.log("Message sent: " + response.message);
	    }
	});
}