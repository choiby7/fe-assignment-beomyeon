# CSS 구성요소 정리

`index-bem.html`의 `<style>` 태그 내용을 기준으로 CSS의 핵심 개념을 정리한다.

---

## 1. 선택자(Selector) — 누구에게 스타일을 줄 것인가

CSS는 **"어떤 요소에" 스타일을 줄지** 를 선택자로 결정한다.

```
선택자 {
  속성: 값;
}
```

---

### 1-1. 전체 선택자 `*`

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

`*` 는 페이지의 **모든 요소**를 선택한다.
`::before`, `::after` 는 각 요소의 가상 요소(pseudo-element)까지 포함한다.

> 보통 파일 맨 위에서 브라우저 기본 스타일을 초기화(reset)하는 용도로 사용한다.

---

### 1-2. 태그 선택자

```css
body { font-family: sans-serif; }
ul   { list-style: none; }
a    { text-decoration: none; }
```

HTML 태그 이름을 그대로 쓰면 **해당 태그 전체**에 스타일이 적용된다.
별도 클래스 없이 사이트 전역 기본값을 설정할 때 쓴다.

---

### 1-3. 클래스 선택자 `.클래스명`

```css
.card {
  background-color: var(--card-bg);
  border-radius: 1rem;
}

.card__body {
  display: flex;
  flex-direction: column;
}
```

HTML에서 `class="card"` 라고 붙인 요소에만 적용된다.
**가장 많이 쓰는 선택자**다. `.`(점)으로 시작하고 이름은 자유롭게 지을 수 있다.

```html
<!-- HTML -->
<article class="card">...</article>
<!--              ↑ 이 요소에 .card 스타일이 붙는다 -->
```

클래스는 **여러 요소에 동시에** 쓸 수 있고, 한 요소에 **여러 클래스를 동시에** 붙일 수도 있다.

```html
<button class="links__btn links__btn--primary">GitHub</button>
<!--    클래스 두 개가 동시에 적용됨 -->
```

---

### 1-4. ID 선택자 `#아이디명`

```css
#submit-button {
  background-color: blue;
}
```

```html
<button id="submit-button">제출</button>
```

`#`(샵)으로 시작하고, HTML의 `id` 속성과 연결된다.
클래스와 달리 **페이지에서 딱 한 요소에만** 붙여야 한다는 규칙이 있다.

| | `.class` | `#id` |
|---|---|---|
| 중복 사용 | 여러 요소에 사용 가능 | 페이지에서 유일해야 함 |
| 선택자 기호 | `.` | `#` |
| 우선순위(specificity) | 낮음 | 높음 |

> `index-bem.html`에서는 `#id`를 사용하지 않았다. BEM과 Tailwind 모두 클래스 기반이기 때문에 실무에서도 ID는 CSS 스타일링에 거의 쓰지 않는다.

---

### 1-5. 상태 선택자(Pseudo-class) `:hover` `:active`

```css
.card:hover {
  box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
}

.links__btn:active {
  transform: scale(0.95);
}

.profile__avatar:hover .profile__img {
  transform: scale(1.1);
}
```

`:hover` — 마우스를 요소 위에 올렸을 때
`:active` — 요소를 클릭하는 순간

마지막 예시처럼 `.profile__avatar:hover .profile__img` 는
**".profile__avatar에 hover 했을 때, 그 안에 있는 .profile__img"** 를 선택한다.
공백이 **자손 결합자(descendant combinator)** 역할을 한다.

---

## 2. `:root` — CSS 변수를 담는 전역 컨테이너

```css
:root {
  --page-bg:   #f3f4f6;
  --card-bg:   #ffffff;
  --text-name: #111827;
  /* ... */
}
```

`:root` 는 HTML 문서의 최상위 요소(`<html>`)를 가리키는 특별한 선택자다.
`html { }` 과 사실상 같지만, `:root`가 우선순위(specificity)가 더 높다.

여기서 중요한 건 `:root` 자체보다 그 안에 담긴 **CSS 커스텀 프로퍼티(변수)** 다.

### CSS 커스텀 프로퍼티(변수) `--변수명`

```css
/* 선언 — 반드시 -- 로 시작 */
:root {
  --card-bg: #ffffff;
}

/* 사용 — var() 함수로 참조 */
.card {
  background-color: var(--card-bg);
}
```

`--`(하이픈 두 개)로 시작하는 이름은 CSS 변수다.
`:root`에 선언하면 **페이지 전체 어디서든** `var()`로 꺼내 쓸 수 있다.

**변수의 핵심 이점** — 값을 한 곳에서 관리할 수 있다.

```css
/* 변수 없이 */
.card        { background-color: #ffffff; }
.card-footer { background-color: #ffffff; }
.profile     { background-color: #ffffff; }
/* → 색을 바꾸려면 세 곳을 모두 찾아서 수정해야 한다 */

/* 변수 사용 */
:root        { --card-bg: #ffffff; }
.card        { background-color: var(--card-bg); }
.card-footer { background-color: var(--card-bg); }
.profile     { background-color: var(--card-bg); }
/* → --card-bg 값 하나만 바꾸면 세 곳이 동시에 바뀐다 */
```

---

## 3. `@media` — 조건부 스타일 (미디어 쿼리)

```css
/* 화면 너비가 640px 이상일 때만 적용 */
@media (min-width: 640px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
  .profile__avatar { width: 7rem; height: 7rem; }
}

/* 시스템이 다크 모드로 설정되어 있을 때만 적용 */
@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: #1f2937;
    --text-name: #f9fafb;
  }
}
```

`@media (조건) { }` — 조건이 참일 때만 중괄호 안의 스타일이 적용된다.

| 조건 | 의미 |
|---|---|
| `min-width: 640px` | 화면 너비가 640px **이상** |
| `max-width: 639px` | 화면 너비가 639px **이하** |
| `prefers-color-scheme: dark` | 시스템 다크모드 설정 |
| `prefers-color-scheme: light` | 시스템 라이트모드 설정 |

> `index-bem.html`은 다크모드를 `@media (prefers-color-scheme: dark)` 안에서 `:root` 변수만 덮어쓰는 방식으로 구현했다. 스타일 규칙은 그대로 두고 변수 값만 교체하므로, 다크모드 코드가 최소화된다.

---

## 4. `@keyframes` — 애니메이션 정의

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

애니메이션의 **시작과 끝 상태**를 정의한다.
`from`(0%) → `to`(100%) 로 작성하거나, `0%` `50%` `100%` 처럼 중간 단계도 넣을 수 있다.

정의만으로는 아무것도 일어나지 않는다. 요소에 `animation` 속성으로 **연결**해야 동작한다.

```css
/* 연결 */
.card {
  animation: fadeInUp 0.5s ease-out;
  /*         ↑이름    ↑시간  ↑타이밍함수 */
}
```

---

## 5. 주요 속성 정리

`index-bem.html`에 등장하는 속성들을 역할별로 묶었다.

### 레이아웃

```css
display: flex;              /* 자식 요소를 가로 또는 세로로 나열 */
flex-direction: column;     /* 세로로 나열 (기본값은 row = 가로) */
flex: 1;                    /* 남은 공간을 꽉 채움 */
flex-shrink: 0;             /* 공간이 부족해도 줄어들지 않음 */

display: grid;              /* 격자 레이아웃 */
grid-template-columns: repeat(3, 1fr);  /* 3등분 격자 */
gap: 1rem;                  /* 격자 칸 사이 간격 */
```

### 박스 모델

```css
margin: 0 auto;             /* 위아래 0, 좌우 자동(=중앙 정렬) */
padding: 1rem 1.25rem;      /* 안쪽 여백 (위아래 1rem, 좌우 1.25rem) */
border: 1px solid #ccc;     /* 테두리 */
border-radius: 1rem;        /* 모서리를 둥글게 */
box-sizing: border-box;     /* padding과 border를 너비/높이에 포함 */
```

### 시각 효과

```css
box-shadow: 0 4px 6px rgba(0,0,0,.1);  /* 그림자 */
opacity: 0;                             /* 투명도 (0=완전 투명, 1=불투명) */
overflow: hidden;                       /* 삐져나온 부분을 잘라냄 */
```

### 변형(Transform)

```css
transform: translateY(24px);  /* Y축으로 24px 이동 */
transform: scale(1.1);        /* 110%로 확대 */
transform: scale(0.95);       /* 95%로 축소 */
```

### 전환(Transition)

```css
transition: all 0.2s;                    /* 모든 속성 변화를 0.2초에 걸쳐 부드럽게 */
transition: background-color 0.3s;       /* 배경색 변화만 0.3초 */
transition: box-shadow 0.3s, color 0.3s; /* 여러 속성을 각각 지정 */
```

> `transition`은 어떤 속성이 바뀔 때 **즉각 바뀌지 않고 서서히 바뀌도록** 한다.  
> `:hover`나 `@media`로 값이 달라지는 속성에 붙이면 부드러운 인터랙션이 생긴다.

---

## 6. 전체 구조 요약

```
<style>
  │
  ├── * { }                    전체 리셋
  ├── body, ul, a { }          태그 기본 스타일
  │
  ├── :root { --변수: 값; }    CSS 변수 선언 (라이트 모드)
  │
  ├── @media (prefers-color-scheme: dark) {
  │     :root { --변수: 다른값; }   다크 모드 — 변수만 교체
  │   }
  │
  ├── .page { }                Block 스타일
  ├── .card { }
  ├── .card__body { }          Element 스타일
  ├── .card:hover { }          상태(hover) 스타일
  │
  ├── @media (min-width: 640px) { }    반응형 — sm
  ├── @media (min-width: 1024px) { }   반응형 — lg
  │
  └── @keyframes fadeInUp { }  애니메이션 정의
</style>
```
