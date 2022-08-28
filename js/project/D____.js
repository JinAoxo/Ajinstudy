// D project issue
// Review
// 1. 해당 프로젝트의 경우 가장 큰 이슈 js, jq 로 작업하는 부분이 많음 (예외 , 공통 多)


/** tooltip 인터렉션 :  주석 처리에 관해서 공부 필요
 * @param {string} btnOpen
 * @param {string} btnClose
 * @returns
 */

//==== 유틸 기본값을 아래처럼 정의 해놓음 => page 파일에서 불러옴

/** EDUTSS.util에 대한 정의 
 * EDUTSS = EDUTSS OR {} 
 */
var EDUTSS = EDUTSS || {};
/** EDUTSS.util에 대한 정의  */
EDUTSS.util = {
	isTouch: "ontouchstart" in document.documentElement,
	detectDevice: function () {},
	isMobile: function () {},
}


//==========================================================================================================================//
/** getEvt 에 대한 정의 : type()에 따른 event 실행 
 * util을 터치했을때의 event 각 조건에 따라서 eventType이 return됨.
 * getEvt() -> 함수 
 * @param {string} type
 * @return eventType;
 */

function getEvt(type) {
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
}
// getEvt('down'); // 눌렀을때의 이벤트를 설정 가능 ? 

//==========================================================================================================================//
/** getEvt 에 대한 정의 : type()에 따른 event 실행 
 * util을 터치했을때의 event 각 조건에 따라서 eventType이 return됨.
 * getEvt() -> 함수 
 * @param {string} type
 * @return eventType;
 */
function getEle(selector, target) {
	let elem;
	if (selector.includes("#")) {
		elem = document.getElementById(selector.slice(1));
	} else {
		const targetEle = target || document;
		elem = targetEle.querySelectorAll(selector);
	}
	return elem;
}

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