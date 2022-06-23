//study

//#1. tooltip
// try-1 : 오류사항 tooltip이 한개가 아닐 경우 각 내용과 연결이 되지 않음 / 
$(function () {
	$('.try-1 .tooltip-btn-area .tooltip-btn').click(function () {
		$('.try-1 .tooltip').toggleClass('on');
	});
	setInterval();
});

setInterval(function () {
	$('.try-1 .tooltip-btn-area').each(function () {
		var tg = $('.try-1  .tooltip-btn').offset();
		$('.try-1 .tooltip').css({
			left: tg.left,
			top: tg.top + 40
		})
	})
}, 1000)




// try-2 : 공통으로 사용 가능 (우체국 참고)
// 토글 버튼
$('[data-toggle-btn]').click(function () {
	var $btn = $(this);
	var toggleContent = $(this).data('toggle-btn');
	var $cont = $('[data-toggle-content=' + toggleContent + ']');
	$cont.toggle();

	// 툴팁
	if ($cont.hasClass('tooltip')) {
		// var contTop = $btn.offset().top + $btn.outerHeight();
		var contTop = $btn.offset().top;
		var contleft = $btn.offset().left;

		// $cont.css('top', contTop);
		$cont.css({
			top: contTop + 30,
			left: contleft + 30
		});
		// $cont.appendTo('#content').attr('tabindex', '0').focus();
	};
});

// 툴팁 닫기
// $('.btn_close_tooltip').click(function () {
// 	var btnName = $(this).closest('[data-toggle-content]').data('toggle-content');
// 	var $btn = $('[data-toggle-btn=' + btnName + ']');
// 	$(this).closest('[data-toggle-content]').toggle();
// 	$btn.focus();
// });