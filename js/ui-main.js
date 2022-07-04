// main page 작업

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
$('[data-filter-btn]').click(function () {
	var type = $(this).data('filter-btn');
	var cont = $('[data-filter-type=' + type + ']');
	$('.item-wrap.filter-wrap .item').hide();
	cont.show();
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