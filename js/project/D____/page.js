/** @format */

document.addEventListener("DOMContentLoaded", function () {
	/* view function complete */
	EDUTSS.complete = {
		tab: function (obj) {
			/* console.log(obj); */
		},
		slide: function (obj) {
			/* console.log(obj); */
		},
		openPopup: function (target, btn) {
			/* console.log(target, btn); */
		},
		closeAllPopup: function () {
			/* console.log('closeAllPopup') */
		},
		showHide: function (target) {
			/* console.log(target); */
		},
		sound: function (target, type) {
			/* console.log(type, target); */
		},
		turnAudio: function (target, type, idx) {
			/* console.log(type, idx, target); */
		},
		animate: function (obj) {
			/* console.log(obj); */
		},
		quizResult: function (obj) {
			/* console.log(obj); */
		},
		quizReset: function (obj) {
			/* console.log(obj); */
		},
		dragDrop: function (obj, start, end) {
			/* console.log(obj, start, end); */
		},
		drawLine: function (obj, start, end) {
			/* console.log(obj, start, end); */
		},
		checkList: function (obj, target) {
			/* console.log(obj, target); */
		},
		zoom: function (obj) {
			/* console.log(obj); */
		},
		mediaPlayer: function (obj) {
			/* console.log(obj); */
		},
		scratch: function (obj, percent) {
			/* console.log(obj, percent); */
		},
	};

	/* page - JS */
	var pageEvent = {
		init: function () {
			// 슬라이드 초기화
			var util = EDUTSS.util;
			var replayBtn = util.getEle("[data-check-replay='previewCheck']")[0];
			var target = util.getEle("#" + replayBtn.dataset.funcReplay);
			var slide = util.getEle("[data-layout-type='slide']", target)[0];

			util.addEvt(replayBtn, "click", function (e) {
				EDUTSS.view.moveSlide(slide, 0);
			});
		},
	};

	pageEvent.init();
});