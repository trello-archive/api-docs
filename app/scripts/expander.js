$(document).ready(function(){

	$(document).on('click', '.js-toggle-list', function(e){
		$section = $(e.target).closest('.js-section')
		$list = $section.find('.js-list')
		$button = $section.find('.js-toggle-list');

		if($list.hasClass('u-hidden')) {
			$list.removeClass('u-hidden');
			$button.text('Hide');
		} else {
			$list.addClass('u-hidden');
			$button.text('Show');
		}

	});

});
