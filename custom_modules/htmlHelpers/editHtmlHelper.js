exports.editTextArea = function(pageData, field){
	return '<textarea rows="3" style="-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;width: 100%;resize:vertical;" name="'+field+'">'+pageData[field]+'</textarea>';
}

exports.editTextInput = function(pageData, field, placeHolder){
	return '<input type="text" class="input-block-level" placeholder="'+placeHolder+'" name="'+field+'" value="'+pageData[field]+'">';
}

exports.editImgInput = function(pageData, field){
	return '<input type="file" name="'+field+'" id="file" value="choose">\
            <span style="white-space: nowrap;"><input type="checkbox" name="'+field+'Border" value="true"> Add picture border</span>';
}

exports.savePageBackToDash = function (){
	//ESCAPING NEWLINE good idea?
	return '<div style="padding:20px;">\
		        <button class="btn btn-primary btn-large" style="background-color:#333333;background-color:#222222;" type="submit">\
		            Save Page\
		        </button>\
		        <a href="/dashboard"><button class="btn btn-primary btn-large" style="background-color:#333333;background-color:#222222;" type=button>\
		            Back To Dashboard\
		        </button></a>\
		    </div>';
}