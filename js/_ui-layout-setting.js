// 자동 배포 테스트 중

/* 
	본 JS는 퍼블리싱 편의를 위해 
	중복되는 공통 레이아웃 영역을 로드할 목적으로 작성된 문서입니다.
	서버 언어로 레이아웃을 구성하게되면 오류를 유발하는 코드이오니
	Back-End 개발시 이 파일을 반드시 삭제해 주세요 :)
*/

$(function () {
	$('#header').load('_inc-header.html #header > *', function () {
		if ($.isFunction(window.gnbControl)) gnbControl();
		if ($.isFunction(window.allmenuSetting)) allmenuSetting();

		// HTML 산출물 GNB 활성화 (서버개발시 별도 구현)
		var urlLength = window.location.pathname.split('/').length;
		var htmlName = window.location.pathname.split('/')[urlLength - 1];
		if ($('.gnb-list a[href="' + htmlName + '"]').length > 0) {
			$('.gnb-list a[href="' + htmlName + '"]').parentsUntil('.gnb-list', 'li').addClass('on');
		}
	});
	$('#footer').load('_inc-footer.html #footer > *', function () {
		$(this).after('<div class="layer-popup-area"></div>');
		$('.layer-popup-area').load('_inc-layer.html #layer > *', function () {
			if ($.isFunction(window.setTabmenu)) setTabmenu();
			if ($.isFunction(window.setContact)) setContact();
		});
	});
});