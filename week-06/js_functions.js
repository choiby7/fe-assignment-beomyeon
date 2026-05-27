/* =============================================================================
 * JavaScript 함수의 모든 종류 (Mastering JavaScript Functional Programming CH3)
 * -----------------------------------------------------------------------------
 * 발표용 / 소개용 데모 파일
 * 실행: node week-06/js_functions.js
 * ============================================================================= */


/* =============================================================================
 * 1. 일반 함수 (Named Function)
 * -----------------------------------------------------------------------------
 * - function 키워드 + 이름으로 선언
 * - 호이스팅(hoisting) 지원: 선언 이전에도 호출 가능
 * - 재귀 호출 가능 (자기 이름으로 자신을 호출)
 * - 디버깅 시 스택 트레이스에 이름이 표시됨
 * ============================================================================= */
console.log("\n===== 1. 일반 함수 (Named Function) =====");

// 호이스팅 덕분에 선언 전에 호출 가능
console.log(greet("Alice"));      // Hello, Alice!

function greet(name) {
  return "Hello, " + name + "!";
}

// 재귀 호출 (이름이 있어야 가능)
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log("5! =", factorial(5)); // 120


/* =============================================================================
 * 2. 익명 함수 (Anonymous Function)
 * -----------------------------------------------------------------------------
 * - function 키워드만 사용, 이름이 없음
 * - 변수에 할당하거나 다른 함수의 인자로 전달
 * - 호이스팅 불가 (변수 선언만 호이스팅됨)
 * - 자체적인 this, arguments, super, new.target 보유
 * ============================================================================= */
console.log("\n===== 2. 익명 함수 (Anonymous Function) =====");

// 변수에 할당
const add = function (a, b) {
  return a + b;
};
console.log("add(3, 4) =", add(3, 4)); // 7

// 콜백으로 전달
setTimeout(function () {
  console.log("(익명 함수 콜백) 1초 후 실행");
}, 1000);


/* =============================================================================
 * 3. 화살표 함수 (Arrow Function)
 * -----------------------------------------------------------------------------
 * - => 기호로 간결하게 표현
 * - 자기만의 this 가 없음 → 상위 스코프의 this 를 렉시컬하게 캡처
 * - arguments, super, new.target 없음
 * - new 키워드로 호출 불가 (생성자로 사용 불가)
 * - 메서드 정의에는 부적합 (this 가 객체를 가리키지 않음)
 * ============================================================================= */
console.log("\n===== 3. 화살표 함수 (Arrow Function) =====");

// 가장 간결한 형태
const square = x => x * x;
console.log("square(5) =", square(5)); // 25

// 매개변수 여러 개는 괄호 필수
const multiply = (a, b) => a * b;
console.log("multiply(3, 4) =", multiply(3, 4)); // 12

// 객체 리터럴 반환 시 소괄호로 감싸야 함
const makePerson = (first, last) => ({ first, last });
console.log("makePerson:", makePerson("Bill", "Wilson"));

// 화살표 함수의 this 는 상위 스코프에서 상속
function Timer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++;
    // (실제로 동작하지만 데모에서는 즉시 종료)
  }, 1000);
}


/* =============================================================================
 * 4. 즉시 실행 함수 (IIFE - Immediately Invoked Function Expression)
 * -----------------------------------------------------------------------------
 * - 선언과 동시에 즉시 실행
 * - 독립된 스코프를 만들어 변수 은닉 효과
 * - 모듈화 / 초기화 / 변수 충돌 방지에 사용
 * ============================================================================= */
console.log("\n===== 4. 즉시 실행 함수 (IIFE) =====");

// 일반 형태
(function () {
  const secret = "IIFE 내부 변수 - 외부 접근 불가";
  console.log("IIFE 실행됨:", secret);
})();

// 화살표 함수 형태
(() => {
  console.log("Arrow IIFE 실행됨");
})();

// 값을 반환받아 사용
const counter = (function () {
  let count = 0;
  return function () {
    return ++count;
  };
})();
console.log("counter():", counter()); // 1
console.log("counter():", counter()); // 2


/* =============================================================================
 * 5. 클로저 (Closure)
 * -----------------------------------------------------------------------------
 * - 함수가 선언될 당시의 렉시컬 환경(스코프)을 함께 기억하는 함수
 * - 외부 변수에 대한 "참조"를 유지 → 상태 캡슐화 가능
 * - 함수형 객체화 / 비공개 상태 / 콜백 컨텍스트 보존
 * ============================================================================= */
console.log("\n===== 5. 클로저 (Closure) =====");

function makeCounter() {
  let count = 0;                  // 비공개(private) 상태
  return {
    increment: () => ++count,
    reset:     () => { count = 0; },
    get:       () => count
  };
}

const counterA = makeCounter();
const counterB = makeCounter();   // 독립된 환경 (인스턴스)
counterA.increment();
counterA.increment();
counterB.increment();
console.log("counterA.get():", counterA.get()); // 2
console.log("counterB.get():", counterB.get()); // 1 (독립 상태)

// 클로저로 은행 계좌 캡슐화
function makeBank(balance) {
  return {
    deposit:    amount => (balance += amount),
    withdraw:   amount => (balance -= amount),
    getBalance: ()     => balance
  };
}
const account = makeBank(100);
account.deposit(50);
console.log("account.getBalance():", account.getBalance()); // 150


/* =============================================================================
 * 6. 고차 함수 (Higher-Order Function)
 * -----------------------------------------------------------------------------
 * - 함수를 "인자로 받거나" / "반환값으로 돌려주는" 함수
 * - 자바스크립트의 함수가 1급 객체이기에 가능
 * - map, filter, reduce, forEach 등이 대표적
 * ============================================================================= */
console.log("\n===== 6. 고차 함수 (Higher-Order Function) =====");

// (1) 함수를 인자로 받는 함수
function repeat(n, action) {
  for (let i = 0; i < n; i++) action(i);
}
repeat(3, i => console.log("repeat:", i));

// (2) 함수를 반환하는 함수
function greaterThan(n) {
  return x => x > n;
}
const greaterThan10 = greaterThan(10);
console.log("greaterThan10(15):", greaterThan10(15)); // true

// (3) 배열 메서드 + 익명/화살표 함수 = 선언적 표현
const nums = [1, 2, 3, 4, 5];
console.log("map:",    nums.map(n => n * n));            // [1, 4, 9, 16, 25]
console.log("filter:", nums.filter(n => n % 2 === 0));   // [2, 4]
console.log("reduce:", nums.reduce((acc, n) => acc + n, 0)); // 15


/* =============================================================================
 * 7. 커링 함수 (Curried Function)
 * -----------------------------------------------------------------------------
 * - 여러 인자를 받는 함수를 "인자를 하나씩 받는 함수의 체인"으로 변환
 * - f(a, b, c) → f(a)(b)(c)
 * - 클로저 기반 다층 함수 구조 → 재사용성과 함수 합성에 유리
 * ============================================================================= */
console.log("\n===== 7. 커링 함수 (Curried Function) =====");

// 일반 형태
const curriedAdd = a => b => a + b;
const add5 = curriedAdd(5);
console.log("add5(3):", add5(3));         // 8
console.log("curriedAdd(2)(7):", curriedAdd(2)(7)); // 9

// 자동 커링 헬퍼
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...next) => curried(...args, ...next);
  };
}
function sum3(a, b, c) { return a + b + c; }
const curriedSum = curry(sum3);
console.log("curriedSum(1)(2)(3):", curriedSum(1)(2)(3)); // 6
console.log("curriedSum(1, 2)(3):", curriedSum(1, 2)(3)); // 6


/* =============================================================================
 * 8. 부분 적용 함수 (Partial Application)
 * -----------------------------------------------------------------------------
 * - 함수의 일부 인자를 미리 "고정(fix)" 하고, 나머지는 나중에 받는 기법
 * - 커링과 비슷하지만 "일부만 고정" 한다는 점에서 다름
 * - f(a, b, c)  →  f'(_,  b, c)  (a 만 고정)
 * ============================================================================= */
console.log("\n===== 8. 부분 적용 함수 (Partial Application) =====");

// partial 헬퍼 (스프레드 활용)
function partial(fn, ...fixedArgs) {
  return (...restArgs) => fn(...fixedArgs, ...restArgs);
}

function greetFull(greeting, name) {
  return `${greeting}, ${name}!`;
}
const sayHello = partial(greetFull, "Hello");
console.log(sayHello("Daniel")); // Hello, Daniel!
console.log(sayHello("Alice"));  // Hello, Alice!

// 또 다른 예: 곱셈의 일부 인자 고정
function multiplyFull(a, b) { return a * b; }
const double = partial(multiplyFull, 2);
const triple = partial(multiplyFull, 3);
console.log("double(5):", double(5)); // 10
console.log("triple(5):", triple(5)); // 15


/* =============================================================================
 * 9. 함수 컴포지션 (Function Composition)
 * -----------------------------------------------------------------------------
 * - 여러 함수를 조합해 새로운 함수를 만드는 기법
 * - (f ∘ g)(x) = f(g(x))
 * - 작은 순수 함수들을 합쳐 큰 동작을 선언적으로 표현
 * ============================================================================= */
console.log("\n===== 9. 함수 컴포지션 (Function Composition) =====");

const toUpper = str => str.toUpperCase();
const exclaim = str => `${str}!`;
const shout   = str => exclaim(toUpper(str));
console.log(shout("hello")); // HELLO!

// 일반화한 compose (오른쪽에서 왼쪽으로 합성)
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const shout2 = compose(exclaim, toUpper);
console.log(shout2("functional")); // FUNCTIONAL!

// pipe (왼쪽에서 오른쪽으로 합성)
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);
const shout3 = pipe(toUpper, exclaim);
console.log(shout3("react"));      // REACT!


/* =============================================================================
 * 보너스. 함수의 본질 - "일급 객체 (First-Class Citizen)"
 * -----------------------------------------------------------------------------
 * 함수는 값이자 객체이다.
 *   - 변수에 할당 가능
 *   - 다른 함수에 인자로 전달 가능
 *   - 함수에서 반환 가능
 *   - 객체처럼 속성(property) 추가 가능
 * ============================================================================= */
console.log("\n===== 보너스. 함수는 일급 객체(First-Class Citizen) =====");

function Logger(message) {
  console.log(`[${Logger.level}] ${message}`);
}
Logger.level = "INFO";                // 함수에 속성 추가 (객체적 성격)
Logger.setLevel = lv => (Logger.level = lv);

Logger("서버 시작");                    // [INFO] 서버 시작
Logger.setLevel("DEBUG");
Logger("디버그 모드 진입");             // [DEBUG] 디버그 모드 진입

console.log("typeof Logger:", typeof Logger);           // 'function'
console.log("Logger instanceof Function:", Logger instanceof Function); // true


/* =============================================================================
 * 요약 표 (출력)
 * ============================================================================= */
console.log("\n===== 요약: JS 함수의 9가지 종류 =====");
console.table([
  { 번호: 1, 종류: "일반 함수 (Named)",            특징: "호이스팅 O, 재귀 가능" },
  { 번호: 2, 종류: "익명 함수 (Anonymous)",        특징: "변수/콜백으로 사용" },
  { 번호: 3, 종류: "화살표 함수 (Arrow)",          특징: "this 렉시컬, 간결" },
  { 번호: 4, 종류: "즉시 실행 함수 (IIFE)",        특징: "선언 즉시 실행, 스코프 격리" },
  { 번호: 5, 종류: "클로저 (Closure)",             특징: "외부 변수 캡처, 상태 유지" },
  { 번호: 6, 종류: "고차 함수 (Higher-Order)",     특징: "함수를 인자/반환값으로" },
  { 번호: 7, 종류: "커링 함수 (Curried)",          특징: "인자 하나씩 받는 체인" },
  { 번호: 8, 종류: "부분 적용 (Partial)",          특징: "일부 인자 고정" },
  { 번호: 9, 종류: "함수 컴포지션 (Composition)",  특징: "f(g(x)) 합성" }
]);
