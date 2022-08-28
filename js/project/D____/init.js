"use strict";

var EDUTSS = EDUTSS || {};

EDUTSS.isSubject = "soc";
EDUTSS.isDTBOOK = true;
EDUTSS.scaleValue = {
	x: 1,
	y: 1,
	zoom: 1
};

// 효과음 루트 정리 방법
EDUTSS.commonEffectAudio = {
	check: "./media/effect/event_check",
	sticker: "./media/effect/event_click",
	empty: "./media/effect/feedback_empty",
	again: "./media/effect/silence",
	hint: "./media/effect/hint",
	correct: "./media/effect/silence",
	incorrect: "./media/effect/silence",
	dragTrue: "./media/effect/silence",
	dragFalse: "./media/effect/silence",
	dragCorrect: "./media/effect/event_drag_true",
	dragIncorrect: "./media/effect/event_drag_true",
	star: "./media/effect/event_star",
	silence: "./media/effect/silence",
	oxCorrect: "./media/effect/event_oxquiz_correct",
	oxIncorrect: "./media/effect/event_oxquiz_incorrect",
	showAnswer: "./media/effect/event_show_answer",
}

// 퀴즈 정오답 버튼 개별 피드백 정리 
EDUTSS.quizFeedBackText = {
	empty: "문제를 다 풀고 확인하세요.",
	again: "다시 한번 생각해 볼까요?",
	hint: "힌트를 참고하여 입력하세요.",
	correct: "우아! 참 잘했어요.",
	incorrect: "아쉽지만, 다음 기회에...",
}

// 동영상 전체화면 자막 크기
EDUTSS.videoCaptionHeight = 80;

// 사회 이번차시, 다음차시 버튼
EDUTSS.scoThisGoalBtn = document.querySelectorAll(".toast_area.this_goal")[0];
EDUTSS.scoLastGoalBtn = document.querySelectorAll(".toast_area.last_goal")[0];

document.addEventListener("DOMContentLoaded", function () {
	EDUTSS.isDTBOOK && parent.ZOOMVALUE && setTimeout(function () {
		EDUTSS.scaleValue.zoom = parent.ZOOMVALUE;
	}, 1500);

	EDUTSS.util.detectDevice();
	EDUTSS.ui.pageInfo();
	EDUTSS.ui.initInpKeyEvent();
	EDUTSS.ui.initRemoveIndivText();
	EDUTSS.quiz.initQuizType({
		commonFeedback: false,
		marking: false,
		totalChance: 1,
		controlShowHide: true,
		emptyFeedback: true
	});
	EDUTSS.view.initViewType();
	EDUTSS.sound.initAudio();
	EDUTSS.player.initMediaPlayer({
		cover: true,
		close: false,
		preLoad: true,
		volume: false,
		defaultVolume: 0.5,
		defaultVolumeWidth: 40,
		hiddenControls: false
	});
	setTimeout(function () {
		EDUTSS.animate.initAnimate();
	}, 1000);

	// 드래그 진동
	if (!EDUTSS.isMobile || EDUTSS.isDevice === "ios") {
		EDUTSS.isVibrateInterval = false;
	} else {
		EDUTSS.isVibrateInterval = true;
	}

	// ios 드래그 효과음 제거
	if (EDUTSS.isDevice === "ios") EDUTSS.iosDragSoundDisabled = true;
	if (EDUTSS.isDevice === "safari") EDUTSS.iosDragSoundDisabled = true;

	window.addEventListener("resize", function () {
		EDUTSS.isDTBOOK && parent.ZOOMVALUE && (EDUTSS.scaleValue.zoom = parent.ZOOMVALUE);
	});

	// 분권 페이지 이동 비활성
	document.querySelectorAll("[data-move-page]").forEach(function (e) {
		e.classList.add("disabled");
		e.addEventListener("mousedown", function (e) {
			dtDevAlert(e.currentTarget.dataset.movePage + "쪽으로 이동(통권에서 확인 가능)")
		});
	});
});

// 뷰어 임시 얼랏창
var dtDevTempAlertSetTime;

function dtDevAlert(text) {
	var altEle = EDUTSS.util.getEle(".dt--alt--msg")[0];

	if (!altEle) {
		altEle = EDUTSS.util.createEle("div", {
			class: "dt--alt--msg"
		}, EDUTSS.util.getEle("#wrap"))
	}

	altEle.innerText = text;
	clearTimeout(dtDevTempAlertSetTime);
	dtDevTempAlertSetTime = setTimeout(function () {
		altEle.remove()
	}, 1500);
}