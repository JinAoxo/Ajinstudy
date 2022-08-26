// 개발자가 알아야할 디자인 패턴
// -> 자바스크립트 싱글톤 패턴

// singleton patten


//ES6
class Singleton {

}

// 1. 하나의 객체 인스턴스만 존재
// 2. 스테틱 함수로 객체 접근

/** start 주석을 쓰는 방법 */
function start(name, age) {
	return name + age
}

start('이름', '12살');