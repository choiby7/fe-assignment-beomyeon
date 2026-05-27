# 배운 내용 정리

- 모던 자바스크립트
    - 구조분해할당(Destructuring) — 객체/배열의 값을 여러 변수에 한 번에 풀어서 할당하는 문법
    - 스프레드 연산자(Spread Operator) — `...`로 객체/배열의 요소를 펼쳐 전개하는 문법 (rest와 반대 방향)
    - 객체 메서드 — 객체가 프로퍼티로 가지고 있는 함수

- 리액트 시작하기
    - React 란? — 컴포넌트 기반 UI를 선언적으로 구성하는 JS 라이브러리 (프레임워크 아님)
    - JSX — JS 안에 HTML 같은 마크업을 쓰게 해주는 문법 확장 (빌드 시 `React.createElement()` 호출로 변환)
    - 컴포넌트 — JSX를 반환하는 재사용 가능한 함수, UI의 독립 단위
    - Props — 부모 → 자식 컴포넌트로 전달되는 읽기 전용 데이터
    - 이벤트 핸들링 — 사용자 이벤트를 감지해 핸들러 함수를 실행하는 작업 (React에서는 SyntheticEvent 사용)


## 구조분해할당 / 스프레드 연산자 / 나머지 매개변수

[실습 파일](modern_js.js)


## 자바스크립트 함수의 종류

[실습 파일](js_functions.js) · 브라우저에서 보려면 React 프로젝트([week-06-start-react/](week-06-start-react/))에서 `npm run dev`

### 1. 9가지 함수 종류 종합표

| # | 종류 | 문법 예시 | 핵심 특징 | 주 용도 |
|---|------|-----------|-----------|---------|
| 1 | **일반 함수**<br>(Named Function) | `function greet(name) { ... }` | 호이스팅 O, 이름 존재, 재귀 호출 가능, 자체 `this`·`arguments` 보유 | 명시적 기능 정의, 재사용, 재귀 |
| 2 | **익명 함수**<br>(Anonymous) | `const add = function(a,b){...}` | 호이스팅 X(변수만), 이름 없음, 자체 `this`·`arguments` 보유 | 변수 할당, 일회성 콜백 |
| 3 | **화살표 함수**<br>(Arrow) | `const square = x => x*x` | `this`/`arguments`/`super` 없음 → 상위 스코프에서 렉시컬 캡처, `new` 불가, 간결 | 짧은 콜백, 배열 메서드, `this` 상속 필요 시 |
| 4 | **즉시 실행 함수**<br>(IIFE) | `(function(){...})()` | 선언과 동시에 1회 실행, 독립 스코프 형성 | 변수 은닉, 초기화, 모듈 격리 |
| 5 | **클로저**<br>(Closure) | `function outer(){ let x; return ()=>x }` | 선언 당시의 렉시컬 환경을 함수가 계속 참조 | 상태 캡슐화, 비공개 변수, 카운터/메모이제이션 |
| 6 | **고차 함수**<br>(Higher-Order) | `arr.map(fn)` / `function f(){ return g }` | 함수를 인자로 받거나 함수를 반환 | `map`/`filter`/`reduce`, 추상화, 콜백 패턴 |
| 7 | **커링 함수**<br>(Curried) | `a => b => c => a+b+c` | 인자를 하나씩 받는 함수 체인으로 변환, 클로저 기반 | 함수 합성, 인자 분리 재사용 |
| 8 | **부분 적용**<br>(Partial Application) | `partial(fn, fixed)` | 일부 인자만 미리 고정, 나머지는 나중에 | 반복 인자 제거, 맞춤형 함수 생성 |
| 9 | **함수 컴포지션**<br>(Composition) | `compose(f, g)(x) = f(g(x))` | 여러 순수 함수를 합성해 새 함수 생성 | 선언적 데이터 파이프라인, FP 스타일 |


### 2. 일반 함수 · 익명 함수 · 화살표 함수 비교 

| 항목 | 일반 함수 (`function f()`) | 익명 함수 (`const f = function()`) | 화살표 함수 (`const f = () =>`) |
|------|---------------------------|-------------------------------------|---------------------------------|
| 이름 | 있음 (스코프에 등록) | 없음 (변수명이 식별자 역할) | 없음 (렉시컬 상속) |
| 호이스팅 | ✅ 가능 (선언 전 호출 OK) | ❌ 불가 (변수만 호이스팅) | ❌ 불가 |
| `this` 바인딩 | 호출 시점에 동적으로 결정 | 호출 시점에 동적으로 결정 | **정의 시점**의 상위 스코프 `this` 상속 |
| `arguments` 객체 | ✅ 존재 | ✅ 존재 | ❌ 없음 (외부 함수의 것 사용) |
| `new` 생성자 사용 | ✅ 가능 | ✅ 가능 | ❌ TypeError |
| 메서드 정의 적합성 | ✅ 적합 | ✅ 적합 | ❌ 비적합 (`this` 가 객체를 가리키지 않음) |
| 코드 성격 | 선언형 (Declaration) | 표현식 (Expression) | 표현식 (Expression) |
| 의도된 사용 맥락 | 재사용 가능한 기능 정의 | 콜백, 일회성 로직 | 짧은 표현, `this` 상속이 필요한 콜백 |

---


## 심화 정리

### 3. 꼭 알아야 할 5가지 핵심

#### ① 함수는 "일급 객체(First-Class Citizen)"

- 변수에 담을 수 있다 → **익명/화살표 함수가 가능**
- 인자로 전달할 수 있다 → **고차 함수와 콜백이 가능**
- 반환값으로 돌려줄 수 있다 → **클로저/커링/부분 적용이 가능**
- 속성을 추가할 수 있다 → **함수도 객체** (`fn.someProp = ...`)

→ **9개 패턴이 모두 이 한 가지 성질에서 파생됨**. 이게 출발점.

#### ② `this` 의 4가지 호출 방식

일반 함수의 `this` 가 무엇이 되는지는 **"어떻게 호출됐는가"** 가 결정한다.

| 호출 형태 | `this` |
|---|---|
| `f()` (단독) | 전역 객체 (strict 모드: `undefined`) |
| `obj.f()` (메서드) | `obj` |
| `new f()` (생성자) | 새로 만들어진 인스턴스 |
| `f.call(x)` / `f.apply(x)` | `x` (명시적 바인딩) |

→ 화살표 함수는 **이 네 규칙을 무시**하고 무조건 상위 스코프 `this` 사용.

#### ③ 호이스팅 차이

```js
greet();   // ✅ 동작 (일반 함수는 완전 호이스팅)
function greet() { ... }

greet2();  // ❌ ReferenceError (const 는 TDZ)
const greet2 = function () { ... }
```

#### ④ 클로저 

클로저란, 함수가 선언될 때 그 외부 환경을 기억하여, 그 함수가 반환되더라도 외부 환경에 접근할 수 있도록 하는 기능 혹은 함수 객체 그 자체.

JS 내부적으로 함수가 반환될 때, 외부 환경의 변수 등을 포함한 하나의 익명 함수 객체를 반환한다.

IIFE, 커링, 부분 적용, 모듈 패턴, React 의 `useState` 까지 — **전부 클로저 위에 세워진다.** 클로저를 이해하면 나머지가 자연히 따라옴.

#### ⑤ 순수 함수 vs 부수효과

함수형 프로그래밍의 본질:

- **순수 함수**: 같은 입력 → 같은 출력, 외부 상태 변경 X
- **부수효과(side effect)**: 외부 변수 변경, `console.log`, DOM 조작, 네트워크 요청 등

→ 화살표 함수는 "객체에 속하지 않음" 이라는 문법적 특성 덕분에 순수 함수를 표현하기에 적합하다.


### 7. 자주 틀리는 함정 2가지

#### ⚠️ 함정 1 — 객체 메서드를 화살표 함수로 정의

```js
const obj = {
  count: 0,
  inc: () => { this.count++; }  // ❌ this 는 obj 가 아님!
};
```

화살표 함수는 자기 `this` 가 없으므로 객체의 메서드로 부적합.

#### ⚠️ 함정 2 — `var` + 반복문 + 클로저 (가장 유명한 면접 문제)

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 출력: 3, 3, 3   (var 는 함수 스코프 → 모든 콜백이 같은 i 참조)

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 출력: 0, 1, 2   (let 은 블록 스코프 → 매 반복마다 새 i)
```

---


## React State와 렌더링 원리

### 1. Virtual DOM

| 구분 | 대상 | 예시 |
|------|------|------|
| **DOM** (Document Object Model) | HTML 문서 구조 | `document`, `<div>`, `element.appendChild()` |
| **Virtual DOM** | DOM을 흉내낸 JS 객체 트리 | React가 메모리에 들고 있는 가상 트리 |

> React가 다루는 건 **DOM**. `window.location` 같은 BOM은 React 영역 밖.

### 2. State 변경 시 렌더링 순서

```
setState(newValue) 호출
        ↓
① Render Phase   — 컴포넌트 함수 재호출 → 새 Virtual DOM 생성
        ↓
② Reconciliation — 이전 vs 새 Virtual DOM 비교 (diffing)
        ↓
③ Commit Phase   — 달라진 노드만 실제 DOM에 patch
        ↓
④ Browser Paint  — 브라우저가 화면 다시 그림
        ↓
⑤ useEffect 실행 (commit 이후)
```

### 3. Virtual DOM 비교 예시

```jsx
function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello</h1>
      <button>{count}</button>
    </div>
  );
}
```

`count: 0 → 1` 변경 시:

```
이전 Virtual DOM            새 Virtual DOM
─────────────────           ─────────────────
div                         div
├── h1: "Hello"     ===     ├── h1: "Hello"     ✅ 동일 → 건너뜀
└── button: 0       ≠       └── button: 1       ❌ 차이 → 패치
```

→ 실제 DOM에서는 **`<button>`의 텍스트 노드 하나만** 업데이트.

### 4. State 원리 3가지

| 원리 | 설명 |
|------|------|
| **Snapshot** | 매 렌더링은 그 시점의 state를 고정값(스냅샷)으로 가진다 |
| **Trigger** | `setState`는 즉시 값을 바꾸지 않고 "다시 그려달라"고 요청 |
| **Reconciliation** | 같은 위치 + 같은 타입이면 노드 재사용, 다르면 patch |

### 5. 왜 이렇게 설계했나

실제 DOM 조작은 **reflow/repaint**가 발생하는 비싼 연산. Virtual DOM에서 먼저 비교해서 **최소한의 변경**만 실제 DOM에 적용 → 성능 최적화.
