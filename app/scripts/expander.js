$(document).ready(function(){

	$(document).on('click', '.js-toggle-list', function(e){
		console.log($(e.target).closest('.js-section').find('.js-list'))
		$(e.target).closest('.js-section').find('.js-list').toggleClass('u-hidden');
	});

});
