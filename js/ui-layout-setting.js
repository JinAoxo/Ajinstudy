// clone coding test html 파일에 html 파일 불러오기

/* 
	본 JS는 퍼블리싱 편의를 위해 
	중복되는 공통 레이아웃 영역을 로드할 목적으로 작성된 문서입니다.

	서버 언어로 레이아웃을 구성하게되면 오류를 유발하는 코드이오니
	Back - End 개발시 이 파일을 반드시 삭제해 주세요 
*/

$(function () {
	$('#header').load('load-header.html #header > *', function () {});
})
$(function () {
	$('#footer').load('load-footer.html #footer > *', function () {});
})

$(function () {
	// header 영역
	$('#header2').load('_load-header.html #header > *', function () {});

	// ???  #header > * 이부분이 없으면 계속해서 html 전체를 불러옴  >> 오류

	// footer 영역
	$('#footer2').load('_load-footer.html #footer > *', function () {});
});