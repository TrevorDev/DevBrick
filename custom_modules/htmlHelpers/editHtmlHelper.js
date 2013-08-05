exports.editTextArea = function(pageData, field){
	return '<textarea rows="3" style="-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;width: 100%;resize:vertical;" name="'+field+'">'+pageData[field]+'</textarea>';
}

exports.editTextInput = function(pageData, field, placeHolder){
	return '<input type="text" class="input-block-level" placeholder="'+placeHolder+'" name="'+field+'" value="'+pageData[field]+'">';
}