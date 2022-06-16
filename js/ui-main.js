// 검색 필터
$('.filter-text').keyup(function (event) {
	var val = $(this).val(); //검색한 값 (kayup ✨)
	if (val == "") {
		$('.filter-wrap li').show();
	} else {
		$('.filter-wrap li').hide();
		$(".filter-wrap li:contains('" + val + "')").show();
	}
});
// 출처: https: //tozitizi.tistory.com/7

// 버튼 필터
$('[data-filter-btn]').click(function (event) {
	// var $btn = $(this);
	var type = $(this).data('study');
	var $cont = $('[data-filter-type=' + type + ']');
	// $cont.click();
	console.log($cont);

	// if (type == $cont) {
	// 	$cont.css('display', 'none');
	// }
	if ($cont.hasClass('item')) {
		$cont.css('display', 'none');
		// $cont.appendTo('#content').attr('tabindex', '0').focus();
	};
});

//list tab 선택
$('.link-list ol>li').click(function (e) {
	$('.link-list ol>li').removeClass('on');
	$(e.currentTarget).addClass('on');
});


//html in html 👍ㅇ0ㅇ!
$(document).ready(function () {
	$("#con1").load("guide.html");
	// $("#con2").load("guide.html");
});