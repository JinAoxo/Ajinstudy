// m project issue
// Review
// 1. 해당 프로젝트의 경우 가장 큰 이슈는 디바이스별 화면 구현에 있었다. (겔탭 10.1, a6, s6 에 관해서)
//////1-1. css 에서의 문제점이 많았는데..
//////// - -webkit-의 중요성 -> transfrom, transition, animation keyframes, disply:flex, display:-webkit-box(flex-box), -webkit-flex, -webkit-scrollbar 등 호환성의 문제로 필요
//////// - rem과 em의 중요성 -> rem을 쓰려고 노력하자! / 호환성 문제로 line-height가 맞지 않는 경우에 대해서 px를 사용하지 않고 em과 rem을 사용하면 디바이스별 화면 구현에 도움이 된다.
//////// - 기본적으로 letter-spacing과 line-height의 경우 default 값이 프로젝트별로 정해져 있어야 한다. (** 중요 : 없을 경우 pm, pl에게 여쭤봐야 함) / default 값의 기본 : letter-spacing: -0.02rem? em? / line-height: 1.2rem? em? 으로 작성되는게 기본이다.

// 2. 해당 프로젝트의 경우 animation 구현이 생각보다 많이 있었다.
// 3. 달력 구현, intro-home에서의 카트 움직임이 필요하고, js 구현에 대한 여러가지 이슈가 있었음.
// 4. span을 많이 쓰게 되는 이유 : 개발이 들어가는 부분 : 개발에서 수정되어야 하는 부분들이 있다.
// 5. table로 작업 하는 경우 : 디바이스별 이슈가 많은 편이고 깨질 경우가 많기 때문에 너비,높이 값에 대해서 주의가 필요하다.
// 6. 스크롤(scrollbar)의 경우 : 스크롤이 생성되는 경우 이슈가 많은 편이다. 해당 내부에 table이 들어가는 경우 이슈가 더 많이 있는 편이기 때문에 꼭 'div(wrap)>content(info) => x'이 아닌 'div(wrap)>div(scroll)>content(info)'으로 마크업 해주는것이 좋다.


/** tooltip 인터렉션 :  주석 처리에 관해서 공부 필요
 * @param {string} btnOpen
 * @param {string} btnClose
 * @returns
 */

function tooltip(btnOpen, btnClose) {
	$(function () {
		var btnOpen = $('.btnOpen');
		var btnClose = $('.btnClose');

		btnOpen.off('click').on('click', function () {
			var p = $(this).closest('.wrap');
			p.toggleClass('active');
			return false;
		});

		btnClose.off('click').on('click', function () {
			var p = $(this).closest('.wrap');
			p.toggleClass('active');
			return false;
		});
	});
	return btnOpen + btnClose
}

tooltip('a', 'b');

//===============================================================

setTimeout(function () {
	$('.form-datepicker').each(function () {
		setDatepicker($(this));
	}).on('click', function () {
		openCalendar($(this));
	});
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
	if ($(obj).hasClass('full')) {
		$(obj).parent('.datepicker').addClass('full');
	}
	$(obj).after('<button type="button" class="btn btn-datepicker"><i class="ico ico-datepicker-primary"></i><span class="sr-only">달력</span></button>');
}

// 홈 - 학습 시작
$(function () {
	$('.levelContainer').each(function () {
		var levIndex = $(this).find('.levOn').index();

		if (levIndex >= 8) {
			$('.vocaHome').scrollLeft(1300);
		} else if (levIndex >= 6) {
			$('.vocaHome').scrollLeft(710);
		} else if (levIndex >= 5) {
			$('.vocaHome').scrollLeft(450);
		} else if (levIndex >= 1) {
			$('.vocaHome').scrollLeft(0);
		};
		$('.levOn').prevAll('.levelContainer li').addClass('end');
	});

	// 홈 dumi 애니메이션
	var levIndex = $('.levOn').index();
	if (levIndex == 0) {
		$('.dumi1_0').show();
	} else if (levIndex == 1) {
		$('.dumi1_1').show();
	} else if (levIndex == 2) {
		$('.dumi1_2').show();
	} else if (levIndex == 3) {
		$('.dumi1_3').show();
	} else if (levIndex == 4) {
		$('.dumi1_4').show();
	} else if (levIndex == 5) {
		$('.dumi1_5').show();
	} else if (levIndex == 6) {
		$('.dumi2_1').show();
	} else if (levIndex == 7) {
		$('.dumi2_2').show();
	} else if (levIndex == 8) {
		$('.dumi2_3').show();
	} else if (levIndex == 9) {
		$('.dumi3_1').show();
	}
});

//일일학습 어휘수 변경(POP)
$(function () {
	$('.draggable').draggable({
		helper: 'clone',
	})
	// .on('dragstart',function(){
	// 	$(this).addClass('on') //움직일떄 on클래스 추가
	// }).on('dragstop',function(){
	// 	$(this).children().removeClass('on') //움직일떄 on클래스 추가
	// })
	$('.dropArea').droppable({
		drop: function (evt, ui) {
			var btn = ui.draggable.children('a').text();
			$(this).children('input').addClass('on').attr('value', btn);
			console.log(btn);
		}
	})
});

//intro slick
$(function () {
	$('.introScroll').slick({
		slide: 'div',
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		arrows: true,
		dots: true,
		prevArrow: $('.btnPrev'),
		nextArrow: $('.btnNext'),
		focusOnChange: true,
		accessibility: false,
	}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
		if (currentSlide == 1) {
			$('.wrapBubble').css('display', 'block');
		} else {
			$('.wrapBubble').css('display', 'none');
		};
	});
});

//my_library selectbox
$(function () {
	$(".selectbg .label").click(function () {
		var select = $(this);

		//드롭다운 열기
		select.addClass("active").next('.selectRound').slideDown(100).addClass("active");

		//다른영역 클릭 시 닫기
		$(document).mouseup(function (e) {
			var seting = $(".selectRound");
			if (seting.has(e.target).length === 0) {
				seting.removeClass("active").slideUp(100);
				select.removeClass("active");
			}
		});

		$(".selectRound .optionItem").click(function () {
			var option = $(this).text();

			//클릭 시 드롭다운 닫기
			$(".selectRound .optionItem").removeClass('selected');
			$(".selectRound").removeClass("active").slideUp(100);
			select.removeClass("active");
			$(this).addClass('selected');

			//select에  text 넣기
			select.text(option);
		});
	});

	$('.libraryArea tr .chk .wordChk').click(function () {
		var chkItem = $(this),
			chkItemList = $(this).parents('.lbList').index();
		console.log(chkItem)
		if (chkItem.is(':checked') == true) {
			chkItem.parents('.lbList').addClass('on');
		} else {
			chkItem.parents('.lbList').removeClass('on');
		}
	});
	$('.libraryArea tr .chk .wordChk.disabled').click(function () {
		var chkItem = $(this);
		chkItem.parents('.lbList').removeClass('on');
	});
});

//my_status
$(function () {
	setInterval(function () {
		$('.myStatus').each(function () {
			var tg = $('.yearBtn').offset();
			$('#yearCalender').css({
				left: tg.left,
				top: tg.top + 40
			})
		})
	}, 1000)

	$(".yearBtn").on("click", function (e) {
		e.preventDefault();
		var target = $(this).attr("href");

		$(target).addClass("show");
		$('.yearBtn').addClass("on");
	});

	// 외부영역 클릭 시 팝업 닫기
	$(document).mouseup(function (e) {
		e.preventDefault();
		var yearCalender = $(".yearCalender");
		if (yearCalender.has(e.target).length === 0) {
			yearCalender.removeClass("show");
			$('.yearBtn').removeClass("on");
		}
	});

	//달 선택시 팝업 닫기
	$(document).on("click", ".month", function (e) {
		var target = $(this).attr("href");
		$(target).removeClass("show");
		$('.yearBtn').removeClass("on");
	});
});


//my_library : A-Z btnevent
$(function () {
	$('.selectBtn').on("click", function () {
		$(this).toggleClass("active");
	});
});

$(function () {
	// Speed Test
	$('.answer>li').on('click', function (e) {
		e.preventDefault();
		if ($('.answer>li').hasClass('active')) {
			$('.answer>li').removeClass('active');
			$(this).addClass('active');
		} else {
			$('.answer>li').removeClass('active');
			$(this).addClass('active');
		};
	});

	// tablet 테스트 후 삭제 예정
	$('.answer>li:eq(0)').on('click', function (e) {
		e.preventDefault();
		if ($('.popWrap.bad').hasClass('hide')) {
			$('.popWrap.bad').removeClass('hide');
			$('.popWrap.bad').addClass('show');
		} else {
			$('.popWrap.bad').removeClass('show');
			$('.popWrap.bad').addClass('hide');
		};
	});
	$('.answer>li:eq(1)').on('click', function (e) {
		e.preventDefault();
		if ($('.popWrap.good').hasClass('show')) {
			$('.popWrap.good').removeClass('show');
			$('.popWrap.good').addClass('hide');
		} else {
			$('.popWrap.good').removeClass('hide');
			$('.popWrap.good').addClass('show');
		};
	});

	// Review play
	$('.cardContainer label').on('click', function () {
		//라벨 클릭시 폼 네임 가져오기
		var check = $(this).prev().hasClass('on'); //클래스체크
		var cardNm = $(this).prev().attr('name'); //폼 네임
		if (!check && CSS != 'success') {
			$(this).prev().addClass('on');
			//$(this).parent().addClass("checked");	
		} else {
			console.log('back');
		}
		var BackLength = $('.on').length;

		if (BackLength == 2) {
			var FirstB = $('.on').eq(0).attr('name');
			var SecondB = $('.on').eq(1).attr('name');

			if (FirstB != SecondB) {
				setTimeout(function () {
					$('.cardContainer .formItem').removeClass('on');
				}, 500);
			} else {
				$('.cardContainer .on').attr('class', 'formItem success');
			}
			BackLength = 0;
		}
	})
});


//today_play slick
// $(function() {
// 	$('.playScroll').slick({
// 		slide: 'div',
// 		infinite:false,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		autoplay:false,
// 		arrows:true,
// 		dots:false,
// 		prevArrow:$('.btnPrev'),
// 		nextArrow:$('.btnNext'),
// 		focusOnChange: true,
// 		accessibility: false,
// 	});
// });

//today_play : btnSound action
$(function () {
	$('.playInner .btnSound').on('click', function () {
		$(this).toggleClass("on");
	});
});
$(function () {
	$('.front .btnSound').on('click', function () {
		$('.back .btnSound').toggleClass("on");
	});
	$('.back .btnSound').on('click', function () {
		$('.front .btnSound').toggleClass("on");
	});
});

//today_play : flip
$(function () {
	$('.playVoca .front .voca').on('click', function (e) {
		$('.playInner .playVoca').addClass('on');
		setTimeout(function () {
			jQuery('.playInner .playVoca').removeClass('on');
		}, 5000);
	});
});

//타이머 - circle
function clearCountdown(interval) {
	clearTimeout(interval);
}

function countdown(countdownBegin) {
	//var countdownBegin = 30;
	var count = setInterval(function () {
		if (countdownBegin <= 0) {
			$('.wrapTimer .timer').html('0' + '초');
			$('.wrapTimer .timeBubble').css('display', 'block');
			clearCountdown(count);
		} else {
			--countdownBegin;
			$('.wrapTimer .timer').html(countdownBegin + '초');
		}
	}, 1000);
}

// today_play 팝업
$(function () {
	// 팝업
	var btnTooltip = $('.btnPopup');
	btnTooltip.on('click', function () {
		var p = $(this).next('.wrapPopup');
		p.addClass('active');
		setTimeout(function () {
			p.removeClass('active');
		}, 2000);
		return false;
	});

	// today_play 컨텐츠 순차적으로 노출
	var playOn = 1000;
	$('.playVoca').animate({
		opacity: '1'
	}, playOn, function () {
		$('.playImg').animate({
			opacity: '1'
		}, playOn, function () {
			$('.playExample').animate({
				opacity: '1'
			}, playOn);
		});
	});
});

// level_choice 학습 레벨에 따른 텍스트 변경 
$(function () {
	if ($('.levType').hasClass('levType1')) {
		$('.levText').html('이예요');
	} else if ($('.levType').hasClass('levType2')) {
		$('.levText').html('예요');
	};
});


//mygallery slick
$(function () {
	$('.galleryInner').slick({
		slide: 'div',
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		arrows: true,
		dots: true,
		prevArrow: $('.btnPrev'),
		nextArrow: $('.btnNext'),
		focusOnChange: true,
		accessibility: false,
		centerMode: true,
		focusOnSelect: true,
	})
});

//curatorBtn display
$(function () {
	if ($('.imgInner').hasClass('on')) {
		var curatorBtn = $('.imgInner.on .curatorBtn')
		$(curatorBtn).css('display', 'inline-block');
	};
});

// btnPictureInfo
$(function () {
	if ($('.btnPictureInfo').on('click', function () {
			var btnClosed = $('.btnPictureInfo').closest('.popFooter').next('.btnClosed');
			var popFooter = $('.btnPictureInfo').closest('.popFooter');
			$(popFooter).css('display', 'none');
			btnClosed.css('display', 'none');
		}));
});

$(function () {
	var btnpopInfo = $('.popInfo .btnClosed')
	if (btnpopInfo.on('click', function () {
			var btnClosed = $('.btnPictureInfo').closest('.popFooter').next('.btnClosed');
			var popFooter = $('.btnPictureInfo').closest('.popFooter');
			$(popFooter).css('display', 'inline-block');
			btnClosed.css('display', 'inline-block');
		}));
});

//mygallery popup
$(function () {
	$('.mygalleryPopup').slick({
		slide: 'div',
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		arrows: false,
		dots: true,
		focusOnChange: true,
		accessibility: false,
		variableWidth: true,
	});
});

//puzzle_progess
$(function () {
	var item = $('.puzzleItem');
	item.on('click', function () {
		$(this).addClass('on')
	})

	//학습중
	var layerProgess = $('.layerProgess');
	var puzzleItem = $('.puzzleItem.active');
	var title = $('.puzzleItem.active .puzzleTitle').offset();

	// if (puzzleItem.hasClass('active')) {
	// 	$(layerProgess).css({
	// 		left: title.left + 46,
	// 		top: title.top - 15
	// 	});
	// }else{
	// 	$(layerProgess).css('display', 'none');
	// }

	puzzleItem.on('click', function () {
		if (puzzleItem.hasClass('on')) {
			// puzzleItem.removeClass('active');
			$(layerProgess).css('display', 'none');
		}
	})
});


//intro slick
$(function () {
	$('.introScroll').slick({
		slide: 'div',
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		arrows: true,
		dots: true,
		prevArrow: $('.btnPrev'),
		nextArrow: $('.btnNext'),
		focusOnChange: true,
		accessibility: false,
		// }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
		// 	if (currentSlide == 1) {
		// 		$('.wrapBubble').css('display','block');
		// 	}else{
		// 		$('.wrapBubble').css('display','none');
		// 	};
	});
});

// choice_level 학습 레벨에 따른 텍스트 변경 
$(function () {
	if ($('.levType').hasClass('levTypeA')) {
		$('.levText').html('예요');
	} else if ($('.levType').hasClass('levTypeB')) {
		$('.levText').html('이예요');
	};
});