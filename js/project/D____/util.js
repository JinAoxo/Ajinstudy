var EDUTSS = EDUTSS || {};

EDUTSS.util = {
	isTouch: "ontouchstart" in document.documentElement,
	detectDevice: function () {
		EDUTSS.isDevice = EDUTSS.util.getDevice();
		EDUTSS.isMobile = EDUTSS.util.isMobile();
		if (document.body) {
			EDUTSS.isDevice && (document.body.dataset.browserType = "is--" + EDUTSS.isDevice);
			EDUTSS.isMobile ? document.body.dataset.deviceType = "is--mobile" : document.body.dataset.deviceType = "is--desktop";
		}
		EDUTSS.isDevMsg && console.log("#D: [isTouch] " + EDUTSS.util.isTouch + ", [isDevice] " + EDUTSS.isDevice + ", [isMobile] " + EDUTSS.isMobile + ", [isMobileType] " + EDUTSS.isMobileType);
	},
	isMobile: function () {
		if (EDUTSS.isMobile !== undefined) return EDUTSS.isMobile;
		let value = false,
			filterOs = "win16|win32|win64|mac|macintel",
			mobileArray = ["iPhone", "iPod", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson", "webOS", "IEMobile", "Opera Mini"];
		if (navigator.platform) {
			if (0 > filterOs.indexOf(navigator.platform.toLowerCase())) {
				value = true;
				for (var mobile in mobileArray) {
					if (navigator.userAgent.match(mobileArray[mobile]) !== null) {
						EDUTSS.isMobileType = mobileArray[mobile];
						break;
					}
				}
			} else {
				EDUTSS.isMobileType = false;
			}
		}
		value ? EDUTSS.isMobile = true : EDUTSS.isMobile = false;
		return value;
	},
	getDevice: function () {
		if (EDUTSS.isDevice !== undefined) return EDUTSS.isDevice;
		const agent = navigator.userAgent.toLowerCase();
		let browser;
		if (/(?=.*chrome)^(?!.*edg)^(?!.*android)/.test(agent)) {
			browser = "chrome";
		} else if (/firefox/.test(agent)) {
			browser = "firefox";
		} else if (/edg/.test(agent)) {
			browser = "edge";
		} else if (/trident/.test(agent)) {
			browser = "ie";
		} else if (/android/.test(agent)) {
			browser = "android";
		} else if (/iphone|ipad|ipod/.test(agent)) {
			browser = "ios";
		} else if (/safari/.test(agent)) {
			browser = "safari";
		} else {
			browser = "etc";
		}
		const iPad = navigator.userAgent.match(/(iPad)/) || navigator.userAgent.platform === "MacIntel" && navigator.userAgent.maxTouchPoints > 1;
		iPad && (browser = "ios");
		return browser;
	},
	getEvt: function (type) {
		let eventType = "";
		const isTouch = EDUTSS.util.isTouch;
		if (type === "down") {
			eventType = isTouch ? "touchstart" : "mousedown";
		} else if (type === "up") {
			eventType = isTouch ? "touchend" : "mouseup";
		} else if (type === "move") {
			eventType = isTouch ? "touchmove" : "mousemove";
		} else if (type === "enter") {
			eventType = isTouch ? "touchstart" : "mouseenter";
		} else if (type === "leave") {
			eventType = isTouch ? "touchcancel" : "mouseleave";
		} else {
			eventType = type;
		}
		return eventType;
	},
	getEle: function (selector, target) {
		let elem;
		if (selector.includes("#")) {
			elem = document.getElementById(selector.slice(1));
		} else {
			const targetEle = target || document;
			elem = targetEle.querySelectorAll(selector);
		}
		return elem;
	},
	createEle: function (tag, props, target, prepend) {
		const elem = document.createElement(tag);
		for (var key in props) {
			if (props[key]) {
				elem.setAttribute(key, props[key]);
			}
		}
		if (prepend) {
			target && target.prepend(elem);
		} else {
			target && target.append(elem);
		}
		return elem;
	},
	addCls: function (elem, classNames) {
		if (elem) {
			const elemLen = elem.length,
				classArr = classNames.split(" "),
				classLen = classArr.length;
			for (let i = 0; i < classLen; i++) {
				const className = classArr[i];
				if (elemLen) {
					for (let j = 0; j < elemLen; j++) {
						elem[j].classList.add(className);
					}
				} else if (!NodeList.prototype.isPrototypeOf(elem)) {
					elem.classList.add(className);
					if (classLen <= 1) {
						return elem;
					}
				}
			}
		}
	},
	removeCls: function (elem, classNames) {
		if (elem) {
			const elemLen = elem.length,
				classArr = classNames.split(" "),
				classLen = classArr.length;
			for (let i = 0; i < classLen; i++) {
				const className = classArr[i];
				if (elemLen) {
					for (let j = 0; j < elemLen; j++) {
						elem[j].classList.remove(className);
					}
				} else if (!NodeList.prototype.isPrototypeOf(elem)) {
					elem.classList.remove(className);
					if (classLen <= 1) {
						return elem;
					}
				}
			}
		}
	},
	hasCls: function (elem, className) {
		if (elem) {
			const isContain = elem.classList.contains(className);
			return isContain;
		}
	},
	addEvt: function (target, type, handler, options) {
		const eType = EDUTSS.util.getEvt(type);
		if (target) {
			if (target.length) {
				const targetLen = target.length;
				for (let i = 0; i < targetLen; i++) {
					target[i].addEventListener(eType, handler, options);
				}
			} else if (!(target instanceof NodeList)) {
				target.addEventListener(eType, handler, options);
			}
		}
	},
	removeEvt: function (target, type, handler, options) {
		const eType = EDUTSS.util.getEvt(type);
		if (target) {
			if (target.length) {
				const targetLen = target.length;
				for (let i = 0; i < targetLen; i++) {
					target[i].removeEventListener(eType, handler, options);
				}
			} else {
				target.removeEventListener(eType, handler, options);
			}
		}
	},
	getIdx: function (elem, range) {
		if (!elem) {
			return -1;
		}
		if (!!range) return [].indexOf.call(elem, range);
		return [].indexOf.call(elem.parentNode.children, elem);
	},
	getRandomNumber: function (n) {
		const t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
		return Math.floor(Math.random() * n) + t;
	},
	getText: function (e) {
		let reg = /[\{\}\[\]\?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
		let text = e.replace(reg, "");
		return text;
	},
	getFileName: function () {
		let fileName = window.location.href.split("/").slice(-3);
		return fileName;
	},
	getFileNum: function () {
		let fileName = this.getFileName().slice(-1)[0].split("?")[0].replace(/[^0-9]/g, "");
		return fileName;
	},
	getURL: function () {
		let params = {};
		window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
			params[key] = value;
		});
		return params;
	},
	isNum: function (num) {
		return num < 10 ? "0" + num : num.toString();
	},
	isInViewport: function (elem) {
		var distance = elem.getBoundingClientRect();
		return distance.top >= 0 && distance.left >= 0 && distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) && distance.right <= (window.innerWidth || document.documentElement.clientWidth);
	},
	isInDisplay: function (elem) {
		let isDisplay = elem.getBoundingClientRect(),
			value = true;
		if (isDisplay.width === 0 && isDisplay.height === 0) value = false;
		return value;
	},
	setStyle: function (elem, props) {
		for (var i in props) {
			elem.style[i] = props[i];
		}
	},
	getStyle: function (elem) {
		return window.getComputedStyle(elem);
	},
	createAudio: function (e) {
		const target = new Audio();
		return target.src = e, target.load(), target;
	},
	loadJSON: function (e, t) {
		var i = new XMLHttpRequest();
		i.overrideMimeType("application/json"), i.open("GET", e, !0), i.onreadystatechange = function () {
			4 === i.readyState && "200" == i.status && t(i.responseText);
		}, i.send(null);
	},
	copyPaste: function (elem, target) {
		elem.innerHTML = "";
		if (target) {
			elem.innerHTML = target.innerHTML;
			let removeElem = this.getEle("[data-duplication-type]", elem);
			for (let i = 0; i < removeElem.length; i++) {
				if (removeElem[i].dataset.duplicationType === "false") removeElem[i].remove();
			}
		}
	},
	getCursorPos: function (e) {
		let x = 0,
			y = 0;
		e = e || window.event;
		x = e.pageX;
		y = e.pageY;
		x = (x - window.pageXOffset) / EDUTSS.scaleValue.zoom;
		y = (y - window.pageYOffset) / EDUTSS.scaleValue.zoom;
		return {
			x: x,
			y: y
		};
	},
	createMarkingGif: function (target) {
		if (this.getEle("oxquiz--answer--marking", target)[0]) {
			return;
		}
		let markingGifAnswer = this.createEle("span", {
			class: "oxquiz--answer--marking"
		}, this.getEle(".icon", target)[0]);
		this.createEle("img", {
			src: "./images/libs/quiz/marking_o.gif?" + this.getRandomNumber(1e4)
		}, markingGifAnswer);
	}
};

EDUTSS.ui = function () {
	const util = EDUTSS.util;
	return {
		initPageNum: function () {
			let fileName = util.getFileName(),
				pageNum = util.getFileNum(),
				evenNum = parseInt(pageNum) % 2,
				wrap = util.getEle("#wrap"),
				pageContainer = util.getEle(".page_container", wrap),
				pageTxt;
			if (!pageNum) return;
			if (pageContainer.length !== 0) {
				pageTxt = util.getEle(".page_num", pageContainer[0])[0];
			} else {
				pageContainer = util.createEle("footer", {
					class: "page_container"
				}, wrap);
				pageTxt = util.createEle("div", {
					class: "page_num"
				}, pageContainer);
			}!util.hasCls(wrap, "hide--pagenum") && (pageTxt.innerText = parseInt(pageNum));
			if (evenNum === 0) {
				util.addCls(wrap, "type_left");
				util.addCls(pageContainer, "left");
			} else {
				util.addCls(wrap, "type_right");
				util.addCls(pageContainer, "right");
			}
			wrap.dataset.infoLesson = fileName[1] || 0;
			wrap.dataset.infoPage = parseInt(pageNum) || 0;
			!EDUTSS.pageInfo && (EDUTSS.pageInfo = {});
			if (EDUTSS.pageInfo) {
				EDUTSS.pageInfo.thisPage = [];
				EDUTSS.pageInfo.thisPage.folder = fileName[1];
				EDUTSS.pageInfo.thisPage.pageNum = Number(pageNum);
			}
			EDUTSS.isDevMsg && console.log("#D: 단원 => " + fileName[1] + ", 페이지 번호 => " + pageNum);
		},
		pageInfo: function () {
			if (EDUTSS.pageInfo) {
				let pageInfo = EDUTSS.pageInfo,
					chapter = pageInfo.chapter,
					lesson = pageInfo.lesson,
					pageNum = Number(pageInfo.thisPage.pageNum),
					header = document.getElementsByTagName("header")[0],
					sco, title, num, txt;
				if (util.getEle("h1", header).length > 0) return;
				if (pageNum === chapter.startPage) {
					pageInfo.thisPage.lesson = chapter.title;
					pageInfo.thisPage.lessonNum = chapter.idx;
					title = util.createEle("h1", {
						class: "title chapter"
					}, header, "prepend");
					txt = util.createEle("span", {
						class: "txt"
					}, title, "prepend");
					num = util.createEle("span", {
						class: "num"
					}, title, "prepend");
					num.textContent = pageInfo.thisPage.lessonNum;
					txt.innerHTML = pageInfo.thisPage.lesson.replace(/\/n/gi, "<br/>");
				} else {
					for (let i = 0; i < lesson.length; i++) {
						sco = lesson[i];
						if (pageNum >= sco.startPage && pageNum <= sco.endPage) {
							pageInfo.thisPage.lesson = sco.title;
							pageInfo.thisPage.lessonNum = i + 1;
							if (pageNum === sco.startPage) {
								title = util.createEle("h1", {
									class: "title lesson"
								}, header, "prepend");
								txt = util.createEle("span", {
									class: "txt"
								}, title, "prepend");
								num = util.createEle("span", {
									class: "num blind"
								}, title, "prepend");
								num.textContent = pageInfo.thisPage.lessonNum;
								txt.innerHTML = pageInfo.thisPage.lesson.replace(/\/n/gi, "<br/>");
								if (sco.corner && EDUTSS.isSubject === "soc") {
									let corner = util.createEle("div", {
										class: "title corner"
									}, header, "prepend");
									corner.innerHTML = sco.corner;
								}
							}
							break;
						}
					}
				}
				if (pageInfo.thisPage.lesson) {
					util.getEle(".chapter--title").forEach(function (elem) {
						if (util.getText(elem.textContent) === "") elem.textContent = pageInfo.thisPage.lesson.replace(/\/n/gi, " ");
					});
				}
				EDUTSS.isDevMsg && console.log(pageInfo.thisPage);
			}
			this.initPageNum();
			this.createAssist();
		},
		createAssist: function () {
			const gifRandomTarget = EDUTSS.util.getEle(".gif--random--num") || null;
			if (gifRandomTarget) {
				gifRandomTarget.forEach(function (elem) {
					elem.src = elem.getAttribute("src") + "?" + EDUTSS.util.getRandomNumber(1e4);
				});
			}
			let target;
			target = util.getEle(".btn_wrap.bottom_right.fix, .btn_wrap.bottom_left.fix");
			if (target.length > 0 && EDUTSS.fixBtnBottomPosition) {
				this.addPositionButton(target);
			}
			target = util.getEle(".convert--grayscale");
			if (target.length > 0) {
				this.convertGrayscale(target);
			}
			target = util.getEle("[data-goal-txt]");
			if (target.length > 0) {
				this.createGoalPopup(target);
			}
			target = util.getEle("[data-guide-txt]");
			if (target.length > 0) {
				this.createGuidePopup(target);
			}
			target = util.getEle("[data-create-hide]");
			if (target.length > 0) {
				this.createShowHide(target);
			}
			target = util.getEle("[data-word-text]");
			if (target.length > 0) {
				this.createWordPopup(target);
			}
			target = util.getEle(".toast");
			if (target.length > 0) {
				target.forEach(function (elem) {
					if (util.getEle(".tail", elem).length === 0) {
						util.createEle("span", {
							class: "tail"
						}, elem);
					}
				});
				EDUTSS.isDevMsg && console.log("#D: toast 팝업 tail 생성");
			}
			target = util.getEle("[data-layout-type='popup']");
			if (target.length > 0) {
				target.forEach(function (elem) {
					if (util.getEle("[data-popup-btn='close']", elem).length === 0) util.createEle("button", {
						type: "button",
						class: "btn close",
						"data-popup-btn": "close",
						title: "닫기"
					}, elem);
					util.getEle("[data-layout-type='popup']", elem).forEach(function (e) {
						e.setAttribute("data-overlay", "true");
					});
				});
				EDUTSS.isDevMsg && console.log("#D: popup 닫기 버튼 생성");
			}
			target = util.getEle(".box.input.auto");
			if (target.length > 0) {
				this.matchInputWidth(target);
			}
			target = util.getEle("assessmentItem");
			if (target.length > 0) {
				target.forEach(function (elem) {
					const quiz = util.getEle("[data-quiz-type]", elem)[0];
					!elem.dataset.qid && elem.setAttribute("data-qid", quiz.dataset.quizId);
					if (!elem.dataset.responseType) {
						if (quiz.dataset.quizType === "essay") {
							elem.setAttribute("data-response-type", "fillInTheBlank");
						} else if (quiz.dataset.quizType === "multiple") {
							const answerNum = util.getEle("[data-quiz-answer]", quiz);
							answerNum.forEach(function (answer) {
								-1 !== answer.textContent.indexOf("//") ? elem.setAttribute("data-response-type", "multipleChoice") : elem.setAttribute("data-response-type", "singleChoice");
							});
						} else {
							elem.setAttribute("data-response-type", "etc");
						}
					}
				});
				EDUTSS.isDevMsg && console.log("#D: assessmentItem 속성 생성");
			}
			EDUTSS.ui.checkInputType();
		},
		addPositionButton: function (target) {
			let interval = setInterval(function () {
				if (util.getEle("#wrap").offsetHeight !== 0) {
					parent.ZOOMVALUE && (EDUTSS.scaleValue.zoom = parent.ZOOMVALUE);
					clearInterval(interval);
					let wrapHeight = util.getEle("#wrap").offsetHeight,
						fixPosition = wrapHeight - EDUTSS.fixBtnBottomPosition,
						bottomPosition = EDUTSS.fixBtnBottomPosition,
						btnHeight = 0,
						btnEle;
					target.forEach(function (elem) {
						btnEle = util.getEle(".btn", elem)[0];
						btnEle && (btnHeight = btnEle.offsetHeight, elem.children[0].style.height = btnHeight + "px");
						if (util.isInDisplay(elem) && elem.style.top == "" && elem.style.bottom == "") {
							bottomPosition = wrapHeight - elem.getBoundingClientRect().top / EDUTSS.scaleValue.zoom - fixPosition;
							bottomPosition < 0 ? bottomPosition = Math.abs(bottomPosition) : bottomPosition = bottomPosition * -1;
							elem.style.bottom = bottomPosition + btnHeight + "px";
						}
						util.addCls(elem, "has--position");
						EDUTSS.isDevMsg && EDUTSS.isDevMsg && console.log("#D: 하단 고정 버튼 위치 지정");
					});
				}
			}, 100);
			setTimeout(function () {
				clearInterval(interval);
			}, 5e3);
		},
		convertGrayscale: function (target) {
			target.forEach(function (elem) {
				const img = util.getEle(".images--grayscale", elem)[0],
					canvas = util.getEle(".canvas--grayscale", elem)[0];
				if (img && canvas) {
					let ctx = canvas.getContext("2d"),
						canvasImage = new Image();
					canvasImage.onload = function () {
						canvasImage.crossOrigin = "anonymous";
						ctx.drawImage(canvasImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
						let imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
						let pixels = imgData.data;
						for (var i = 0; i < pixels.length; i += 4) {
							let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
							pixels[i] = lightness;
							pixels[i + 1] = lightness;
							pixels[i + 2] = lightness;
						}
						ctx.putImageData(imgData, 0, 0);
					};
					canvasImage.src = img.src;
					EDUTSS.isDevMsg && console.log("#D: 이미지 그레이스케일 생성");
				}
			});
		},
		createGoalPopup: function (target) {
			target.forEach(function (elem) {
				const text = elem.dataset.goalTxt,
					className = elem.dataset.goalCls || "toast down goal";
				let toastBtn = util.createEle("button", {
						type: "button",
						title: "학습 목표"
					}, elem),
					toast = util.createEle("div", {
						"data-layout-type": "popup"
					}, elem),
					toastTxt = util.createEle("div", {}, toast),
					txt = util.createEle("p", {}, toastTxt);
				util.addCls(toast, className);
				util.addCls(toastTxt, "inner");
				util.addCls(toastBtn, "btn goal");
				toastBtn.dataset.popup = "next";
				toastBtn.innerText = "선택";
				txt.innerText = text;
				if (util.hasCls(elem, "this_goal")) {
					toastBtn.setAttribute("title", "이번 차시를 공부하면");
				} else if (util.hasCls(elem, "last_goal")) {
					toastBtn.setAttribute("title", "지난 시간에는");
				}
			});
			EDUTSS.isDevMsg && console.log("#D: [data-goal-txt] 생성");
		},
		createGuidePopup: function (target) {
			target.forEach(function (elem) {
				const text = elem.dataset.guideTxt,
					className = elem.dataset.guideCls || "toast up guide";
				let toastBtn = util.createEle("button", {
						type: "button",
						title: "해설"
					}, elem),
					toast = util.createEle("div", {
						"data-layout-type": "popup"
					}, elem),
					toastTxt = util.createEle("div", {}, toast),
					txt = util.createEle("p", {}, toastTxt);
				util.addCls(toast, className);
				util.addCls(toastTxt, "inner");
				util.addCls(toastBtn, "btn guide");
				toastBtn.dataset.popup = "next";
				toastBtn.innerText = "선택";
				txt.innerText = text;
			});
			EDUTSS.isDevMsg && console.log("#D: [data-guide-txt] 생성");
		},
		createShowHide: function (target) {
			target.forEach(function (elem, idx) {
				const text = elem.innerText,
					className = elem.dataset.createHide;
				elem.innerText = "";
				let parentEle = util.createEle("span", {
					class: "btn " + className,
					"data-show-idx": idx + 1
				}, elem);
				let childEle = util.createEle("span", {
					class: "answer",
					"data-show-obj": idx + 1
				}, parentEle);
				childEle.innerText = text;
			});
			EDUTSS.isDevMsg && console.log("#D: [data-create-hide] 생성");
		},
		createWordPopup: function (target) {
			let wordPopEl, wordIdx = 0;
			target.forEach(function (elem) {
				elem.dataset.popup = "inner";
				wordPopEl = util.createEle("span", {
					id: "layerWordPop" + wordIdx,
					class: "toast word",
					"data-layout-type": "popup",
					"data-overlay": "true"
				}, elem);
				let wordPopInner = util.createEle("span", {
					class: "inner"
				}, wordPopEl);
				let wordTitle = util.createEle("span", {
					class: "word_tit"
				}, wordPopInner);
				let wordTxt = util.createEle("span", {
					class: "word_txt"
				}, wordPopInner);
				wordTitle.innerHTML = elem.textContent;
				wordTxt.innerHTML = elem.dataset.wordText.replace(/\/n/gi, "<br/>");
				if (elem.dataset.wordEx) {
					let wordEx = util.createEle("span", {
						class: "word_ex"
					}, wordPopInner);
					wordEx.innerHTML = elem.dataset.wordEx.replace(/\/n/gi, "<br/>");
				}
				if (elem.dataset.wordImg) {
					util.createEle("img", {
						class: "word_img",
						src: elem.dataset.wordImg
					}, wordPopInner);
				}
				wordIdx++;
				EDUTSS.isDevMsg && console.log("#D: 단어장 생성 => " + wordPopEl);
			});
		},
		matchInputWidth: function (target) {
			let inputSpellingSize = 20;
			let inputSpellingLen = 0;
			target.forEach(function (elem) {
				const inputEle = util.getEle(".quiz--input", elem)[0];
				let answerEle;
				inputEle.nextElementSibling && (answerEle = inputEle.nextElementSibling);
				answerEle && answerEle.dataset.quizAnswer && (inputSpellingLen = util.getText(answerEle.textContent).split("//")[0].length);
				if (util.hasCls(inputEle, "spelling")) {
					elem.style.width = 28 * inputSpellingLen + "px" || "28px";
				} else if (answerEle && elem.style.width === "" && !util.hasCls(elem, "fix")) {
					elem.style.width = inputSpellingSize * inputSpellingLen + "px";
				}
			});
			EDUTSS.isDevMsg && console.log("#D: .box.input.auto => answer와 input width 글자 수 매칭");
		},
		checkInputType: function () {
			const input = util.getEle(".check--number");
			input.forEach(function (elem) {
				elem.addEventListener("keypress", checkNumber);
				elem.addEventListener("keyup", function (e) {
					this.value = this.value.replace(/[^0-9]/g, "");
				});
			});

			function checkNumber(e) {
				if (e.keyCode < 48 || e.keyCode > 57) {
					e.returnValue = false;
				}
			}
		},
		swipeHorizontal: function () {
			const targetList = document.querySelectorAll(".through--box");
			let startPointX, targetStartLeft;
			util.addEvt(targetList, "pointerdown", function (e) {
				e.preventDefault();
				e.stopPropagation();
				startDrag();
			});

			function startDrag(e) {
				const target = e.currentTarget;
				startPointX = util.getCursorPos(e).x;
				targetStartLeft = target.offsetLeft;
				util.addEvt(target, "pointermove", moveDrag);
				util.addEvt(target, "pointerup", endDrag);
				util.addEvt(target, "pointerleave", endDrag);
			}

			function moveDrag(e) {
				const target = e.currentTarget;
				const curPointX = util.getCursorPos(e).x;
				const dx = startPointX - curPointX;
				const val = targetStartLeft - dx;
				const minX = target.parentElement.offsetWidth - target.offsetWidth;
				target.style.left = val > 0 ? 0 : val < minX ? minX : val + "px";
			}

			function endDrag(e) {
				const target = e.currentTarget;
				util.removeEvt(target, "pointermove", moveDrag);
				util.removeEvt(target, "pointerup", endDrag);
			}
		},
		moveFlag: function () {
			const flag = util.getEle(".flag_drag_items")[0];
			const flagWidth = flag.offsetWidth / 2;
			const flagArea = flag.parentElement;
			const rubricTxt = util.getEle(".flag--how--to")[0];
			let dragArea, startPointX, targetStartLeft;
			util.addEvt(flag, "pointerdown", function (e) {
				e.preventDefault();
				e.stopPropagation();
				startDrag();
			});

			function createDragArea() {
				const left = flag.offsetLeft + "px";
				const width = flagArea.lastElementChild.offsetLeft - flag.offsetLeft + flag.clientWidth + "px";
				const height = flag.clientHeight + "px";
				const dragArea = util.createEle("div", {
					class: "dragArea"
				}, flagArea, true);
				util.setStyle(dragArea, {
					position: "relative",
					width: width,
					height: height,
					left: left,
					touchAction: "none"
				});
				return dragArea;
			}

			function startDrag(e) {
				if (!util.getEle(".dragArea", flagArea).length) {
					dragArea = createDragArea();
				}
				util.setStyle(dragArea, {
					zIndex: 99
				});
				startPointX = util.getCursorPos(e).x;
				targetStartLeft = flag.offsetLeft;
				util.addEvt(dragArea, "pointermove", moveDrag);
				util.addEvt(dragArea, "pointerup", endDrag);
				util.addEvt(dragArea, "pointerleave", endDrag);
				util.addCls(rubricTxt, "hide");
			}

			function moveDrag(e) {
				const curPointX = util.getCursorPos(e).x;
				const dx = startPointX - curPointX;
				const minX = flag.offsetLeft;
				const maxX = flagArea.lastElementChild.offsetLeft - flag.clientWidth / 2;
				const val = targetStartLeft - dx;
				const flagLeft = val > maxX ? maxX : val < minX ? minX : val;
				const flagPoints = util.getEle(".flag_drop_items", flagArea);
				const flagPointContents = util.getEle(".flag_items");
				flag.style.left = flagLeft + "px";
				flagPoints.forEach(function (point, i) {
					if (flagLeft >= point.offsetLeft - flagWidth) {
						util.addCls(point, "done");
						util.removeCls(flagPointContents[i], "hide");
					}
				});
			}

			function endDrag(e) {
				util.setStyle(dragArea, {
					zIndex: 0
				});
				util.removeEvt(dragArea, "pointermove", moveDrag);
				util.removeEvt(e.currentTarget, "pointerup", endDrag);
				util.removeEvt(dragArea, "pointerleave", endDrag);
			}
		},
		initScratchImage: function () {
			function ScratchImage(container) {
				this.container = container;
				this.id = container.dataset.scratchId;
				this.canvas = util.getEle("canvas", container)[0];
				this.imgEle = util.getEle("img", container)[0];
				this.btnClear = util.getEle(".check[data-scratch-target=" + this.id + "]")[0];
				this.btnReplay = util.getEle(".replay[data-scratch-target=" + this.id + "]")[0];
				this.ctx = this.canvas.getContext("2d");
				this.img = new Image();
				this.startPos = null;
				this.moveHandler = this.drawImage.bind(this);
				this.leaveHandler = this.endDraw.bind(this);
				this.pointer = container.dataset.scratchPointer || false;
				this.feedback = util.getEle("[data-scratch-feedback=" + this.id + "]")[0];
			}
			ScratchImage.prototype.init = function () {
				util.setStyle(this.canvas, {
					position: "absolute",
					left: this.container.clientLeft,
					top: this.container.clientTop
				});
				this.img.src = this.canvas.dataset.src;
				this.imgEle.style.opacity = 0;
				this.percent = 0;
				if (!this.guide) {
					this.guide = util.createEle("span", {
						class: "scratch--guide show"
					}, this.container);
				}
				this.img.onload = function () {
					const width = this.imgEle.clientWidth;
					const height = this.imgEle.clientHeight;
					this.canvas.width = width;
					this.canvas.height = height;
					this.ctx.drawImage(this.img, this.container.clientLeft, this.container.clientTop, width, height);
					this.imgEle.style.opacity = 1;
				}.bind(this);
				this.container.addEventListener("click", function () {
					util.removeCls(this.guide, "show");
				}.bind(this));
				this.canvas.addEventListener("pointerdown", function (e) {
					this.startPos = {
						x: e.offsetX,
						y: e.offsetY
					};
					this.canvas.addEventListener("pointermove", this.moveHandler);
					this.canvas.addEventListener("pointerup", this.leaveHandler);
					this.canvas.addEventListener("pointerleave", this.leaveHandler);
					util.addCls(this.btnReplay, "btn--show");
					util.removeCls(this.guide, "show");
				}.bind(this));
				if (this.btnClear) {
					this.btnClear.addEventListener("click", function () {
						if (this.feedback && this.percent === 0) {
							EDUTSS.sound.playAudio("empty");
							const feddbackElement = util.getEle(".empty", this.feedback);
							util.addCls(feddbackElement, "show");
							setTimeout(function () {
								util.removeCls(feddbackElement, "show");
							}, 1500);
							return;
						}
						this.clear();
						util.addCls(this.btnReplay, "btn--show");
						util.addCls(this.container, "scratch--complete");
						util.removeCls(this.guide, "show");
						EDUTSS.sound.playAudio("click");
					}.bind(this));
				}
				if (this.btnReplay) {
					this.btnReplay.addEventListener("click", function () {
						this.init();
						util.removeCls(this.container, "scratch--complete");
						util.addCls(this.guide, "show");
						EDUTSS.sound.playAudio("click");
					}.bind(this));
				}
				this.container.classList.add("initialized");
				util.removeCls(this.btnReplay, "btn--show");
				if (!EDUTSS.isMobile && this.pointer) {
					this.cursorInHandler = this.cursorMove.bind(this);
					this.cursorOutHandler = this.cursorOut.bind(this);
					this.canvas.style.cursor = "none";
					this.cursor = util.createEle("span", {
						class: "scratch--pointer"
					}, this.container);
					util.addCls(this.cursor, this.pointer);
					this.canvas.addEventListener("pointermove", this.cursorInHandler);
					this.canvas.addEventListener("pointerleave", this.cursorOutHandler);
				}
			};
			ScratchImage.prototype.drawImage = function (e) {
				const curPosX = e.offsetX;
				const curPosY = e.offsetY;
				this.ctx.globalCompositeOperation = "destination-out";
				this.ctx.beginPath();
				this.ctx.arc(curPosX, curPosY, 20, 0, 2 * Math.PI);
				this.ctx.fill();
				this.ctx.lineWidth = 20;
				this.ctx.beginPath();
				this.ctx.moveTo(this.startPos.x, this.startPos.y);
				this.ctx.lineTo(curPosX, curPosY);
				this.ctx.stroke();
				this.startPos = {
					x: curPosX,
					y: curPosY
				};
				e.preventDefault();
				e.stopPropagation();
			};
			ScratchImage.prototype.endDraw = function () {
				this.canvas.removeEventListener("pointermove", this.moveHandler);
				this.canvas.removeEventListener("pointerup", this.leaveHandler);
				this.canvas.removeEventListener("pointerleave", this.leaveHandler);
				this.getPercent();
				if (this.percent > 80) util.addCls(this.container, "scratch--complete");
				EDUTSS.complete && EDUTSS.complete.scratch(this.container, this.percent);
			};
			ScratchImage.prototype.clear = function () {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			};
			ScratchImage.prototype.getPercent = function () {
				this.pixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
					this.pixelsData = this.pixels.data, this.pixelsLength = this.pixelsData.length,
					this.pixelsTotal = this.pixelsLength / 32, this.pixelsCount = 0;
				for (let i = this.pixelsCount = 0; i < this.pixelsLength; i += 32) {
					if (parseInt(this.pixelsData[i]) === 0) {
						this.pixelsCount++;
					}
				}
				this.percent = Math.round(this.pixelsCount / this.pixelsTotal * 100);
			};
			ScratchImage.prototype.cursorMove = function (e) {
				util.addCls(this.cursor, "show");
				this.cursor.style.top = e.offsetY + "px";
				this.cursor.style.left = e.offsetX + "px";
			};
			ScratchImage.prototype.cursorOut = function () {
				util.removeCls(this.cursor, "show");
			};
			return ScratchImage;
		},
		addSwipe: function (target, stage) {
			function SlideSwipe() {
				this.target = target;
				this.stage = stage;
				this.downHandler = this.downHandler.bind(this);
				this.moveHandler = this.moveHandler.bind(this);
				this.upHandler = this.upHandler.bind(this);
				this.startPoint = {};
				this.dx = 0;
				this.dy = 0;
			}
			SlideSwipe.prototype.init = function () {
				const stage = this;
				util.addEvt(this.target, "pointerdown", function (e) {
					e.preventDefault();
					e.stopPropagation();
					stage.downHandler(e);
				});
			};
			SlideSwipe.prototype.downHandler = function (e) {
				e.preventDefault();
				this.startPoint = util.getCursorPos(e);
				util.addEvt(this.target, "pointermove", this.moveHandler);
				util.addEvt(this.target, "pointerup", this.upHandler);
			};
			SlideSwipe.prototype.moveHandler = function (e) {
				const movedPoint = util.getCursorPos(e);
				this.dx = movedPoint.x - this.startPoint.x;
				this.dy = Math.abs(movedPoint.y - this.startPoint.y);
			};
			SlideSwipe.prototype.upHandler = function (e) {
				const MIN_DX = 15;
				const MAX_AY = 20;
				const angleDegrees = Math.atan2(this.dy, this.dx) * 180 / Math.PI;
				let isNext = this.dx > 0 ? false : true;
				if (this.dx >= MIN_DX && angleDegrees <= MAX_AY || 180 - angleDegrees <= MAX_AY) {
					isNext ? this.stage.thisNum++ : this.stage.thisNum--;
					EDUTSS.view.moveSlide(this.stage, e);
					EDUTSS.sound.playAudio("slide");
				}
				this.dx = 0;
				this.dy = 0;
				util.removeEvt(this.target, "pointermove", this.moveHandler);
				util.removeEvt(this.target, "pointerup", this.upHandler);
			};
			const slideSwipe = new SlideSwipe();
			slideSwipe.init();
		}
	};
}();

EDUTSS.sound = function () {
	const util = EDUTSS.util;
	let SOUND_EFFECT = {};
	return {
		initAudio: function () {
			let audioEle, audioSrc;
			audioEle = util.getEle("[data-func-audio]");
			util.addEvt(audioEle, "click", function (e) {
				let target = e.currentTarget;
				audioSrc = "./media/audio/" + target.dataset.funcAudio + ".mp3";
				if (!util.hasCls(target, "audio--on")) {
					if (target.dataset.playTime) {
						EDUTSS.sound.stopAllSound();
						SOUND_EFFECT["volatility"].src = audioSrc;
						SOUND_EFFECT["volatility"].currentTime = target.dataset.playTime;
						SOUND_EFFECT["volatility"].play();
						util.addCls(target, "audio--on");
					} else {
						!SOUND_EFFECT["volatility"] ? SOUND_EFFECT["volatility"] = util.createAudio(audioSrc) : SOUND_EFFECT["volatility"].src = audioSrc;
						EDUTSS.sound.playAudio("volatility", this);
					}
				} else {
					util.removeCls(target, "audio--on");
					target.dataset.playTime = SOUND_EFFECT["volatility"].currentTime;
					SOUND_EFFECT["volatility"].pause();
				}
			});
			!EDUTSS.turnPlayer && (EDUTSS.turnPlayer = {});
			util.getEle("[data-func-turnplay]").forEach(function (elem, idx) {
				EDUTSS.sound.turnAudioPlay(elem, idx);
			});
		},
		playAudio: function (str, obj) {
			let audio, bubbleEle;
			if (obj && typeof obj === "object" && util.hasCls(obj, "audio--on")) {
				util.removeCls(obj, "audio--on");
				"string" === typeof str && (SOUND_EFFECT.isPlaying = false);
				this.stopAllSound();
				EDUTSS.complete && EDUTSS.complete.sound(obj, "[soundStop]");
				return;
			}
			this.stopAllSound();
			if (typeof str === "string") {
				if (!SOUND_EFFECT[str]) {
					EDUTSS.commonEffectAudio[str] && (SOUND_EFFECT[str] = util.createAudio(EDUTSS.commonEffectAudio[str] + ".mp3"));
				} else {
					if (EDUTSS.isDevice === "ios") {
						SOUND_EFFECT[str].load();
					}
				}
				audio = SOUND_EFFECT[str];
				if (typeof obj === "object") {
					EDUTSS.animate.stopAllAnimate();
					util.addCls(obj, "audio--on play--done");
					EDUTSS.isDevMsg && console.log("#D: 말풍선 찾기 : obj의 parentNode가 .bubble이거나, obj의 parentNode의 자식중 .bubble가 있거나, data-bubble-target='대상'로 id를 명시했을 경우");
					bubbleEle = obj.dataset.bubbleTarget ? util.getEle("#" + obj.dataset.bubbleTarget) : util.hasCls(obj.parentNode, "bubble") ? bubbleEle = [obj.parentNode] : util.getEle(".bubble", obj.parentNode);
					if (bubbleEle && bubbleEle.length > 0) {
						bubbleEle.forEach(function (elem) {
							if (!util.hasCls(elem, "bubble--show")) {
								util.addCls(elem, "animated");
								util.addCls(elem, "bubble--show");
								setTimeout(function () {
									util.removeCls(elem, "animated");
								}, 500);
							}
							if (!util.hasCls(elem, "bubble--show")) {
								util.addCls(elem, "bubble--show");
							}
							EDUTSS.isDevMsg && console.log("#D: 말풍선 등장 => [data-func-audio] > parentNode > .bubble > add cls bubble--show");
						});
					}
					if (obj.dataset.animateTarget) {
						EDUTSS.animate.animatePlay(obj.dataset.animateTarget);
					} else {
						EDUTSS.isDevMsg && console.log("#D: 애니메이션 찾기, obj의 data-animate-id 값이 있을 경우");
						util.getEle("[data-animate-id]", obj).forEach(function (elem) {
							EDUTSS.animate.animatePlay(elem.dataset.animateId);
							EDUTSS.isDevMsg && console.log("#D: 애니메이션 재생, [data-animate-id] : " + elem.dataset.animateId);
						});
					}
					EDUTSS.isDevMsg && console.log("#D: 음성 재생");
				}
			} else {
				util.addCls(str, "audio--on");
				audio = util.getEle("audio", str);
				audio.length === 0 ? audio = util.createEle("audio", {
					src: obj,
					type: "audio/mpeg",
					preload: "auto"
				}, str) : audio = audio[0];
			}
			if (!audio) return;
			audio.play();
			"string" === typeof str && (SOUND_EFFECT.isPlaying = str);
			obj && "object" === typeof obj && EDUTSS.complete && EDUTSS.complete.sound(obj, "[soundPlay]");
			audio.onended = function () {
				if (typeof obj === "object") {
					util.removeCls(obj, "audio--on");
					obj.dataset.playTime && obj.removeAttribute("data-play-time");
					if (obj.dataset.animateTarget) {
						EDUTSS.animate.animateStop(obj.dataset.animateTarget);
					} else {
						util.getEle("[data-animate-id]", obj).forEach(function (elem) {
							EDUTSS.animate.animateStop(elem.dataset.animateId);
						});
					}
					if (bubbleEle) {
						bubbleEle.length > 0 && util.addCls(bubbleEle, "bubble--complete");
						util.removeCls(bubbleEle, "bubble--show");
					}
					EDUTSS.complete && EDUTSS.complete.sound(obj, "[soundEnd]");
					EDUTSS.isDevMsg && console.log("#D: 음성 완료");
				}
				"string" === typeof str && (SOUND_EFFECT.isPlaying = false);
				"string" !== typeof str && util.removeCls(str, "audio--on");
			};
		},
		stopAllSound: function (targetId, type) {
			let audioEle = util.getEle(targetId ? "#" + targetId : "audio"),
				audioLen, audio, i;
			audioEle && (audioLen = audioEle.length);
			for (i = 0; i < audioLen; i++) {
				audio = audioEle[i];
				if (util.hasCls(audio.parentNode, "media--area")) continue;
				if (audio.currentTime !== 0) {
					audio.currentTime = 0;
					audio.pause();
				}
			}
			for (i in SOUND_EFFECT) {
				if (i !== "click" && typeof SOUND_EFFECT[i] === "object" && SOUND_EFFECT[i].currentTime !== 0) {
					SOUND_EFFECT[i].pause();
					SOUND_EFFECT[i].currentTime = 0;
				}
			}
			SOUND_EFFECT.isPlaying = false;
			util.removeCls(util.getEle(".audio--on"), "audio--on");
			EDUTSS.animate.stopAllAnimate();
			for (i in EDUTSS.turnPlayer) {
				EDUTSS.turnPlayer[i].stop();
			}
			for (i in EDUTSS.mediaPlayer) {
				"mediaPlayer" === type ? EDUTSS.mediaPlayer[i].mediaAllStop(targetId) : EDUTSS.mediaPlayer[i].mediaAllStop();
			}
		},
		turnAudioPlay: function (container, idx) {
			function TurnPlay(container) {
				this.container = container;
				this.turnplayId = "turnplay-" + util.isNum(idx);
				this.turnEle = util.getEle("[data-turn-idx]", this.container);
				this.turnLen = this.turnEle.length, this.turnBtn = util.getEle("[data-turn-btn]", this.container)[0];
				this.mediaArr = this.turnBtn.dataset.turnAudio.split("//");
				this.turnDelay = 0;
				this.turnIdx = 0;
				this.currentBubble;
				this.prevBubble;
				this.audio;
				this.playTime;
				this.animate;
			}
			TurnPlay.prototype = {
				init: function () {
					let stage = this;
					stage.container.dataset.turnplayId = stage.turnplayId;
					stage.container.dataset.isPlaying = "stop";
					if (stage.turnBtn.dataset.durnDelay) stage.turnDelay = stage.turnBtn.dataset.durnDelay;
					if (stage.container.dataset.animateTarget) stage.animate = stage.container.dataset.animateTarget;
					stage.turnEle.forEach(function (el, n) {
						el.dataset.funcAudio = stage.mediaArr[n] + ".mp3";
					});
					stage.audio = util.getEle("audio", stage.container);
					if (stage.audio.length === 0) {
						stage.audio = util.createEle("audio", {
							class: "blind",
							src: "./media/audio/" + stage.mediaArr[stage.turnIdx] + ".mp3",
							type: "audio/mpeg",
							preload: "auto"
						}, stage.container);
					} else {
						stage.audio = stage.audio[0];
						stage.audio.src = "./media/audio/" + stage.mediaArr[stage.turnIdx] + ".mp3";
					}
					util.addEvt(stage.turnBtn, "click", stage.playType.bind(stage));
				},
				playType: function () {
					if (this.container.dataset.isPlaying === "play") {
						this.pause();
					} else {
						this.play();
					}
				},
				play: function () {
					if (this.container.dataset.isPlaying === "pause") {
						this.audio.currentTime = this.playTime;
					} else {
						EDUTSS.sound.stopAllSound();
						this.audio.src = "./media/audio/" + this.mediaArr[this.turnIdx] + ".mp3";
						this.audio.currentTime = 0;
					}
					this.audio.play();
					this.container.dataset.isPlaying = "play";
					util.removeCls(this.turnEle, "audio--on");
					util.addCls(this.turnEle[this.turnIdx], "audio--on play--done");
					util.addCls(this.turnBtn, "on");
					util.addCls(this.container, "turn--play viewed--turn");
					this.turnAniPlay();
					this.nextPlay();
					EDUTSS.isDevMsg && console.log("#D: 순차 오디오 재생 => " + turnIdx);
					EDUTSS.complete && EDUTSS.complete.turnAudio(this.container, "[turnStart]", this.turnIdx);
				},
				nextPlay: function () {
					let stage = this;
					this.audio.onended = function () {
						stage.turnIdx++;
						if (stage.turnIdx < stage.turnLen) {
							stage.audio.src = "./media/audio/" + stage.mediaArr[stage.turnIdx] + ".mp3";
							util.removeCls(stage.turnEle[stage.turnIdx - 1], "audio--on");
							stage.prevBubble = util.getEle(".bubble", stage.turnEle[stage.turnIdx - 1]);
							stage.prevBubble && util.removeCls(stage.prevBubble, "bubble--show");
							if (!stage.animate) {
								util.getEle("[data-animate-id]", stage.turnEle[stage.turnIdx - 1]).forEach(function (elem) {
									EDUTSS.animate.animateStop(elem.dataset.animateId);
								});
							}
							util.addCls(stage.turnEle[stage.turnIdx], "audio--on play--done");
							if (stage.turnDelay) {
								setTimeout(function () {
									stage.turnAniPlay();
									stage.audio.play();
								}, stage.turnDelay);
							} else {
								stage.turnAniPlay();
								stage.audio.play();
							}
							EDUTSS.isDevMsg && console.log("#D: 순차 오디오 다음 => " + stage.turnIdx);
							EDUTSS.complete && EDUTSS.complete.turnAudio(stage.container, "[turnNext]", stage.turnIdx);
						} else {
							stage.stop();
							stage.turnAniStop();
							EDUTSS.isDevMsg && console.log("#D: 순차 오디오 종료");
							EDUTSS.complete && EDUTSS.complete.turnAudio(stage.container, "[turnEnd]", stage.turnIdx);
						}
					};
				},
				pause: function () {
					this.playTime = this.audio.currentTime;
					this.audio.pause();
					util.removeCls(this.turnBtn, "on");
					util.removeCls(this.turnEle, "audio--on");
					this.container.dataset.isPlaying = "pause";
					this.turnAniStop();
				},
				stop: function () {
					this.turnIdx = 0;
					this.audio.pause();
					this.audio.currentTime = 0;
					this.currentBubble = util.getEle(".bubble", this.turnEle[this.turnIdx - 1]);
					this.currentBubble && util.removeCls(this.currentBubble, "bubble--show");
					util.removeCls(this.turnBtn, "on is--play");
					util.removeCls(this.turnEle, "audio--on");
					util.removeCls(this.container, "turn--play");
					this.container.dataset.isPlaying = "stop";
				},
				turnAniPlay: function () {
					util.getEle(".bubble", this.turnEle[this.turnIdx]).forEach(function (elem) {
						if (!util.hasCls(elem, "bubble--show")) {
							util.addCls(elem, "animated");
							util.addCls(elem, "bubble--show");
							setTimeout(function () {
								util.removeCls(elem, "animated");
							}, 500);
						}
						if (!util.hasCls(elem, "bubble--show")) {
							util.addCls(elem, "bubble--show");
						}
					});
					if (this.animate) {
						EDUTSS.animate.animatePlay(this.animate);
					} else {
						util.getEle("[data-animate-id]", this.turnEle[this.turnIdx]).forEach(function (elem) {
							EDUTSS.animate.animatePlay(elem.dataset.animateId);
						});
					}
				},
				turnAniStop: function () {
					if (this.animate) {
						EDUTSS.animate.stopAllAnimate();
					} else {
						util.getEle("[data-animate-id]", this.turnEle[this.turnIdx - 1]).forEach(function (elem) {
							EDUTSS.animate.animateStop(elem.dataset.animateId);
						});
					}
				}
			};
			EDUTSS.turnPlayer[idx] = new TurnPlay(container);
			EDUTSS.turnPlayer[idx].init();
		}
	};
}();

EDUTSS.player = function () {
	const util = EDUTSS.util;
	return {
		initMediaPlayer: function (arr) {
			function MediaPlayer(elem, type, media, idx) {
				this.container = elem, this.mediaInner = elem.querySelectorAll(".media--inner")[0],
					this.type = type, this.media = media, this.mediaId = "mediaPlayer" + (idx < 10 ? "0" + idx : idx.toString()),
					this.btnOnly = false, this.isVolume = arr.volume || false, this.isCaption = false,
					this.isCaptionOn = false, this.isCaptionView = false, this.isImportCaption = true,
					this.isRealTimeCaption = false, this.isCover = arr.cover || false,
					this.isCoverPause = arr.coverPause || true, this.isCloseBtn = arr.close || false,
					this.fullscreenMode = arr.fullScreenMode || "native", this.autoPlay = false,
					this.isPlay = false, this.isTitle = arr.mediaTitle || false, this.isPreLoad = arr.preLoad || false,
					this.isHiddenControls = arr.hiddenControls || false, this.defaultVolume = arr.defaultVolume || 1;
				this.defaultVolumeWidth = arr.defaultVolumeWidth || 50;
				this.syncUpdateInterval, this.controlsVisibleTimer, this.titleVisibleTimer;
				this.playerResizeHandler = this.resizePlayer.bind(this);
				if (this.isHiddenControls) {
					this.visibleControlsHandler = this.controlShowClass.bind(this);
					this.hiddenControlsHandler = this.controlHideClass.bind(this);
				}
				if (this.isCoverPause) {
					this.coverEventHandler = this.coverOverHandler.bind(this);
				}

				function isNum(num) {
					return num < 10 ? "0" + num : num.toString();
				}
				Object.defineProperties(this, {
					duration: {
						get: function () {
							return this.media.duration;
						}
					},
					durationText: {
						get: function () {
							return isNum(Math.floor(this.duration / 60)) + ":" + isNum(Math.floor(this.duration % 60));
						}
					},
					playTime: {
						get: function () {
							return this.media.currentTime;
						},
						set: function (value) {
							this.media.currentTime = value;
						}
					},
					currentText: {
						get: function () {
							return isNum(Math.floor(this.playTime / 60)) + ":" + isNum(Math.floor(this.playTime % 60));
						}
					},
					timeRate: {
						get: function () {
							return this.playTime / this.duration;
						}
					},
					barSize: {
						get: function () {
							return this.barRail.getBoundingClientRect();
						}
					},
					barWidth: {
						get: function () {
							return this.barSize.right - this.barSize.left;
						}
					},
					volume: {
						get: function () {
							return this.media.volume;
						},
						set: function (value) {
							this.media.volume = value;
						}
					},
					volumeSize: {
						get: function () {
							return this.isVolume && this.volumeRail.getBoundingClientRect();
						}
					},
					volumeWidth: {
						get: function () {
							let value;
							if (this.isVolume) {
								value = this.volumeSize.right - this.volumeSize.left;
								value === 0 && (value = this.defaultVolumeWidth);
							}
							return this.isVolume && value;
						}
					},
					coord: {
						get: function () {
							return this.coordX, this.coordY;
						},
						set: function (e) {
							this.coordX = e.touches ? e.touches[0].clientX : e.clientX;
							this.coordY = e.touches ? e.touches[0].clientY : e.clientY;
						}
					},
					isFullscreen: {
						get: function () {
							return document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
						}
					}
				});
			}
			MediaPlayer.prototype = {
				init: function () {
					const stage = this;
					if (util.hasCls(this.container, "only")) this.btnOnly = true;
					if (util.hasCls(this.container, "is--caption")) this.isCaption = true;
					if (util.hasCls(this.container, "not--dbclick")) this.isNotdblClick = true;
					this.create();
					this.container.dataset.mediaId = this.mediaId;
					if (this.type === "audio") util.addCls(util.getEle(".progress--bar", this.container), "hide");
					this.addEvt();
					this.mediaReady();
					if (util.hasCls(this.container, "is--caption--view")) this.isCaptionView = true;
					if (this.isVolume) {
						this.setVolume(this.defaultVolume);
						this.updateVolumeBar();
					}
					if (this.isCaption && this.isCaptionView) {
						this.captionBtn.click();
					}
				},
				create: function () {
					return this.control = util.createEle("div", {
							class: "media--controller"
						}, this.mediaInner), this.playBtn = util.createEle("div", {
							class: "btn play",
							title: "재생"
						}, this.control), this.pauseBtn = util.createEle("div", {
							class: "btn pause on",
							title: "일시 정지"
						}, this.control), this.stopBtn = util.createEle("div", {
							class: "btn stop",
							title: "정지"
						}, this.control), !this.btnOnly && (this.controlBar = util.createEle("div", {
							class: "progress--bar"
						}, this.control), this.barRail = util.createEle("div", {
							class: "progress rail"
						}, this.controlBar), this.barActive = util.createEle("div", {
							class: "progress current"
						}, this.controlBar), this.barHandler = util.createEle("div", {
							class: "progress handle"
						}, this.controlBar), this.controlTime = util.createEle("div", {
							class: "time--text"
						}, this.control), this.current = util.createEle("div", {
							class: "time current"
						}, this.controlTime), this.total = util.createEle("div", {
							class: "time total"
						}, this.controlTime)), !this.btnOnly && this.isVolume && (this.muteBtn = util.createEle("div", {
							class: "btn mute",
							title: "음소거"
						}, this.control), this.volumeBar = util.createEle("div", {
							class: "volume--bar"
						}, this.control), this.volumeRail = util.createEle("div", {
							class: "volume rail"
						}, this.volumeBar), this.volumeActive = util.createEle("div", {
							class: "volume current"
						}, this.volumeBar), this.volumeHandler = util.createEle("div", {
							class: "volume handle"
						}, this.volumeBar)), this.type === "video" && this.isCover && (this.thumbContainer = util.createEle("div", {
							class: "thumb--area"
						}, this.mediaInner), this.coverImg = util.createEle("div", {
							class: "img cover"
						}, this.thumbContainer), this.coverBtn = util.createEle("div", {
							class: "btn play"
						}, this.thumbContainer)), this.type === "video" && (this.fullScreenBtn = util.createEle("div", {
							class: "btn fullScreen",
							title: "전체 화면"
						}, this.control)), this.type === "video" && this.isCaption && (this.captionBtn = util.createEle("div", {
							class: "btn caption",
							title: "자막"
						}, this.control), this.container.querySelectorAll(".caption--inner").length === 0 ? (this.captionContainer = util.createEle("div", {
							class: "caption--area script"
						}, this.mediaInner), this.captionTxt = util.createEle("p", {
							class: "txt"
						}, this.captionContainer), this.isImportCaption = true) : (this.captionContainer = util.getEle(".caption--inner", this.container)[0],
							this.isImportCaption = false)), this.type === "video" && this.isCloseBtn && (this.closeBtn = util.createEle("div", {
							class: "btn close",
							title: "닫기"
						}, this.container)), this.type === "video" && this.isTitle && (this.mediaTitle = util.createEle("div", {
							class: "media_title"
						}, this.mediaInner), this.mediaTitleTxt = util.createEle("p", {}, this.mediaTitle)),
						this;
				},
				addEvt: function () {
					const stage = this;
					if (this.isPreLoad) {
						util.addEvt(this.container, "down", this.mediaLoad.bind(this), {
							capture: true
						});
					}
					util.addEvt(this.playBtn, "click", this.mediaPlay.bind(this), {
						capture: true
					});
					util.addEvt(this.pauseBtn, "click", this.mediaPause.bind(this), {
						capture: true
					});
					util.addEvt(this.stopBtn, "click", this.mediaStop.bind(this), {
						capture: true
					});
					if (!this.btnOnly) {
						util.addEvt(this.barRail, "click", this.clickBarHandle.bind(this), {
							capture: true
						});
						util.addEvt(this.barActive, "click", this.clickBarHandle.bind(this), {
							capture: true
						});
						util.addEvt(this.barHandler, "down", this.dragBarHandle.bind(this), {
							capture: true
						});
						if (this.isVolume) {
							util.addEvt(this.muteBtn, "click", this.mediaMute.bind(this), {
								capture: true
							});
							util.addEvt(this.volumeRail, "click", this.clickBarHandle.bind(this), {
								capture: true
							});
							util.addEvt(this.volumeActive, "click", this.clickBarHandle.bind(this), {
								capture: true
							});
							util.addEvt(this.volumeHandler, "down", this.dragBarHandle.bind(this), {
								capture: true
							});
						}
					}
					if (this.type === "video") {
						if (!this.isNotdblClick) {
							util.addEvt(this.thumbContainer, "dblclick", this.mediaFullScreen.bind(this), {
								capture: true
							});
						}
						util.addEvt(this.fullScreenBtn, "click", this.mediaFullScreen.bind(this), {
							capture: true
						});
						document.addEventListener("fullscreenchange", this.fullScreenHandler.bind(this));
						document.addEventListener("webkitfullscreenchange", this.fullScreenHandler.bind(this));
						document.addEventListener("mozfullscreenchange", this.fullScreenHandler.bind(this));
						document.addEventListener("MSFullscreenChange", this.fullScreenHandler.bind(this));
						if (this.isCover) {
							util.addEvt(this.coverBtn, "click", this.mediaCoverPlay.bind(this), {
								capture: true
							});
						}
						if (this.isTitle) {
							this.mediaInner.addEventListener("mousemove", this.titleOverHandler.bind(this), {
								capture: true
							});
							this.mediaInner.addEventListener("touchstart", this.titleOverHandler.bind(this), {
								capture: true
							});
							this.mediaInner.addEventListener("mouseleave", this.titleOverHandler.bind(this), {
								capture: true
							});
						}
					}
					if (this.isCloseBtn) {
						util.addEvt(this.closeBtn, "click", this.mediaStop.bind(this), {
							capture: true
						});
					}
					if (stage.isCaption && !stage.isImportCaption) {
						util.addEvt(stage.captionBtn, "click", function () {
							if (stage.isCaptionOn) {
								stage.isCaptionOn = false;
								util.removeCls(stage.captionBtn, "on");
								util.removeCls(stage.captionContainer, "caption--show");
								if (stage.isRealTimeCaption) {
									clearInterval(stage.syncUpdateInterval);
								}
								EDUTSS.isDevMsg && console.log("#D: video 자막 닫기");
							} else {
								stage.isCaptionOn = true;
								util.addCls(stage.captionBtn, "on");
								util.addCls(stage.captionContainer, "caption--show");
								if (stage.isRealTimeCaption) {
									clearInterval(stage.syncUpdateInterval);
									stage.isPlay && stage.innerCaptionSync();
								}
								EDUTSS.isDevMsg && console.log("#D: video 자막 열기");
							}
						});
					}
					this.media.addEventListener("play", function () {
						stage.isPlay = true;
						stage.isBtnState("play");
						stage.isPlaying();
						EDUTSS.complete && EDUTSS.complete.mediaPlayer(stage, "play");
					});
					this.media.addEventListener("pause", function () {
						stage.isPlay = false;
						stage.isBtnState("pause");
						util.removeCls(stage.container, "is--playing");
						clearInterval(stage.mediaUpdate);
						if (stage.isCaptionOn && stage.isRealTimeCaption && !stage.isImportCaption) {
							clearInterval(stage.syncUpdateInterval);
						}
						EDUTSS.complete && EDUTSS.complete.mediaPlayer(stage, "pause");
					});
					this.media.addEventListener("ended", function () {
						stage.isPlay = false;
						stage.mediaStop();
						EDUTSS.complete && EDUTSS.complete.mediaPlayer(stage, "end");
					});
					if (EDUTSS.isDevice === "ios") {
						this.media.addEventListener("webkitfullscreenchange", function () {
							if (!document.webkitIsFullScreen) {
								if (stage.media.paused) {
									stage.isPlay = false;
									stage.isBtnState("pause");
								}
							}
						}, false);
					}
				},
				mediaLoad: function () {
					if (!this.media.readyState) {
						this.media.load();
						this.media.play();
						this.media.pause();
					}
				},
				mediaReady: function () {
					const stage = this;
					stage.current.innerText = "00:00";
					stage.total.innerText = stage.container.dataset.totalTime || "00:00";
					stage.controlTime.style.opacity = "1";
					if (stage.type === "video" && stage.isCover) {
						var poster = stage.media.getAttribute("poster");
						stage.coverImg.style.backgroundImage = "url(" + poster + ")";
					}
					if (!stage.isImportCaption) {
						util.getEle("[data-sync-s]", stage.container).length > 0 && (stage.isRealTimeCaption = true);
					}
					util.addCls(stage.playBtn, "off");
					util.addCls(stage.pauseBtn, "on");
					let readyMedia = setInterval(function () {
						if (stage.media.readyState) {
							clearInterval(readyMedia);
							stage.controlTime.style.opacity = "1";
							stage.mediaDuration = stage.media.duration;
							if (!stage.btnOnly) {
								stage.total.innerText = stage.durationText;
								stage.updateTimer();
							}
							if (!stage.btnOnly && stage.isVolume) {
								stage.updateVolumeBar();
							}
							stage.isBtnState();
							if (stage.type === "video" && stage.isCover) {
								stage.videoWidth = util.getStyle(stage.media).width;
								stage.videoHeight = util.getStyle(stage.media).height;
								stage.thumbContainer.style.width = stage.videoWidth;
								stage.thumbContainer.style.height = stage.videoHeight;
								setTimeout(function () {
									if (stage.type === "video" && stage.isCover && EDUTSS.isDTBOOK) {
										let getThumbSize = setInterval(function () {
											if (stage.media.offsetHeight !== 0) {
												stage.videoWidth = stage.media.offsetWidth + "px";
												stage.videoHeight = stage.media.offsetHeight + "px";
												stage.thumbContainer.style.width = stage.videoWidth;
												stage.thumbContainer.style.height = stage.videoHeight;
												clearInterval(getThumbSize);
												EDUTSS.isDevMsg && console.log("#D: 쎔네일 사이즈 => " + stage.videoWidth + ", " + stage.videoHeight);
											}
										});
									}
								}, 500);
							}
							if (this.isTitle && this.mediaTitle) {
								this.mediaTitleTxt.innerText = mediaTitle, util.addCls(this.mediaTitle, "show"),
									stage.titleVisibleTimer = setTimeout(function () {
										util.removeCls(stage.mediaTitle, "show");
									}, 2e3);
							}
							if (stage.isCaption && stage.isImportCaption) {
								stage.getCaptionData();
								EDUTSS.player.initMediaCaption(stage);
							}
							stage.reservationPlaying && (stage.mediaPlay(), stage.reservationPlaying = false);
						}
					});
				},
				mediaPlay: function () {
					EDUTSS.sound.stopAllSound(this.mediaId, "mediaPlayer");
					if (!this.media.readyState) {
						this.reservationPlaying = true;
					} else {
						this.isVolume && this.updateVolumeBar();
						this.media.currentTime = this.playTime;
						this.media.play();
					}
				},
				mediaPause: function () {
					this.media.pause();
					if (this.type === "video" && this.media.readyState) {
						this.bindCoverEvent(false);
					}
				},
				mediaStop: function () {
					if (!this.mediaDuration) {
						return;
					}
					this.media.pause();
					this.changeTime(0);
					this.current.innerText = "00:00";
					this.barHandler.style.left = "0px";
					this.barActive.style.width = "0px";
					if (this.isCaptionOn && this.isRealTimeCaption && !this.isImportCaption) {
						this.innerCaptionSync("reset");
					}
					if (this.type === "video" && this.media.readyState) {
						util.removeCls(this.coverImg, "hide");
						this.bindCoverEvent(false);
					}
				},
				mediaCoverPlay: function () {
					this.isPlay ? this.mediaPause() : this.mediaPlay();
				},
				isPlaying: function () {
					const stage = this;
					util.addCls(this.container, "is--playing");
					stage.mediaUpdate = setInterval(function () {
						!stage.btnOnly && stage.updateTimer();
						!stage.btnOnly && stage.updateBar();
					}.bind(this), 100);
					if (stage.isCaptionOn && stage.isRealTimeCaption && !stage.isImportCaption) {
						stage.innerCaptionSync();
					}
					if (this.type === "video" && this.media.readyState) {
						util.addCls(this.coverImg, "hide");
						this.bindCoverEvent(true);
					}
				},
				isBtnState: function (state) {
					if (state === "play") {
						util.addCls(this.playBtn, "on");
						util.addCls(this.pauseBtn, "off");
						util.removeCls(this.playBtn, "off");
						util.removeCls(this.pauseBtn, "on");
						util.addCls(this.coverBtn, "pause");
						util.removeCls(this.coverBtn, "play");
					} else {
						util.removeCls(this.playBtn, "on");
						util.removeCls(this.pauseBtn, "off");
						util.addCls(this.playBtn, "off");
						util.addCls(this.pauseBtn, "on");
						util.addCls(this.coverBtn, "play");
						util.removeCls(this.coverBtn, "pause");
					}
				},
				clickBarHandle: function (e, target) {
					if (!this.mediaDuration) {
						let stage = this,
							target = e.currentTarget.className.split(" ")[0],
							targetInfo = e;
						let bindClickBar = setInterval(function () {
							if (stage.mediaDuration) {
								clearInterval(bindClickBar);
								stage.clickBarHandle(targetInfo, target);
							}
						});
						return;
					}
					this.coord = e;
					let type = e.currentTarget ? e.currentTarget.className.split(" ")[0] : target,
						barMoveRate = this.getBarValue(this.coordX, type);
					if (type === "progress") {
						this.changeTime(barMoveRate);
						this.isCaption && this.isCaptionOn && this.isImportCaption && this.captionFs.getCaptionTxt();
					} else if (type === "volume") {
						this.setVolume(barMoveRate);
						this.updateVolumeBar();
					}
				},
				dragBarHandle: function (e, target) {
					if (!this.mediaDuration) {
						let stage = this,
							target = e.currentTarget.className.split(" ")[0],
							targetInfo = e;
						let bindClickBar = setInterval(function () {
							if (stage.mediaDuration) {
								clearInterval(bindClickBar);
								stage.dragBarHandle(targetInfo, target);
							}
						});
						return;
					}
					let stage = this,
						setBar = startDrag.bind(this),
						type = e.currentTarget ? e.currentTarget.className.split(" ")[0] : target;
					e.preventDefault();
					e.stopPropagation();
					util.addEvt(document, "move", setBar);
					util.addEvt(document, "up", function () {
						util.removeEvt(document, "move", setBar);
					});

					function startDrag(e) {
						stage.coord = e;
						let moveX, barMoveRate;
						if (type === "progress") {
							moveX = stage.coordX - stage.barSize.left;
							if (moveX > 0 && moveX < stage.barSize.width) {
								barMoveRate = stage.getBarValue(stage.coordX, type);
								stage.changeTime(barMoveRate);
								stage.isCaption && stage.isCaptionOn && stage.isImportCaption && stage.captionFs.getCaptionTxt();
							}
						} else if (type === "volume") {
							moveX = stage.coordX - stage.volumeSize.left;
							if (moveX > 0 && moveX <= stage.volumeSize.width) {
								barMoveRate = stage.getBarValue(stage.coordX, type);
								stage.setVolume(barMoveRate);
							}
						}
					}
					EDUTSS.view.senseClosePopupEvent(e);
				},
				getBarValue: function (value, type) {
					if (type === "progress") {
						return (value - this.barSize.left) / this.barWidth;
					} else if (type === "volume") {
						return parseFloat((value - this.volumeSize.left) / this.volumeWidth).toFixed(1);
					}
				},
				changeTime: function (value) {
					let num = value * this.mediaDuration;
					num >= this.mediaDuration && (num = this.mediaDuration - .05);
					num <= 0 && (num = 0);
					this.playTime = num;
					!this.btnOnly && this.updateTimer();
					!this.btnOnly && this.updateBar();
					if (this.type === "video") {
						util.addCls(this.coverImg, "hide");
						util.addCls(this.coverBtn, "hide");
					}
					if (this.isCaptionOn && this.isRealTimeCaption && !this.isImportCaption) {
						this.innerCaptionSync("once");
					}
				},
				updateTimer: function () {
					this.current.innerText = this.playTime <= 0 ? "00:00" : this.currentText;
				},
				updateBar: function () {
					let barMove = !this.isFullscreen ? this.barWidth / EDUTSS.scaleValue.zoom * this.timeRate : this.barWidth * this.timeRate;
					this.barHandler.style.left = barMove + "px";
					this.barActive.style.width = barMove + "px";
				},
				updateVolumeBar: function () {
					let barMove = !this.isFullscreen ? this.volumeWidth / EDUTSS.scaleValue.zoom * this.media.volume : this.volumeWidth * this.media.volume;
					this.volumeHandler.style.left = barMove + "px";
					this.volumeActive.style.width = barMove + "px";
				},
				setVolume: function (value) {
					this.media.muted = true;
					if (value <= 0) {
						value = 0;
						this.media.muted = false;
					} else if (value >= 1) {
						value = 1;
					}
					this.volume = value;
					this.mediaMute();
					EDUTSS.isDevMsg && console.log("#D: 볼륨 : " + this.volume);
				},
				mediaMute: function () {
					if (this.media.muted) {
						this.media.muted = false;
						util.removeCls(this.muteBtn, "on");
						this.updateVolumeBar();
					} else {
						this.media.muted = true;
						util.addCls(this.muteBtn, "on");
						this.volumeHandler.style.left = null;
						this.volumeActive.style.width = null;
					}
				},
				mediaFullScreen: function () {
					if (EDUTSS.isDevice === "ios") {
						util.addCls(this.container, "is--controls");
						this.media.webkitEnterFullScreen();
						return;
					}
					if (!this.isFullscreen) {
						let stage = this;
						if (!stage.media.readyState) {
							setTimeout(function () {
								stage.mediaFullScreen();
							}, 100);
							return;
						}
						this.videoWidth = this.media.offsetWidth + "px";
						this.videoHeight = this.media.offsetHeight + "px";
						if (this.container.requestFullscreen) this.container.requestFullscreen();
						else if (this.container.msRequestFullscreen) this.container.msRequestFullscreen();
						else if (this.container.mozRequestFullScreen) this.container.mozRequestFullScreen();
						else if (this.container.webkitRequestFullscreen) this.container.webkitRequestFullscreen();
						this.isHiddenControls && this.controlOverHandler(true);
					} else {
						if (document.exitFullscreen) document.exitFullscreen();
						else if (document.msExitFullscreen) document.msExitFullscreen();
						else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
						else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
						this.isHiddenControls && this.controlOverHandler(false);
					}
				},
				fullScreenHandler: function () {
					if (!this.media.readyState) {
						return;
					}
					if (this.isFullscreen) {
						util.addCls(this.container, "is--fullscreen");
						util.addCls(this.fullScreenBtn, "on");
						this.resizeInner();
						this.updateBar();
						if (this.captionBtn && !this.isRealTimeCaption) {
							util.addCls(this.captionBtn, "disabled");
							this.captionContainer.style.display = "none";
						}
						window.addEventListener("resize", this.playerResizeHandler);
					} else {
						util.removeCls(this.container, "is--controls");
						util.removeCls(this.container, "is--fullscreen");
						util.removeCls(this.fullScreenBtn, "on");
						this.media.style.width = null;
						this.media.style.height = null;
						this.thumbContainer.style.width = null;
						this.thumbContainer.style.height = null;
						this.control.style.bottom = null;
						this.mediaInner.style.marginTop = null;
						if (this.isCaption) {
							if (this.isImportCaption) {
								this.captionContainer.style.marginBottom = null;
							} else {
								this.captionContainer.style.bottom = null;
							}
						}
						clearInterval(this.positionInterval);
						this.updateBar();
						if (this.captionBtn && !this.isRealTimeCaption) {
							util.removeCls(this.captionBtn, "disabled");
							this.captionContainer.style.display = null;
						}
						window.removeEventListener("resize", this.playerResizeHandler);
					}
				},
				resizeInner: function () {
					const stage = this;
					setTimeout(function () {
						stage.media.style.width = "100%";
						stage.media.style.height = "auto";
						stage.thumbContainer.style.width = "100%";
						stage.thumbContainer.style.height = "100%";
						!stage.isHiddenControls && stage.mediaInner && stage.resizePlayer();
					}, 50);
				},
				resizePlayer: function () {
					if (window.innerHeight <= this.mediaInner.clientHeight + this.control.offsetHeight) {
						this.mediaInner.style.marginTop = "0px";
						this.mediaInner.style.height = "100%";
						this.control.style.bottom = "0px";
						this.thumbContainer.style.width = "100%";
						this.thumbContainer.style.height = "calc(100% - " + this.control.offsetHeight + "px)";
						this.media.style.height = "calc(100% - " + this.control.offsetHeight + "px)";
						if (this.isCaption) {
							this.captionContainer.style.bottom = this.control.offsetHeight + "px";
						}
					} else {
						this.mediaInner.style.marginTop = "-" + this.control.offsetHeight / 2 + "px";
						this.mediaInner.style.height = null;
						this.control.style.bottom = "-" + this.control.offsetHeight + "px";
						this.thumbContainer.style.width = this.media.offsetWidth + "px";
						this.thumbContainer.style.height = this.media.offsetHeight + "px";
						if (this.isCaption) {
							this.captionContainer.style.bottom = (window.innerHeight - this.control.offsetTop) / 2 + this.control.offsetHeight / 2 + "px";
						}
					}
				},
				controlOverHandler: function (value) {
					const stage = this;
					if (value) {
						if (stage.isOverControlEvent) return;
						stage.isOverControlEvent = true;
						document.addEventListener("mousemove", stage.visibleControlsHandler);
						document.addEventListener("touchstart", stage.visibleControlsHandler);
						document.addEventListener("mouseleave", stage.hiddenControlsHandler);
						clearTimeout(stage.controlsVisibleTimer);
						stage.controlsVisibleTimer = setTimeout(function () {
							util.addCls(stage.control, "hide");
						}, 2e3);
					} else {
						if (!stage.isOverControlEvent) return;
						stage.isOverControlEvent = false;
						document.removeEventListener("mousemove", stage.visibleControlsHandler);
						document.removeEventListener("touchstart", stage.visibleControlsHandler);
						document.removeEventListener("mouseleave", stage.hiddenControlsHandler);
						util.removeCls(stage.control, "hide");
						clearTimeout(stage.controlsVisibleTimer);
						stage.controlsVisibleTimer = setTimeout(function () {
							util.removeCls(stage.control, "hide");
						}, 2e3);
					}
				},
				controlHideClass: function () {
					const stage = this;
					util.addCls(stage.control, "hide");
					clearTimeout(stage.controlsVisibleTimer);
				},
				controlShowClass: function () {
					const stage = this;
					util.removeCls(stage.control, "hide");
					clearTimeout(stage.controlsVisibleTimer);
					stage.controlsVisibleTimer = setTimeout(function () {
						util.addCls(stage.control, "hide");
					}, 2e3);
					if (util.isTouch) {
						clearTimeout(stage.controlsVisibleTimer);
						setTimeout(function () {
							util.addCls(stage.control, "hide");
						}, 2e3);
					}
				},
				titleOverHandler: function (e) {
					const stage = this;
					if (this.isTitle && e.type === "mousemove" || e.type === "touchstart") {
						util.addCls(this.mediaTitle, "show");
						clearTimeout(stage.titleVisibleTimer);
						if (util.isTouch) {
							stage.titleVisibleTimer = setTimeout(function () {
								util.removeCls(stage.mediaTitle, "show");
							}, 2e3);
						}
					} else {
						util.removeCls(this.mediaTitle, "show");
					}
					if (this.isTitle) {
						clearTimeout(stage.titleVisibleTimer);
						stage.titleVisibleTimer = setTimeout(function () {
							util.removeCls(stage.mediaTitle, "show");
						}, 2e3);
					}
				},
				bindCoverEvent: function (value) {
					if (value) {
						util.removeCls(this.thumbContainer, "is--over");
						util.addCls(this.coverBtn, "hide");
						if (!EDUTSS.isMobile && this.isCoverPause) {
							this.mediaInner.addEventListener("mousemove", this.coverEventHandler, {
								capture: true
							});
							this.mediaInner.addEventListener("mouseleave", this.coverEventHandler, {
								capture: true
							});
						}
					} else {
						util.removeCls(this.thumbContainer, "is--over");
						util.removeCls(this.coverBtn, "hide");
						if (!EDUTSS.isMobile && this.isCoverPause) {
							this.mediaInner.removeEventListener("mousemove", this.coverEventHandler, {
								capture: true
							});
							this.mediaInner.removeEventListener("mouseleave", this.coverEventHandler, {
								capture: true
							});
						}
					}
				},
				coverOverHandler: function (e) {
					if (e.type === "mousemove" || e.type === "touchstart") {
						util.addCls(this.thumbContainer, "is--over");
					} else {
						util.removeCls(this.thumbContainer, "is--over");
					}
				},
				getCaptionData: function () {
					let captionData = window.EDUTSS_CAPTION,
						fileName = this.media.currentSrc.split("/").slice(-1)[0].split(".")[0];
					for (let key in captionData) {
						if (key === fileName) {
							this.isRealTimeCaption = true;
							this.CAPTION_DATA = captionData[key];
						}
					}
				},
				innerCaptionSync: function (once) {
					const stage = this,
						syncTxt = util.getEle("[data-sync-s]", stage.container);
					let idx, syncIdx;
					let scrollElem = syncTxt[0].closest(".scroll--content");
					let scrollHeight;
					scrollElem && (scrollHeight = scrollElem.offsetHeight);
					if (!once) {
						stage.syncUpdateInterval = setInterval(function () {
							getSync();
						}, 500);
					} else if (once === "reset") {
						util.removeCls(syncTxt, "on");
						scrollElem && (scrollElem.scrollTop = 0);
					} else {
						getSync();
					}

					function getSync() {
						for (idx = 0; idx < syncTxt.length; idx++) {
							if (stage.playTime >= getTime(syncTxt[idx].dataset.syncS) && stage.playTime < getTime(syncTxt[idx].dataset.syncE)) {
								if (syncIdx !== idx) {
									util.removeCls(syncTxt, "on");
									util.addCls(syncTxt[idx], "on");
									scrollElem && (scrollElem.scrollTop = parseInt(syncTxt[idx].offsetTop / (scrollHeight / 2)) * parseInt(scrollHeight / 2));
									syncIdx = idx;
									break;
								}
							}
						}
					}

					function getTime(value) {
						return parseFloat(value.split(":")[0]) * 60 + parseFloat(value.split(":")[1]);
					}
				},
				mediaChange: function (src, value, mediaTitle) {
					let videoEle = this.media.childNodes[1];
					videoEle.src = src + value + ".mp4";
					this.media.poster = src + value + ".jpg";
					this.media.load();
					mediaTitle ? this.isTitle = true : this.isTitle = false;
					this.mediaReady();
				},
				mediaAllStop: function (target) {
					if (!this.media.readyState) {
						return;
					}
					if (target) {
						target !== this.mediaId && this.mediaStop();
					} else {
						this.mediaStop();
					}
				}
			};
			!EDUTSS.mediaPlayer && (EDUTSS.mediaPlayer = {});
			let playerEle = util.getEle("[data-media-control]");
			playerEle.forEach(function (elem, idx) {
				let type = elem.dataset.mediaControl,
					media = util.getEle("audio, video", elem)[0];
				EDUTSS.mediaPlayer[idx] = new MediaPlayer(elem, type, media, idx + 1);
				EDUTSS.mediaPlayer[idx].init();
				EDUTSS.isDevMsg && console.log("#D: audio player, video player 세팅");
			});
		},
		initMediaCaption: function (stage) {
			stage.captionCurIdx, stage.captionOldIdx;
			stage.captionFs = {
				captionUpdate: function () {
					stage.syncUpdateInterval = setInterval(function () {
						stage.isPlay && stage.captionFs.getCaptionTxt();
					}, 500);
				},
				getCaptionTxt: function () {
					stage.captionFs.getIdx();
					if (stage.captionCurIdx) {
						if (stage.captionOldIdx === stage.captionCurIdx && stage.captionTxt.textContent !== "") {
							return;
						} else {
							stage.captionOldIdx = stage.captionCurIdx;
						}
						stage.captionTextOn = true;
						util.addCls(stage.captionTxt, "on");
						stage.captionTxt.innerHTML = stage.CAPTION_DATA[stage.captionCurIdx].text;
						EDUTSS.isDevMsg && console.log("#D: 자막 갱신 => " + stage.captionTxt.innerHTML);
					} else {
						if (stage.captionTextOn) {
							stage.captionTextOn = false;
							util.removeCls(stage.captionTxt, "on");
							stage.captionTxt.textContent = "";
						}
					}
				},
				getIdx: function () {
					stage.captionCurIdx = null;
					for (let key in stage.CAPTION_DATA) {
						if (stage.playTime >= stage.captionFs.getTime(stage.CAPTION_DATA[key].startTime) && stage.playTime <= stage.captionFs.getTime(stage.CAPTION_DATA[key].endTime)) {
							if (stage.captionOldIdx === stage.captionCurIdx) break;
							stage.captionCurIdx = key;
							break;
						}
					}
				},
				getTime: function (value) {
					return parseFloat(value.split(":")[0]) * 60 + parseFloat(value.split(":")[1]);
				}
			};
			(function () {
				util.addEvt(stage.captionBtn, "click", function () {
					if (stage.isCaptionOn) {
						stage.isCaptionOn = false;
						util.removeCls(stage.captionBtn, "on");
						util.removeCls(stage.captionContainer, "caption--show");
						clearInterval(stage.syncUpdateInterval);
						EDUTSS.isDevMsg && console.log("#D: video 자막 닫기");
					} else {
						stage.isCaptionOn = true;
						util.addCls(stage.captionBtn, "on");
						util.addCls(stage.captionContainer, "caption--show");
						stage.captionFs.getCaptionTxt();
						stage.captionFs.captionUpdate();
						EDUTSS.isDevMsg && console.log("#D: video 자막 열기");
					}
				});
			})();
		}
	};
}();

EDUTSS.dragUtil = {
	setPluralValue: function (stage, items) {
		if (stage.correctAnswer) {
			stage.pluralArea = this.getPluralArea(stage.correctAnswer, stage.isOnce);
			stage.pluralDrag = this.getPluralSelect(stage.correctAnswer, items, stage.isOnce);
		}
	},
	getPluralArea: function (answer, isOnce) {
		let chk = false;
		answer.forEach(function (arr) {
			if (arr.length > 1 && !isOnce) chk = true;
		});
		EDUTSS.isDevMsg && chk && console.log("#D: drop에 여러개 드래그 가능");
		return chk;
	},
	getPluralSelect: function (answer, items, isOnce) {
		let chk = false;
		items.forEach(function (elem) {
			if (EDUTSS.dragUtil.getPluralCorrect(answer, elem.dataset.num) > 1 && !isOnce) chk = true;
		});
		EDUTSS.isDevMsg && chk && console.log("#D: drag 중복 이동 가능");
		return chk;
	},
	getPluralCorrect: function (arr, num) {
		const dropLen = arr.filter(function (n) {
			return n.includes(Number(num));
		}).length;
		return dropLen;
	},
	selectHasDone: function (stage) {
		stage.isHasValue = this.hasDone("value", stage.userValue, stage.doneNum, stage.thisNum);
		stage.isHasAnswer = this.hasDone("answer", stage.correctAnswer, stage.doneNum, stage.thisNum, stage);
	},
	hasDone: function (type, arr, done, select, stage) {
		if (type === "answer" && stage.isPairType && stage.droppedCnt) {
			const pairs = stage.thisSelect.dataset.pair.split(",");
			const userValues = stage.userValue.flat();
			let isPairing = false;
			if (stage.userValue[done].length === 0) {
				pairs.forEach(function (pair) {
					userValues.includes(Number(pair)) && (isPairing = true);
				});
			}
			return isPairing;
		}
		if (arr[done]) {
			return arr[done].includes(select);
		}
	},
	setSelectItems: function (e, stage) {
		stage.thisSelect = e.currentTarget;
		stage.thisNum = parseInt(stage.thisSelect.dataset.num);
		if (stage.thisSelect.dataset.pointerGroup) {
			stage.groupName = stage.thisSelect.dataset.pointerGroup;
		}
	},
	directCheckResult: function (stage) {
		stage.userValue[stage.doneNum].push(stage.thisNum);
		this.checkPluralDone(stage);
		this.directShowResult(stage);
	},
	checkPluralDone: function (stage) {
		let userPlural = this.getPluralCorrect(stage.userValue, stage.thisNum);
		if (userPlural === stage.correctPlural || stage.isOnce) {
			"drag" === stage.type && EDUTSS.util.addCls(stage.thisSelect, "drag--done");
			"draw" === stage.type && EDUTSS.util.addCls(stage.thisSelect, "draw--done");
		}
		if (stage.userValue[stage.doneNum].length === stage.correctAnswer[stage.doneNum].length || stage.isPairType || stage.isOnce) {
			"drag" === stage.type && EDUTSS.util.addCls(stage.dropItems[stage.doneNum], "drop--done");
			"draw" === stage.type && EDUTSS.util.addCls(stage.endItems[stage.doneNum], "line--done");
		}
	},
	directShowResult: function (stage) {
		if (JSON.stringify(stage.userValue) === JSON.stringify(stage.correctAnswer)) {
			stage.isCorrect = true;
			EDUTSS.quiz.resultQuiz(stage.qid);
		} else {
			stage.isCorrect = false;
		}
	},
	addClsDone: function (stage) {
		stage.userValue[stage.doneNum].push(stage.thisNum);
		if (!stage.pluralArea && !stage.pluralDrag) {
			this.checkPluralDone(stage);
		}
		if (!stage.pluralDrag) {
			"drag" === stage.type && EDUTSS.util.addCls(stage.dropItems[stage.doneNum], "drop--done");
			"draw" === stage.type && EDUTSS.util.addCls(stage.endItems[stage.doneNum], "line--done");
		}
		if (stage.isDragSingle && "drag" === stage.type) {
			EDUTSS.util.addCls(stage.dropItems[stage.doneNum], "drop--done");
		}
	},
	getSeletDone: function (e, itemsPosition, stage) {
		const left = e.touches ? e.touches[0].clientX : e.clientX;
		const top = e.touches ? e.touches[0].clientY : e.clientY;
		let selectIdx;
		for (let i = 0; i < stage.dropItems.length; i++) {
			if (left > itemsPosition["drop" + i].x && left < itemsPosition["drop" + i].x + itemsPosition["drop" + i].width && (top > itemsPosition["drop" + i].y && top < itemsPosition["drop" + i].y + itemsPosition["drop" + i].height)) {
				selectIdx = i;
			}
		}
		if (!selectIdx && selectIdx !== 0) {
			const dragPos = stage.thisSelect.getBoundingClientRect();
			let stickToDrop;
			for (let i = 0; i < stage.dropItems.length; i++) {
				stickToDrop = getSelectItems(dragPos, itemsPosition["drop" + i]);
				if (stickToDrop === false) {
					selectIdx = i;
					break;
				}
			}
		}
		if (selectIdx || selectIdx === 0) {
			if (stage.selectDropItems !== selectIdx) {
				EDUTSS.util.removeCls(stage.dropItems, "select--drop");
				EDUTSS.util.addCls(stage.dropItems[selectIdx], "select--drop");
				stage.selectDropItems = selectIdx;
			}
		} else {
			EDUTSS.util.removeCls(stage.dropItems, "select--drop");
			stage.selectDropItems = null;
		}

		function getSelectItems(drag, drop) {
			return drag.left > drop.left + drop.width || drag.left + drag.width < drop.left || drag.top > drop.top + drop.height || drag.top + drag.height < drop.top;
		}
	},
	getDoneElement: function (e, stage) {
		stage.doneEl = e.target;
		stage.doneNum = null;
		stage.isSuccess = false;
		if (!stage.doneEl || !stage.doneEl.dataset || stage.doneEl.dataset.quizPointer === undefined) {
			return;
		}
		if (stage.doneEl.dataset.quizPointer === "drag" || stage.doneEl.dataset.quizPointer === "start") {
			stage.doneEl.style.zIndex && stage.doneEl.style.removeProperty("z-index");
		}
		if (EDUTSS.util.isTouch) {
			stage.doneEl = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
		} else {
			stage.doneEl = document.elementFromPoint(e.clientX, e.clientY);
		}
		if (stage.type === "drag") {
			if (stage.doneEl && stage.doneEl.dataset.quizPointer === "drop") {
				stage.doneNum = parseInt(stage.doneEl.dataset.num) - 1;
			}
		} else if (stage.type === "draw") {
			if (stage.doneEl && stage.doneEl.dataset.quizPointer === "end") {
				stage.doneNum = parseInt(stage.doneEl.dataset.num) - 1;
			}
		}
	},
	isGroupName: function (stage) {
		if (stage.groupName && stage.groupName !== stage.doneEl.dataset.pointerGroup) {
			EDUTSS.isDevMsg && console.log("#D: 동일 그룹이 아님");
			stage.isSuccess = false;
		}
	},
	saveSendComplete: function (stage) {
		if (stage.type === "drag") {
			EDUTSS.complete && EDUTSS.complete.dragDrop(stage, stage.thisNum, stage.doneNum);
		} else if (stage.type === "draw") {
			EDUTSS.complete && EDUTSS.complete.drawLine(stage, stage.thisNum, stage.doneNum);
		}
		EDUTSS.isDTBOOK && EDUTSS.quizDtBook && EDUTSS.quizDtBook.dtSaveQuizData(stage.qid);
	},
	getCoord: function (e, pos) {
		pos["coord"] = {
			left: e.touches ? e.touches[0].clientX : e.clientX,
			top: e.touches ? e.touches[0].clientY : e.clientY
		};
		return pos;
	},
	setDragPosition: function (item, pos) {
		if (EDUTSS.util.hasCls(item, "is--scale")) {
			pos["drag"].moveLeft = pos["coord"].left - pos["drag"].width / 2 - pos["dragArea"].left;
			pos["drag"].moveTop = pos["coord"].top - pos["drag"].height / 2 - pos["dragArea"].top;
		} else {
			pos["drag"].moveLeft = pos["coord"].left - pos["drag"].prevLeft - pos["dragArea"].left;
			pos["drag"].moveTop = pos["coord"].top - pos["drag"].prevTop - pos["dragArea"].top;
		}
		item.style.left = pos["drag"].moveLeft / EDUTSS.scaleValue.zoom + "px";
		item.style.top = pos["drag"].moveTop / EDUTSS.scaleValue.zoom + "px";
	},
	resetDragPosition: function (item) {
		if (item.dataset.randomPosition) {
			item.style.left = item.dataset.randomPosition.split(",")[0];
			item.style.top = item.dataset.randomPosition.split(",")[1];
		} else {
			item.style.left = null;
			item.style.top = null;
		}
	},
	getDragPosition: function (area, drag, drop) {
		let pos = {};
		area.forEach(function (e) {
			pos[e.dataset.quizArea + "Area"] = e.getBoundingClientRect();
		});
		pos["drag"] = drag.getBoundingClientRect();
		if (drop) {
			drop.forEach(function (e, idx) {
				pos["drop" + idx] = e.getBoundingClientRect();
			});
		}
		EDUTSS.isDevMsg && console.log(pos);
		return pos;
	},
	dragStickTo: function (idx, pos) {
		return pos["drag"].left > pos["drop" + idx].left + pos["drop" + idx].width || pos["drag"].left + pos["drag"].width < pos["drop" + idx].left || pos["drag"].top > pos["drop" + idx].top + pos["drop" + idx].height || pos["drag"].top + pos["drag"].height < pos["drop" + idx].top;
	},
	cloneDrag: function (stage, thisSelect) {
		let clone = thisSelect.cloneNode(true);
		if (!stage.pluralArea) clone.classList.add("inline_flex");
		EDUTSS.util.removeCls(clone, "this--dragging is--scale");
		clone.removeAttribute("data-quiz-pointer");
		clone.removeAttribute("data-random-position");
		this.resetDragPosition(clone);
		return clone;
	},
	getDrawPosition: function (svgContainer, startDot) {
		let position = {};
		position["svg"] = svgContainer.getBoundingClientRect();
		position["start"] = startDot.getBoundingClientRect();
		EDUTSS.isDevMsg && console.log(position);
		return position;
	},
	drawStartPosition: function (pos) {
		let position = {};
		position = {
			x: (pos["start"].left - pos["svg"].left + pos["start"].width / 2) / EDUTSS.scaleValue.zoom,
			y: (pos["start"].top - pos["svg"].top + pos["start"].height / 2) / EDUTSS.scaleValue.zoom
		};
		EDUTSS.isDevMsg && console.log(position);
		return position;
	},
	drawEndPosition: function (e, pos, dot) {
		let position = {},
			posX, posY, endDot;
		if (dot) {
			endDot = dot.getBoundingClientRect();
			posX = endDot.left + endDot.width / 2;
			posY = endDot.top + endDot.height / 2;
		} else {
			posX = e.touches ? e.touches[0].clientX : e.clientX;
			posY = e.touches ? e.touches[0].clientY : e.clientY;
		}
		position = {
			x: (posX - pos["svg"].left) / EDUTSS.scaleValue.zoom,
			y: (posY - pos["svg"].top) / EDUTSS.scaleValue.zoom
		};
		EDUTSS.isDevMsg && console.log(position);
		return position;
	},
	drawAnswerPosition: function (svgContainer, dotWrap) {
		let itemsPosition = {};
		let returnPosition = {};
		itemsPosition["svg"] = svgContainer.getBoundingClientRect();
		itemsPosition["dot"] = dotWrap.getBoundingClientRect();
		returnPosition = {
			x: (itemsPosition["dot"].left - itemsPosition["svg"].left + itemsPosition["dot"].width / 2) / EDUTSS.scaleValue.zoom,
			y: (itemsPosition["dot"].top - itemsPosition["svg"].top + itemsPosition["dot"].height / 2) / EDUTSS.scaleValue.zoom
		};
		EDUTSS.isDevMsg && console.log(returnPosition);
		return returnPosition;
	},
	isInLine: function (svg, name, idx) {
		let line = EDUTSS.util.getEle(name, svg),
			value = false;
		line.forEach(function (elem) {
			if (parseInt(elem.getAttribute(name)) === idx) value = true;
		});
		return value;
	},
	createLine: function (svg, name, startNum) {
		let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		return line.setAttribute("class", name), line.setAttribute("data-start-num", startNum),
			svg.appendChild(line);
	},
	drawLine: function (line, startPoint, endPoint, endNum) {
		return line.setAttribute("x1", startPoint.x), line.setAttribute("y1", startPoint.y),
			line.setAttribute("x2", endPoint.x), line.setAttribute("y2", endPoint.y),
			endNum && line.setAttribute("data-end-num", endNum), line;
	},
	loadDrawData: function (elem) {
		let drawEle, quizId, target = elem[0] || elem;
		drawEle = EDUTSS.util.getEle(".is--not--rect", target);
		if (drawEle.length > 0) {
			drawEle.forEach(function (el) {
				if (EDUTSS.util.isInDisplay(el) && EDUTSS.util.hasCls(el, "is--not--rect")) {
					quizId = el.dataset.quizId;
					EDUTSS.util.removeCls(el, "is--not--rect");
					EDUTSS.quizDtBook.dtLoadData(quizId);
				}
			});
		}
	}
};

EDUTSS.quizData = {
	DATA: {},
	setData: function (t) {
		const DEFAULT = this.DEFAULT_OPTION;
		let data = {};
		data.container = t;
		data.qid = t.dataset.quizId;
		data.type = t.dataset.quizType;
		data.totalChance = DEFAULT.totalChance;
		data.isMarking = DEFAULT.marking;
		data.isCommonFeedback = DEFAULT.commonFeedback || false;
		data.isEachFeedback = false;
		data.isFeedback = false;
		data.isSolvingCheck = DEFAULT.solvingCheck || false;
		data.isEmptyFeedback = DEFAULT.emptyFeedback || false;
		data.isCorrect = false;
		data.isExample = false;
		data.isDirectCheck = false;
		data.isActivity = false;
		data.isCheckToggle = false;
		data.isDragSingle = false;
		data.controlShowHide = DEFAULT.controlShowHide || false;
		data.isSendCaliperSensor = false;
		data.isDuplicationPopup = false;
		data.isViewAnswer = false;
		data.chance = 0;
		data.wrongScore = 0;
		data.isCorrectList = [];
		data.droppedCnt = 0;
		data.isPairType = false;
		data.isWordMatching = false;
		data.isOnce = false;
		data.isBlindAnswer = false;
		if (t.dataset.quizOption) {
			data.option = t.dataset.quizOption.split("//");
			data.option.forEach(function (key) {
				-1 !== key.indexOf("chance:") && (data.totalChance = parseInt(key.replace("chance:", ""))),
					-1 !== key.indexOf("commonfeedback") && (DEFAULT.commonFeedback ? data.isCommonFeedback = false : data.isCommonFeedback = true),
					-1 !== key.indexOf("feedCls:") && (data.feedbackCls = key.replace("feedCls:", "")),
					-1 !== key.indexOf("marking") && (DEFAULT.marking ? data.isMarking = false : data.isMarking = true),
					-1 !== key.indexOf("solving") && (DEFAULT.solvingCheck ? data.isSolvingCheck = false : data.isSolvingCheck = true),
					-1 !== key.indexOf("empty") && (DEFAULT.emptyFeedback ? data.isEmptyFeedback = false : data.isEmptyFeedback = true),
					-1 !== key.indexOf("free") && (data.isFreeDrag = true), -1 !== key.indexOf("direct") && (data.isDirectCheck = true),
					-1 !== key.indexOf("toggle") && (data.isCheckToggle = true), -1 !== key.indexOf("single") && (data.isDragSingle = true),
					-1 !== key.indexOf("nopass") && (data.isTurnNopass = true), -1 !== key.indexOf("turn:") && (data.isTurn = true,
						data.turnTime = parseInt(key.replace("turn:", ""))), -1 !== key.indexOf("ex") && (data.isExample = true,
						data.isBlindAnswer = true), -1 !== key.indexOf("btn") && (DEFAULT.controlShowHide ? data.controlShowHide = false : data.controlShowHide = true),
					-1 !== key.indexOf("pair") && (data.isPairType = true), -1 !== key.indexOf("word-matching") && (data.isWordMatching = true),
					-1 !== key.indexOf("once") && (data.isOnce = true), -1 !== key.indexOf("viewtab") && (data.isViewAnswer = true); -
				1 !== key.indexOf("blind") && (data.isBlindAnswer = true);
			});
		}
		data.correctAnswer = this.getAnswer(t, data.type);
		data.userValue = this.resetUserValue(data.correctAnswer);
		data.controlBtns = EDUTSS.util.getEle("[data-quiz-target='" + t.dataset.quizId + "']") || null;
		data.controlBtns.forEach(function (elem) {
			elem.dataset.popup && (data.isDuplicationPopup = true);
		});
		data.isExample && this.getExample(data);
		data.hintItems = EDUTSS.util.getEle("[data-quiz-feed='hint']", data.container)[0] || null;
		if (!data.isCommonFeedback) {
			let eachFeedbackContainer = EDUTSS.util.getEle("[data-quiz-feed='feedback']", data.container)[0];
			if (eachFeedbackContainer) {
				data.eachFeedback = [];
				EDUTSS.util.getEle(".correct, .incorrect, .hint, .again, .empty, .done", eachFeedbackContainer).forEach(function (elem) {
					data.eachFeedback.push(elem);
				});
			} else {
				let customFeedback = EDUTSS.util.getEle(".quiz--btn--feedback", data.container)[0],
					btnTarget = EDUTSS.util.getEle("[data-quiz-btn='check'][data-quiz-target='" + data.qid + "']")[0];
				if (btnTarget && (customFeedback || EDUTSS.quizFeedBackText)) {
					const feedbackContainer = EDUTSS.util.createEle("div", {
						class: "each--feedback",
						"data-quiz-feed": "feedback"
					}, btnTarget.parentNode);
					data.eachFeedback = [];
					if (customFeedback) {
						EDUTSS.util.addCls(feedbackContainer, "custom");
						let childrenFeed = customFeedback.children;
						for (let i = 0; i < childrenFeed.length; i++) {
							createFeedback(childrenFeed[i].className, childrenFeed[i]);
						}
					} else if (EDUTSS.quizFeedBackText) {
						for (let name in EDUTSS.quizFeedBackText) {
							createFeedback(name, EDUTSS.quizFeedBackText[name]);
						}
					}

					function createFeedback(name, text) {
						let makeFeedback = EDUTSS.util.createEle("span", {
							class: name
						}, feedbackContainer);
						if (typeof text === "string") {
							makeFeedback.innerHTML = text;
						} else {
							makeFeedback.innerHTML = text.innerHTML;
						}
						data.eachFeedback.push(makeFeedback);
					}
				}
			}
			if (data.eachFeedback) {
				data.isEachFeedback = true;
			}
		}
		if (data.isCommonFeedback || data.isEachFeedback) data.isFeedback = true;
		if (EDUTSS.util.getEle(".caliper--description", t).length > 0 && t.closest("assessmentItem")) {
			data.isSendCaliperSensor = true;
			data.description = EDUTSS.util.getEle(".caliper--description", t)[0].textContent || "평가";
		}
		if (data.isTurn) {
			!data.turnTime && (data.turnTime = 3e3);
			!data.isTurnNopass && (data.isTurnNopass = false);
		}
		switch (data.type) {
			case "multiple":
				data.quizName = EDUTSS.util.getEle("[data-quiz-name]", data.container);
				if (data.quizName.length === 0) data.quizName = [data.container];
				data.selectItems = [];
				break;

			case "essay":
				data.essayItems = EDUTSS.util.getEle(".quiz--input", data.container);
				if (!data.correctAnswer) {
					data.userValue.length = data.essayItems.length;
					data.essayItems.forEach(function (key, idx) {
						data.userValue[idx] = [];
					});
				}
				break;

			case "draw":
				data.svgContainer = EDUTSS.util.getEle("[data-quiz-area='svg']", data.container)[0];
				data.startItems = EDUTSS.util.getEle("[data-quiz-pointer='start']", data.container);
				data.endItems = EDUTSS.util.getEle("[data-quiz-pointer='end']", data.container);
				break;

			case "drag":
				data.dragArea = EDUTSS.util.getEle("[data-quiz-area]", data.container);
				data.dragItems = EDUTSS.util.getEle("[data-quiz-pointer='drag']", data.container);
				data.dropItems = EDUTSS.util.getEle("[data-quiz-pointer='drop']", data.container);
				data.dropLen = data.dropItems.length;
				data.isRandomPosition = EDUTSS.randomDragPosition;
				let randomValue = EDUTSS.util.getEle("[data-quiz-area='drag']", data.container)[0].dataset.randomPosition || null;
				if (randomValue === "true") {
					data.isRandomPosition = true;
				} else if (randomValue === "false") {
					data.isRandomPosition = false;
				}
				break;

			case "layer":
				data.layerPopup = EDUTSS.util.getEle(".layer--select", data.container)[0];
				data.layerSelect = EDUTSS.util.getEle(".layer--return", data.container);
				data.layerOption = EDUTSS.util.getEle(".layer--option", data.layerPopup);
				data.selectPosition;
				data.selectIdx = 0;
				break;

			default:
				break;
		}
		if (EDUTSS.isDTBOOK) {
			if (data.type === "multiple" || data.type === "draw" || data.type === "drag") {
				data.isMergeSave = true;
				this.createSaveInput(t);
			}
		}
		this.DATA[data.qid] = data;
		EDUTSS.isDevMsg && (console.log("#D: 퀴즈 데이터"), console.log(data));
		this.addQuizActivity(this.DATA[data.qid], false);
	},
	getExample: function (data) {
		let exampleEle, nextEle, i, idx = 0;
		data.example = [];
		exampleEle = EDUTSS.util.getEle("[data-quiz-feed='example']", data.container);
		if (exampleEle.length > 0) {
			for (i = 0; i < exampleEle.length; i++) {
				data.example.push(exampleEle[i]);
			}
		}
		if (data.controlBtns.length > 0) {
			for (i = 0; i < data.controlBtns.length; i++) {
				nextEle = data.controlBtns[i].nextElementSibling;
				if (nextEle && nextEle.dataset.quizFeed) {
					data.controlBtns[i].dataset.popup = "next";
					nextEle.classList.add("toast", "example");
					nextEle.dataset.layoutType = "popup";
					data.example.push(nextEle);
				}
			}
		}
	},
	getAnswer: function (t, n) {
		let answerEle = EDUTSS.util.getEle("[data-quiz-answer]", t),
			answer = [],
			answerArr = false;
		if (answerEle.length > 0) {
			answerEle.forEach(function (key) {
				switch (n) {
					case "multiple":
						answer.push(key.textContent.split("//").map(Number));
						break;

					case "essay":
						answer.push(EDUTSS.util.getText(key.textContent).split("//"));
						break;

					default:
						answerArr = key.textContent.split("//");
						answerArr.forEach(function (str, idx) {
							answer[idx] = str.split(",").map(Number);
						});
						break;
				}
			});
		} else {
			answer = false;
		}
		return answer;
	},
	resetUserData: function (t) {
		let stage = this.DATA[t];
		stage.userValue = this.resetUserValue(stage.userValue);
		stage.isCorrect = false;
		stage.isCorrectList = [];
		stage.chance = 0;
		stage.wrongScore = 0;
		stage.isTurnIdx && (stage.isTurnIdx = 0);
		stage.droppedCnt = 0;
	},
	resetUserValue: function (t) {
		let arr = [];
		if (t) {
			t.forEach(function (key, idx) {
				arr[idx] = [];
			});
		}
		return arr;
	},
	getCaliperUser: function (stage) {
		let answer = null;
		console.log(stage);
		if (stage.type === "essay") {
			answer = [];
			let answerEle = EDUTSS.util.getEle("[data-quiz-answer]", stage.container);
			answerEle.forEach(function (elem) {
				answer.push(elem.previousSibling.textContent);
			});
		} else {
			answer = stage.userValue;
		}
		return answer.join();
	},
	getCaliperAnswer: function (stage) {
		let answerEle = EDUTSS.util.getEle("[data-quiz-answer]", stage.container),
			answer = null;
		if (answerEle.length > 0) {
			answer = [];
			answerEle.forEach(function (key) {
				answer.push(key.textContent.split("//"));
			});
		}
		return answer.join(" ");
	},
	createSaveInput: function (t) {
		let input = EDUTSS.util.getEle(".quiz--save--data", t);
		let inputId;
		if (input.length === 0) {
			inputId = "saveData_P" + EDUTSS.util.getFileNum() + "-quizID-" + t.dataset.quizId;
			EDUTSS.util.createEle("input", {
				id: inputId,
				class: "quiz--save--data hide"
			}, t);
			EDUTSS.isDevMsg && console.log("#D: 디지털교과서 저장 input 생성 => ID: " + inputId);
		}
	},
	addQuizActivity: function (stage, value, callback) {
		let isActive = true;
		let checkList;
		let isCheckListActive;
		switch (stage.type) {
			case "essay":
				stage.essayItems.length !== stage.userValue.length && (value = false);
				stage.essayItems.forEach(function (item, i) {
					const userVal = stage.userValue[i];
					const userText = userVal ? EDUTSS.util.getText(JSON.stringify(userVal)) : "";
					if (userText) {
						const minLen = Number(item.dataset.minLength) || 0;
						if (minLen && userText.length < minLen) {
							isActive = false;
						}
					} else {
						isActive = false;
					}
				});
				value = isActive;
				break;

			case "layer":
				let isActiveList = [];
				stage.layerSelect.forEach(function (input) {
					isActiveList.push(!!input.value || !!input.className.match(/bg\d/));
				});
				isActiveList.includes(false) ? value = false : value = true;
				break;

			default:
				break;
		}
		checkList = EDUTSS.util.getEle("[data-func-check]", stage.container);
		checkList.forEach(function (elem) {
			isCheckListActive = EDUTSS.view.getCheckActivity(elem);
			!isCheckListActive && (value = false);
		});
		if (value) {
			stage.isActivity = true;
			stage.container.dataset.isActivity = true;
			EDUTSS.util.addCls(stage.container, "is--activity");
			EDUTSS.util.removeCls(stage.container, "is--not--activity");
			EDUTSS.util.getEle("[data-quiz-marking='" + stage.qid + "']").forEach(function (elem) {
				if (elem.dataset.tabNav || elem.dataset.viewedList) {
					EDUTSS.util.addCls(elem, "is--activity");
					EDUTSS.util.removeCls(elem, "is--not--activity");
				}
			});
		} else {
			stage.isActivity = false;
			stage.container.dataset.isActivity = false;
			EDUTSS.util.removeCls(stage.container, "is--activity");
			EDUTSS.util.addCls(stage.container, "is--not--activity");
			EDUTSS.util.getEle("[data-quiz-marking='" + stage.qid + "']").forEach(function (elem) {
				if (elem.dataset.tabNav || elem.dataset.viewedList) {
					EDUTSS.util.removeCls(elem, "is--activity");
					EDUTSS.util.addCls(elem, "is--not--activity");
				}
			});
		}
	}
};

EDUTSS.quizFeedBack = function () {
	const util = EDUTSS.util,
		sound = EDUTSS.sound;
	return {
		initFeedback: function () {
			let feedBack = util.createEle("div", {
				class: "feedback--container"
			}, util.getEle("#wrap"));
			util.createEle("div", {
				class: "feed--img"
			}, feedBack);
			util.addCls(feedBack, "grade_" + EDUTSS.isGrade);
		},
		playFeedback: function (stage, type, totalQuiz, unusual) {
			let target;
			if (type === true) {
				type = "correct";
			} else if (type === false) {
				type = "incorrect";
			}
			if (!unusual) {
				if (type === "empty") {
					if (stage.isEachFeedback) {
						stage.eachFeedback.forEach(function (elem) {
							util.removeCls(elem, "show");
							util.hasCls(elem, "empty") && (target = elem);
						});
					}
					if (!target) {
						target = util.getEle(".feedback--container")[0];
						util.addCls(target, "empty");
					}
				} else {
					if (totalQuiz || stage.isCommonFeedback) {
						target = util.getEle(".feedback--container")[0];
						util.addCls(target, type);
					} else if (stage.isEachFeedback) {
						stage.eachFeedback.forEach(function (elem) {
							util.removeCls(elem, "show");
							if (util.hasCls(elem, type)) {
								target = elem;
								if (type === "incorrect") {
									const wrongNumEle = util.getEle(".wrong", elem)[0];
									if (wrongNumEle) {
										if (!stage.isWordMatching) {
											stage.correctAnswer.forEach(function (arr, idx) {
												if (stage.userValue[idx] && JSON.stringify(arr) !== JSON.stringify(stage.userValue[idx])) stage.wrongScore++;
											});
										}
										wrongNumEle.textContent = stage.wrongScore;
									}
								}
							}
						});
					}
				}
			} else {
				target = util.getEle("." + type, unusual)[0];
			}
			if (target) {
				if (target.dataset.feedPlay !== "play") {
					if (stage.isCommonFeedback) {
						hideFeedback();
					} else if (type !== "correct" && type !== "incorrect") {
						hideFeedback();
					}
				}
				this.showFeedback(target, type);
				stage.feedbackCls && util.addCls(target, stage.feedbackCls);
			}

			function hideFeedback() {
				setTimeout(function () {
					util.removeCls(target, "show");
					target.removeAttribute("data-feed-play");
					stage.feedbackCls && util.removeCls(target, stage.feedbackCls);
					if (!unusual && (totalQuiz || stage.isCommonFeedback)) util.removeCls(target, "correct incorrect again hint empty done");
				}, 1500);
			}
		},
		showFeedback: function (element, type) {
			util.addCls(element, "show");
			element.dataset.feedPlay = "play";
			switch (type) {
				case "correct":
					EDUTSS.isDevMsg && console.log("#D: 피드백 : 정답 입니다.");
					sound.playAudio("correct");
					break;

				case "incorrect":
					EDUTSS.isDevMsg && console.log("#D: 피드백 : 오답 입니다.");
					sound.playAudio("incorrect");
					break;

				case "hint":
					EDUTSS.isDevMsg && console.log("#D: 피드백 : 힌트를 보고 다시 풀어주세요.");
					sound.playAudio("again");
					break;

				case "again":
					EDUTSS.isDevMsg && console.log("#D: 피드백 : 문제를 다시 풀어주세요.");
					sound.playAudio("again");
					break;

				case "empty":
					EDUTSS.isDevMsg && console.log("#D: 피드백 : 문제를 풀어주세요.");
					sound.playAudio("empty");
					break;

				case "done":
					EDUTSS.isDevMsg && console.log("#D: 피드백 : 정답 확인을 눌러보세요.");
					sound.playAudio("empty");
					break;

				case "done":
					EDUTSS.isDevMsg && console.log("#D: 피드백 : 예시 답안 확인");
					break;

				default:
					break;
			}
		}
	};
}();

EDUTSS.quizDtBook = function () {
	const util = EDUTSS.util,
		quizData = EDUTSS.quizData,
		dragUtil = EDUTSS.dragUtil;
	return {
		dtLoadData: function (qid) {
			const stage = quizData.DATA[qid],
				inputEle = util.getEle("input, textarea", stage.container),
				saveInput = util.getEle(".quiz--save--data", stage.container)[0];
			let loadCheck = [],
				loadComplete = false,
				thisId, checkTime = 0;
			let interval = setInterval(function () {
				checkTime++;
				if (!parent.ZOOMVALUE && checkTime <= 50) {
					EDUTSS.isDevMsg && console.log("#D: 디지털교과서 연동 : Zoom Value 확인");
				} else {
					parent.ZOOMVALUE && (EDUTSS.scaleValue.zoom = parent.ZOOMVALUE);
					inputEle.forEach(function (elem) {
						if (!stage.isMergeSave) {
							if (util.hasCls(elem, "check--input")) return;
							thisId = elem.getAttribute("id");
							if (!thisId) return;
							if (loadCheck.indexOf(thisId) !== -1) clearInterval(interval);
							if (elem.checked === true || elem.value !== "") {
								loadCheck.push(thisId);
								if (!loadComplete && !stage.isDtLoad) {
									loadComplete = true;
									EDUTSS.quizDtBook.dtInitQuiz(qid);
								}
							}
						} else {
							thisId = saveInput.getAttribute("id");
							if (util.hasCls(stage.container, "is--not--rect")) return;
							if (!thisId) return;
							if (loadCheck.indexOf(thisId) !== -1) clearInterval(interval);
							if (saveInput && saveInput.value !== "") {
								loadCheck.push(thisId);
								if (!loadComplete && !stage.isDtLoad) {
									stage.userValue = JSON.parse(saveInput.value.slice(1).slice(0, -1));
									loadComplete = true;
									EDUTSS.quizDtBook.dtInitQuiz(qid);
								}
							}
						}
					});
				}
			}, 100);
			setTimeout(function () {
				clearInterval(interval);
			}, 7e3);
			EDUTSS.isDevMsg && console.log("#D: 디지털교과서 연동");
		},
		dtInitQuiz: function (qid) {
			const stage = EDUTSS.quizData.DATA[qid];
			switch (stage.type) {
				case "multiple":
					let valueNum;
					stage.userValue.forEach(function (value, idx) {
						for (let i = 0; i < value.length; i++) {
							valueNum = value[i];
							stage.selectItems[idx] && stage.selectItems[idx].forEach(function (elem) {
								parseInt(elem.dataset.multipleNum) === valueNum && util.addCls(elem, "select--on");
							});
						}
					});
					break;

				case "essay":
					stage.essayItems.forEach(function (elem, idx) {
						const spelling = elem.getAttribute("maxlength") || null;
						let txt = util.getText(elem.value).trim();
						if (spelling === "1") txt = txt.toLowerCase();
						stage.userValue[idx] = [txt];
						if (!stage.isExample && stage.correctAnswer && stage.correctAnswer[idx].length > 1 && stage.correctAnswer[idx].includes(txt)) {
							stage.userValue[idx] = stage.correctAnswer[idx];
						}
					});
					break;

				case "drag":
					resultDtDragQuiz();
					break;

				case "draw":
					resultDtDrawQuiz();
					break;

				case "layer":
					stage.layerSelect.forEach(function (input) {
						input.value && util.addCls(input, input.value);
					});
					break;

				default:
					break;
			}

			function resultDtDragQuiz() {
				let dropNum, startNum, i;
				for (dropNum = 0; dropNum < stage.userValue.length; dropNum++) {
					startNum = stage.userValue[dropNum];
					if (!startNum || startNum.length === 0) continue;
					if (startNum.length > 1) {
						for (i = 0; i < startNum.length; i++) {
							cloneDragItem(startNum[i], stage.dropItems[dropNum]);
						}
					} else {
						cloneDragItem(startNum, stage.dropItems[dropNum]);
					}
					if (!stage.pluralArea && !stage.pluralDrag) {
						if (dragUtil.getPluralCorrect(stage.userValue, startNum) === stage.correctAnswer[dropNum].length || dragUtil.getPluralCorrect(stage.userValue, startNum) && stage.isOnce) {
							util.addCls(stage.dragItems[startNum - 1], "drag--done");
							util.addCls(stage.dropItems[dropNum], "drop--done");
						}
					}
				}
				if (stage.isDirectCheck && stage.pluralArea && stage.pluralDrag) {
					for (i = 0; i < stage.dragItems.length; i++) {
						if (dragUtil.getPluralCorrect(stage.userValue, i + 1) === dragUtil.getPluralCorrect(stage.correctAnswer, i + 1)) {
							util.addCls(stage.dragItems[i], "drag--done");
						}
					}
					for (i = 0; i < stage.dropItems.length; i++) {
						if (stage.userValue[i].length === stage.correctAnswer[i].length) {
							util.addCls(stage.dropItems[i], "drop--done");
						}
					}
				}

				function cloneDragItem(num, items) {
					let clone = util.getEle("[data-quiz-pointer='drag'][data-num='" + num + "']", stage.container)[0].cloneNode(true);
					if (!stage.pluralArea) clone.classList.add("inline_flex");
					clone.removeAttribute("data-quiz-pointer");
					clone.removeAttribute("data-random-position");
					items.appendChild(clone);
				}
			}

			function resultDtDrawQuiz() {
				let startPoint = {},
					endPoint = {},
					endNum, startNum, i;
				for (endNum = 0; endNum < stage.userValue.length; endNum++) {
					startNum = stage.userValue[endNum];
					startPoint = dragUtil.drawAnswerPosition(stage.svgContainer, stage.endItems[endNum]);
					if (!startNum || startNum.length === 0) continue;
					if (startNum.length > 1) {
						for (i = 0; i < startNum.length; i++) {
							loadDrawLine(startNum[i], endNum);
						}
					} else {
						loadDrawLine(startNum, endNum);
					}
					if (!stage.pluralArea) {
						if (dragUtil.getPluralCorrect(stage.userValue, startNum) === stage.correctAnswer[endNum].length) {
							util.addCls(stage.startItems[startNum - 1], "draw--done");
							util.addCls(stage.endItems[endNum], "line--done");
						}
					}
				}

				function loadDrawLine(startNum, endNum) {
					endPoint = dragUtil.drawAnswerPosition(stage.svgContainer, stage.startItems[startNum - 1]);
					stage.thisLine = dragUtil.createLine(stage.svgContainer, "user--line", startNum);
					dragUtil.drawLine(stage.thisLine, startPoint, endPoint, endNum + 1);
				}
			}
			if (stage.userValue) {
				EDUTSS.quiz.controlBtnHandler(stage);
				EDUTSS.quizData.addQuizActivity(stage, true);
			}
		},
		dtResetQuiz: function (qid) {
			if (typeof parent.API_ANNOTATION_INPUT_DELETE !== "function") return;
			const stage = quizData.DATA[qid],
				inputEle = util.getEle("input, textarea", stage.container);
			inputEle.forEach(function (input) {
				let inputId = input.getAttribute("id");
				if (inputId) {
					input.value = "";
					input.checked = false;
					parent.API_ANNOTATION_INPUT_DELETE(inputId);
				}
			});
		},
		dtSaveQuizData: function (qid) {
			const stage = quizData.DATA[qid],
				saveInput = util.getEle(".quiz--save--data", stage.container)[0];
			if (saveInput) {
				saveInput.value = "(" + JSON.stringify(stage.userValue) + ")";
				stage.isDtLoad = true;
			}
		},
		sendCaliperSensor: function (qid) {
			const stage = quizData.DATA[qid],
				quizContainer = stage.container.closest("assessmentItem") || stage.container;
			DTCaliperSensor.fire({
				correct: stage.isCorrect,
				itemObject: quizContainer,
				value: EDUTSS.quizData.getCaliperAnswer(stage),
				userValue: EDUTSS.quizData.getCaliperUser(stage),
				description: stage.description,
				pageNumber: parseInt(util.getFileNum())
			});
		}
	};
}();

EDUTSS.quiz = function () {
	const util = EDUTSS.util,
		quizData = EDUTSS.quizData,
		quizFeedBack = EDUTSS.quizFeedBack,
		quizDtBook = EDUTSS.quizDtBook,
		dragUtil = EDUTSS.dragUtil,
		sound = EDUTSS.sound;
	return {
		initQuizType: function (init_option) {
			EDUTSS.isQuizDragSound = true;
			EDUTSS.randomDragPosition = true;
			EDUTSS.emptyCheckActivity = true;
			EDUTSS.quizData.DEFAULT_OPTION = init_option;
			const quizEle = util.getEle("[data-quiz-type]");
			quizEle.forEach(function (elem) {
				const qid = elem.dataset.quizId,
					type = elem.dataset.quizType;
				quizData.setData(elem);
				switch (type) {
					case "multiple":
						EDUTSS.quiz.multipleQuiz(qid);
						break;

					case "essay":
						EDUTSS.quiz.essayQuiz(qid);
						break;

					case "draw":
						EDUTSS.quiz.drawQuiz(qid);
						break;

					case "drag":
						EDUTSS.quiz.dragQuiz(qid);
						break;

					case "layer":
						EDUTSS.quiz.layerQuiz(qid);
						break;

					default:
						break;
				}
				EDUTSS.quiz.syncControlBtn(qid);
				setTimeout(function () {
					EDUTSS.isDTBOOK && quizDtBook.dtLoadData(qid, type);
				}, 500);
			});
			if (quizEle.length > 0) {
				this.initControlBtn();
				quizFeedBack.initFeedback();
			}
		},
		multipleQuiz: function (qid) {
			const stage = quizData.DATA[qid];
			EDUTSS.isDevMsg && console.log("#D: 객관식 세트([data-quiz-name]) => " + stage.quizName.length + "개");
			if (stage.isTurn) {
				stage.isTurnIdx = 0;
				stage.isTurnTotal = stage.quizName.length;
				EDUTSS.isDevMsg && console.log("#D: 객관식 순차 학습");
				this.createTurnNav(stage);
			}
			stage.quizName.forEach(function (elem, idx) {
				stage.selectItems[idx] = util.getEle("[data-multiple-num]", elem);
				util.addEvt(stage.selectItems[idx], "click", function (e) {
					if (util.hasCls(stage.container, "quiz--complete")) return;
					e.preventDefault();
					selectCheckItems.call(this, e, idx);
					!stage.isDirectCheck && EDUTSS.sound.playAudio("click");
				});
				if (stage.isTurn) idx === 0 && util.addCls(elem, "turn--show");
			});

			function selectCheckItems(e, idx) {
				const selectItems = stage.selectItems[idx];
				let thisIndex = parseInt(e.currentTarget.dataset.multipleNum),
					userSelectNum = [];
				selectItems.forEach(function (elem) {
					let choiceNum = parseInt(elem.dataset.multipleNum);
					if (choiceNum === thisIndex) {
						if (util.hasCls(elem, "select--on")) {
							util.removeCls(elem, "select--on");
						} else {
							util.addCls(elem, "select--on");
							stage.isDirectCheck && util.addCls(elem, "select--checked");
						}
					} else {
						if (stage.correctAnswer[idx].length < 2) {
							util.removeCls(elem, "select--on");
						}
					}
					if (util.hasCls(elem, "select--on")) userSelectNum.push(choiceNum);
				});
				EDUTSS.isDevMsg && console.log("#D: 객관식 선택 => " + userSelectNum);
				stage.userValue[idx] = userSelectNum;
				EDUTSS.quizData.addQuizActivity(stage, userSelectNum.length ? true : false);
				if (stage.isDirectCheck) {
					if (stage.isTurn) {
						turnMultipleQuiz();
					} else {
						EDUTSS.quiz.checkQuiz(qid);
					}
				} else {
					EDUTSS.quiz.controlBtnHandler(stage);
				}
				EDUTSS.isDTBOOK && quizDtBook.dtSaveQuizData(qid);

				function turnMultipleQuiz() {
					let directFeedback = util.getEle("[data-quiz-feed='direct']", stage.quizName[stage.isTurnIdx])[0],
						passValue = false;
					util.addCls(directFeedback, "show");
					util.removeCls(util.getEle(".show", directFeedback), "show");
					if (JSON.stringify(stage.userValue[stage.isTurnIdx]) === JSON.stringify(stage.correctAnswer[stage.isTurnIdx])) {
						passValue = true;
						EDUTSS.sound.playAudio("correct");
					} else {
						util.addCls(util.getEle(".incorrect", directFeedback), "show");
						passValue = false;
						EDUTSS.sound.playAudio("incorrect");
					}
					if (passValue && JSON.stringify(stage.correctAnswer[stage.isTurnIdx]) === "[2]") {
						util.addCls(util.getEle("[data-quiz-feed='wrong']", stage.quizName[stage.isTurnIdx])[0], "show");
					}
					if (stage.isTurnNopass && !passValue) {} else {
						if (stage.isTurnIdx < stage.isTurnTotal - 1) {
							let selectItems = stage.selectItems[stage.isTurnIdx][stage.correctAnswer[stage.isTurnIdx][0] - 1];
							util.addCls(selectItems, "select--answer");
							util.addCls(stage.quizName[stage.isTurnIdx], "turn--done");
							util.createMarkingGif(selectItems);
							setTimeout(function () {
								stage.isTurnIdx++;
								EDUTSS.quiz.moveTurnNav(stage, stage.isTurnIdx);
							}, stage.turnTime);
						} else {
							stage.correctAnswer.forEach(function (elem, idx) {
								elem[0] === 2 && util.addCls(util.getEle("[data-quiz-feed='wrong']", stage.quizName[idx])[0], "show");
							});
							util.removeCls(stage.turnIdxBtn, "disabled");
							EDUTSS.quiz.checkQuiz(qid);
							EDUTSS.quiz.controlBtnHandler(stage);
						}
					}
				}
			}
		},
		createTurnNav: function (stage) {
			let navWrap, idx, turnIdx;
			navWrap = util.createEle("span", {
				class: "turn--controller"
			}, stage.container);
			stage.turnNavPrev = util.createEle("span", {
				class: "btn turn--prev disabled"
			}, navWrap);
			stage.turnNavNext = util.createEle("span", {
				class: "btn turn--next disabled"
			}, navWrap);
			turnIdx = util.createEle("span", {
				class: "turn--idx"
			}, navWrap);
			stage.turnIdxCurrent = util.createEle("span", {
				class: "number current"
			}, turnIdx);
			stage.turnIdxTotal = util.createEle("span", {
				class: "number total"
			}, turnIdx);
			stage.turnCurrent = util.createEle("span", {
				class: "turn--current"
			}, navWrap);
			stage.turnThisNum = stage.isTurnIdx;
			for (let i = 0; i < stage.isTurnTotal; i++) {
				idx = util.createEle("span", {
					class: "idx disabled"
				}, stage.turnCurrent);
				idx.textContent = i + 1;
			}
			stage.turnIdxBtn = util.getEle(".idx", stage.turnCurrent);
			util.addEvt(stage.turnNavPrev, "click", function (e) {
				if (stage.isTurnIdx > 0) {
					stage.turnThisNum--;
					EDUTSS.quiz.moveTurnNav(stage, stage.turnThisNum);
					EDUTSS.sound.playAudio("click");
				}
			});
			util.addEvt(stage.turnNavNext, "click", function (e) {
				if (stage.isTurnIdx < stage.isTurnTotal) {
					stage.turnThisNum++;
					EDUTSS.quiz.moveTurnNav(stage, stage.turnThisNum);
					EDUTSS.sound.playAudio("click");
				}
			});
			util.addEvt(stage.turnIdxBtn, "click", function (e) {
				stage.turnThisNum = util.getIdx(e.currentTarget);
				EDUTSS.quiz.moveTurnNav(stage, stage.turnThisNum);
				EDUTSS.sound.playAudio("click");
			});
			EDUTSS.quiz.moveTurnNav(stage, stage.turnThisNum);
		},
		moveTurnNav: function (stage, num) {
			stage.turnThisNum = num;
			stage.turnIdxCurrent.textContent = stage.turnThisNum + 1;
			stage.turnIdxTotal.textContent = stage.isTurnTotal;
			util.removeCls(stage.turnNavPrev, "btn--hide");
			util.removeCls(stage.turnNavNext, "btn--hide");
			if (num === 0) {
				util.addCls(stage.turnNavPrev, "disabled btn--hide");
			} else {
				util.removeCls(stage.turnNavPrev, "disabled");
			}
			if (num === stage.isTurnTotal) {
				util.addCls(stage.turnNavNext, "disabled btn--hide");
			} else {
				util.removeCls(stage.turnNavNext, "disabled");
			}
			if (util.hasCls(stage.quizName[num], "turn--done")) {
				util.removeCls(stage.turnNavNext, "disabled");
			} else {
				util.addCls(stage.turnNavNext, "disabled");
			}
			util.removeCls(stage.quizName, "turn--show");
			util.addCls(stage.quizName[num], "turn--show");
			util.removeCls(stage.turnIdxBtn, "on");
			util.removeCls(stage.turnIdxBtn[num], "disabled");
			util.addCls(stage.turnIdxBtn[num], "on");
			stage.quizName.forEach(function (elem, idx) {
				util.hasCls(elem, "turn--done") && util.removeCls(stage.turnIdxBtn[idx], "disabled");
			});
			EDUTSS.isDevMsg && console.log("#D: 객관식 순차 학습 => " + (num + 1) + "번 문제");
		},
		essayQuiz: function (qid) {
			const stage = quizData.DATA[qid];
			stage.essayItems.forEach(function (elem, idx) {
				const spelling = elem.getAttribute("maxlength") || null;
				util.addEvt(elem, "keydown", function () {
					stage.keydownActiveEl = document.activeElement;
					stage.keydownElIdx = idx;
				});
				util.addEvt(elem, "keyup", function (e) {
					const target = e.target,
						value = target === stage.keydownActiveEl ? target.value : stage.keydownActiveEl.value;
					let userSelectTxt = target.tagName !== "textarea" ? util.getText(value).trim() : value;
					if (spelling === "1") userSelectTxt = userSelectTxt.toLowerCase();
					stage.userValue[stage.keydownElIdx] = [userSelectTxt];
					if (!stage.isExample && stage.correctAnswer && stage.correctAnswer[stage.keydownElIdx].length > 1 && stage.correctAnswer[stage.keydownElIdx].includes(userSelectTxt)) {
						stage.userValue[stage.keydownElIdx] = stage.correctAnswer[stage.keydownElIdx];
					}
					EDUTSS.isDevMsg && console.log("#D: 주관식 입력 => " + stage.userValue[stage.keydownElIdx] + ", 정답 => " + stage.correctAnswer[stage.keydownElIdx]);
					EDUTSS.quizData.addQuizActivity(stage, true);
					EDUTSS.quiz.controlBtnHandler(stage);
				});
			});
		},
		dragQuiz: function (qid) {
			const stage = quizData.DATA[qid];
			stage.moveEventHandler = moveDragItems;
			stage.removeMoveEventHandler = endDragItems;
			let itemsPosition = {};
			dragUtil.setPluralValue(stage, stage.dragItems);
			if (stage.isRandomPosition) {
				this.randomPosition(stage);
			} else {
				stage.dragItems.forEach(function (elem) {
					elem.style.opacity = 1;
				});
			}
			util.addEvt(stage.dragItems, "down", function (e) {
				e.preventDefault();
				e.stopPropagation();
				startDragItems.call(this, e);
				EDUTSS.view.senseClosePopupEvent(e);
			});

			function startDragItems(e) {
				stage.isMoving = false;
				dragUtil.setSelectItems(e, stage);
				if (util.hasCls(stage.thisSelect, "drag--done")) return;
				itemsPosition = dragUtil.getDragPosition(stage.dragArea, stage.thisSelect, stage.dropItems);
				dragUtil.getCoord(e, itemsPosition);
				itemsPosition["drag"].prevLeft = itemsPosition["coord"].left - itemsPosition["drag"].left;
				itemsPosition["drag"].prevTop = itemsPosition["coord"].top - itemsPosition["drag"].top;
				util.addEvt(window, "move", stage.moveEventHandler);
				util.addEvt(window, "up", stage.removeMoveEventHandler);
				util.addEvt(window, "leave", stage.removeMoveEventHandler);
				util.addEvt(util.getEle("#wrap"), "leave", stage.removeMoveEventHandler);
				stage.dragBeforeItems = util.createEle("span", {
					class: "copy--drag"
				}, stage.thisSelect.parentNode);
				stage.dragBeforeItems.style.left = stage.thisSelect.offsetLeft + "px";
				stage.dragBeforeItems.style.top = stage.thisSelect.offsetTop + "px";
				stage.dragBeforeItems.innerHTML = stage.thisSelect.innerHTML;
				util.addCls(stage.dragBeforeItems, stage.thisSelect.className);
				stage.thisSelect.style.pointerEvents = "none";
				util.addCls(stage.thisSelect, "this--dragging");
			}

			function moveDragItems(e) {
				stage.isMoving = true;
				dragUtil.getCoord(e, itemsPosition);
				dragUtil.setDragPosition(stage.thisSelect, itemsPosition);
				dragUtil.getSeletDone(e, itemsPosition, stage);
			}

			function endDragItems(e) {
				const target = e.target;
				if (target.tagName === "input" || target.tagName === "textarea") {
					target.focus();
				}
				dragUtil.getDoneElement(e, stage);
				itemsPosition["drag"] = stage.thisSelect.getBoundingClientRect();
				if (stage.doneNum !== null) {
					stage.isSuccess = true;
					EDUTSS.isDevMsg && console.log("#D: 드래그 성공(포인트 일치) => " + stage.doneNum);
				} else {
					for (let idx = 0; idx < stage.dropLen; idx++) {
						let stickToDrop = dragUtil.dragStickTo(idx, itemsPosition);
						if (stickToDrop === false) {
							stage.isSuccess = true;
							stage.doneNum = idx;
							EDUTSS.isDevMsg && console.log("#D: 드래그 성공(포인트 불일치) => " + stage.doneNum);
							break;
						}
					}
				}
				dragUtil.isGroupName(stage);
				if (stage.dropItems[stage.doneNum] && stage.dropItems[stage.doneNum].dataset.cantDrag) {
					let exceptValue = stage.dropItems[stage.doneNum].dataset.cantDrag.split("//");
					exceptValue.forEach(function (key) {
						if (key == stage.thisNum) stage.isSuccess = false;
					});
				}
				if (stage.isSuccess) {
					if (stage.correctAnswer) {
						successDrop(stage.doneNum);
					} else {
						if (stage.isFreeDrag) {
							EDUTSS.isDevMsg && console.log("#D: 자유롭게 드래그 가능");
							EDUTSS.quiz.controlBtnHandler(stage);
							if (EDUTSS.isDevice !== "ios") sound.playAudio("correct");
						} else {
							stage.dropItems[stage.doneNum].appendChild(dragUtil.cloneDrag(stage, stage.thisSelect));
							util.addCls(stage.thisSelect, "drag--done");
							dragUtil.resetDragPosition(stage.thisSelect);
						}
						dragUtil.saveSendComplete(stage);
						EDUTSS.isDevMsg && console.log("#D: 정답 없는 활동");
					}
				} else {
					if (stage.isMoving) {
						dragUtil.resetDragPosition(stage.thisSelect);
						EDUTSS.isVibrateInterval && window.navigator.vibrate(200);
						EDUTSS.commonEffectAudio.dragfalse && sound.playAudio("dragfalse");
					}
				}
				stage.thisSelect.style.pointerEvents = null;
				util.removeCls(stage.thisSelect, "this--dragging");
				util.removeCls(stage.dropItems, "select--drop");
				util.removeEvt(window, "move", stage.moveEventHandler);
				util.removeEvt(window, "up", stage.removeMoveEventHandler);
				util.removeEvt(window, "leave", stage.removeMoveEventHandler);
				util.removeEvt(util.getEle("#wrap"), "leave", stage.removeMoveEventHandler);
				stage.dragBeforeItems.remove();
			}

			function successDrop() {
				dragUtil.selectHasDone(stage);
				if (stage.isDirectCheck) {
					stage.correctPlural = dragUtil.getPluralCorrect(stage.correctAnswer, stage.thisNum);
					EDUTSS.isDevMsg && (console.log("#D: 다이렉트 체크"), console.log("#D: 복수정답여부 => " + stage.correctPlural));
					if (!stage.isHasValue && stage.isHasAnswer) {
						stage.dropItems[stage.doneNum].appendChild(dragUtil.cloneDrag(stage, stage.thisSelect));
						if (!stage.isCheckToggle) {
							dragUtil.directCheckResult(stage);
							dragUtil.saveSendComplete(stage);
						}
						stage.droppedCnt++;
						if (!stage.isPairType || stage.droppedCnt) {
							if (!EDUTSS.iosDragSoundDisabled) sound.playAudio("correct");
						}
					} else {
						EDUTSS.isVibrateInterval && window.navigator.vibrate(200);
						if (EDUTSS.isDevice !== "ios" || EDUTSS.isDevice !== "safari") sound.playAudio("incorrect");
					}
				} else {
					stage.correctPlural = stage.correctAnswer[stage.doneNum].length;
					EDUTSS.isDevMsg && console.log("#D: 복수정답여부 => " + stage.correctPlural);
					if (!stage.isHasValue) {
						if (util.hasCls(stage.dropItems[stage.doneNum], "drop--done")) {
							util.removeCls(stage.dropItems[stage.doneNum], "drop--done");
							util.removeCls(stage.dragItems[stage.userValue[stage.doneNum] - 1], "drag--done");
							stage.dropItems[stage.doneNum].innerHTML = "";
							stage.userValue[stage.doneNum] = [];
							EDUTSS.isDevMsg && console.log("#D: 중복 드래그, 기존 drop--done 삭제");
						}
						stage.dropItems[stage.doneNum].appendChild(dragUtil.cloneDrag(stage, stage.thisSelect));
						dragUtil.addClsDone(stage);
						dragUtil.saveSendComplete(stage);
						stage.droppedCnt++;
						if (!EDUTSS.iosDragSoundDisabled && EDUTSS.commonEffectAudio.dragtrue) sound.playAudio("dragtrue");
					} else {
						EDUTSS.isVibrateInterval && window.navigator.vibrate(200);
						if (!EDUTSS.iosDragSoundDisabled && EDUTSS.commonEffectAudio.dragfalse) sound.playAudio("dragfalse");
					}
				}
				const isCompleted = getComplete(stage.userValue);
				dragUtil.resetDragPosition(stage.thisSelect);
				EDUTSS.quizData.addQuizActivity(stage, isCompleted);
				EDUTSS.quiz.controlBtnHandler(stage);
			}

			function getComplete(arr) {
				let value = true;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].length < 1) value = false;
				}
				return value;
			}
		},
		randomPosition: function (stage) {
			let getStyle;
			stage.defaultPosition = [];
			stage.randomPosition = [];
			for (let i = 0; i < stage.dragItems.length; i++) {
				getStyle = util.getStyle(stage.dragItems[i]);
				stage.defaultPosition[i] = {};
				stage.defaultPosition[i].left = getStyle.left;
				stage.defaultPosition[i].top = getStyle.top;
				stage.dragItems[i].style.opacity = 0;
			}
			while (stage.defaultPosition.length > 0) {
				stage.randomPosition.push(stage.defaultPosition.splice(Math.floor(Math.random() * stage.defaultPosition.length), 1)[0]);
			}
			for (let i = 0; i < stage.dragItems.length; i++) {
				stage.dragItems[i].style.left = stage.randomPosition[i].left;
				stage.dragItems[i].style.top = stage.randomPosition[i].top;
				stage.dragItems[i].dataset.randomPosition = stage.randomPosition[i].left + "," + stage.randomPosition[i].top;
				stage.dragItems[i].style.opacity = 1;
			}
		},
		drawQuiz: function (qid) {
			const stage = quizData.DATA[qid];
			stage.moveEventHandler = moveDrawItems;
			stage.removeMoveEventHandler = endDrawItems;
			let itemsPosition = {},
				startPoint = {},
				endPoint = {};
			dragUtil.setPluralValue(stage, stage.startItems);
			util.addEvt(stage.startItems, "down", function (e) {
				e.preventDefault();
				e.stopPropagation();
				startDrawItems.call(this, e);
				EDUTSS.view.senseClosePopupEvent(e);
			});

			function startDrawItems(e) {
				stage.isMoving = false;
				dragUtil.setSelectItems(e, stage);
				if (util.hasCls(stage.thisSelect, "draw--done")) {
					resetDrawItems(e);
				} else {
					itemsPosition = dragUtil.getDrawPosition(stage.svgContainer, stage.thisSelect);
					startPoint = dragUtil.drawStartPosition(itemsPosition);
					stage.thisLine = dragUtil.createLine(stage.svgContainer, "user--line", stage.thisNum);
					util.addEvt(window, "move", stage.moveEventHandler);
					util.addEvt(window, "up", stage.removeMoveEventHandler);
					util.addEvt(window, "leave", stage.removeMoveEventHandler);
					util.addEvt(util.getEle("#wrap"), "leave", stage.removeMoveEventHandler);
				}
			}

			function moveDrawItems(e) {
				stage.isMoving = true;
				endPoint = dragUtil.drawEndPosition(e, itemsPosition);
				dragUtil.drawLine(stage.thisLine, startPoint, endPoint);
			}

			function endDrawItems(e) {
				dragUtil.getDoneElement(e, stage);
				if (stage.doneNum !== null) {
					stage.isSuccess = true;
					EDUTSS.isDevMsg && console.log("#D: 드래그 성공 => " + stage.doneNum);
				}
				dragUtil.isGroupName(stage);
				if (stage.isSuccess) {
					if (stage.correctAnswer) {
						endPoint = dragUtil.drawEndPosition(e, itemsPosition, stage.doneEl);
						dragUtil.drawLine(stage.thisLine, startPoint, endPoint, stage.doneNum + 1);
						successLine(stage.doneNum);
					} else {}
				} else {
					if (stage.isMoving) {
						stage.svgContainer.removeChild(stage.thisLine);
						EDUTSS.isVibrateInterval && window.navigator.vibrate(200);
						if (!EDUTSS.iosDragSoundDisabled && EDUTSS.commonEffectAudio.dragfalse) sound.playAudio("dragfalse");
					}
				}
				util.removeEvt(window, "move", stage.moveEventHandler);
				util.removeEvt(window, "up", stage.removeMoveEventHandler);
				util.removeEvt(window, "leave", stage.removeMoveEventHandler);
				util.removeEvt(util.getEle("#wrap"), "leave", stage.removeMoveEventHandler);
			}

			function successLine() {
				dragUtil.selectHasDone(stage);
				if (stage.isDirectCheck) {
					stage.correctPlural = dragUtil.getPluralCorrect(stage.correctAnswer, stage.thisNum);
					EDUTSS.isDevMsg && (console.log("#D: 다이렉트 체크"), console.log("#D: 복수정답여부 => " + stage.correctPlural));
					if (!stage.isHasValue && stage.isHasAnswer) {
						if (!stage.isCheckToggle) {
							dragUtil.directCheckResult(stage);
							dragUtil.saveSendComplete(stage);
						}
						if (!EDUTSS.iosDragSoundDisabled) sound.playAudio("correct");
					} else {
						stage.svgContainer.removeChild(stage.thisLine);
						if (!EDUTSS.iosDragSoundDisabled) sound.playAudio("incorrect");
					}
				} else {
					stage.correctPlural = stage.correctAnswer[stage.doneNum].length;
					EDUTSS.isDevMsg && console.log("#D: 복수정답여부 => " + stage.correctPlural);
					if (!stage.isHasValue) {
						if (util.hasCls(stage.endItems[stage.doneNum], "line--done")) {
							util.removeCls(stage.endItems[stage.doneNum], "line--done");
							util.removeCls(stage.startItems[stage.userValue[stage.doneNum] - 1], "draw--done");
							stage.oldLine = util.getEle("[data-start-num='" + stage.userValue[stage.doneNum] + "']", stage.svgContainer)[0];
							stage.svgContainer.removeChild(stage.oldLine);
							stage.userValue[stage.doneNum] = [];
							EDUTSS.isDevMsg && console.log("#D: 중복 드래그, 기존 line 삭제");
						}
						dragUtil.addClsDone(stage);
						dragUtil.saveSendComplete(stage);
						if (!EDUTSS.iosDragSoundDisabled && EDUTSS.commonEffectAudio.dragtrue) sound.playAudio("dragtrue");
					} else {
						stage.svgContainer.removeChild(stage.thisLine);
						EDUTSS.isVibrateInterval && window.navigator.vibrate(200);
						if (!EDUTSS.iosDragSoundDisabled && EDUTSS.commonEffectAudio.dragfalse) sound.playAudio("dragfalse");
					}
				}
				const isComplete = getComplete(stage.userValue);
				EDUTSS.quizData.addQuizActivity(stage, isComplete);
				EDUTSS.quiz.controlBtnHandler(stage);
			}

			function resetDrawItems(e) {
				let thisNum = e.currentTarget.dataset.num;
				util.removeCls(e.currentTarget, "draw--done");
				util.getEle("line", stage.svgContainer).forEach(function (elem) {
					if (elem.dataset.startNum === thisNum) stage.svgContainer.removeChild(elem);
				});
				stage.userValue.forEach(function (arr, idx) {
					for (let i = 0; i < arr.length; i++) {
						if (arr[i] === Number(thisNum)) {
							util.removeCls(stage.endItems[idx], "line--done");
							arr.splice(i, 1);
							i--;
						}
					}
				});
				EDUTSS.quizData.addQuizActivity(stage, false);
				EDUTSS.quiz.controlBtnHandler(stage);
			}

			function getComplete(arr) {
				let value = true;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].length < 1) value = false;
				}
				return value;
			}
			setTimeout(function () {
				!util.isInDisplay(stage.container) && util.addCls(stage.container, "is--not--rect");
			}, 200);
		},
		layerQuiz: function (qid) {
			const stage = quizData.DATA[qid];
			stage.layerPopupParent = stage.layerPopup.parentNode;
			stage.layerSelect.forEach(function (elem, idx) {
				util.addEvt(elem, "click", function (e) {
					if (util.hasCls(stage.container, "quiz--complete")) return;
					stage.selectIdx = idx;
					util.removeCls(stage.layerPopup, "select--open");
					layerPopupOpen(e.currentTarget);
					EDUTSS.isDevMsg && console.log("#D: 레이어 퀴즈 => " + stage.selectIdx + " 선택");
					EDUTSS.sound.playAudio("click");
				});
			});
			stage.layerOption.forEach(function (elem, idx) {
				util.addEvt(elem, "click", function (e) {
					if (util.hasCls(stage.container, "quiz--complete")) return;
					selectCheckItems(e.currentTarget, idx);
					EDUTSS.sound.playAudio("click");
				});
			});

			function layerPopupOpen(e) {
				stage.layerPopup.dataset.selectNum = stage.selectIdx;
				util.addCls(stage.layerPopup, "select--open select--animate");
				setTimeout(function () {
					util.removeCls(stage.layerPopup, "select--animate");
				}, 500);
				stage.selectPosition = e.getBoundingClientRect();
				stage.popupSize = stage.layerPopup.getBoundingClientRect();
				stage.layerPopupParentPos = stage.layerPopupParent.getBoundingClientRect();
				stage.layerPopupPosLeft = e.getBoundingClientRect().left - stage.layerPopupParentPos.left - stage.popupSize.width / 2 + stage.selectPosition.width / 2;
				stage.layerPopupPosTop = e.getBoundingClientRect().top + stage.selectPosition.height - stage.layerPopupParentPos.top;
				stage.layerPopup.style.left = stage.layerPopupPosLeft / EDUTSS.scaleValue.zoom + "px";
				stage.layerPopup.style.top = stage.layerPopupPosTop / EDUTSS.scaleValue.zoom + "px";
				EDUTSS.isDevMsg && console.log("#D: 레이어 팝업 좌표 설정 => " + stage.layerPopup.style.left + stage.layerPopup.style.top);
			}

			function selectCheckItems(target, idx) {
				const optionType = stage.layerPopup.dataset.optionType;
				const isMultiple = stage.layerPopup.dataset.multiple === "true" ? true : false;
				const selectedInput = stage.layerSelect[stage.selectIdx];
				!isMultiple && stage.userValue.forEach(function (arr, num) {
					if (arr[0] === idx + 1) {
						stage.layerSelect[num].value = "";
						arr.length = 0;
					}
				});
				if (!optionType || optionType !== "image") {
					selectedInput.value = target.dataset.returnText || target.textContent;
				} else {
					const bgClass = selectedInput.className.match(/bg\d/);
					bgClass && util.removeCls(selectedInput, bgClass[0]);
					util.addCls(selectedInput, "bg" + idx);
					selectedInput.value = "bg" + idx;
				}
				stage.userValue[stage.selectIdx] = [idx + 1];
				EDUTSS.isDevMsg && console.log("#D: 반환 텍스트 => " + selectedInput.value);
				util.removeCls(stage.layerPopup, "select--open");
				EDUTSS.quizData.addQuizActivity(stage, true);
				EDUTSS.quiz.controlBtnHandler(stage);
			}
		},
		checkQuiz: function (qid) {
			const stage = quizData.DATA[qid];
			stage.isCorrectList = [];
			if (!stage.isTotalCheckBtn) {
				if (stage.isEmptyFeedback && (util.getText(JSON.stringify(stage.userValue)).length < 1 || util.hasCls(stage.container, "is--not--activity"))) {
					quizFeedBack.playFeedback(stage, "empty");
					return;
				} else if (stage.isSolvingCheck) {} else if (stage.isExample) {
					EDUTSS.sound.playAudio("click");
				}
			}
			if (stage.isWordMatching) {
				util.getEle(".drop_wrap", stage.container).forEach(function (dropWrap) {
					const wordList = dropWrap.dataset.word.split("||");
					let userWord = "";
					util.getEle(".drag_box", dropWrap).forEach(function (dragBox) {
						userWord += dragBox.textContent;
					});
					stage.isCorrectList.push(wordList.includes(userWord));
				});
				stage.wrongScore = stage.isCorrectList.filter(function (isCorrect) {
					return !isCorrect;
				}).length;
				stage.isCorrect = !stage.wrongScore;
			} else {
				stage.userValue.forEach(function (userValues, i) {
					typeof stage.correctAnswer !== "boolean" && stage.isCorrectList.push(stage.correctAnswer[i].includes(userValues[0]));
				});
				stage.isCorrect = JSON.stringify(stage.correctAnswer) === JSON.stringify(stage.userValue) || stage.isOnce && !stage.isCorrectList.includes(false) ? true : false;
			}
			EDUTSS.isDevMsg && (console.log("#D: 사용자 입력값"), console.log(JSON.stringify(stage.userValue)),
				console.log("#D: 정답"), console.log(JSON.stringify(stage.correctAnswer)));
			if (stage.hintItems && !util.hasCls(stage.hintItems, "hint--show")) {
				if (!stage.isCorrect && stage.chance < stage.totalChance - 1 || stage.isExample) {
					util.addCls(stage.hintItems, "hint--show");
					stage.isFeedback && quizFeedBack.playFeedback(stage, "hint");
					!stage.isExample && this.resetQuizElement(qid);
				}
			}
			if (stage.isDuplicationPopup) {
				util.addCls(stage.container, "quiz--complete");
				return;
			}
			if (stage.isExample) {
				stage.example.forEach(function (elem) {
					util.addCls(elem, "example--show");
				});
				if (stage.type === "essay") {
					stage.essayItems.forEach(function (elem) {
						util.addCls(elem, "disabled");
					});
				}
				stage.isFeedback && quizFeedBack.playFeedback(stage, "example");
			}
			if (!stage.isCorrect && stage.chance < stage.totalChance - 1) {
				if (EDUTSS.isDTBOOK && stage.isSendCaliperSensor) quizDtBook.sendCaliperSensor(qid);
				stage.chance++;
				stage.userValue = quizData.resetUserValue(stage.userValue);
				if (!stage.isTotalCheckBtn && stage.isFeedback && !stage.hintItems) {
					quizFeedBack.playFeedback(stage, "again");
				}!stage.hintItems && this.resetQuizElement(qid);
				EDUTSS.isDevMsg && console.log("#D: 기회 남음 => " + stage.chance);
				this.syncControlBtn(qid, "replay");
			} else if (stage.isCorrect || stage.chance === stage.totalChance - 1) {
				!stage.isViewAnswer && this.resultQuiz(qid);
				if (stage.isMarking) {
					var markingEle = util.getEle("[data-quiz-marking=" + stage.qid + "]")[0];
					stage.isCorrect === true ? util.addCls(markingEle, "marking--correct") : util.addCls(markingEle, "marking--incorrect");
					EDUTSS.isDevMsg && stage.isCorrect && console.log("#D: OX 마킹 => target : " + markingEle);
				}
				if (!stage.isTotalCheckBtn && stage.isFeedback && !stage.isExample) {
					quizFeedBack.playFeedback(stage, stage.isCorrect);
				}
			}
			EDUTSS.quiz.detectScroll(stage);
		},
		totalCheck: function (qid, e) {
			let quizPackEle, stage, childQuiz, childQuizLen, i, checkEmpty = false,
				checkFeedBack = false,
				checkTotalCorrect = true,
				scoreTrueNum = 0,
				totalScore = 0;
			quizPackEle = util.getEle(qid);
			childQuiz = util.getEle("[data-quiz-type]", quizPackEle);
			childQuizLen = childQuiz.length;
			for (i = 0; i < childQuizLen; i++) {
				stage = quizData.DATA[childQuiz[i].dataset.quizId];
				if (stage.isEmptyFeedback) {
					if (EDUTSS.emptyCheckActivity && stage.container.dataset.isActivity === "false" || util.getText(JSON.stringify(stage.userValue)).length === 0) {
						checkEmpty = true;
					}
				}
			}
			if (checkEmpty) {
				let unusualFeedback = util.getEle(".each--feedback", e.currentTarget.parentNode)[0];
				if (unusualFeedback) {
					quizFeedBack.playFeedback(stage, "empty", "totalCheck", unusualFeedback);
				} else {
					quizFeedBack.playFeedback(stage, "empty", "totalCheck");
				}
				return;
			}
			for (i = 0; i < childQuizLen; i++) {
				stage = quizData.DATA[childQuiz[i].dataset.quizId];
				EDUTSS.quiz.checkQuiz(stage.qid);
				stage.isCorrect ? scoreTrueNum++ : checkTotalCorrect = false;
				!stage.isCommonFeedback && (checkFeedBack = false);
			}
			totalScore = Math.round(scoreTrueNum / childQuizLen * 100);
			util.getEle("[quiz-score-num]", quizPackEle).forEach(function (elem) {
				elem.dataset.scoreNum = totalScore;
				elem.childNodes[0].textContent = totalScore;
			});
			if (checkFeedBack) {
				quizFeedBack.playFeedback(stage, checkTotalCorrect, "total");
			} else {
				EDUTSS.sound.playAudio("click");
			}
			util.addCls(quizPackEle, "total--complete");
			util.addCls(util.getEle(".btn.check", quizPackEle), "on disabled");
			util.addCls(util.getEle(".btn.replay", quizPackEle), "on");
			util.addCls(util.getEle(".btn.view_user", quizPackEle), "on");
			EDUTSS.isDevMsg && console.log("#D: 통합 퀴즈, 점수 : " + totalScore);
		},
		resultQuiz: function (qid, controlBtn, e) {
			const stage = quizData.DATA[qid];
			EDUTSS.isDevMsg && console.log("#D: 결과 보기");
			if (controlBtn && util.hasCls(controlBtn, "on")) {
				util.removeCls(controlBtn, "on");
				if (stage.type === "essay" && stage.isExample) {
					stage.example.length > 0 && stage.example.forEach(function (elem) {
						util.removeCls(elem, "example--show");
					});
					stage.essayItems.forEach(function (elem) {
						util.removeCls(elem, "disabled");
					});
				}
				return;
			}
			if (!stage.isBlindAnswer) {
				switch (stage.type) {
					case "multiple":
						let answerNum;
						stage.correctAnswer.forEach(function (answer, idx) {
							stage.isViewAnswer && util.removeCls(stage.selectItems[idx], "select--on");
							for (let i = 0; i < answer.length; i++) {
								answerNum = answer[i] - 1;
								util.addCls(stage.selectItems[idx][answerNum], "select--answer");
								util.createMarkingGif(stage.selectItems[idx][answerNum]);
							}
						});
						break;

					case "essay":
						if (!stage.isExample) {
							stage.essayItems.forEach(function (elem, idx) {
								util.addCls(elem, "disabled");
								JSON.stringify(stage.correctAnswer[idx]) === JSON.stringify(stage.userValue[idx]) ? util.addCls(elem, "input--correct") : util.addCls(elem, "input--incorrect");
							});
							util.getEle("[data-quiz-answer]", stage.container).forEach(function (elem) {
								elem.textContent = elem.textContent.replace("//", " 또는 ");
							});
							EDUTSS.isDevMsg && console.log("#D: [data-quiz-answer]의 //를 또는 으로 치환");
						}
						break;

					case "drag":
						resultDragQuiz();
						break;

					case "draw":
						resultDrawQuiz();
						break;

					case "layer":
						const optionType = stage.layerPopup.dataset.optionType;
						stage.layerSelect.forEach(function (elem, idx) {
							const value = stage.correctAnswer[idx];
							if (optionType === "image") {
								util.removeCls(elem, elem.className.match(/bg\d/)[0]);
								util.addCls(elem, "bg" + (value - 1));
							} else {
								const answerTxt = util.createEle("span", {
									class: "layer--answer"
								}, elem.parentNode);
								answerTxt.innerHTML = stage.layerOption[value - 1].dataset.returnText || stage.layerOption[value - 1].textContent;
							}
							util.addCls(elem, "layer--done");
						});
						util.removeCls(stage.layerPopup, "select--open");
						break;

					default:
						break;
				}

				function resultDragQuiz() {
					stage.dropItems.forEach(function (elem, n) {
						util.addCls(elem, "drop--done");
						elem.innerHTML = "";
						JSON.stringify(stage.correctAnswer[n]) === JSON.stringify(stage.userValue[n]) ? util.addCls(elem, "drag--correct") : util.addCls(elem, "drag--incorrect");
					});
					stage.correctAnswer.forEach(function (arr, idx) {
						if (arr.length > 0 && arr.length < 2 || stage.isOnce) {
							cloneDragItem(arr[0], stage.dropItems[idx]);
						} else if (arr.length > 1) {
							arr.forEach(function (num) {
								cloneDragItem(num, stage.dropItems[idx]);
							});
						}
						util.removeCls(util.getEle(".drag--done", stage.dropItems[idx]), "drag--done");
					});
					util.addCls(stage.dragItems, "drag--done");

					function cloneDragItem(num, items) {
						let clone = util.getEle("[data-quiz-pointer='drag'][data-num='" + num + "']", stage.container)[0].cloneNode(true);
						if (!stage.pluralArea) clone.classList.add("inline_flex");
						clone.removeAttribute("data-quiz-pointer");
						items.appendChild(clone);
					}
				}

				function resultDrawQuiz() {
					const userLine = util.getEle(".user--line", stage.svgContainer);
					let startPoint = {},
						endPoint = {};
					!stage.isCheckToggle ? util.addCls(stage.endItems, "line--done") : util.addCls(stage.endItems, "disabled");
					for (let endNum = 0; endNum < stage.correctAnswer.length; endNum++) {
						let startNum = stage.correctAnswer[endNum];
						startPoint = dragUtil.drawAnswerPosition(stage.svgContainer, stage.endItems[endNum]);
						if (!startNum || startNum.length === 0) continue;
						if (startNum.length > 1) {
							for (let i = 0; i < startNum.length; i++) {
								resultLine(startNum[i], stage.userValue[endNum][i], endNum);
							}
						} else {
							resultLine(startNum, stage.userValue[endNum], endNum);
						}!stage.isCheckToggle ? util.addCls(stage.startItems[endNum], "draw--done") : util.addCls(stage.startItems[endNum], "disabled");
					}

					function resultLine(startNum, userValue, endNum) {
						if (stage.isCheckToggle || JSON.stringify(startNum) !== JSON.stringify(userValue)) {
							endPoint = dragUtil.drawAnswerPosition(stage.svgContainer, stage.startItems[startNum - 1]);
							stage.thisLine = dragUtil.createLine(stage.svgContainer, "answer--line", startNum);
							dragUtil.drawLine(stage.thisLine, startPoint, endPoint, endNum + 1);
						}
					}
					userLine.forEach(function (elem) {
						let startNum = parseInt(elem.dataset.startNum),
							endNum = parseInt(elem.dataset.endNum);
						if (typeof startNum !== "number" || typeof endNum !== "number") {
							util.addCls(elem, "line--hide");
						} else {
							!stage.correctAnswer[endNum - 1].includes(startNum) && util.addCls(elem, "line--hide");
						}
						stage.isCheckToggle && util.addCls(elem, "line--hide");
					});
				}
			}
			util.getEle("[data-quiz-answer]", stage.container).forEach(function (elem) {
				elem.dataset.quizAnswer === "show" && util.addCls(elem, "answer--show");
			});
			stage.hintItems && util.removeCls(stage.hintItems, "hint--show");
			if (stage.type === "multiple") {
				let wrongFeed = util.getEle("[data-quiz-feed='wrong']", stage.container);
				stage.correctAnswer.forEach(function (answer, idx) {
					for (let i = 0; i < answer.length; i++) {
						if (wrongFeed[idx] && answer[i] === 2) {
							util.addCls(wrongFeed[idx], "show");
						}
					}
				});
			}
			util.removeCls(util.getEle("[data-quiz-solution='" + stage.qid + "']"), "solution--hide");
			util.removeCls(util.getEle("[data-quiz-solution]", stage.container), "solution--hide");
			util.addCls(util.getEle("[data-quiz-solution='" + stage.qid + "']"), "solution--show");
			util.addCls(util.getEle("[data-quiz-solution]", stage.container), "solution--show");
			util.addCls(stage.container, "quiz--complete");
			this.syncControlBtn(qid, "result");
			stage.isResult = true;
			EDUTSS.complete && EDUTSS.complete.quizResult(stage);
			if (EDUTSS.isDTBOOK && stage.isSendCaliperSensor) quizDtBook.sendCaliperSensor(qid);
		},
		showUserValue: function (qid) {
			const stage = quizData.DATA[qid];

			function appendDragItem(dropItem, dragItem) {
				const clone = dragItem.cloneNode(true);
				clone.removeAttribute("data-quiz-pointer");
				util.removeCls(clone, "drag--done");
				dropItem.appendChild(clone);
			}
			switch (stage.type) {
				case "multiple":
					stage.correctAnswer.forEach(function (answers, i) {
						answers.forEach(function (answer, j) {
							util.removeCls(stage.selectItems[i][answer - 1], "select--answer");
							util.addCls(stage.selectItems[stage.userValue[i][j]], "select--on");
						});
					});
					break;

				case "essay":
					stage.essayItems.forEach(function (item, i) {
						item.textContent = stage.userValue[i][0].replace("//", " 또는 ");
						util.addCls(item, "disabled");
					});
					break;

				case "drag":
					stage.userValue.forEach(function (userValues, i) {
						const dropItem = stage.dropItems[i];
						dropItem.removeChild(dropItem.firstChild);
						appendDragItem(dropItem, stage.dragItems[userValues[0] - 1]);
					});
					break;

				case "draw":
					const userLines = util.getEle(".user--line", stage.svgContainer);
					const answerLines = util.getEle(".answer--line", stage.svgContainer);
					util.addCls(answerLines, "line--hide");
					util.removeCls(userLines, "line--hide");
					break;

				case "layer":
					const optionType = stage.layerPopup.dataset.optionType;
					stage.userValue.forEach(function (userValues, i) {
						const inputEl = stage.layerSelect[i];
						if (optionType === "image") {
							util.removeCls(inputEl, inputEl.className.match(/bg\d/)[0]);
							util.addCls(inputEl, "bg" + (userValues[0] - 1));
						} else {
							const answerEl = util.createEle("span", {
								class: "layer--answer"
							}, inputEl.parentElement);
							const selectedLayerOpt = stage.layerOption[userValues[0] - 1];
							answerEl.textContent = selectedLayerOpt.dataset.returnText || selectedLayerOpt.textContent;
						}
						util.addCls(inputEl, "layer--done");
					});
					break;

				default:
					break;
			}
		},
		resetQuiz: function (qid) {
			const stage = quizData.DATA[qid];
			EDUTSS.isDevMsg && console.log("#D: 퀴즈 초기화");
			quizData.resetUserData(qid);
			this.resetQuizElement(qid);
			this.resetQuizData(stage);
			quizData.addQuizActivity(stage, false);
			EDUTSS.isDTBOOK && quizDtBook.dtResetQuiz(qid);
			EDUTSS.quiz.detectScroll(stage);
		},
		resetQuizData: function (stage, isToggle) {
			const qid = stage.qid;
			stage.chance = 0;
			stage.isResult = false;
			stage.controlShowHide !== undefined && (stage.controlShowHide = true);
			this.syncControlBtn(qid, "replay");
			if (util.getEle("[data-func-check]", stage.container).length > 0 || util.getEle("[data-func-show]", stage.container).length > 0) {
				EDUTSS.view.viewResetEle(stage.container);
			}
			EDUTSS.complete && EDUTSS.complete.quizReset(stage);
		},
		resetQuizElement: function (qid, isToggle) {
			const stage = quizData.DATA[qid];
			stage.isMarking && util.removeCls(util.getEle("[data-quiz-marking=" + stage.qid + "]"), "marking--correct marking--incorrect");
			util.removeCls(util.getEle("[data-quiz-answer]", stage.container), "answer--show");
			if (util.hasCls(stage.container, "quiz--complete")) {
				if (stage.hintItems) {
					util.removeCls(stage.hintItems, "hint--show");
					util.removeCls(stage.controlBtns, "viewed--duplication--hint");
				}
				if (stage.isExample) {
					stage.example.forEach(function (elem) {
						util.removeCls(elem, "example--show pop--open example--hide");
					});
				}
				util.removeCls(util.getEle("[data-quiz-feed='wrong']", stage.container), "show");
				util.removeCls(util.getEle("[data-quiz-solution='" + stage.qid + "']"), "solution--show solution--hide");
				util.removeCls(util.getEle("[data-quiz-solution]", stage.container), "solution--show solution--hide");
				util.removeCls(util.getEle("[data-quiz-feed='wrong']", stage.container), "show");
				if (stage.isEachFeedback) {
					stage.eachFeedback.forEach(function (elem) {
						util.removeCls(elem, "show");
					});
					util.removeCls(stage.eachFeedback, "show");
				}
			}
			if (!isToggle) {
				util.removeCls(stage.container, "quiz--complete");
				switch (stage.type) {
					case "multiple":
						stage.selectItems.forEach(function (arr) {
							for (let i = 0; i < arr.length; i++) {
								util.removeCls(arr[i], "select--on select--answer select--checked");
							}
						});
						if (stage.isTurn) {
							util.removeCls(stage.quizName, "turn--done");
							EDUTSS.quiz.moveTurnNav(stage, stage.isTurnIdx);
							util.addCls(stage.turnIdxBtn, "disabled");
						}
						util.getEle(".oxquiz--answer--marking", stage.container).forEach(function (elem) {
							elem.remove();
						});
						break;

					case "essay":
						stage.essayItems.forEach(function (elem) {
							util.removeCls(elem, "disabled input--correct input--incorrect");
							elem.value = "";
						});
						break;

					case "drag":
						util.removeCls(stage.dragItems, "drag--done drag--correct drag--incorrect");
						util.removeCls(stage.dropItems, "drop--done drag--correct drag--incorrect");
						if (stage.isFreeDrag) {
							stage.dragItems.forEach(function (elem) {
								elem.style.left = null;
								elem.style.top = null;
								elem.style.right = null;
							});
						} else {
							stage.dropItems.forEach(function (elem) {
								elem.innerHTML = "";
							});
						}
						if (stage.isRandomPosition) this.randomPosition(stage);
						break;

					case "draw":
						util.removeCls(stage.startItems, "draw--done disabled");
						util.removeCls(stage.endItems, "line--done disabled");
						util.getEle("line", stage.svgContainer).forEach(function (elem) {
							if (util.hasCls(elem, "user--line") || util.hasCls(elem, "answer--line")) stage.svgContainer.removeChild(elem);
						});
						break;

					case "layer":
						stage.layerSelect.forEach(function (elem) {
							const hasBg = elem.className.match(/bg\d/);
							const answerTxt = util.getEle(".layer--answer", elem.parentNode)[0];
							elem.value = "";
							answerTxt && elem.parentNode.removeChild(answerTxt);
							util.removeCls(elem, "layer--done");
							hasBg && util.removeCls(elem, hasBg[0]);
						});
						util.removeCls(stage.layerPopup, "select--open");
						break;

					default:
						break;
				}
			}
		},
		resultToggle: function (qid) {
			const stage = quizData.DATA[qid];
			EDUTSS.isDevMsg && console.log("#D: 정답 토글");
			if (!stage.isCheckToggle) return;
		},
		duplicationResult: function (quiz, resultType) {
			const DATA = quizData.DATA[quiz.dataset.quizId];
			if (DATA.isExample && resultType === "answer") {
				let example = util.getEle("[data-quiz-feed='example']", quiz);
				example.length > 0 && example.forEach(function (elem) {
					util.addCls(elem, "example--show");
				});
			}
			switch (quiz.dataset.quizType) {
				case "multiple":
					let answerNum, quizName, selectItems;
					quizName = util.getEle("[data-quiz-name]", quiz);
					if (quizName.length === 0) quizName = [quiz];
					selectItems = [];
					quizName.forEach(function (elem, idx) {
						selectItems[idx] = util.getEle("[data-multiple-num]", elem);
						selectItems[idx].forEach(function (elem) {
							if (resultType === "answer") {
								util.removeCls(elem, "select--on");
								DATA.correctAnswer.forEach(function (answer, idx) {
									for (let i = 0; i < answer.length; i++) {
										answerNum = answer[i] - 1;
										util.addCls(selectItems[idx][answerNum], "select--answer");
									}
								});
							}
						});
					});
					break;

				case "essay":
					util.getEle(".quiz--input", quiz).forEach(function (elem, idx) {
						util.removeCls(elem, "disabled input--correct input--incorrect");
						if (resultType === "answer") {
							if (DATA.isExample) {
								elem.style.display = "none";
							} else {
								DATA.correctAnswer[idx] && (elem.value = DATA.correctAnswer[idx]);
							}
							util.addCls(elem, "answer");
						} else {
							if (DATA.userValue[idx]) {
								elem.value = DATA.userValue[idx];
								elem.tagName === "textarea" && (elem.style.height = elem.scrollHeight + "px");
							}
						}
					});
					break;

				case "drag":
					if (resultType === "answer") {
						resultDragQuiz();
					}
					break;

				case "draw":
					resultDrawQuiz(resultType);
					break;

				case "layer":
					let layerSelect = util.getEle(".layer--return", quiz);
					if (resultType === "answer") {
						layerSelect.forEach(function (elem, idx) {
							let value = DATA.correctAnswer[idx];
							elem.value = DATA.layerOption[value - 1].dataset.returnText || DATA.layerOption[value - 1].textContent;
						});
					} else {
						layerSelect.forEach(function (elem, idx) {
							let value = DATA.userValue[idx];
							if (value && value.length > 0) {
								elem.value = DATA.layerOption[value - 1].dataset.returnText || DATA.layerOption[value - 1].textContent;
							}
						});
					}
					break;

				default:
					break;
			}

			function resultDragQuiz() {
				let dropItems = util.getEle("[data-quiz-pointer='drop']", quiz);
				dropItems.forEach(function (elem) {
					util.addCls(elem, "drop--done");
					elem.innerHTML = "";
				});
				DATA.correctAnswer.forEach(function (arr, idx) {
					if (arr.length > 0 && arr.length < 2) {
						cloneDragItem(arr[0], dropItems[idx]);
					} else if (arr.length > 1) {
						arr.forEach(function (num) {
							cloneDragItem(num, dropItems[idx]);
						});
					}
					util.removeCls(util.getEle(".drag--done", dropItems[idx]), "drag--done");
				});

				function cloneDragItem(num, items) {
					let clone = util.getEle("[data-quiz-pointer='drag'][data-num='" + num + "']", DATA.container)[0].cloneNode(true);
					clone.classList.add("inline_flex");
					clone.removeAttribute("data-quiz-pointer");
					items.appendChild(clone);
				}
			}

			function resultDrawQuiz(resultType) {
				const svgContainer = util.getEle("[data-quiz-area='svg']", quiz)[0],
					startItems = util.getEle("[data-quiz-pointer='start']", quiz),
					endItems = util.getEle("[data-quiz-pointer='end']", quiz);
				let startNum, thisLine, startPoint = {},
					endPoint = {};
				util.getEle("line", svgContainer).forEach(function (elem) {
					svgContainer.removeChild(elem);
				});
				util.addCls(startItems, "draw--done disabled");
				util.addCls(endItems, "line--done disabled");
				if (resultType === "answer") {
					for (let endNum = 0; endNum < DATA.correctAnswer.length; endNum++) {
						startNum = DATA.correctAnswer[endNum];
						selectLine(startNum, endNum);
					}
				} else {
					for (let endNum = 0; endNum < DATA.userValue.length; endNum++) {
						if (DATA.userValue[endNum]) {
							startNum = DATA.userValue[endNum];
							selectLine(startNum, endNum);
						}
					}
				}

				function selectLine(startNum, endNum) {
					startPoint = dragUtil.drawAnswerPosition(svgContainer, endItems[endNum]);
					if (startNum.length > 1) {
						for (let i = 0; i < startNum.length; i++) {
							resultLine(startNum[i], endNum);
						}
					} else if (startNum.length !== 0) {
						resultLine(startNum, endNum);
					}
				}

				function resultLine(startNum, endNum) {
					endPoint = dragUtil.drawAnswerPosition(svgContainer, startItems[startNum - 1]);
					if (resultType === "answer") {
						thisLine = dragUtil.createLine(svgContainer, "answer--line", startNum);
					} else {
						thisLine = dragUtil.createLine(svgContainer, "user--line", startNum);
					}
					dragUtil.drawLine(thisLine, startPoint, endPoint, endNum + 1);
				}
			}
			util.getEle("[data-quiz-answer]", quiz).forEach(function (elem) {
				elem.dataset.quizAnswer === "show" && util.addCls(elem, "answer--show");
			});
			util.addCls(util.getEle("[data-quiz-feed='hint']", quiz), "hint--show");
			util.addCls(util.getEle("[data-quiz-solution='" + quiz.qid + "']"), "solution--show");
			util.addCls(util.getEle("[data-quiz-solution]", quiz), "solution--show");
			util.removeCls(quiz, "is--not--activity is--activity");
			util.addCls(quiz, "quiz--complete");
		},
		initControlBtn: function () {
			util.getEle("[data-quiz-btn]").forEach(function (elem) {
				const qid = elem.dataset.quizTarget,
					btnType = elem.dataset.quizBtn;
				let childQuiz, quizPackEle, clickSound = true;
				util.addEvt(elem, "click", function (e) {
					switch (btnType) {
						case "check":
							if (!util.hasCls(this, "on")) {
								EDUTSS.quiz.checkQuiz(qid);
								clickSound = false;
							}
							break;

						case "answer":
							!util.hasCls(this, "on") && EDUTSS.quiz.resultQuiz(qid, this);
							break;

						case "replay":
							EDUTSS.quiz.resetQuiz(qid);
							break;

						case "all-check":
							if (!util.hasCls(this, "on")) {
								EDUTSS.quiz.totalCheck(qid, e);
								clickSound = false;
							}
							break;

						case "all-answer":
							quizPackEle = util.getEle(qid);
							if (!util.hasCls(this, "on")) {
								childQuiz = util.getEle("[data-quiz-type]", quizPackEle);
								childQuiz.forEach(function (child) {
									EDUTSS.quiz.resultQuiz(child.dataset.quizId);
								});
								util.addCls(this, "on");
							}
							util.addCls(quizPackEle, "total--complete");
							break;

						case "all-replay":
							quizPackEle = util.getEle(qid);
							childQuiz = util.getEle("[data-quiz-type]", quizPackEle);
							childQuiz.forEach(function (child) {
								EDUTSS.quiz.resetQuiz(child.dataset.quizId);
							});
							util.removeCls(quizPackEle, "total--complete");
							if (util.getEle("[data-func-check]", quizPackEle).length > 0 || util.getEle("[data-func-show]", quizPackEle).length > 0) {
								EDUTSS.view.viewResetEle(quizPackEle);
							}
							break;

						case "view-user":
							EDUTSS.quiz.showUserValue(qid);
							util.addCls(this, "on");
							util.getEle("[data-quiz-btn='view-answer']").forEach(function (elem) {
								elem.dataset.quizTarget === qid && util.removeCls(elem, "on");
							});
							break;

						case "view-answer":
							EDUTSS.quiz.resultQuiz(qid);
							util.addCls(this, "on");
							util.getEle("[data-quiz-btn='view-user']").forEach(function (elem) {
								elem.dataset.quizTarget === qid && util.removeCls(elem, "on");
							});
							break;

						case "close-solution":
							if (quizData.DATA[qid].totalControlBtns) {
								quizData.DATA[qid].totalControlBtns.forEach(function (elem) {
									if (elem.dataset.quizBtn === "all-check") {
										util.removeCls(elem, "disabled on");
									}
								});
							}
							util.removeCls(util.getEle(".check[data-quiz-target='" + qid + "']"), "disabled on");
							util.addCls(util.getEle("[data-quiz-solution='" + qid + "']"), "solution--hide");
							util.addCls(util.getEle("[data-quiz-solution]", quizData.DATA[qid].container), "solution--hide");
							EDUTSS.quiz.detectScroll(quizData.DATA[qid]);
							break;

						default:
							break;
					}
					if (clickSound && !elem.dataset.popup) EDUTSS.sound.playAudio("click");
				});
				if (btnType === "all-check" || btnType === "all-answer" || btnType === "all-replay") {
					EDUTSS.isDevMsg && !qid.includes("#") && console.log("#D: all-check, all-answer, all-replay는 [data-quiz-id]가 아닌 ID로 연결");
					childQuiz = util.getEle("[data-quiz-type]", util.getEle(qid));
					childQuiz.forEach(function (child) {
						let stage = quizData.DATA[child.dataset.quizId];
						let checkName;
						if (!stage.totalControlBtns) {
							stage.totalControlBtns = [];
						}
						stage.totalControlBtns.push(elem);
						if (!stage.totalControlById) {
							stage.totalControlById = [];
						}
						checkName = false;
						for (let name in stage.totalControlById) {
							stage.totalControlById[name] === elem.dataset.quizTarget && (checkName = true);
						}
						if (!checkName) {
							stage.totalControlById.push(elem.dataset.quizTarget);
						}
						if (btnType !== "all-replay") stage.isTotalCheckBtn = true;
					});
				}
			});
		},
		controlBtnHandler: function (stage) {
			if (stage.controlShowHide !== undefined) {
				if (stage.controlShowHide) {
					stage.controlShowHide = false;
					EDUTSS.quiz.syncControlBtn(stage.qid);
				} else {
					const filledValues = stage.userValue.filter(function (values) {
						return values.join() !== "";
					});
					filledValues.length ? util.addCls(stage.controlBtns, "btn--show") : util.removeCls(stage.controlBtns, "btn--show");
				}
			}
		},
		syncControlBtn: function (qid, type) {
			const stage = quizData.DATA[qid],
				btn = stage.controlBtns,
				btnLength = btn.length > 0;
			if (type === "result") {
				if (btnLength) {
					btn.forEach(function (elem) {
						if (elem.dataset.quizBtn && elem.dataset.quizBtn !== "view-user" && elem.dataset.quizBtn !== "view-answer") {
							if (elem.dataset.quizBtn === "check" || elem.dataset.quizBtn === "answer") {
								util.addCls(elem, "on disabled");
							}
						}
					});
				}
				if (stage.totalControlBtns) {
					stage.totalControlBtns.forEach(function (elem) {
						if (elem.dataset.quizBtn !== "all-replay") util.addCls(elem, "on disabled");
					});
				}
				EDUTSS.isDevMsg && console.log("#D: 정답확인 버튼 제어");
			} else if (type === "replay") {
				if (btnLength) {
					btn.forEach(function (elem) {
						if (elem.dataset.quizBtn) util.removeCls(elem, "on disabled btn--show");
					});
				}
				if (stage.totalControlBtns) {
					stage.totalControlBtns.forEach(function (btn) {
						if (!btn.closest(".btn_wrap.all")) util.removeCls(btn, "on disabled btn--show");
					});
					let getReplay = true;
					let quizPackEle = util.getEle(stage.totalControlBtns[0].dataset.quizTarget);
					let childQuiz = util.getEle("[data-quiz-type]", quizPackEle);
					let childQuizLen = childQuiz.length;
					for (let i = 0; i < childQuizLen; i++) {
						util.getText(JSON.stringify(quizData.DATA[childQuiz[i].dataset.quizId].userValue)).length >= 1 && (getReplay = false);
					}
					getReplay && util.removeCls(stage.totalControlBtns, "on btn--show disabled");
				}
				EDUTSS.isDevMsg && console.log("#D: 다시풀기 버튼 제어");
			} else {
				if (!stage.controlShowHide) {
					if (btnLength) {
						if (stage.type === "drag") {
							stage.userValue.filter(function (values) {
								return values.join() !== "";
							}).length ? util.addCls(btn, "btn--show") : util.removeCls(btn, "btn--show");
						} else {
							stage.controlShowHide ? util.removeCls(btn, "btn--show") : util.addCls(btn, "btn--show");
						}
					}
					if (stage.totalControlBtns) {
						stage.controlShowHide ? util.removeCls(stage.totalControlBtns, "btn--show") : util.addCls(stage.totalControlBtns, "btn--show");
					}
				}
			}
		},
		detectScroll: function (stage) {
			let popupContainer = stage.container.closest(".popup");
			if (popupContainer) {
				util.getEle("[data-layout-type='scroll']", popupContainer).forEach(function (elem) {
					EDUTSS.view.visibleScrollState(elem);
				});
			}
		}
	};
}();

EDUTSS.view = function () {
	const util = EDUTSS.util;
	const sound = EDUTSS.sound;
	let viewLayoutData = {
		slide: [],
		tab: [],
		scroll: [],
		zoom: [],
		drawing: [],
		checklist: [],
		showHide: [],
		popup: []
	};
	let isPopupContainer;
	let toastOutHandler = toastCloseHandle.bind(this);

	function toastCloseHandle(e) {
		let path, isPathPopup = false,
			isPathBtns = false,
			isPopBtn = false,
			toastEle = false;
		e && (path = e.composedPath && e.composedPath() || e.path);
		if (path) {
			path.forEach(function (e) {
				if (e.dataset && e.dataset.popup) isPopBtn = e;
				if (e.dataset && e.dataset.layoutType && e.dataset.layoutType === "popup") {
					isPathPopup = true;
					util.getEle("[data-popup]", e).forEach(function (elem) {
						if (util.hasCls(elem, "on")) {
							toastEle = elem;
							path.forEach(function (e) {
								if (e.classList && e.classList.contains("toast")) {
									toastEle = false;
									EDUTSS.isDevMsg && console.log("#D: 토스트 팝업 방어");
								}
							});
						}
					});
					return;
				}
				if (e.classList && e.classList.length > 0) {
					if (e.classList.contains("pop--open")) {
						isPathPopup = true;
					} else if (e.classList.contains("btn")) {
						isPathBtns = true;
					}
				}
			});
		}
		if (toastEle !== false) {
			util.removeEvt(document.body, "click", toastOutHandler, {
				capture: true
			});
			toastEle.click();
		}
		if (!isPathPopup) {
			EDUTSS.isDevMsg && console.log("#D: 팝업 외곽 클릭, 팝업 닫음, EDUTSS.isPopupOutSideClose => " + EDUTSS.isPopupOutSideClose);
			util.removeEvt(document.body, "click", toastOutHandler, {
				capture: true
			});
			if (EDUTSS.isPopupDisableEvent) {
				EDUTSS.view.closePopup(e);
				e.stopPropagation();
			} else {
				if (isPopBtn) {
					if (util.hasCls(isPopBtn, "on")) {
						isPopupContainer[0] && EDUTSS.view.closePopup(isPopupContainer[0], isPopupContainer[1], isPopupContainer[2]);
						e.stopPropagation();
					} else {
						EDUTSS.view.closePopup(e);
					}
				} else {
					EDUTSS.view.closePopup(e);
				}
			}
		}
	}
	return {
		toastOutHandler: toastOutHandler,
		initViewType: function () {
			const target = util.getEle("[data-layout-type]");
			target.forEach(function (elem) {
				switch (elem.dataset.layoutType) {
					case "slide":
						EDUTSS.view.initSlide(elem);
						break;

					case "tab":
						EDUTSS.view.initTab(elem);
						break;

					case "scroll":
						EDUTSS.view.initScroll(elem);
						break;

					default:
						break;
				}
			});
			this.initPopup();
			this.initZoom({
				rate: .2,
				step: 4,
				way: 50
			});
			this.initShowHide();
			this.initCheckList();
			this.initPageMove();
			this.initDownload();
			this.initDrawing({
				type: "pen,eraser,reset",
				color: "000000,ffffff,ff0000,ffba00,00d05d,0600ff",
				thick: "2px,4px,8px",
				default: "pen,ffba00,2px"
			}), this.viewReset();
		},
		initSlide: function (elem) {
			let viewArr = viewLayoutData.slide,
				viewArrIdx = viewArr.length,
				data = {
					slideId: "slide-" + util.isNum(viewArrIdx + 1),
					container: elem,
					slideAnimate: elem.dataset.slideMove || false,
					slideList: util.getEle("[data-slide-list]", elem),
					btnPrev: util.getEle("[data-slide-btn='prev']", elem),
					btnNext: util.getEle("[data-slide-btn='next']", elem),
					btnDotted: util.getEle("[data-slide-dot]", elem),
					thisNum: 0
				},
				stage;
			data.slideListLen = data.slideList.length;
			if (elem.dataset.slideDot && elem.dataset.slideDot === "true" && util.getEle(".move--slider", elem).length === 0) {
				let slideDot = util.createEle("div", {
						class: "move--slider"
					}, elem),
					dot;
				for (let i = 0; i < data.slideListLen; i++) {
					dot = util.createEle("div", {
						class: "btn slide dot",
						"data-slide-dot": String(i)
					}, slideDot);
					if (data.slideList[i].dataset.dotName) {
						dot.textContent = data.slideList[i].dataset.dotName;
						util.addCls(dot, "has--name");
					}
				}
				data.btnDotted = util.getEle("[data-slide-dot]", elem);
			}
			if (elem.dataset.slideNum && elem.dataset.slideNum === "true" && util.getEle(".slide--num", elem).length === 0) {
				let slideNum = util.createEle("div", {
						class: "slide--num"
					}, elem),
					currentNum = util.createEle("div", {
						class: "slide num current"
					}, slideNum),
					totalNum = util.createEle("div", {
						class: "slide num total"
					}, slideNum);
				currentNum.innerText = 1;
				totalNum.innerText = data.slideListLen;
				data.currentNum = currentNum;
				data.totalNum = totalNum;
			}
			viewArr.push(data);
			stage = viewArr[viewArrIdx];
			elem.dataset.slideId = stage.slideId;
			EDUTSS.isDevMsg && console.log("#D: 슬라이드 id 부여, 슬라이드 데이터 설정");
			EDUTSS.isDevMsg && console.log(data);
			if (stage.slideAnimate) {
				EDUTSS.view.getSlideRect(stage);
			}
			EDUTSS.view.moveSlide(stage, 0);
			if (stage.slideListLen > 1) {
				util.addEvt(stage.btnPrev, "click", function (e) {
					EDUTSS.view.moveSlide(stage, e);
					sound.playAudio("slide");
				});
				util.addEvt(stage.btnNext, "click", function (e) {
					EDUTSS.view.moveSlide(stage, e);
					sound.playAudio("slide");
				});
				util.addEvt(stage.btnDotted, "click", function (e) {
					EDUTSS.view.moveSlide(stage, e);
					sound.playAudio("slide");
				});
				EDUTSS.ui.addSwipe(util.getEle(".slide--swipe--area", stage.container), stage);
			} else {
				util.addCls(stage.btnPrev, "btn--hide");
				util.addCls(stage.btnNext, "btn--hide");
			}
		},
		getSlideRect: function (stage) {
			if (stage.slidePosition) {
				return;
			}
			let slideInner = util.getEle(".slide_inner", stage.container)[0];
			stage.slideWidth = slideInner.getBoundingClientRect().width / EDUTSS.scaleValue.zoom;
			stage.slideHeight = slideInner.getBoundingClientRect().height / EDUTSS.scaleValue.zoom;
			if (stage.slideWidth !== 0) {
				stage.slidePosition = true;
				slideInner.style.width = stage.slideWidth + "px";
				slideInner.style.height = stage.slideHeight + "px";
				stage.slideList.forEach(function (ele, idx) {
					ele.style.position = "absolute";
					ele.style.left = stage.slideWidth * idx + "px";
					ele.style.top = "0px";
				});
			} else {
				stage.slideList.forEach(function (ele, idx) {
					ele.style.position = "absolute";
					ele.style.top = "0px";
					ele.style.left = 100 * idx + "%";
				});
			}
		},
		moveSlide: function (stage, value) {
			let slideId, slideArr, targetList, i;
			if (!stage.slideId) {
				slideId = stage.dataset.slideId;
				slideArr = viewLayoutData.slide;
				for (i = 0; i < slideArr.length; i++) {
					if (slideArr[i].slideId === slideId) {
						stage = slideArr[i];
						break;
					}
				}
			}
			if (typeof value === "number") {
				stage.thisNum = value;
			} else {
				let target = value.currentTarget;
				if (target.dataset.slideBtn) {
					"prev" === target.dataset.slideBtn && (stage.thisNum -= 1);
					"next" === target.dataset.slideBtn && (stage.thisNum += 1);
				} else if (target.dataset.slideDot) {
					stage.thisNum = target.dataset.slideDot;
				}
			}
			if (stage.thisNum < 1) {
				stage.thisNum = 0;
				util.removeCls(stage.btnPrev, "btn--show");
				util.addCls(stage.btnNext, "btn--show");
			} else if (stage.thisNum >= stage.slideListLen - 1) {
				stage.thisNum = stage.slideListLen - 1;
				util.addCls(stage.btnPrev, "btn--show");
				util.removeCls(stage.btnNext, "btn--show");
			} else {
				util.addCls(stage.btnPrev, "btn--show");
				util.addCls(stage.btnNext, "btn--show");
			}
			targetList = stage.slideList[stage.thisNum];
			if (stage.slideAnimate && !stage.slidePosition) {
				EDUTSS.view.getSlideRect(stage);
			}
			if (stage.slideAnimate && stage.slidePosition) {
				if (stage.slideAnimate === "left") {
					stage.slideList.forEach(function (ele, idx) {
						ele.style.left = stage.slideWidth * idx - stage.slideWidth * stage.thisNum + "px";
					});
				} else {
					stage.slideList.forEach(function (ele, idx) {
						ele.style.left = 100 * idx - 100 * stage.thisNum + "%";
					});
				}
			} else {
				util.removeCls(stage.slideList, "slide--show");
				util.addCls(targetList, "slide--show");
			}
			stage.btnDotted.forEach(function (elem) {
				if (elem.dataset.slideDot == stage.thisNum) {
					util.addCls(elem, "on");
				} else {
					util.removeCls(elem, "on");
				}
			});
			stage.currentNum && (stage.currentNum.innerText = stage.thisNum + 1);
			EDUTSS.view.viewUpdate(targetList);
			EDUTSS.complete && EDUTSS.complete.slide(stage);
			EDUTSS.isDevMsg && console.log("#D: 슬라이드 이동");
		},
		initTab: function (elem) {
			const viewArr = viewLayoutData.tab,
				viewArrIdx = viewArr.length,
				data = {
					tabId: "tab-" + util.isNum(viewArrIdx + 1),
					container: elem,
					tabNav: util.getEle("[data-tab-nav]", util.getEle(".tab--nav", elem)[0]),
					tabList: [],
					thisTab: 0
				};
			let stage;
			data.tabNav.forEach(function (nav) {
				data.tabList.push(util.getEle("[data-tab-list='" + nav.dataset.tabNav + "']", elem)[0]);
			});
			data.tabLen = data.tabNav.length;
			for (let i = 0; i < data.tabLen; i++) {
				data.tabNav[i].dataset.viewedList = false;
			}
			viewArr.push(data);
			stage = viewArr[viewArrIdx];
			elem.dataset.tabId = stage.tabId;
			EDUTSS.isDevMsg && console.log("#D: 탭 id 부여, 탭 데이터 설정");
			EDUTSS.isDevMsg && console.log(data);
			EDUTSS.view.moveTab(stage, data.tabNav[0].dataset.tabNav);
			util.addEvt(stage.tabNav, "click", function (e) {
				EDUTSS.view.moveTab(stage, e.currentTarget.dataset.tabNav);
				sound.playAudio("tab");
			});
		},
		moveTab: function (stage, value) {
			let tabId, tabArr, i;
			if (!stage.tabId) {
				tabId = stage.dataset.tabId;
				tabArr = viewLayoutData.tab;
				for (i = 0; i < tabArr.length; i++) {
					if (tabArr[i].tabId === tabId) {
						stage = tabArr[i];
						break;
					}
				}
			}
			stage.thisTab = value;
			stage.currNav = util.getEle("[data-tab-nav='" + value + "']", stage.container);
			stage.currList = util.getEle("[data-tab-list='" + value + "']", stage.container);
			util.removeCls(stage.tabNav, "on");
			util.removeCls(stage.tabList, "tab--show");
			util.addCls(stage.currNav, "on");
			util.addCls(stage.currList, "tab--show");
			stage.currNav[0].dataset.viewedList = true;
			EDUTSS.view.viewUpdate(stage.currList);
			EDUTSS.complete && EDUTSS.complete.tab(stage);
			EDUTSS.isDevMsg && console.log("#D: 탭 이동");
		},
		initScroll: function (elem) {
			function ScrollContent(elem, idx) {
				this.container = elem, this.container.dataset.scrollId = "scroll-" + (idx + 1),
					this.content = util.getEle(".scroll--content", elem)[0], this.containerHeight = parseInt(util.getStyle(elem).height) || 0,
					this.barTop = 0, this.barLeft = 0, this.scrollValue = 0, this.scrollFlow = "vertical";
				if (util.hasCls(elem, "is--horizontal")) this.scrollFlow = "horizontal";
				Object.defineProperties(this, {
					containerSize: {
						get: function () {
							return this.content.getBoundingClientRect();
						}
					},
					containerTop: {
						get: function () {
							return this.containerSize.top;
						}
					},
					containerLeft: {
						get: function () {
							return this.containerSize.left;
						}
					},
					contentHeight: {
						get: function () {
							return this.containerSize.height;
						}
					},
					contentWidth: {
						get: function () {
							return this.containerSize.width;
						}
					},
					railSize: {
						get: function () {
							return this.barRail.getBoundingClientRect();
						}
					},
					railHeight: {
						get: function () {
							return this.railSize.bottom - this.railSize.top;
						}
					},
					railWidth: {
						get: function () {
							return this.railSize.right - this.railSize.left;
						}
					},
					barSize: {
						get: function () {
							return this.barHandler.getBoundingClientRect();
						}
					},
					barHeight: {
						get: function () {
							return (this.barSize.bottom - this.barSize.top) / 2;
						}
					},
					barWidth: {
						get: function () {
							return (this.barSize.right - this.barSize.left) / 2;
						}
					},
					heightRate: {
						get: function () {
							return (this.contentHeight - (this.contentHeight - this.railHeight) - this.barHeight * 2) / EDUTSS.scaleValue.zoom;
						}
					},
					widthRate: {
						get: function () {
							return (this.contentWidth - (this.contentWidth - this.railWidth) - this.barWidth * 2) / EDUTSS.scaleValue.zoom;
						}
					},
					barHightRate: {
						get: function () {
							return (this.barTop + this.barHeight) / (this.railHeight - this.barHeight);
						}
					},
					barWidthRate: {
						get: function () {
							return (this.barLeft + this.barWidth) / (this.railWidth - this.barWidth);
						}
					},
					scrollHeight: {
						get: function () {
							return this.content.scrollHeight * EDUTSS.scaleValue.zoom;
						}
					},
					scrollWidth: {
						get: function () {
							return this.content.scrollWidth * EDUTSS.scaleValue.zoom;
						}
					},
					containerHeightRate: {
						get: function () {
							return this.content.scrollTop / ((this.scrollHeight - this.contentHeight) / EDUTSS.scaleValue.zoom);
						}
					},
					containerWidthRate: {
						get: function () {
							return this.content.scrollLeft / ((this.scrollWidth - this.contentWidth) / EDUTSS.scaleValue.zoom);
						}
					},
					coord: {
						get: function () {
							return this.coordX, this.coordY;
						},
						set: function (e) {
							this.coordX = e.touches ? e.touches[0].clientX : e.clientX;
							this.coordY = e.touches ? e.touches[0].clientY : e.clientY;
						}
					}
				});
			}
			ScrollContent.prototype = {
				init: function () {
					this.create();
					this.addEvt();
					this.ready();
				},
				create: function () {
					return this.barContainer = util.createEle("div", {
						class: "scroll--bar"
					}, this.container), this.barRail = util.createEle("div", {
						class: "scroll--rail"
					}, this.barContainer), this.barCurrent = util.createEle("div", {
						class: "scroll--current"
					}, this.barContainer), this.barHandler = util.createEle("div", {
						class: "scroll--handle"
					}, this.barContainer), this.moveControl = util.createEle("div", {
						class: "scroll--move"
					}, this.container), this.barUp = util.createEle("div", {
						class: "scroll--move--btn scroll--up"
					}, this.moveControl), this.barDown = util.createEle("div", {
						class: "scroll--move--btn scroll--down"
					}, this.moveControl), this;
				},
				addEvt: function () {
					const stage = this;
					util.addEvt(this.barRail, "down", this.startDrag.bind(this));
					util.addEvt(this.barHandler, "down", this.dragBarHandle.bind(this));
					util.addEvt(this.barHandler, "up", function () {
						util.removeCls(stage.barHandler, "scroll--dragging");
					});
					util.addEvt(this.barUp, "down", this.scrollMove.bind(this));
					util.addEvt(this.barDown, "down", this.scrollMove.bind(this));
					util.addEvt(this.content, "scroll", this.scrollHandle.bind(this));
				},
				ready: function () {
					if (this.scrollFlow === "vertical" && this.contentHeight === this.scrollHeight || this.scrollFlow === "horizontal" && this.contentWidth === this.scrollWidth) {
						util.addCls(this.container, "scroll--hide");
					} else {
						util.removeCls(this.container, "scroll--hide");
					}
					if (EDUTSS.isSubject === "sci") {
						if (this.scrollFlow === "vertical") {
							this.barHandler.style.height = this.railHeight - (this.scrollHeight - this.contentHeight) + "px";
						} else if (this.scrollFlow === "horizontal") {
							this.barHandler.style.width = this.railWidth - (this.scrollWidth - this.contentWidth) + "px";
						}
					}
					const isOpened = !!util.getEle(".viewed--popup", this.container.closest(".toast_area")).length;
					if (this.container.dataset.startPosition === "bottom" && !isOpened) {
						this.content.scrollTop = (this.scrollHeight - this.contentHeight) / EDUTSS.scaleValue.zoom;
					}
				},
				dragBarHandle: function (e) {
					const stage = this,
						setBar = stage.startDrag.bind(this);
					e.preventDefault();
					util.addEvt(window, "move", setBar);
					util.addEvt(window, "up", function () {
						util.removeEvt(window, "move", setBar);
						util.removeCls(stage.barHandler, "scroll--dragging");
					});
				},
				startDrag: function (e) {
					this.coord = e;
					if (this.scrollFlow === "vertical") {
						this.barTop = (this.coordY - this.containerTop - this.barHeight) / EDUTSS.scaleValue.zoom;
						this.barTop = this.barTop <= 0 ? 0 : this.barTop >= this.heightRate ? this.heightRate : this.barTop;
						this.scrollValue = (this.scrollHeight - this.contentHeight) * (this.barTop <= .1 ? 0 : this.barHightRate);
						this.barHandler.style.top = this.barTop + "px";
						this.barCurrent.style.height = this.barTop + "px";
						this.content.scrollTop = parseFloat(this.scrollValue).toFixed(2);
					} else if (this.scrollFlow === "horizontal") {
						this.barLeft = (this.coordX - this.containerLeft - this.barWidth) / EDUTSS.scaleValue.zoom;
						this.barLeft = this.barLeft <= 0 ? 0 : this.barLeft >= this.widthRate ? this.widthRate : this.barLeft;
						this.scrollValue = (this.scrollWidth - this.contentWidth) * (this.barLeft <= .1 ? 0 : this.barWidthRate);
						this.barHandler.style.left = this.barLeft + "px";
						this.barCurrent.style.width = this.barLeft + "px";
						this.content.scrollLeft = parseFloat(this.scrollValue).toFixed(2);
					}
					util.addCls(this.barHandler, "scroll--dragging");
					!util.isTouch && e.preventDefault();
				},
				scrollHandle: function () {
					if (util.hasCls(this.barHandler, "scroll--dragging")) return;
					if (this.scrollFlow === "vertical") {
						this.barTop = this.heightRate * this.containerHeightRate;
						this.barHandler.style.top = this.barTop + "px";
						this.barCurrent.style.height = this.barTop + "px";
					} else if (this.scrollFlow === "horizontal") {
						this.barLeft = this.widthRate * this.containerWidthRate;
						this.barHandler.style.left = this.barLeft + "px";
						this.barCurrent.style.width = this.barLeft + "px";
					}
				},
				scrollMove: function (e) {
					let value = (this.scrollHeight - this.contentHeight) * .1;
					if (util.hasCls(e.currentTarget, "scroll--up")) {
						if (this.content.scrollTop - value > 0) {
							this.content.scrollTop = this.content.scrollTop - value;
						} else {
							this.content.scrollTop = 0;
						}
					} else if (util.hasCls(e.currentTarget, "scroll--down")) {
						if (this.content.scrollTop + value < this.scrollHeight - this.contentHeight) {
							this.content.scrollTop = this.content.scrollTop + value;
						} else {
							this.content.scrollTop = this.scrollHeight - this.contentHeight;
						}
					}
				}
			};
			let viewArr = viewLayoutData.scroll,
				viewArrIdx = viewArr.length;
			viewArr[viewArrIdx] = new ScrollContent(elem, viewArrIdx);
			viewArr[viewArrIdx].init();
			EDUTSS.isDevMsg && console.log("#D: 스크롤 생성");
		},
		initPopup: function () {
			EDUTSS.isPopupOutSideClose = true;
			EDUTSS.isPopupDisableEvent = false;

			function getActiveStatus(target) {
				if (!target.dataset.quizTarget) {
					return false;
				}
				const activeId = target.dataset.quizTarget;
				let targetQuiz, value = false;
				if (activeId.includes("#")) {
					targetQuiz = util.getEle(".is--not--activity", util.getEle(activeId));
					value = targetQuiz.length > 0 ? true : false;
				} else {
					value = util.hasCls(util.getEle("[data-quiz-id='" + activeId + "']")[0], "is--not--activity");
				}
				return value;
			}

			function getQuizHint(target) {
				if (!target.dataset.quizTarget) {
					return false;
				}
				const activeId = target.dataset.quizTarget;
				let targetHint, value = false;
				if (activeId.includes("#")) {
					targetHint = util.getEle("[data-quiz-feed='hint']", util.getEle(activeId));
				} else {
					targetHint = util.getEle("[data-quiz-feed='hint']", util.getEle("[data-quiz-id='" + activeId + "']")[0]);
				}
				targetHint.forEach(function (hint) {
					if (util.hasCls(hint, "hint--show") && !util.hasCls(target, "viewed--duplication--hint")) {
						util.addCls(target, "viewed--duplication--hint");
						value = true;
					}
				});
				return value;
			}
			util.addEvt(util.getEle("[data-popup]"), "click", function (e) {
				const target = e.currentTarget;
				if (getActiveStatus(target) || getQuizHint(target)) {
					return;
				}
				if (target.dataset.popup === "") {
					dtDevAlert("내용 확인 중입니다.");
					return;
				}
				if (!util.hasCls(target, "on" || !target.dataset.quizBtn)) sound.playAudio("popup");
				EDUTSS.view.openPopup(e);
				if (EDUTSS.scoThisGoalBtn && EDUTSS.scoLastGoalBtn) {
					if (util.hasCls(e.currentTarget.parentNode, "last_goal")) {
						util.addCls(EDUTSS.scoThisGoalBtn, "off");
					} else if (util.hasCls(e.currentTarget.parentNode, "this_goal")) {
						util.addCls(EDUTSS.scoLastGoalBtn, "off");
					}
				}
			});
			util.addEvt(util.getEle("[data-popup-btn='close']"), "click", function (e) {
				EDUTSS.view.closePopup(e);
			});
			util.addEvt(util.getEle("[data-msg]"), "click", function (e) {
				sound.playAudio("popup");
				EDUTSS.view.openMsg(e);
			});
		},
		openPopup: function (e, popupId) {
			const target = popupId ? null : e.currentTarget,
				targetId = popupId ? popupId : target.dataset.popup;
			let popContainer, toastTarget, stepPopup = false,
				videoAutoPlay = target && target.dataset.videoAutoplay || null,
				tabIdx = target && target.dataset.tabIdx || null,
				slideIdx = target && target.dataset.slideIdx || null;
			if (util.hasCls(target.parentNode, "step--popup")) {
				if (target.parentNode.previousElementSibling && !util.hasCls(target.parentNode.previousElementSibling, "viewed--popup")) {
					stepPopup = true;
				}
			}
			if (stepPopup) {
				toastTarget = target.nextElementSibling;
				util.addCls(target.parentNode.previousElementSibling, "animated bounceOn");
				setTimeout(function () {
					util.removeCls(target.parentNode.previousElementSibling, "animated bounceOn");
				}, 1e3);
			} else if (targetId.includes("#")) {
				popContainer = util.getEle(targetId);
				util.hasCls(popContainer, "toast") && (popContainer.dataset.isToast = true);
			} else if (targetId === "inner") {
				popContainer = util.getEle("[data-layout-type='popup']", target)[0];
				popContainer.dataset.isToast = true;
			} else if (targetId === "next") {
				target.nextElementSibling && (toastTarget = target.nextElementSibling);
			} else if (target === "prev") {
				target.previousElementSibling && (toastTarget = target.previousElementSibling);
			}
			if (toastTarget && toastTarget.dataset.layoutType === "popup") {
				popContainer = toastTarget;
				popContainer.dataset.isToast = true;
			}
			if (popContainer) {
				let defenseCloseEvent = false;
				if (target && target !== e.target && targetId === "inner" && util.hasCls(popContainer, "pop--open")) {
					if (EDUTSS.isPopupOutSideClose) {
						defenseCloseEvent = true;
					} else {
						let path;
						e && (path = e.composedPath && e.composedPath() || e.path);
						if (path) {
							path.forEach(function (e) {
								e.dataset && e.dataset.layoutType === "popup" && (defenseCloseEvent = true);
							});
						}
					}
				}
				if (defenseCloseEvent) {
					EDUTSS.isDevMsg && console.log("#D: 토스트 본문 클릭 - 닫기 방어");
					return;
				}
				if (popContainer.dataset.isToast) {
					if (util.hasCls(popContainer, "pop--open")) {
						EDUTSS.view.closePopup(e, popContainer, target);
						EDUTSS.isDevMsg && console.log("#D: 토스트 닫음");
					} else {
						popContainer.dataset.overlay !== "true" && EDUTSS.view.closePopup();
						popupOpenClass();
						if (target) {
							EDUTSS.view.setPopupPosition(popContainer, target);
							EDUTSS.view.setTailPosition(popContainer, target);
						}
						EDUTSS.isDevMsg && console.log("#D: 토스트 팝업 열기");
						EDUTSS.isDevMsg && console.log(popContainer);
					}
				} else {
					EDUTSS.view.closePopup();
					popupOpenClass();
					util.addCls(popContainer.parentNode, "active");
					if (target && util.hasCls(popContainer, "word")) {
						util.getStyle(popContainer).top === "0px" && EDUTSS.view.setPopupPosition(popContainer, target);
					}
					EDUTSS.isDevMsg && console.log("#D: 팝업 열기");
					EDUTSS.isDevMsg && console.log(popContainer);
				}
				if (!stepPopup) {
					if (tabIdx) {
						let hasTabContainer = util.getEle("[data-layout-type='tab']", popContainer)[0];
						viewLayoutData.tab.forEach(function (arr) {
							if (arr.tabId === hasTabContainer.dataset.tabId) {
								EDUTSS.view.moveTab(arr, Number(tabIdx));
							}
						});
						EDUTSS.isDevMsg && console.log("#D: 탭 이동 => " + tabIdx);
					}
					if (slideIdx) {
						let hasSlideContainer = util.getEle("[data-layout-type='slide']", popContainer)[0];
						viewLayoutData.slide.forEach(function (arr) {
							if (arr.slideId === hasSlideContainer.dataset.slideId) {
								EDUTSS.view.moveSlide(arr, Number(slideIdx));
							}
						});
						EDUTSS.isDevMsg && console.log("#D: 슬라이드 이동 => " + slideIdx);
					}
					if (videoAutoPlay) {
						let videoName = util.getEle(".media--area", popContainer)[0].dataset.mediaId;
						for (let videoIdx in EDUTSS.mediaPlayer) {
							if (EDUTSS.mediaPlayer[videoIdx].mediaId === videoName) {
								EDUTSS.mediaPlayer[videoIdx].mediaLoad();
								EDUTSS.mediaPlayer[videoIdx].mediaPlay();
							}
						}
					}
					if (popContainer.dataset.duplication) this.duplicationObject(popContainer);
				}
				if (EDUTSS.isPopupOutSideClose) {
					let outSideEvent = false;
					if (popContainer.dataset.isToast && !popContainer.dataset.hasClose) {
						outSideEvent = true;
					} else if (util.hasCls(popContainer, "is--outside--close")) {
						outSizeEvent = true;
					}
					if (outSideEvent) {
						e && e.stopPropagation();
						util.addEvt(document.body, "click", toastOutHandler, {
							capture: true
						});
					}
				}!EDUTSS.isPopupDisableEvent && (isPopupContainer = [e, popContainer, target]);
				EDUTSS.view.viewUpdate(popContainer, "disabled");
				util.addCls(target, "viewed--popup");
				EDUTSS.complete && EDUTSS.complete.openPopup(popContainer, target);
			}

			function popupOpenClass() {
				util.addCls(target, "on");
				util.addCls(popContainer, "pop--open");
				util.addCls(document.body, "isOnPopup");
			}
		},
		closePopup: function (e, target, btn) {
			let targetEle, targetBtn = null,
				isToast;
			if (!util.hasCls(document.body, "isOnPopup")) {
				return;
			}
			EDUTSS.isDevMsg && console.log("#D: 팝업 닫기");
			if (target && typeof target === "string" && target.includes("#")) {
				targetEle = util.getEle(target);
				targetBtn = util.getEle("[data-popup='" + target.replace("#", "") + "']");
			} else if (target && typeof target === "object") {
				targetEle = target;
				e.stopPropagation();
			} else if (e && e.currentTarget.dataset && e.currentTarget.dataset.popupBtn === "close") {
				targetEle = e.currentTarget.closest("[data-layout-type='popup']");
				btn && (targetBtn = btn);
				e.stopPropagation();
			} else {
				targetEle = util.getEle("[data-layout-type='popup']");
			}
			util.removeCls(targetEle, "pop--open");
			!targetBtn && util.removeCls(util.getEle("[data-popup]"), "on");
			util.removeCls(targetBtn, "on");
			targetEle.dataset && targetEle.dataset.isToast && (isToast = true);
			sound.stopAllSound();
			if (!isToast) {
				util.removeCls(document.body, "isOnPopup");
				util.removeCls(util.getEle(".popup--container"), "active");
				toastOutHandler && util.removeEvt(document.body, "click", toastOutHandler, {
					capture: true
				});
				!EDUTSS.isPopupDisableEvent && (isPopupContainer = []);
			}

			function removeDuplication(el) {
				if (!el.dataset.duplication) return;
				let duplicationEle = util.getEle(".duplication--area", el);
				duplicationEle.forEach(function (elem) {
					elem.children.innerHTML = "";
				});
			}
			if (targetEle.length) {
				targetEle.forEach(function (target) {
					removeDuplication(target);
				});
			} else {
				removeDuplication(targetEle);
			}
			if (EDUTSS.scoThisGoalBtn && EDUTSS.scoLastGoalBtn) {
				util.removeCls(EDUTSS.scoThisGoalBtn, "off");
				util.removeCls(EDUTSS.scoLastGoalBtn, "off");
			}
			EDUTSS.complete && EDUTSS.complete.closeAllPopup();
		},
		duplicationObject: function (container) {
			let duplicationEle = util.getEle("[data-duplication-target]", container);
			duplicationEle.forEach(function (elem) {
				let duplicationTarget = util.getEle("[data-duplication-object=" + elem.dataset.duplicationTarget + "]")[0],
					duplicationNames = util.getEle("[data-duplication-name]", elem),
					copyTarget;
				if (duplicationTarget && duplicationNames.length > 0) {
					duplicationNames.forEach(function (items) {
						copyTarget = util.getEle("[data-duplication-sublist='" + items.dataset.duplicationName + "']", duplicationTarget)[0];
						copyTarget && quizInit(items, copyTarget);
					});
				} else {
					copyTarget = duplicationTarget;
					copyTarget && quizInit(elem, duplicationTarget);
				}
				util.getEle(".animated", elem).forEach(function (items) {
					util.removeCls(items, "animated");
				});
			});

			function quizInit(elem, target) {
				util.copyPaste(elem, target);
				util.getEle("[data-quiz-type]", elem).forEach(function (quiz) {
					if (util.hasCls(elem, "duplication--answer")) {
						EDUTSS.quiz.duplicationResult(quiz, "answer");
					} else {
						EDUTSS.quiz.duplicationResult(quiz, "default");
					}
				});
			}
		},
		senseClosePopupEvent: function (e) {
			EDUTSS.isPopupOutSideClose && util.hasCls(document.body, "isOnPopup") && !e.currentTarget.closest("[data-layout-type='popup']") && EDUTSS.view.closePopup();
		},
		setPopupPosition: function (elem, btn) {
			if (elem.dataset.isPosition) return;
			let bodyPos = util.getEle("#wrap").getBoundingClientRect();
			let btnPos = btn.getBoundingClientRect();
			let elemPos = elem.getBoundingClientRect();
			let isQuiz = false;
			let contentPos;
			if (btn.dataset.quizTarget) {
				isQuiz = true;
				if (btn.dataset.quizTarget.includes("#")) {
					btn = util.getEle(btn.dataset.quizTarget);
				} else {
					btn = util.getEle("[data-quiz-id='" + btn.dataset.quizTarget + "']")[0];
				}
				contentPos = btn.closest(".content").getBoundingClientRect();
				btnPos = btn.getBoundingClientRect();
			}
			if (isQuiz) {
				if (util.hasCls(elem, "up")) {
					console.log(contentPos.top, elemPos.height);
					elem.style.top = (contentPos.top - elemPos.height) / EDUTSS.scaleValue.zoom + "px";
				} else if (util.hasCls(elem, "down")) {
					elem.style.top = (contentPos.top + contentPos.height) / EDUTSS.scaleValue.zoom + "px";
				}
				EDUTSS.isDevMsg && console.log("#D: 답안 top top 좌표 확인");
				elem.dataset.isPosition = true;
			} else if (util.hasCls(elem, "toast")) {
				if (bodyPos.width / 3 * 2 < btnPos.left) {
					util.addCls(elem, "right");
				} else if (bodyPos.width / 3 > btnPos.left) {
					util.addCls(elem, "left");
				} else {
					util.addCls(elem, "center");
				}
				EDUTSS.isDevMsg && console.log("#D: 토스트 팝업 left, right 추가");
				elem.dataset.isPosition = true;
			}
		},
		setTailPosition: function (elem, btn) {
			const tailEle = util.getEle(".tail", elem)[0];
			if (!tailEle || tailEle.dataset.tailX || btn.dataset.quizTarget) {
				return;
			}
			if (tailEle) {
				const btnPos = btn.getBoundingClientRect(),
					elemPos = elem.getBoundingClientRect(),
					tailPos = tailEle.getBoundingClientRect(),
					tailLeft = (btnPos.left - elemPos.left + btnPos.width / 2 - tailPos.width / 2) / EDUTSS.scaleValue.zoom || tailPos.left;
				tailEle.dataset.tailX = tailLeft;
				tailEle.style.left = tailLeft + "px";
			}
		},
		openMsg: function (e) {
			const target = e.currentTarget,
				targetId = "#" + target.dataset.popup,
				popContainer = util.getEle(targetId);
			util.addCls(popContainer, "msg--open");
			setTimeout(function () {
				util.removeCls(popContainer, "msg--open");
			}, 2e3);
		},
		initPageMove: function () {
			util.addEvt(util.getEle("[data-prev-page]"), "click", function (e) {
				!util.hasCls(e.currentTarget, "disabled") && (EDUTSS.view.pageMove(e),
					sound.playAudio("click"));
			});
			util.addEvt(util.getEle("[data-next-page]"), "click", function (e) {
				!util.hasCls(e.currentTarget, "disabled") && (EDUTSS.view.pageMove(e),
					sound.playAudio("click"));
			});
			util.addEvt(util.getEle("[data-move-page]"), "click", function (e) {
				if (EDUTSS.isDTBOOK) {
					let page = e.currentTarget.dataset.movePage;
					!util.hasCls(e.currentTarget, "disabled") && (parent.GO_PAGE_LOAD(page),
						sound.playAudio("click"));
				} else {
					!util.hasCls(e.currentTarget, "disabled") && (EDUTSS.view.pageMove(e),
						sound.playAudio("click"));
				}
			});
		},
		pageMove: function (e) {
			let target = "",
				targetPage = "";
			if (typeof e === "string") {
				targetPage = e;
			} else {
				target = e.target;
				targetPage = target.dataset.movePage;
			}
			setTimeout(function () {
				location.href = targetPage;
			}, 200);
		},
		initCheckList: function () {
			const checkEle = util.getEle("[data-func-check]");
			let viewArr = viewLayoutData.checklist,
				viewArrIdx = viewArr.length,
				data, name;
			checkEle.forEach(function (elem) {
				data = {
					checkId: "checklist-" + util.isNum(viewArrIdx + 1),
					container: elem,
					checklist: util.getEle("[data-check-list]", elem),
					type: elem.dataset.funcCheck,
					replayBtn: util.getEle("[data-check-replay]", elem)
				};
				if (data.replayBtn.length === 0) {
					data.replayBtn = util.getEle("[data-check-replay='" + elem.getAttribute("id") + "']");
				}
				data.feedback = util.getEle(".check--feedback .feed", elem);
				data.length = data.checklist.length;
				data.checkName = {};
				for (let i = 0; i < data.length; i++) {
					name = data.checklist[i].dataset.checkList;
					!data.checkName[name] && (data.checkName[name] = false);
				}
				data.quizLink = data.container.closest("[data-quiz-type]");
				viewArr.push(data);
				viewArrIdx = viewArr.length;
				elem.dataset.checkId = data.checkId;
				EDUTSS.isDevMsg && console.log("#D: 체크 리스트 데이터 설정");
				EDUTSS.isDevMsg && console.log(data);
			});
			viewArr.forEach(function (stage) {
				util.addEvt(stage.checklist, "click", function (e) {
					EDUTSS.view.isCheckList(stage, e);
				});
			});
			util.addEvt(util.getEle("[data-check-replay]"), "click", function (e) {
				const btn = e.currentTarget,
					target = btn.dataset.checkReplay ? util.getEle("#" + btn.dataset.checkReplay) : btn.closest("[data-func-check]");
				EDUTSS.view.resetCheckList(target);
				sound.playAudio("click");
			});
			EDUTSS.isDTBOOK && this.loadCheckData();
		},
		isCheckList: function (stage, e) {
			let target = e.currentTarget,
				checkValue = target.dataset.checkList.split("-") || "";
			EDUTSS.isDevMsg && console.log("#D: checkType(checkbox, sum, ...) => " + stage.type);
			!util.hasCls(target, "check--on") && sound.playAudio("tap");
			switch (stage.type) {
				case "checkbox":
					util.hasCls(target, "check--on") ? util.removeCls(target, "check--on") : util.addCls(target, "check--on");
					break;

				case "one":
					if (!util.hasCls(target, "check--on")) {
						stage.checklist.forEach(function (elem) {
							if (elem.dataset.checkList === target.dataset.checkList) {
								util.removeCls(elem, "check--on");
							}
						});
						util.addCls(target, "check--on");
					} else {
						return;
					}
					break;

				case "sum":
					let group, rest, idx;
					if (util.hasCls(target, "check--on")) {
						rest = false;
						if (target.dataset.checkGroup) {
							group = target.dataset.checkGroup;
							for (idx = 0; idx < stage.length; idx++) {
								if (stage.checklist[idx] === target) rest = true;
								rest && stage.checklist[idx].dataset.checkGroup === group && util.removeCls(stage.checklist[idx], "check--on");
							}
						} else {
							for (idx = 0; idx < stage.length; idx++) {
								if (stage.checklist[idx] === target) rest = true;
								rest && util.removeCls(stage.checklist[idx], "check--on");
							}
						}
						util.addCls(target, "check--on");
					} else {
						if (target.dataset.checkGroup) {
							group = target.dataset.checkGroup;
							for (idx = 0; idx < stage.length; idx++) {
								stage.checklist[idx].dataset.checkGroup === group && util.addCls(stage.checklist[idx], "check--on");
								if (stage.checklist[idx] === target) break;
							}
						} else {
							for (idx = 0; idx < stage.length; idx++) {
								util.addCls(stage.checklist[idx], "check--on");
								if (stage.checklist[idx] === target) break;
							}
						}
					}
					break;

				default:
					if (!util.hasCls(target, "check--on")) {
						util.removeCls(stage.checklist, "check--on");
						util.addCls(target, "check--on");
					} else {
						return;
					}
					break;
			}
			stage.checklist.forEach(function (elem) {
				if (util.hasCls(elem, "check--on")) {
					util.getEle(".check--input", elem)[0].checked = true;
					stage.checkName[elem.dataset.checkList] = true;
				} else {
					util.getEle(".check--input", elem)[0].checked = false;
				}
			});
			util.addCls(stage.replayBtn, "btn--show");
			if (stage.feedback) {
				let score = util.getEle(".check--on", stage.container).length;
				util.removeCls(stage.feedback, "show");
				score && util.addCls(stage.feedback[score - 1], "show");
			}
			if (util.hasCls(target, "toggle")) {
				if (checkValue[1] === "true") {
					checkValue[1] = false;
					target.dataset.checkList = checkValue[0] + "-false";
				} else if (checkValue[1] === "false") {
					checkValue[1] = true;
					target.dataset.checkList = checkValue[0] + "-true";
				}
				EDUTSS.isDevMsg && console.log("#D: check toggle dataset 변환");
			}
			if (stage.quizLink) {
				let quizData = EDUTSS.quizData.DATA[stage.quizLink.dataset.quizId];
				EDUTSS.quizData.addQuizActivity(quizData, true);
				EDUTSS.quiz.controlBtnHandler(quizData);
			}
			EDUTSS.complete && EDUTSS.complete.checkList(stage, target);
		},
		resetCheckList: function (target) {
			let stage, idx;
			for (idx in viewLayoutData.checklist) {
				if (target.dataset.checkId === viewLayoutData.checklist[idx].checkId) {
					stage = viewLayoutData.checklist[idx];
				}
			}
			stage.checklist.forEach(function (elem) {
				util.removeCls(elem, "check--on");
				util.getEle("input", elem).forEach(function (input) {
					input.checked = false;
					if (EDUTSS.isDTBOOK) {
						input.id && (input.checked = false);
						if ("function" == typeof parent.API_ANNOTATION_INPUT_DELETE) {
							input.id && parent.API_ANNOTATION_INPUT_DELETE(input.id);
						}
					}
				});
				let checkValue = elem.dataset.checkList.split("-");
				if (checkValue.length > 1 && util.hasCls(elem, "toggle")) {
					if (checkValue[1] === "true") {
						checkValue[1] = false;
						elem.dataset.checkList = checkValue[0] + "-false";
					}
				}
				EDUTSS.isDevMsg && console.log("#D: 체크 리스트 초기화");
			});
			for (idx in stage.checkName) {
				stage.checkName[idx] = false;
			}
			stage.feedback && util.removeCls(stage.feedback, "show");
			stage.replayBtn && util.removeCls(stage.replayBtn, "btn--show");
		},
		loadCheckData: function () {
			const inputEle = util.getEle("[data-check-list] .check--input");
			let loadCheck = [],
				thisId, onePass = false;
			let interval = setInterval(function () {
				if (onePass) {
					const checkEle = util.getEle("[data-func-check]");
					let stage;
					checkEle.forEach(function (elem) {
						for (let idx in viewLayoutData.checklist) {
							if (elem.dataset.checkId === viewLayoutData.checklist[idx].checkId) {
								stage = viewLayoutData.checklist[idx];
								stage.replayBtn && util.addCls(stage.replayBtn, "btn--show");
								stage.checklist.forEach(function (elem) {
									util.hasCls(elem, "check--on") && (stage.checkName[elem.dataset.checkList] = true);
								});
							}
						}
					});
					clearInterval(interval);
					return;
				}
				inputEle.forEach(function (elem) {
					thisId = elem.getAttribute("id");
					if (!thisId) return;
					if (loadCheck.indexOf(thisId) !== -1) clearInterval(interval);
					if (elem.checked === true) {
						loadCheck.push(thisId);
						onePass = true;
						let checkItems = elem.closest("[data-check-list]");
						elem.checked === true && util.addCls(checkItems, "check--on");
					}
				});
			}, 200);
			setTimeout(function () {
				clearInterval(interval);
			}, 7e3);
		},
		getCheckActivity: function (target) {
			let stage, idx, value = true;
			for (idx in viewLayoutData.checklist) {
				if (target.dataset.checkId === viewLayoutData.checklist[idx].checkId) {
					stage = viewLayoutData.checklist[idx];
				}
			}
			if (stage) {
				for (idx in stage.checkName) {
					if (stage.checkName[idx] === false) value = false;
				}
				return value;
			}
		},
		initShowHide: function () {
			const showContainer = util.getEle("[data-func-show]"),
				showAll = util.getEle("[data-show-all]");
			showContainer.forEach(function (elem) {
				const btn = util.getEle("[data-show-idx]", elem);
				let target, targetEles, showObj;
				if (elem.dataset.funcShow === "all") util.addCls(btn, "disabled");
				EDUTSS.isDevMsg && console.log("#D: showHideType(toggle, one, all, show, ...) => " + elem.dataset.funcShow);
				util.addEvt(btn, "click", function (e) {
					target = e.currentTarget;
					targetEles = util.getEle("[data-show-idx='" + target.dataset.showIdx + "']", elem);
					showObj = util.getEle("[data-show-obj='" + target.dataset.showIdx + "']", elem);
					switch (elem.dataset.funcShow) {
						case "toggle":
							if (util.hasCls(target, "on")) {
								util.removeCls(showObj, "obj--show");
								util.removeCls(targetEles, "on");
							} else {
								util.addCls(showObj, "obj--show");
								util.addCls(targetEles, "on");
							}
							break;

						case "one":
							util.removeCls(util.getEle("[data-show-obj]", elem), "obj--show");
							util.removeCls(util.getEle("[data-show-idx]", elem), "on disabled");
							util.addCls(showObj, "obj--show");
							util.addCls(target, "on disabled");
							break;

						case "show":
							util.addCls(showObj, "obj--show");
							util.addCls(target, "on disabled");
							break;

						default:
							util.addCls(showObj, "obj--show");
							util.addCls(target, "on disabled");
							break;
					}
					if (!target.dataset.funcAudio) {
						if (elem.dataset.effectAudio) {
							sound.playAudio(elem.dataset.effectAudio);
						} else if (EDUTSS.commonEffectAudio.sticker && util.hasCls(target, "sticker")) {
							sound.playAudio("sticker");
						} else {
							sound.playAudio("click");
						}
					}
					EDUTSS.complete && EDUTSS.complete.showHide(target);
					elem.dataset.funcShow !== "one" && EDUTSS.view.showHideComplete(elem);
				});
			});
			util.addEvt(showAll, "click", function (e) {
				const btn = e.currentTarget,
					target = btn.closest("[data-func-show]") || util.getEle("#" + btn.dataset.showAll);
				util.hasCls(btn, "replay") ? EDUTSS.view.showHideReplay(target) : EDUTSS.view.showHideComplete(target);
				sound.playAudio("click");
			});
		},
		showHideComplete: function (elem, showAllbtn) {
			const showIdx = util.getEle("[data-show-idx]", elem),
				showLen = showIdx.length;
			let showNum = 0,
				i, showHandler;
			if (showAllbtn && typeof showAllbtn !== "object") {
				showHandler = showAllbtn;
				showAllbtn = null;
			}
			if (showHandler) {
				if (showHandler === "result") {
					showEleResult();
				} else if (showHandler === "replay") {
					showEleReplay();
				}
			} else if (showAllbtn) {
				if (util.hasCls(showAllbtn, "replay")) {
					util.removeCls(showAllbtn, "on");
					if (util.hasCls(showAllbtn, "toggle")) util.removeCls(showAllbtn, "replay");
					showEleReplay();
				} else {
					util.addCls(showAllbtn, "on");
					if (util.hasCls(showAllbtn, "toggle")) util.addCls(showAllbtn, "replay");
					showEleResult();
				}
			} else {
				showAllbtn = util.getEle("[data-show-all]", elem);
				if (showAllbtn.length === 0) showAllbtn = util.getEle("[data-show-all='" + elem.getAttribute("id") + "']");
				for (i = 0; i < showLen; i++) {
					if (util.hasCls(showIdx[i], "on")) showNum++;
				}
			}
			if (showNum === showLen) {
				util.addCls(elem, "show--complete");
				showAllbtn && util.addCls(showAllbtn, "on");
				EDUTSS.complete && EDUTSS.complete.showHide(elem);
				EDUTSS.isDevMsg && console.log("#D: showHide - 전체 활성 함");
			} else {
				util.removeCls(elem, "show--complete");
				showAllbtn && util.removeCls(showAllbtn, "on");
			}

			function showEleResult() {
				for (i = 0; i < showLen; i++) {
					util.addCls(showIdx[i], "on");
					if (elem.dataset.funcShow !== "toggle") util.addCls(showIdx[i], "disabled");
					util.addCls(util.getEle("[data-show-obj='" + showIdx[i].dataset.showIdx + "']", elem), "obj--show");
				}
				showNum = showLen;
			}

			function showEleReplay() {
				for (i = 0; i < showLen; i++) {
					util.removeCls(showIdx[i], "on disabled");
					util.removeCls(util.getEle("[data-show-obj='" + showIdx[i].dataset.showIdx + "']", elem), "obj--show");
				}
			}
		},
		showHideReplay: function (elem) {
			const showIdx = util.getEle("[data-show-idx]", elem),
				showLen = showIdx.length;
			for (let i = 0; i < showLen; i++) {
				util.removeCls(showIdx[i], "on disabled");
				util.removeCls(util.getEle("[data-show-obj='" + showIdx[i].dataset.showIdx + "']", elem), "obj--show");
			}
			util.removeCls(elem, "show--complete");
			let showAllbtn = util.getEle("[data-show-all]", elem);
			if (showAllbtn.length === 0) showAllbtn = util.getEle("[data-show-all='" + elem.getAttribute("id") + "']");
			if (showAllbtn) {
				util.removeCls(showAllbtn, "on disabled");
				showAllbtn.forEach(function (elem) {
					util.hasCls(elem, "toggle") && util.removeCls(elem, "replay");
				});
			}
			EDUTSS.complete && EDUTSS.complete.showHide(elem);
			EDUTSS.isDevMsg && console.log("#D: showHide - 다시하기");
		},
		initZoom: function (arr) {
			const zoomEle = util.getEle("[data-func-zoom]");

			function ZoomPlayer(elem, arr, idx) {
				this.container = elem, this.zoomId = "zoomPlayer-" + util.isNum(idx),
					this.zoomImgEle = util.getEle(".zoom--obj", elem);
				if (this.zoomImgEle.length > 1) {
					this.zoomType = "fileChange";
					this.zoomImgEle.forEach(function (elem, idx) {
						idx === 0 ? elem.style.opacity = "1" : elem.style.opacity = "0";
						elem.style.cursor = "default";
					});
					this.ZOOM_RATE = 1;
					this.ZOOM_STEP = this.zoomImgEle.length - 1;
				} else {
					this.zoomImg = this.zoomImgEle[0];
					this.moveX = this.zoomImg.offsetLeft || 0;
					this.moveY = this.zoomImg.offsetTop || 0;
					this.ZOOM_RATE = Number(arr["rate"]) || 20;
					this.ZOOM_STEP = Number(arr["step"]) || 4;
				}
				this.ZOOM_MIN = 1;
				this.ZOOM_MAX = Number(this.ZOOM_RATE * this.ZOOM_STEP) + 1;
				this.ZOOM_BORDER = parseInt(window.getComputedStyle(this.container).borderWidth) * 2 || 0,
					this.zoomControl = elem.dataset.controlZoom === "true" || false,
					this.wayControl = elem.dataset.controlWay === "true" || false, this.wayMove = Number(arr["way"]) || 100;
				this.rate = 1;
				this.scrollFlow = "horizontal";
				if (util.hasCls(this.container, "is--vertical")) this.scrollFlow = "vertical";
				if (elem.dataset.zoomRate) {
					this.ZOOM_RATE = Number(elem.dataset.zoomRate.split("//")[0]),
						this.ZOOM_STEP = Number(elem.dataset.zoomRate.split("//")[1]),
						this.ZOOM_MAX = Number(this.ZOOM_RATE * this.ZOOM_STEP) + 1;
				}
				Object.defineProperties(this, {
					areaSize: {
						get: function () {
							return this.container.getBoundingClientRect();
						}
					},
					controlHeight: {
						get: function () {
							return this.control && this.control.getBoundingClientRect().height || 0;
						}
					},
					barSize: {
						get: function () {
							return this.barContainer.getBoundingClientRect();
						}
					},
					barWidth: {
						get: function () {
							return this.barSize.right - this.barSize.left;
						}
					},
					barHeight: {
						get: function () {
							return this.barSize.bottom - this.barSize.top;
						}
					},
					barRateX: {
						get: function () {
							return this.ZOOM_RATE * this.ZOOM_STEP / this.barWidth;
						}
					},
					barRateY: {
						get: function () {
							return this.ZOOM_RATE * this.ZOOM_STEP / this.barHeight;
						}
					},
					barHandlerX: {
						get: function () {
							return this.coordX - this.barSize.left;
						}
					},
					barHandlerY: {
						get: function () {
							return this.coordY - this.barSize.top;
						}
					},
					imgSize: {
						get: function () {
							return this.zoomImg.getBoundingClientRect();
						}
					},
					imgWidth: {
						get: function () {
							return this.imgSize.right - this.imgSize.left;
						}
					},
					imgHeight: {
						get: function () {
							return this.imgSize.bottom - this.imgSize.top;
						}
					},
					limitTop: {
						get: function () {
							return Math.round(Math.abs(this.imgHeight - this.imgHeight / this.rate) / 2) / EDUTSS.scaleValue.zoom;
						}
					},
					limitLeft: {
						get: function () {
							return Math.round(Math.abs(this.imgWidth - this.imgWidth / this.rate) / 2) / EDUTSS.scaleValue.zoom;
						}
					},
					limitRight: {
						get: function () {
							return (this.areaSize.width - this.imgWidth) / EDUTSS.scaleValue.zoom + this.limitLeft;
						}
					},
					limitBottom: {
						get: function () {
							return (this.areaSize.height - this.imgHeight - this.controlHeight) / EDUTSS.scaleValue.zoom + this.limitTop;
						}
					},
					coord: {
						get: function () {
							return this.coordX, this.coordY;
						},
						set: function (e) {
							this.coordX = e.touches ? e.touches[0].clientX : e.clientX;
							this.coordY = e.touches ? e.touches[0].clientY : e.clientY;
						}
					}
				});
			}
			ZoomPlayer.prototype = {
				init: function () {
					this.container.dataset.zoomPlayerId = this.zoomId;
					this.create();
					this.addEvt();
					this.btnShowHide();
				},
				create: function () {
					this.zoomControl && (this.control = util.createEle("div", {
						class: "zoom--control"
					}, this.container), this.zoomOutBtn = util.createEle("div", {
						class: "btn zoom--out",
						"data-zoom-btn": "out",
						title: "축소"
					}, this.control), this.zoomInBtn = util.createEle("div", {
						class: "btn zoom--in",
						"data-zoom-btn": "in",
						title: "확대"
					}, this.control), this.zoomResetBtn = util.createEle("div", {
						class: "btn zoom--reset",
						"data-zoom-btn": "reset",
						title: "초기화"
					}, this.control), this.barContainer = util.createEle("div", {
						class: "zoom--bar"
					}, this.container), this.barRail = util.createEle("div", {
						class: "zoom--rail"
					}, this.barContainer), this.barHandler = util.createEle("div", {
						class: "zoom--handle"
					}, this.barContainer)), this.wayControl && (this.wayBtns = util.createEle("div", {
						class: "way--control"
					}, this.container), this.wayBtnLeft = util.createEle("div", {
						class: "btn way--left",
						"data-way-btn": "left",
						title: "이동"
					}, this.wayBtns), this.wayBtnRight = util.createEle("div", {
						class: "btn way--right",
						"data-way-btn": "right",
						title: "이동"
					}, this.wayBtns), this.wayBtnTop = util.createEle("div", {
						class: "btn way--top",
						"data-way-btn": "top",
						title: "이동"
					}, this.wayBtns), this.wayBtnBottom = util.createEle("div", {
						class: "btn way--bottom",
						"data-way-btn": "bottom",
						title: "이동"
					}, this.wayBtns));
				},
				addEvt: function () {
					util.addEvt(this.zoomOutBtn, "click", this.setZoomOut.bind(this));
					util.addEvt(this.zoomInBtn, "click", this.setZoomIn.bind(this));
					util.addEvt(this.zoomResetBtn, "click", this.resetZoom.bind(this));
					util.addEvt(this.barContainer, "click", this.clickBarHandle.bind(this));
					util.addEvt(this.barHandler, "down", this.dragBarHandle.bind(this));
					if (this.zoomType !== "fileChange") {
						util.addEvt(this.zoomImg, "down", this.dragImgHandle.bind(this));
						util.addEvt(this.wayBtnLeft, "click", this.wayHandle.bind(this));
						util.addEvt(this.wayBtnRight, "click", this.wayHandle.bind(this));
						util.addEvt(this.wayBtnTop, "click", this.wayHandle.bind(this));
						util.addEvt(this.wayBtnBottom, "click", this.wayHandle.bind(this));
					}
				},
				setZoomOut: function () {
					if (this.rate - this.ZOOM_RATE <= this.ZOOM_MIN) {
						this.rate = this.ZOOM_MIN;
					} else {
						this.rate = this.rate - this.ZOOM_RATE;
						this.rate = Number(this.rate.toPrecision(2));
					}
					this.btnHandle();
				},
				setZoomIn: function () {
					if (this.rate + this.ZOOM_RATE >= this.ZOOM_MAX) {
						this.rate = this.ZOOM_MAX;
					} else {
						this.rate = this.rate + this.ZOOM_RATE;
						this.rate = Number(this.rate.toPrecision(2));
					}
					this.btnHandle();
				},
				resetZoom: function () {
					this.rate = 1;
					this.zoomImg.style.top = null;
					this.zoomImg.style.left = null;
					this.btnHandle();
				},
				btnHandle: function () {
					this.btnShowHide();
					this.changeImage();
					this.linkageBar(this.getMoveHandler());
					sound.playAudio("click");
				},
				getMoveHandler: function () {
					var num, value;
					if (this.scrollFlow === "horizontal") {
						num = this.barWidth;
					} else {
						num = this.barHeight;
					}
					value = num / this.ZOOM_STEP * ((this.rate - 1) / this.ZOOM_RATE);
					value > num && (value = num);
					return Math.round(value);
				},
				linkageBar: function (value) {
					if (this.scrollFlow === "horizontal") {
						this.barHandler.style.left = value + "px";
						this.barRail.style.width = value + "px";
					} else {
						this.barHandler.style.top = value + "px";
						this.barRail.style.height = value + "px";
					}
				},
				btnShowHide: function () {
					if (this.rate === this.ZOOM_MIN) {
						util.addCls(this.zoomOutBtn, "btn--off");
						util.removeCls(this.zoomInBtn, "btn--off");
						util.addCls(this.zoomResetBtn, "btn--off");
					} else if (this.rate === this.ZOOM_MAX) {
						util.removeCls(this.zoomOutBtn, "btn--off");
						util.addCls(this.zoomInBtn, "btn--off");
						util.removeCls(this.zoomResetBtn, "btn--off");
					} else {
						util.removeCls(this.zoomOutBtn, "btn--off");
						util.removeCls(this.zoomInBtn, "btn--off");
						util.removeCls(this.zoomResetBtn, "btn--off");
					}
				},
				changeImage: function () {
					if (this.zoomType !== "fileChange") {
						this.zoomImg.style.transform = "scale(" + this.rate + ")";
						this.zoomImg.style.MsTransform = "scale(" + this.rate + ")";
						this.zoomImg.style.MozTransform = "scale(" + this.rate + ")";
						this.zoomImg.style.WebkitTransform = "scale(" + this.rate + ")";
						this.moveX = this.zoomImg.offsetLeft || 0;
						this.moveY = this.zoomImg.offsetTop || 0;
						this.setImgPosition();
					} else {
						const stage = this;
						this.changeNumber = Math.round(this.rate) - 1;
						this.zoomImgEle.forEach(function (elem, idx) {
							idx === stage.changeNumber ? elem.style.opacity = "1" : elem.style.opacity = "0";
						});
					}
					EDUTSS.complete && EDUTSS.complete.zoom(this);
				},
				setImgPosition: function () {
					let moveImgX = this.moveX,
						moveImgY = this.moveY;
					if (moveImgX > 0 && moveImgX > this.limitLeft) moveImgX = this.limitLeft;
					else if (moveImgX < this.limitRight) moveImgX = this.limitRight;
					if (moveImgY > 0 && moveImgY > this.limitTop) moveImgY = this.limitTop;
					else if (moveImgY < this.limitBottom) moveImgY = this.limitBottom;
					if (this.rate === 1) {
						if (Math.floor(this.areaSize.width) - Math.floor(this.ZOOM_BORDER) - 4 < Math.floor(this.imgSize.width) && Math.floor(this.areaSize.width) - Math.floor(this.ZOOM_BORDER) + 4 > Math.floor(this.imgSize.width)) {
							moveImgX = 0;
						}
						if (Math.floor(this.areaSize.height) - Math.floor(this.ZOOM_BORDER) - 4 < Math.floor(this.imgSize.height) && Math.floor(this.areaSize.height) - Math.floor(this.ZOOM_BORDER) + 4 > Math.floor(this.imgSize.height)) {
							moveImgY = 0;
						}
					}
					this.zoomImg.style.left = moveImgX + "px";
					this.zoomImg.style.top = moveImgY + "px";
				},
				dragImgHandle: function (e) {
					const stage = this;
					e.preventDefault();
					e.stopPropagation();
					util.addEvt(stage.container, "move", moveDrag);
					util.addEvt(stage.container, "up", function () {
						util.removeEvt(stage.container, "move", moveDrag);
					});
					util.addEvt(stage.container, "leave", function () {
						util.removeEvt(stage.container, "move", moveDrag);
					});
					this.coord = e;
					this.startX = this.coordX;
					this.startY = this.coordY;
					this.startPrevX = this.zoomImg.offsetLeft;
					this.startPrevY = this.zoomImg.offsetTop;

					function moveDrag(e) {
						stage.coord = e;
						stage.moveX = stage.startPrevX - stage.startX + stage.coordX;
						stage.moveY = stage.startPrevY - stage.startY + stage.coordY;
						stage.setImgPosition();
					}
					EDUTSS.view.senseClosePopupEvent(e);
				},
				clickBarHandle: function (e) {
					this.coord = e;
					this.moveBarHandle(this.barHandlerX);
				},
				dragBarHandle: function (e) {
					const stage = this;
					e.preventDefault();
					e.stopPropagation();
					util.addEvt(document, "move", startDrag);
					util.addEvt(document, "up", function () {
						util.removeEvt(document, "move", startDrag);
					});
					util.addEvt(this.container, "leave", function () {
						util.removeEvt(document, "move", startDrag);
					});

					function startDrag(e) {
						let num, handlerSize;
						if (stage.scrollFlow === "horizontal") {
							num = stage.barHandlerX, handlerSize = stage.barHandler.offsetWidth / 2;
							stage.coord = e;
							if (num < stage.barWidth && num > 0) {
								if (num < handlerSize) num = 0;
								else if (num > stage.barWidth - handlerSize) num = stage.barWidth;
								stage.moveBarHandle(num);
							}
						} else {
							num = stage.barHandlerY, handlerSize = stage.barHandler.offsetHeight / 2;
							stage.coord = e;
							if (num < stage.barHeight && num > 0) {
								if (num < handlerSize) num = 0;
								else if (num > stage.barHeight - handlerSize) num = stage.barHeight;
								stage.moveBarHandle(num);
							}
						}
						stage.btnShowHide();
					}
					EDUTSS.view.senseClosePopupEvent(e);
				},
				moveBarHandle: function (value) {
					if (this.scrollFlow === "horizontal") {
						this.rate = Number((value * this.barRateX + 1).toPrecision(3));
					} else {
						this.rate = Number((value * this.barRateY + 1).toPrecision(3));
					}
					this.linkageBar(value);
					this.changeImage();
				},
				wayHandle: function (e) {
					let wayFlow = e.currentTarget.dataset.wayBtn;
					this.startPrevX = this.zoomImg.offsetLeft;
					this.startPrevY = this.zoomImg.offsetTop;
					this.moveX = this.startPrevX;
					this.moveY = this.startPrevY;
					switch (wayFlow) {
						case "left":
							this.moveX = this.startPrevX - this.wayMove;
							break;

						case "right":
							this.moveX = this.startPrevX + this.wayMove;
							break;

						case "top":
							this.moveY = this.startPrevY - this.wayMove;
							break;

						case "bottom":
							this.moveY = this.startPrevY + this.wayMove;
							break;

						default:
							break;
					}
					this.setImgPosition();
				}
			};
			let viewArr = viewLayoutData.zoom;
			zoomEle.forEach(function (elem, idx) {
				viewArr[idx] = new ZoomPlayer(elem, arr, idx + 1);
				viewArr[idx].init();
				EDUTSS.isDevMsg && console.log("#D: 확대/축소 생성");
			});
		},
		initDownload: function () {
			const downEle = util.getEle("[data-func-down]");
			let tooltipEle;
			downEle.forEach(function (elem) {
				if (elem.dataset.funcTooltip) {
					tooltipEle = util.createEle("span", {
						class: "tooltip"
					}, elem);
					tooltipEle.innerHTML = elem.dataset.funcTooltip;
				}
			});
			util.addEvt(downEle, "enter", function (e) {
				tooltipEle = util.getEle(".tooltip", e.currentTarget)[0];
				!util.isTouch && util.addCls(tooltipEle, "show--tooltip");
			});
			util.addEvt(downEle, "leave", function (e) {
				tooltipEle = util.getEle(".tooltip", e.currentTarget)[0];
				!util.isTouch && util.removeCls(tooltipEle, "show--tooltip");
			});
			util.addEvt(downEle, "click", function (e) {
				let target = e.currentTarget,
					src = target.dataset.funcDown,
					filename = src.split("/").slice(-1)[0],
					extension = filename.split(".")[1];
				if (EDUTSS.isDTBOOK) {
					parent.GO_OPEN_FILE(src, extension);
				} else {
					let downHandle = util.createEle("a", {
						href: src,
						download: filename,
						target: "_blank"
					});
					if (util.getDevice() === "ie") {
						let xhr = new XMLHttpRequest();
						xhr.onloadstart = function () {
							xhr.responseType = "blob";
						};
						xhr.onload = function () {
							navigator.msSaveOrOpenBlob(xhr.response, filename);
						};
						xhr.open("GET", src, true);
						xhr.send();
					} else {
						downHandle.click();
					}
				}
				sound.playAudio("click");
			});
		},
		initDrawing: function (arr) {
			const drawingEle = util.getEle("[data-func-drawing]");

			function DrawingCanvas(elem, arr, idx) {
				this.container = elem, this.drawingId = "drawingCanvas-" + util.isNum(idx),
					this.canvas = util.getEle(".drawing--canvas", elem)[0], this.saveInput = util.getEle(".drawing--save", elem)[0],
					this.arrType = arr.type.split(","), this.arrColor = elem.dataset.colorOption ? elem.dataset.colorOption.split("//") : arr.color.split(","),
					this.arrThick = arr.thick.split(","), this.arrDefault = arr.default.split(","),
					this.isDrawType = this.arrDefault[0], this.isDrawColor = elem.dataset.colorOption ? this.arrColor[0] : this.arrDefault[1],
					this.isDrawThick = this.arrDefault[2], this.isDisable = true, this.isDrawing = false,
					this.isEraser = false, this.ctx = this.canvas.getContext("2d"),
					this.ctx.lineJoin = "round", this.ctx.lineCap = "round", this.ctx.lineWidth = this.isDrawThick.split("px")[0],
					this.ctx.strokeStyle = "#" + this.isDrawColor, this.ctx.imageSmoothingEnabled = true,
					this.startX = 0, this.startY = 0, this.endX = 0, this.endY = 0;
				util.hasCls(this.container, "is--menu--view") ? this.isOpenMenu = false : this.isOpenMenu = true;
				Object.defineProperties(this, {
					canvasSize: {
						get: function () {
							return this.canvas.getBoundingClientRect();
						}
					},
					canvasX: {
						get: function () {
							return this.canvasSize.left / EDUTSS.scaleValue.zoom;
						}
					},
					canvasY: {
						get: function () {
							return this.canvasSize.top / EDUTSS.scaleValue.zoom;
						}
					},
					canvasWidth: {
						get: function () {
							return this.canvasSize.width / EDUTSS.scaleValue.zoom;
						}
					},
					canvasHeight: {
						get: function () {
							return this.canvasSize.height / EDUTSS.scaleValue.zoom;
						}
					},
					coord: {
						get: function () {
							return this.coordX, this.coordY;
						},
						set: function (e) {
							this.coordX = e.touches ? e.touches[0].clientX : e.clientX;
							this.coordY = e.touches ? e.touches[0].clientY : e.clientY;
						}
					}
				});
			}
			DrawingCanvas.prototype = {
				init: function () {
					this.container.dataset.drawingId = this.drawingId;
					this.create();
					this.addEvt();
					this.readyDraw();
				},
				create: function () {
					if (this.isOpenMenu) {
						this.btnOpenMenu = util.createEle("div", {
							class: "btn open--drawing"
						}, this.container);
					}
					this.drawingMenu = util.createEle("div", {
						class: "drawing--menu"
					}, this.container);
					this.colorContainer = util.createEle("div", {
						class: "drawing--colors"
					}, this.drawingMenu);
					this.thickContainer = util.createEle("div", {
						class: "drawing--thicks"
					}, this.drawingMenu);
					this.typeContainer = util.createEle("div", {
						class: "drawing--type"
					}, this.drawingMenu);
					for (let i = 0; i < this.arrColor.length; i++) {
						util.createEle("div", {
							class: "btn",
							"data-drawing-color": this.arrColor[i]
						}, this.colorContainer);
					}
					for (let i = 0; i < this.arrThick.length; i++) {
						util.createEle("div", {
							class: "btn",
							"data-drawing-thick": this.arrThick[i]
						}, this.thickContainer);
					}
					for (let i = 0; i < this.arrType.length; i++) {
						util.createEle("div", {
							class: "btn",
							"data-drawing-type": this.arrType[i]
						}, this.typeContainer);
					}
					this.btnDrawType = util.getEle("[data-drawing-type]", this.container);
					this.btnDrawColor = util.getEle("[data-drawing-color]", this.container);
					this.btnDrawThick = util.getEle("[data-drawing-thick]", this.container);
				},
				addEvt: function () {
					const stage = this;
					if (stage.isOpenMenu) {
						util.addEvt(stage.btnOpenMenu, "click", stage.openMenu.bind(stage));
					}
					util.addEvt(stage.btnDrawType, "click", stage.typeHandle.bind(stage));
					util.addEvt(stage.btnDrawColor, "click", stage.colorHandle.bind(stage));
					util.addEvt(stage.btnDrawThick, "click", stage.thickHandle.bind(stage));
					util.addEvt(stage.canvas, "down", function (e) {
						if (stage.isDisable) return;
						e.preventDefault();
						e.stopPropagation();
						stage.onTouchStart.call(stage, e);
					});
				},
				readyDraw: function () {
					util.addCls(util.getEle("[data-drawing-type='" + this.isDrawType + "']", this.container), "on");
					util.addCls(util.getEle("[data-drawing-color='" + this.isDrawColor + "']", this.container), "on");
					util.addCls(util.getEle("[data-drawing-thick='" + this.isDrawThick + "']", this.container), "on");
					this.btnDrawColor.forEach(function (elem) {
						elem.style.backgroundColor = "#" + elem.dataset.drawingColor;
					});
					this.loadDraw();
					if (!this.isOpenMenu) {
						this.openMenu();
					}
				},
				openMenu: function () {
					if (this.isDisable) {
						this.isDisable = false;
						util.addCls(this.drawingMenu, "active");
						util.addCls(this.btnOpenMenu, "on");
						this.btnOpenMenu && (this.btnOpenMenu.style.left = this.drawingMenu.offsetWidth + "px");
					} else {
						this.isDisable = true;
						util.removeCls(this.drawingMenu, "active");
						util.removeCls(this.btnOpenMenu, "on");
						this.btnOpenMenu && (this.btnOpenMenu.style.left = null);
					}
					this.isOpenMenu && sound.playAudio("click");
				},
				typeHandle: function (e) {
					let stage = this;
					let btn = e.currentTarget;
					stage.isDrawType = btn.dataset.drawingType;
					util.removeCls(stage.btnDrawType, "on");
					util.addCls(btn, "on");
					if (stage.isDrawType === "reset") {
						stage.deleteDraw();
						stage.isDrawing = false;
						stage.isEraser = false;
					}
					sound.playAudio("click");
				},
				colorHandle: function (e) {
					let btn = e.currentTarget;
					this.isDrawColor = btn.dataset.drawingColor;
					util.removeCls(this.btnDrawColor, "on");
					util.addCls(btn, "on");
				},
				thickHandle: function (e) {
					let btn = e.currentTarget;
					this.isDrawThick = btn.dataset.drawingThick;
					util.removeCls(this.btnDrawThick, "on");
					util.addCls(btn, "on");
				},
				onTouchStart: function (e) {
					const stage = this;
					stage.coord = e;
					stage.startX = (e.touches ? e.touches[0].clientX : e.clientX) / EDUTSS.scaleValue.zoom - stage.canvasX;
					stage.startY = (e.touches ? e.touches[0].clientY : e.clientY) / EDUTSS.scaleValue.zoom - stage.canvasY;
					if (stage.isDrawType === "pen") {
						stage.startDraw();
					} else if (stage.isDrawType === "eraser") {
						stage.eraserDraw();
					}
					if (this.isDrawing || this.isEraser) {
						util.addEvt(stage.canvas, "move", touchMove);
						util.addEvt(stage.canvas, "up", function () {
							util.removeEvt(stage.canvas, "move", touchMove);
							stage.stopDraw();
						});
						util.addEvt(stage.canvas, "leave", function () {
							util.removeEvt(stage.canvas, "move", touchMove);
							stage.stopDraw();
						});
					}

					function touchMove(e) {
						stage.endX = (e.touches ? e.touches[0].clientX : e.clientX) / EDUTSS.scaleValue.zoom - stage.canvasX;
						stage.endY = (e.touches ? e.touches[0].clientY : e.clientY) / EDUTSS.scaleValue.zoom - stage.canvasY;
						stage.ctx.lineTo(stage.endX, stage.endY);
						stage.ctx.stroke();
					}
				},
				startDraw: function () {
					this.isDrawing = true;
					this.isEraser = false;
					this.ctx.beginPath();
					this.ctx.lineWidth = this.isDrawThick.split("px")[0];
					this.ctx.strokeStyle = "#" + this.isDrawColor;
					this.ctx.globalCompositeOperation = "source-over";
					this.canvas.style.visibility = "visible";
				},
				eraserDraw: function () {
					this.isDrawing = false;
					this.isEraser = true;
					this.ctx.beginPath();
					this.ctx.lineWidth = this.isDrawThick.split("px")[0] * 2;
					this.ctx.globalCompositeOperation = "destination-out";
				},
				stopDraw: function () {
					this.isDrawing = false;
					this.isEraser = false;
					this.ctx.closePath();
					this.ctx.save();
					this.saveDraw();
				},
				deleteDraw: function () {
					this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
					this.ctx.beginPath();
					this.saveInput.value = "";
				},
				hideDraw: function () {
					this.canvas.style.visibility = "hidden";
				},
				loadDraw: function () {
					const stage = this;
					let img = new Image();
					setTimeout(function () {
						if (stage.saveInput.value) {
							img.src = stage.saveInput.value;
							img.onload = function () {
								stage.ctx.drawImage(img, 0, 0);
								EDUTSS.isDevMsg && console.log("#D: 그리기 로드");
							};
						}
					}, 2e3);
				},
				saveDraw: function () {
					this.saveInput.value = this.canvas.toDataURL("images/png");
				}
			};
			let viewArr = viewLayoutData.drawing;
			drawingEle.forEach(function (elem, idx) {
				viewArr[idx] = new DrawingCanvas(elem, arr, idx + 1);
				viewArr[idx].init();
				EDUTSS.isDevMsg && console.log("#D: 그리기 생성");
			});
		},
		viewReset: function () {
			const btn = util.getEle("[data-func-replay]");
			let contentEle, inputEle;
			btn.forEach(function (elem) {
				contentEle = util.getEle("#" + elem.dataset.funcReplay) || null;
				if (contentEle) {
					inputEle = util.getEle("input, textarea", contentEle);
					inputEle.forEach(function (input) {
						if (!util.hasCls(input, "quiz--input")) {
							input.addEventListener("keyup", function (e) {
								e.value !== "" && util.addCls(btn, "btn--show");
							});
						}
					});
				}
			});
			util.addEvt(btn, "click", function (e) {
				let target = util.getEle("#" + e.currentTarget.dataset.funcReplay);
				EDUTSS.view.viewResetEle(target);
				util.removeCls(e.currentTarget, "btn--show");
				sound.playAudio("click");
			});
		},
		viewResetEle: function (target) {
			const showHide = util.getEle("[data-func-show]", target);
			showHide.forEach(function (e) {
				EDUTSS.view.showHideReplay(e);
			});
			const checkList = util.getEle("[data-func-check]", target);
			checkList.forEach(function (e) {
				EDUTSS.view.resetCheckList(e);
			});
			util.getEle("input, textarea", target).forEach(function (e) {
				if (!util.hasCls(e, "quiz--input")) {
					util.removeCls(e, "disabled done on");
					e.value = "";
					e.checked = false;
				}
			});
		},
		viewUpdate: function (elem, value) {
			!value && sound.stopAllSound();
			!elem.length && (elem = [elem]);
			elem.forEach(function (e) {
				EDUTSS.isDTBOOK && EDUTSS.dragUtil.loadDrawData(e);
				if (EDUTSS.fixBtnBottomPosition) {
					let btn = util.getEle(".btn_wrap.bottom_right.fix, .btn_wrap.bottom_left.fix", e);
					btn.length > 0 && EDUTSS.ui.addPositionButton(btn);
				}
				util.getEle("[data-layout-type='scroll']", e).forEach(function (elem) {
					EDUTSS.view.visibleScrollState(elem);
				});
			});
		},
		visibleScrollState: function (elem) {
			viewLayoutData.scroll.forEach(function (data) {
				if (data.container.dataset.scrollId === elem.dataset.scrollId) {
					data.ready();
				}
			});
		}
	};
}();

EDUTSS.animate = function () {
	const util = EDUTSS.util;
	let animateDATA = {};
	return {
		initAnimate: function () {
			const target = util.getEle("[data-func-animate]");
			target.forEach(function (elem) {
				EDUTSS.animate.setAnimateData(elem);
			});
		},
		animatePlay: function (id) {
			let elem = util.getEle("[data-animate-id='" + id + "']")[0],
				type = elem.dataset.funcAnimate;
			!animateDATA[elem.dataset.animateId] && EDUTSS.animate.setAnimateData(elem);
			switch (type) {
				case "css":
					EDUTSS.animate.cssAnimate(elem, "play");
					break;

				case "sprite":
					EDUTSS.animate.spriteAnimate(elem, "play");
					break;

				case "png":
					EDUTSS.animate.pngAnimatePlay(elem, "play");
					break;

				case "gif":
					EDUTSS.animate.gifAnimate(elem, "play");
					break;

				default:
					break;
			}
			EDUTSS.isDevMsg && console.log("#D: 애니메이션 재생, type => " + type);
			EDUTSS.complete && animateDATA[elem.dataset.animateId] && EDUTSS.complete.animate(animateDATA[elem.dataset.animateId]);
		},
		animateStop: function (id) {
			let elem = util.getEle("[data-animate-id='" + id + "']")[0],
				type = elem.dataset.funcAnimate;
			!animateDATA[elem.dataset.animateId] && EDUTSS.animate.setAnimateData(elem);
			switch (type) {
				case "css":
					EDUTSS.animate.cssAnimate(elem, "stop");
					break;

				case "sprite":
					EDUTSS.animate.spriteAnimate(elem, "stop");
					break;

				case "png":
					EDUTSS.animate.pngAnimatePlay(elem, "stop");
					break;

				case "gif":
					EDUTSS.animate.gifAnimate(elem, "stop");
					break;

				default:
					break;
			}
			EDUTSS.isDevMsg && console.log("#D: 애니메이션 정지, type => " + type);
		},
		stopAllAnimate: function () {
			util.getEle("[data-animate-id]").forEach(function (e) {
				EDUTSS.animate.animateStop(e.dataset.animateId);
			});
		},
		cssAnimate: function (elem, type) {
			const stage = animateDATA[elem.dataset.animateId];
			for (let i = 0; i < stage.animateLen; i++) {
				util.removeCls(stage.animate[i], "animate--playing");
				util.addCls(stage.animate[i], "animate--hide");
			}
			if (type === "play") {
				stage.playing = null;
				stage.playing = setInterval(function () {
					if (stage.num === stage.animateLen) {
						clearInterval(stage.playing);
						util.addCls(stage.container, "animate--complete");
					}
					stage.target = stage.animate[stage.num];
					util.addCls(stage.target, "animate--playing");
					util.removeCls(stage.target, "animate--hide");
					stage.num++;
				}, stage.delay);
			} else if (type === "stop") {
				util.removeCls(stage.container, "animate--complete");
				stage.playing && clearInterval(stage.playing);
			}
		},
		pngAnimatePlay: function (elem, type) {
			const stage = animateDATA[elem.dataset.animateId];
			if (type === "play") {
				stage.num = 1;
				stage.playing = null;
				stage.playing = setInterval(function () {
					if (stage.num === stage.endNum) {
						if (stage.iteration === 0) {
							stage.num = 1;
						} else if (stage.iteration === 1) {
							clearInterval(stage.playing);
						} else {
							stage.iteration--;
							stage.num = 1;
						}
					}
					stage.imgEle.src = stage.fixSrc + "_" + (stage.num < 10 ? "0" + stage.num : stage.num) + "." + stage.fileName;
					stage.num++;
				}, stage.delay);
			} else if (type === "stop") {
				stage.imgEle.src = stage.fixSrc + "_01." + stage.fileName;
				stage.playing && clearInterval(stage.playing);
			}
		},
		spriteAnimate: function (elem, type) {
			const stage = animateDATA[elem.dataset.animateId];
			if (type === "play") {
				stage.playing = null;
				stage.playing = setInterval(function () {
					if (stage.num === stage.spriteTotal) {
						if (stage.iteration === 0) {
							stage.num = 1;
							stage.col = 0;
							stage.row = 0;
						} else if (stage.iteration === 1) {
							clearInterval(stage.playing);
						} else {
							stage.iteration--;
							stage.num = 1;
							stage.col = 0;
							stage.row = 0;
						}
					}
					if (stage.row === Math.floor(stage.num / stage.spriteRowNum)) {
						stage.col++;
					} else {
						stage.row++;
						stage.col = 0;
					}
					stage.imgEle.style.backgroundPositionX = "-" + stage.col * stage.imgWidth + "px";
					stage.imgEle.style.backgroundPositionY = "-" + stage.row * stage.imgHeight + "px";
					stage.num++;
				}, stage.delay);
			} else if (type === "stop") {
				stage.imgEle.style.backgroundPositionX = "0px";
				stage.imgEle.style.backgroundPositionY = "0px";
				stage.num = 1;
				stage.col = 0;
				stage.row = 0;
				stage.playing && clearInterval(stage.playing);
			}
		},
		gifAnimate: function (elem, type) {
			const stage = animateDATA[elem.dataset.animateId];
			if (type === "play") {
				stage.imgEle.src = stage.changeSrc.split("?")[0].replace(".png", ".gif") + "?" + util.getRandomNumber(1e4);
			} else if (type === "stop") {
				stage.imgEle.src = stage.changeSrc.split("?")[0].replace(".gif", ".png");
				stage.playing && clearInterval(stage.playing);
			}
		},
		setAnimateData: function (elem) {
			let animateId = elem.dataset.animateId,
				data;
			if (!animateDATA[animateId]) {
				data = {};
				data.container = elem;
				data.animateId = elem.dataset.animateId;
				data.type = elem.dataset.funcAnimate;
				data.iteration = Number(elem.dataset.animateIteration) || 0;
				data.delay = Number(elem.dataset.animateDelay) || Number(EDUTSS.isAnimateSpriteDelay) || 80;
				switch (elem.dataset.funcAnimate) {
					case "css":
						data.animate = util.getEle(".animate", elem), data.animateLen = data.animate.length,
							data.delay = Number(elem.dataset.animateDelay) || 80, data.num = 0,
							data.target;
						break;

					case "sprite":
						data.imgEle = util.getEle(".animate--sprite", elem)[0];
						data.imgWidth = data.imgEle.offsetWidth;
						data.imgHeight = data.imgEle.offsetHeight;
						data.spriteRowNum = Number(elem.dataset.animateSprite.split("//")[0]);
						data.spriteColNum = Number(elem.dataset.animateSprite.split("//")[1]);
						data.spriteEndNum = Number(elem.dataset.animateSprite.split("//")[2]) || data.spriteRowNum;
						data.spriteTotal = data.spriteRowNum * (data.spriteColNum - 1) + data.spriteEndNum - 1;
						data.num = 1;
						data.col = 0;
						data.row = 0;
						break;

					case "png":
						data.imgEle = util.getEle(".animate--png", elem)[0];
						data.imgFile = data.imgEle.getAttribute("src").split("/").slice(-1);
						data.imgSrc = data.imgEle.getAttribute("src").split(data.imgFile);
						data.fixSrc = data.imgSrc[0] + data.imgFile[0].split("_01.png")[0];
						data.fileName = data.imgFile[0].split(".")[1];
						data.endNum = Number(elem.dataset.animateEndnum);
						data.num = 1;
						let pngLoader = util.createEle("div", {
							class: "image_loading blind"
						}, elem);
						for (let i = 1; i <= data.endNum; i++) {
							util.createEle("img", {
								src: data.fixSrc + "_" + (i < 10 ? "0" + i : i) + "." + data.fileName
							}, pngLoader);
						}
						break;

					case "gif":
						data.imgEle = util.getEle(".animate--gif", elem)[0], data.imgFile = data.imgEle.getAttribute("src").split("/").slice(-1),
							data.imgSrc = data.imgEle.getAttribute("src").split(data.imgFile);
						data.changeSrc = data.imgSrc[0] + data.imgFile[0];
						break;

					default:
						break;
				}
				animateDATA[animateId] = data;
				EDUTSS.isDevMsg && (console.log("#D: 애니메이션 데이터"), console.log(data));
			}
		}
	};
}();