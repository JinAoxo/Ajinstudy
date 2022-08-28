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
			/* [턴플레이 이미지 활성] :: 경도 - 위도 음성 듣기 */
			var target;
			if (EDUTSS.util.hasCls(target, "turn_a")) {
				if (EDUTSS.util.hasCls(turnViewB, "viewed--turn")) {
					imagesHide(turnImageB[0]);
					imagesHide(turnImageB[1]);
					imagesShow(turnImageB[2]);
				}
				target = turnImageA;

			} else if (EDUTSS.util.hasCls(target, "turn_b")) {
				if (EDUTSS.util.hasCls(turnViewA, "viewed--turn")) {
					imagesHide(turnImageA[0]);
					imagesHide(turnImageA[1]);
					imagesShow(turnImageA[2]);
				}
				target = turnImageB;
			}

			if (type === "[turnEnd]") {
				imagesHide(target[0]);
				imagesHide(target[1]);
				imagesShow(target[2]);
			} else {
				if (idx === 0) {
					imagesHide(target[0]);
					imagesHide(target[1]);
					imagesHide(target[2]);
				}

				imagesShow(target[idx]);
			}

			if (EDUTSS.util.hasCls(turnViewA, "viewed--turn") && EDUTSS.util.hasCls(turnViewB, "viewed--turn")) {
				EDUTSS.util.addCls(turnReplayBtn, "btn--show");
			}

			function imagesShow(target) {
				EDUTSS.util.addCls(target, "show");

				if (EDUTSS.util.hasCls(target, "gif")) {
					var imgFile = target.getAttribute("src");
					target.src = imgFile + "?" + EDUTSS.util.getRandomNumber(10000);
				}
			}

			function imagesHide(target) {
				EDUTSS.util.removeCls(target, "show");
			}
		},
		animate: function (obj) {
			/* console.log(obj); */
		},
		quizResult: function (obj) {
			/* console.log(obj); */
		},
		quizReset: function (obj) {
			/* console.log(obj); */
			if (obj.qid === "quizA") {
				// EDUTSS.util.removeCls(EDUTSS.util.getEle(".completed--image"), "show")
			}
		},
		dragDrop: function (obj, start, end) {
			/* console.log(obj, start, end); */
			// EDUTSS.util.addCls(EDUTSS.util.getEle(".done_images_" + end), "show")
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
		scratch: function (obj, percent, stage) {
			/* console.log(obj, percent, stage); */
		},
	};

	/* page - JS */
	/* [턴플레이 이미지 활성] :: 이미지 지정 */
	var turnViewA = EDUTSS.util.getEle(".turn_area.turn_a")[0],
		turnViewB = EDUTSS.util.getEle(".turn_area.turn_b")[0],
		turnImageA = EDUTSS.util.getEle(".turn_a_image img"),
		turnImageB = EDUTSS.util.getEle(".turn_b_image img"),
		turnReplayBtn = EDUTSS.util.getEle("#replayTurnPlay");

	var pageEvent = {
		init: function () {
			/* [턴플레이 이미지 활성] :: 다시 풀기 */
			EDUTSS.util.addEvt(turnReplayBtn, "click", function (e) {
				EDUTSS.util.removeCls(turnViewA, "viewed--turn");
				EDUTSS.util.removeCls(turnViewB, "viewed--turn");
				EDUTSS.util.removeCls(turnImageA, "show");
				EDUTSS.util.removeCls(turnImageB, "show");
				EDUTSS.util.removeCls(e.currentTarget, "btn--show");
				EDUTSS.sound.stopAllSound();
				EDUTSS.sound.playAudio("click");
			});
		},
	};

	pageEvent.init();
});