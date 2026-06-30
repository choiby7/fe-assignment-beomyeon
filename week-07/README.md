# 배운 내용 정리 — React 훅 (useState · useRef · useEffect)

이번 주는 React 훅 중 **`useRef`** 와 **`useEffect`** 를 배웠다.
지난주에 배운 **`useState`** 와 무엇이 다른지 예제로 정리한다.

(0~5장: 세 훅의 차이 / 6장: 커스텀 훅)

> 실행: React 프로젝트([week-07-react/](week-07-react/))에서 `npm install` 후 `npm run dev`

---

## 0. 한 줄 요약

| 훅 | 한 줄 정의 | 값이 바뀌면 리렌더? |
|------|-----------|:---:|
| **`useState`** | 화면에 보여줄 **상태값** 관리 | 일어남 |
| **`useRef`** | 리렌더 없이 유지할 값 / **DOM 참조** | 안 일어남 |
| **`useEffect`** | 렌더링 **이후** 실행되는 **부수효과** | (실행 트리거가 아니라 반응하는 쪽) |

---

## 1. useState vs useRef — 핵심 차이: 리렌더링

둘 다 "값을 기억"하지만, **값이 바뀔 때 화면을 다시 그리느냐**가 결정적으로 다르다.

[실습 컴포넌트: StateVsRef.jsx](week-07-react/src/components/StateVsRef.jsx)

```jsx
const [stateCount, setStateCount] = useState(0)
const refCount = useRef(0)

// state 변경 → 리렌더링 O (화면 즉시 갱신)
setStateCount((c) => c + 1)

// ref 변경 → 리렌더링 X (화면은 그대로, 값만 조용히 바뀜)
refCount.current += 1
```

| 항목 | `useState` | `useRef` |
|------|-----------|----------|
| 값 읽기 | `stateCount` | `refCount.current` |
| 값 변경 | `setStateCount(...)` (setter 함수) | `refCount.current = ...` (직접 할당) |
| 변경 시 리렌더링 | 일어남 | 안 일어남 |
| 값 유지 시점 | 리렌더링이 일어나도 유지 | 리렌더링이 일어나도 유지 |
| 변경 즉시 화면 반영 | 즉시 | 다음 리렌더 때 반영 |
| 주 용도 | 화면에 보여줄 데이터 | 렌더와 무관한 값, DOM 참조 |

> **렌더링 횟수 세기**: `renderCount.current += 1` 처럼 `useRef` 로 세면
> 그 자체로는 리렌더를 유발하지 않아 무한 루프 없이 횟수를 셀 수 있다.
> 같은 걸 `useState` 로 하면 setState → 리렌더 → 또 setState … **무한 루프**.

---

## 2. useRef — DOM 요소에 직접 접근

`useRef` 의 두 번째 용도. `ref` 를 JSX 요소에 연결하면 `.current` 가 **실제 DOM 노드**를 가리킨다.

[실습 컴포넌트: FocusInput.jsx](week-07-react/src/components/FocusInput.jsx)

```jsx
const inputRef = useRef(null)

const handleFocus = () => {
  inputRef.current.focus() // 실제 DOM 메서드 직접 호출
}

return <input ref={inputRef} type="text" />
```

- `useState` 로는 DOM 요소 자체를 잡을 수 없다 (값만 다룸).
- 포커스 이동, 스크롤 위치, 비디오 재생/정지 등 **명령형 DOM 제어**에 사용.

---

## 3. useEffect — 렌더링 이후의 부수효과

컴포넌트 렌더링이 끝난 **뒤에** 실행되는 코드. 타이머·구독·네트워크 요청·이벤트 등록 같은
**부수효과(side effect)** 를 담당한다. 두 번째 인자 **의존성 배열**이 *언제* 실행될지를 정한다.

[실습 컴포넌트: EffectDeps.jsx](week-07-react/src/components/EffectDeps.jsx)

```jsx
useEffect(() => { ... })          // 매 렌더링마다 실행
useEffect(() => { ... }, [])      // 마운트(첫 등장) 때 딱 1번
useEffect(() => { ... }, [count]) // count 가 바뀔 때마다
```

### 의존성 배열 정리

| 작성 형태 | 실행 시점 | 대표 용도 |
|-----------|-----------|-----------|
| `useEffect(fn)` | **매 렌더링**마다 | (거의 안 씀, 보통 실수) |
| `useEffect(fn, [])` | **마운트 시 1번**만 | 초기 데이터 로딩, 구독 등록 |
| `useEffect(fn, [a, b])` | `a` 또는 `b` 가 바뀔 때 | 특정 값 변화에 반응 |

### cleanup (정리 함수)

`useEffect` 안에서 `return` 한 함수는 **다음 effect 실행 직전** 또는 **언마운트 시** 호출된다.
타이머·구독을 정리하지 않으면 메모리 누수와 중복 실행이 생긴다.

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id) // ← cleanup: 타이머 정리
}, [running])
```

---

## 4. 스톱워치 예제

`state`(표시값) + `ref`(타이머 id) + `effect`(타이머 등록/정리)를 모두 쓰는 예제.

[실습 컴포넌트: Stopwatch.jsx](week-07-react/src/components/Stopwatch.jsx)

```jsx
const [seconds, setSeconds] = useState(0)  // 화면에 보일 값 → state
const timerId = useRef(null)               // interval id → ref (화면과 무관)

useEffect(() => {
  if (!running) return
  timerId.current = setInterval(() => setSeconds((s) => s + 1), 1000)
  return () => clearInterval(timerId.current) // cleanup
}, [running])
```

- **왜 `seconds` 는 state?** → 매초 화면을 갱신해야 하니까.
- **왜 `timerId` 는 ref?** → 화면에 안 보이고, 바뀌어도 리렌더가 필요 없으니까.
- **왜 `useEffect`?** → `setInterval` 은 렌더링과 분리된 부수효과라서.

---

## 5. 최종 비교표

| 구분 | `useState` | `useRef` | `useEffect` |
|------|-----------|----------|-------------|
| 목적 | 상태값 관리 | 값 보관 / DOM 참조 | 부수효과 실행 |
| 반환 | `[값, setter]` | `{ current }` 객체 | 없음 (콜백 등록) |
| 값 변경 | `setter(...)` | `.current = ...` | — |
| 리렌더링 유발 | O | X | X |
| 값이 렌더 간 유지 | O | O | — |
| 실행 시점 | — | — | 렌더링 **이후** |
| 대표 예시 | 카운터, 입력값, 토글 | DOM 포커스, 타이머 id, 이전 값 | 데이터 fetch, 타이머, 이벤트 구독 |

### 언제 무엇을 쓰나? (선택 기준)

```
화면에 보여줘야 하는 값인가?
 -> YES -> useState
 -> NO  -> 값을 렌더 간 유지만 하면 되나? (또는 DOM 참조)
           -> YES → useRef

렌더링 "이후"에 무언가 실행해야 하나? (타이머·요청·구독)
 -> YES → useEffect (+ 필요하면 cleanup)
```

---

## 6. 커스텀 훅 — 내 로직을 훅으로 묶기

여러 컴포넌트에서 반복되는 훅 사용 로직(useState + useEffect 등)을 함수 하나로 빼내
재사용하는 것. 특별한 문법이 있는 게 아니라, 그냥 "훅을 쓰는 함수"일 뿐이다.

**규칙 2가지**

- 이름이 반드시 `use` 로 시작해야 한다 — `useToggle`, `useInput`, `useCounter` …
- 함수 안에서 `useState`, `useEffect` 같은 **다른 훅을 호출**할 수 있다 (일반 함수는 불가).

**예: on/off 토글 로직을 `useToggle` 로 추출**

```jsx
// useToggle.js — true/false 를 뒤집는 로직을 묶은 커스텀 훅
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = () => setOn((prev) => !prev)
  return [on, toggle] // 컴포넌트가 쓸 값/함수를 돌려줌
}

// 쓰는 쪽 컴포넌트는 한 줄로 끝
function Switch() {
  const [on, toggle] = useToggle()
  return <button onClick={toggle}>{on ? '켜짐' : '꺼짐'}</button>
}
```

| 구분 | 내용 |
|------|------|
| 무엇 | 반복되는 훅 로직을 재사용 가능한 함수로 추출 |
| 규칙 | 이름은 `use~` 로 시작, 안에서 다른 훅 호출 가능 |
| 반환 | 보통 객체/배열로 필요한 값·함수를 돌려줌 |
| 장점 | 코드 중복 제거, 관심사 분리, 재사용·테스트 쉬움 |
