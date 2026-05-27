/**
 * JavaScript 함수의 모든 종류 - 데모 데이터
 * --------------------------------------------------------------------------
 * 각 데모는 `run()` 함수에서 console.log 로 결과를 출력한다.
 * DemoSection 컴포넌트가 captureLogs() 로 출력을 캡처하여 화면에 표시한다.
 */

function formatArg(arg) {
  if (typeof arg === 'string') return arg
  if (typeof arg === 'function') return arg.toString()
  if (arg === null) return 'null'
  if (arg === undefined) return 'undefined'
  if (typeof arg === 'object') {
    try {
      return JSON.stringify(arg, null, 2)
    } catch {
      return String(arg)
    }
  }
  return String(arg)
}

/** 동기 실행되는 fn 안의 console.log 호출을 캡처해서 문자열 배열로 반환 */
export function captureLogs(fn) {
  const captured = []
  const orig = console.log

  console.log = (...args) => {
    captured.push(args.map(formatArg).join(' '))
  }

  try {
    fn()
  } catch (err) {
    captured.push(`[Error] ${err.message}`)
  } finally {
    console.log = orig
  }

  return captured
}

export const demos = [
  {
    id: 1,
    badge: '01',
    title: '일반 함수 (Named Function)',
    description:
      'function 키워드 + 이름으로 선언. 호이스팅 지원(선언 전 호출 가능), 재귀 호출 가능, 자체 this·arguments 보유. 명시적 기능 정의와 재사용에 적합.',
    run: () => {
      // 호이스팅 — 선언 전에 호출 가능
      console.log(greet('Alice'))
      console.log('5! =', factorial(5))

      function greet(name) {
        return 'Hello, ' + name + '!'
      }
      function factorial(n) {
        if (n <= 1) return 1
        return n * factorial(n - 1) // 재귀
      }
    },
  },
  {
    id: 2,
    badge: '02',
    title: '익명 함수 (Anonymous Function)',
    description:
      'function 키워드만 쓰고 이름 없음. 변수에 할당하거나 콜백으로 사용. 호이스팅 불가(변수만 호이스팅), 자체 this·arguments 보유.',
    run: () => {
      // 변수에 할당
      const add = function (a, b) {
        return a + b
      }
      console.log('add(3, 4) =', add(3, 4))

      // 콜백으로 사용 (배열 메서드)
      ;[1, 2, 3].forEach(function (n) {
        console.log('(익명 콜백) n =', n)
      })
    },
  },
  {
    id: 3,
    badge: '03',
    title: '화살표 함수 (Arrow Function)',
    description:
      '=> 기호로 간결하게 표현. 자기만의 this 없음 → 상위 스코프의 this 를 렉시컬하게 캡처. arguments·super 없음, new 키워드 불가.',
    run: () => {
      // 가장 간결한 형태
      const square = (x) => x * x
      console.log('square(5) =', square(5))

      // 매개변수 여러 개는 괄호 필수
      const multiply = (a, b) => a * b
      console.log('multiply(3, 4) =', multiply(3, 4))

      // 객체 리터럴 반환 시 소괄호 필수
      const makePerson = (first, last) => ({ first, last })
      console.log('makePerson:', makePerson('Bill', 'Wilson'))
    },
  },
  {
    id: 4,
    badge: '04',
    title: '즉시 실행 함수 (IIFE)',
    description:
      'Immediately Invoked Function Expression. 선언과 동시에 즉시 실행되며 독립된 스코프를 만든다. 변수 은닉·초기화·모듈 격리에 사용.',
    run: () => {
      // 일반 형태
      ;(function () {
        const secret = 'IIFE 내부 변수 - 외부 접근 불가'
        console.log('IIFE 실행됨:', secret)
      })()

      // 화살표 함수 형태
      ;(() => {
        console.log('Arrow IIFE 실행됨')
      })()

      // IIFE + 클로저로 상태 유지
      const counter = (function () {
        let count = 0
        return () => ++count
      })()
      console.log('counter():', counter())
      console.log('counter():', counter())
    },
  },
  {
    id: 5,
    badge: '05',
    title: '클로저 (Closure)',
    description:
      '함수가 선언될 당시의 렉시컬 환경(스코프)을 함께 기억하는 함수. 외부 변수에 대한 "참조"를 유지하여 상태 캡슐화·비공개 변수가 가능.',
    run: () => {
      function makeCounter() {
        let count = 0 // 비공개(private) 상태
        return {
          increment: () => ++count,
          reset: () => {
            count = 0
          },
          get: () => count,
        }
      }

      const counterA = makeCounter()
      const counterB = makeCounter() // 독립된 인스턴스
      counterA.increment()
      counterA.increment()
      counterB.increment()
      console.log('counterA.get():', counterA.get())
      console.log('counterB.get():', counterB.get(), '(독립 상태)')

      // 은행 계좌 캡슐화
      function makeBank(balance) {
        return {
          deposit: (amount) => (balance += amount),
          getBalance: () => balance,
        }
      }
      const account = makeBank(100)
      account.deposit(50)
      console.log('account.getBalance():', account.getBalance())
    },
  },
  {
    id: 6,
    badge: '06',
    title: '고차 함수 (Higher-Order Function)',
    description:
      '함수를 "인자로 받거나" 또는 "함수를 반환하는" 함수. 자바스크립트의 함수가 일급 객체이기에 가능. map/filter/reduce 가 대표적인 내장 고차 함수.',
    run: () => {
      // (1) 함수를 인자로 받는 함수
      function repeat(n, action) {
        for (let i = 0; i < n; i++) action(i)
      }
      repeat(3, (i) => console.log('repeat:', i))

      // (2) 함수를 반환하는 함수
      function greaterThan(n) {
        return (x) => x > n
      }
      const greaterThan10 = greaterThan(10)
      console.log('greaterThan10(15):', greaterThan10(15))

      // (3) 배열 메서드 + 화살표 함수 = 선언적 표현
      const nums = [1, 2, 3, 4, 5]
      console.log('map(n => n*n):    ', JSON.stringify(nums.map((n) => n * n)))
      console.log('filter(n%2===0):  ', JSON.stringify(nums.filter((n) => n % 2 === 0)))
      console.log('reduce((a,n)=>a+n):', nums.reduce((acc, n) => acc + n, 0))
    },
  },
  {
    id: 7,
    badge: '07',
    title: '커링 함수 (Curried Function)',
    description:
      '여러 인자를 받는 함수를 "인자를 하나씩 받는 함수의 체인"으로 변환. f(a,b,c) → f(a)(b)(c). 클로저 기반의 다층 함수 구조.',
    run: () => {
      // 수동 커링
      const curriedAdd = (a) => (b) => a + b
      const add5 = curriedAdd(5)
      console.log('add5(3):         ', add5(3))
      console.log('curriedAdd(2)(7):', curriedAdd(2)(7))

      // 자동 커링 헬퍼
      function curry(fn) {
        return function curried(...args) {
          if (args.length >= fn.length) return fn(...args)
          return (...next) => curried(...args, ...next)
        }
      }
      function sum3(a, b, c) {
        return a + b + c
      }
      const curriedSum = curry(sum3)
      console.log('curriedSum(1)(2)(3):', curriedSum(1)(2)(3))
      console.log('curriedSum(1, 2)(3):', curriedSum(1, 2)(3))
    },
  },
  {
    id: 8,
    badge: '08',
    title: '부분 적용 함수 (Partial Application)',
    description:
      '함수의 일부 인자를 미리 "고정(fix)"하고 나머지는 나중에 받는 기법. 커링과 비슷하지만 "일부만" 고정한다는 점에서 다름. f(a,b,c) → f\'(_, b, c).',
    run: () => {
      // partial 헬퍼 (스프레드 활용)
      function partial(fn, ...fixedArgs) {
        return (...restArgs) => fn(...fixedArgs, ...restArgs)
      }

      function greetFull(greeting, name) {
        return `${greeting}, ${name}!`
      }
      const sayHello = partial(greetFull, 'Hello')
      console.log(sayHello('Daniel'))
      console.log(sayHello('Alice'))

      // 곱셈의 일부 인자 고정
      function multiplyFull(a, b) {
        return a * b
      }
      const double = partial(multiplyFull, 2)
      const triple = partial(multiplyFull, 3)
      console.log('double(5):', double(5))
      console.log('triple(5):', triple(5))
    },
  },
  {
    id: 9,
    badge: '09',
    title: '함수 컴포지션 (Function Composition)',
    description:
      '여러 함수를 조합해 새로운 함수를 만드는 기법. (f∘g)(x) = f(g(x)). 작은 순수 함수들을 합쳐 큰 동작을 선언적으로 표현.',
    run: () => {
      const toUpper = (str) => str.toUpperCase()
      const exclaim = (str) => `${str}!`

      // 직접 합성
      const shout = (str) => exclaim(toUpper(str))
      console.log('shout("hello"):', shout('hello'))

      // 일반화된 compose (오른쪽 → 왼쪽)
      const compose =
        (...fns) =>
        (x) =>
          fns.reduceRight((acc, fn) => fn(acc), x)
      const shout2 = compose(exclaim, toUpper)
      console.log('compose(exclaim, toUpper)("functional"):', shout2('functional'))

      // pipe (왼쪽 → 오른쪽)
      const pipe =
        (...fns) =>
        (x) =>
          fns.reduce((acc, fn) => fn(acc), x)
      const shout3 = pipe(toUpper, exclaim)
      console.log('pipe(toUpper, exclaim)("react"):', shout3('react'))
    },
  },
]

export const summaryTable = [
  { 번호: 1, 종류: '일반 함수 (Named)', 핵심: '호이스팅 O, 재귀 가능' },
  { 번호: 2, 종류: '익명 함수 (Anonymous)', 핵심: '변수/콜백으로 사용' },
  { 번호: 3, 종류: '화살표 함수 (Arrow)', 핵심: 'this 렉시컬, 간결' },
  { 번호: 4, 종류: '즉시 실행 함수 (IIFE)', 핵심: '선언 즉시 실행, 스코프 격리' },
  { 번호: 5, 종류: '클로저 (Closure)', 핵심: '외부 변수 캡처, 상태 유지' },
  { 번호: 6, 종류: '고차 함수 (Higher-Order)', 핵심: '함수를 인자/반환값으로' },
  { 번호: 7, 종류: '커링 함수 (Curried)', 핵심: '인자 하나씩 받는 체인' },
  { 번호: 8, 종류: '부분 적용 (Partial)', 핵심: '일부 인자 고정' },
  { 번호: 9, 종류: '함수 컴포지션 (Composition)', 핵심: 'f(g(x)) 합성' },
]
