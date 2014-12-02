/* global document, jQuery */
require(['ranges' ],
	function MobileHack(Ranges) {
	'use strict';

	$(function () {

		var $mobileHack = null;
		$('.aloha-editable').click(function () {
			var that = this;
			var range = Ranges.get();
			if($mobileHack === null) {
				// create a new element
				$mobileHack = $('<div class="mobile-hack" />');
				// make it a contenteditable
				$mobileHack.attr('contenteditable', 'true');
				// hide it as best as possible
				$mobileHack.css({
					"z-index": -999,
    				opacity: 0.001
				});
				// disable the virtual keyboards autocomplete features as they will
				// do some weird, unpredictable stuff
				$mobileHack.attr({
					'autocapitalize': 'off',
					'autocorrect': 'off',
					'autocomplete': 'off'
				});

                // place the mobile hack inside of the aloha caret
				$('.aloha-caret').append($mobileHack);
				// register a event handler for the keydown event
				$mobileHack.on('keypress', function (e) {
					//e.preventDefault();
					return;
					e = e.originalEvent;
					e.currentTarget = that;
					e.srcTarget = that;
					e.target = that;
					// here all the keystrokes are captured
					console.log(e.keyCode);
					$(document).trigger('keypress', e);
					return false;
				});
			}
			// every time the user clicks, focus on the mobile-hack to show the virtual keyboard
			$mobileHack.focus();
			$mobileHack.data('range', range);
			//Ranges.select(range);
		});

	});
});

