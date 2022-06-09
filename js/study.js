//study 

//#1. tooltip
// $(function () {
$('.tooltip-btn-area > .tooltip-btn').click(function (e) {
	$('.tooltip').toggleClass('on');

	// setInterval(function (e) {
	// 	$('.tooltip-btn-area').each(function () {
	// 		// var tooltip = $('.tooltip-btn')
	// 		var tg = $('e.target').offset();

	// 		$('.tooltip').css({
	// 			left: tg.left,
	// 			top: tg.top + 40
	// 		})
	// 	}, 1000)
	// });

	$(function () {
		setInterval(function () {
			$('.tooltip-btn-area').each(function () {
				var tg = $('.tooltip-btn').offset();
				$('.tooltip').css({
					left: tg.left,
					top: tg.top + 40
				})
			})
		}, 1000)
	});
});