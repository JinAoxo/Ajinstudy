// 공통 UI 제어 스크립트

//
// 레이아웃
//

// Skip Nav
$(document).on('click', '#skip a', function (e) {
	var tg = $(this).attr('href');
	$(tg).attr('tabindex', '0').focus();
	e.preventDefault();
});

$(document).ready(function () {
	// 스크롤 애니메이션
	if ($('.wow').length > 0) {
		var WowOffset = $(window).height() / 3;
		if (matchMedia("screen and (max-width: 1024px)").matches) {
			WowOffset = $(window).height() / 4;
		}
		new WOW({
			offset: WowOffset,
		}).init();
	}

	// 초기 세팅
	setContact();
	gnbControl();
	allmenuSetting();
	setTabmenu();
});

// GNB 컨트롤
function gnbControl() {
	$('#gnb').find('a').first().addClass('first-link');
	$('#gnb').find('a').last().addClass('last-link');
	$(document).on('mouseenter focus', '.gnb-list > li > a', function () {
		$(this).parent('li').addClass('hover').siblings('li').removeClass('hover');
	}).on('mouseleave', '#header', function () {
		$('.gnb-list > li').removeClass('hover');
	}).on('keydown', '.gnb-list .first-link', function (e) {
		if (e.keyCode == 9 && e.shiftKey) {
			$('.gnb-list > li').removeClass('hover');
		}
	}).on('keydown', '.gnb-list .last-link', function (e) {
		if (e.keyCode == 9 && !e.shiftKey) {
			$('.gnb-list > li').removeClass('hover');
		}
	});
};

// 모바일 전체메뉴
$(document).on('click', '.btn-allmenu-open', function (e) {
	e.preventDefault();
	$('html').toggleClass('allmenu-open');
}).on('click', '.btn-allmenu-close', function () {
	$('html').removeClass('allmenu-open');
});

// 모바일 전체메뉴 세팅
function allmenuSetting() {
	$('.gnb-list ul').each(function () {
		$(this).parent('li').addClass('collapse');
	});
	$('.gnb-list .on').parentsUntil('.gnb-list', 'li').addClass('on');
}
$(document).on('click', '.gnb-list .collapse > a', function (e) {
	if (matchMedia("screen and (max-width: 1024px)").matches) {
		e.preventDefault();
		$(this).next('ul').slideToggle('fast').parent('li').toggleClass('on')
			.siblings('li').removeClass('on').children('ul').slideUp('fast');
	}
});

// 맨위로
$(document).on('click', '#btn-totop', function (e) {
	e.preventDefault();
	$('body, html').animate({
		scrollTop: 0
	}, 300);
	return false;
});

$(window).on('load scroll', function () {
	if ($(this).scrollTop() > 50) {
		$('.totop').addClass('show');
	} else {
		$('.totop').removeClass('show');
	}
});

// 텍스트 복사
function copyToClipboard(element) {
	var $temp = $('<textarea style="position: absolute; z-index: -1;">');
	$("body").append($temp);
	$temp.val($(element).text().replace(/	/g, '').replace(/(^\s*)|(\s*$)/gi, '')).select();
	document.execCommand("copy");
	$temp.remove();
}

// 포트폴리오 상세 배경 클릭시 닫기
$(document).on('mousedown', function (e) {
	var $obj = $('.modal-portfolio.show .portfolio-container');
	if ($obj.length > 0) {
		var objPos = $obj.offset();
		objPos.right = (objPos.left + $obj.width());
		objPos.bottom = (objPos.top + $obj.height());

		if ((e.pageX < objPos.left || e.pageX > objPos.right || e.pageY < objPos.top || e.pageY > objPos.bottom) && !$(e.target).closest('.portfolio-nav').length) {
			var target = $(e.target).closest('.modal-popup').attr('id');
			closeModal('#' + target, modalOpener);
		}
	}
});

//
// 컴포넌트
//

// 모달 레이어
$(function () {
	$('.modal-popup.show').each(function () {
		openModal($(this), null);
	});
});

var modalOpener = null;
$(document).on('click', 'a.js-layer-open', function (e) {
	var tg = $(this).attr('href');
	// openModal(tg, $(this));
	e.preventDefault();
}).on('click', '.js-layer-close, .modal-popup .btn-close-popup, .modal-popup .js-layer-close, .modal-popup .dimed', function () {
	var target = $(this).closest('.modal-popup').attr('id');
	closeModal('#' + target, modalOpener);
}).on('keydown', '.modal-popup .popup-inner', function (e) {
	if ($('.popup-inner').is(e.target) && e.keyCode == 9 && e.shiftKey) { // shift + tab
		e.preventDefault();
		$(this).find('.btn-close-popup').focus();
	}
}).on('keydown', '.modal-popup .btn-close-popup', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) { // tab
		e.preventDefault();
		$(this).closest('.popup-inner').attr('tabindex', '0').focus();
		$(this).unbind('keydown').keydown();
	}
});

function openModal(_target, _opener) {
	if ($(_target).length > 0) {
		modalOpener = _opener;
		$(_target).appendTo('body');
		bodyScroll(true, $('body').width());
		$('body').addClass('modal-open');
		setTimeout(function () {
			$(_target).addClass('show').removeClass('hide');
		}, 100);
		setTimeout(function () {
			$('.popup-inner', _target).attr('tabindex', '0').focus();
			$(_target).scrollTop(0);
		}, 300);
	}
}

function closeModal(_target, _opener) {
	var tg = $(_target);
	if (tg.hasClass('show')) {
		if ($('.modal-popup.show').length == 1) {
			bodyScroll(false);
		}
		tg.addClass('hide').removeClass('show');
		var modalOpener = $(_opener);
		if (modalOpener.length) {
			modalOpener.focus();
		}
		removeDatepicker();
	} else {
		alert('닫을 레이어를 올바로 지정해 주세요. \n closeModal(\'#레이어아이디\')')
	}
}

var modalScrollTop;

function bodyScroll(_status, _orgWidth) {
	var $fixedModal = $('body');

	if (_status) {
		// modalScrollTop = $(window).scrollTop();
		$fixedModal.addClass('modal-open');
		// $fixedModal.css({
		// 	'top': -1 * modalScrollTop,
		// });
		// console.log(_orgWidth);

		var scrollbarWidth = $('body').width() - _orgWidth;
		// console.log(scrollbarWidth);
		if (scrollbarWidth > 0) {
			$fixedModal.css({
				'margin-right': scrollbarWidth,
			});
		}
	} else {
		$fixedModal.removeClass('modal-open');
		$fixedModal.css({
			'margin-right': '',
			// 'top': '',
		});
		$(window).scrollTop(modalScrollTop);
	}
}

// 윈도우 팝업
var popOpenBtn = null;

function openWindow(_obj, popName, w, h, _opener) {
	var popW = 900;
	var popH = 600;
	var myUrl = _obj;

	if (typeof _obj !== 'string') {
		if ($(_obj).prop('tagName') === 'A') {
			popOpenBtn = $(_obj);
			myUrl = $(_obj).attr('href');
		} else if (_opener) {
			popOpenBtn = $(_opener);
		}
	}

	if (w) popW = w;
	if (h) popH = h;
	var left = window.screenX + (window.outerWidth - popW) / 2;
	var top = window.screenY + (window.outerHeight - popH) / 2;
	window.open(myUrl, popName, 'width=' + popW + ', height=' + popH + ', left=' + left + ', top=' + top + ', scrollbars=yes');
}

function closeWindow() {
	if (window.opener != null) {
		window.opener.openerFocus();
	}
	window.close();
}

function openerFocus() {
	if (popOpenBtn != null) {
		$(popOpenBtn).focus();
		popOpenBtn = null;
	}
}

// 탭메뉴
function setTabmenu() {
	$('.tab-list .on a').each(function () {
		var tg = $(this).attr('href');
		if (tg !== '#' && tg !== '#;' && tg.charAt(0) === '#') {
			$(tg + '.tab-content').css('display', 'block');
		}
	});
}

$(document).on('click', '.tab-list a', function (e) {
	var tg = $(this).attr('href');
	$(this).parent('li').addClass('on').siblings('li').removeClass('on');

	if (tg === '#' || tg === '' || tg === '#;') {
		e.preventDefault();
	} else if (tg.charAt(0) === '#') {
		if ($(tg).hasClass('tab-content')) {
			$(tg).show().siblings('.tab-content').hide();
			e.preventDefault();
			removeDatepicker();
		}
	}
});

// 데이트피커 적용
setTimeout(function () {
	$('.form-datepicker').each(function () {
		setDatepicker($(this));
	}).on('click', function () {
		openCalendar($(this));
	});;
}, 200);

function removeDatepicker() {
	if ($('#inseq-datepicker').length > 0) {
		$('#inseq-datepicker').remove();
	}
}

$(document).on('click', '.btn-datepicker', function (e) {
	e.preventDefault();
	openCalendar($(this).prev());
});

function setDatepicker(obj) {
	$(obj).wrap('<span class="datepicker"></span>');
	$(obj).after('<button type="button" class="btn btn-datepicker"><i class="ico ico-xs-calendar"></i><span class="sr-only">달력</span></button>');
}

// 파일첨부 디자인
$(document).on('change', '.form-file', function () {
	if (window.FileReader) {
		var filename = $(this)[0].files[0].name;
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
	}
	$(this).next('.file-name').html('<span>' + filename + '</span>');
});

$('select.form-control').each(function () {
	if ($(this).val() != '') {
		$(this).addClass('text-default');
	} else {
		$(this).removeClass('text-default');
	}
});

// 견적문의
$(function () {
	if (window.location.hash == '#layer-contact') {
		setTimeout(openModal('#layer-contact'), 100);
	}
});

$(document).on('change', 'select.form-control', function () {
	if ($(this).val() != '') {
		$(this).addClass('text-default');
	} else {
		$(this).removeClass('text-default');
	}
});

function setContact() {
	var type = $('input[data-contact-type]:checked').data('contact-type');
	$('[data-contact-show]').each(function () {
		if ($(this).data('contact-show').indexOf(type) != -1) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
	$('input[data-contact-type]').change(function () {
		type = $('input[data-contact-type]:checked').data('contact-type');
		removeDatepicker();
		$('[data-contact-show]').each(function () {
			if ($(this).data('contact-show').indexOf(type) != -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
			$("[data-contact-type='project']").val(1);
			$("[data-contact-type='cms']").val(2);
			$("[data-contact-type='uix']").val(3);
			$("input[name=indvdlinfo_colct_at]").val("Y");
			$("input[id=input-skill1]").val("기획");
			$("input[id=input-skill2]").val("디자인");
			$("input[id=input-skill3]").val("UI개발(퍼블리싱)");
		});
	});
}

// 로딩바 애니메이션
$(document).ready(function () {
	if ($('.loadingbar').length > 0) {
		// PMS URL 체크
		var previewDomain = 'pms.inseq.co.kr';
		var rootPath = '/resources/ko';
		if (window.location.hostname.split('.')[0] == '192' || window.location.hostname == previewDomain && window.location.pathname.split('/')[4].length > 0) {
			rootPath = '..';
		}

		var spinner = lottie.loadAnimation({
			container: document.querySelector('#loadingbar .spinner'),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: rootPath + '/images/spinner.json',
		});
		spinner.play();

		var spinner2 = lottie.loadAnimation({
			container: document.querySelector('.portfolio-container .spinner'),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: rootPath + '/images/spinner.json',
		});
		spinner2.play();
		
		var spinner3 = lottie.loadAnimation({
		      container: document.querySelector('.story-container .spinner'),
		      renderer: 'svg',
		      loop: true,
		      autoplay: true,
		      path: rootPath + '/images/spinner.json',
		    });
		    spinner3.play();
	}
});