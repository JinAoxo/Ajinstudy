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

//list tab 선택
$('.link-list ol>li').click(function (e) {
	$('.link-list ol>li').removeClass('on');
	$(e.currentTarget).addClass('on');
});