/*-------------------------------------------------
Menu : Voca
Author : abworks
Create date : 2022.03.
-------------------------------------------------*/

$(function () {
	// 툴팁
	var btnTooltip = $('.btnTooltip');
	var btnCloseTooltip = $('.wrapTooltip .btnClose');
	btnTooltip.off('click').on('click', function () {
		var p = $(this).closest('.wrapTooltip');
		p.toggleClass('active');
		return false;
	});
	btnCloseTooltip.off('click').on('click', function () {
		var p = $(this).closest('.wrapTooltip');
		p.toggleClass('active');
		return false;
	});


});


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
	})
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
	$('.playVoca .front .voca').on('click', function () {
		$('.playInner .playVoca').css('transform', 'rotateY(-180deg)');
		setTimeout(function () {
			$('.playInner .playVoca').css('transform', 'rotateY(0deg)');
		}, 2000);
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