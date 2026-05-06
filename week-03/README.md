# Week 03 — CSS 방법론 과제

---

## 0. 문제 인식

```css
.box1 {}
.box2 {}
.red-text {}
.big-text {}
```

```html
<div class="box1">
  <p class="red-text big-text">안녕하세요</p>
</div>
```

**Q. 아래 질문에 답하시오.**

**1. 클래스 이름만 보고 역할을 명확하게 알 수 있는가?**

> 알기 힘들다. `.red-text`나 `.big-text`는 텍스트가 어떻게 보이는지에 대한 시각적인 정보만 알려줄 뿐, 어떤 역할을 하는지는 알 수 없는 이름이다.

**2. 스타일 충돌(겹침)이 발생할 가능성은 없는가?**

> 충돌할 가능성이 매우 높다. `.box1`이나 `.red-text`라는 이름을 동일하게 쓰고 다른 스타일을 적용한다면, 기존에 작성한 스타일이 덮어씌워지는 충돌이 발생하기 쉽다.

**3. 프로젝트가 커졌을 때 유지보수는 쉬울까?**

> 매우 어렵다. `.box1`이 프로젝트에서 얼마나 많이 쓰이고 있는지 알기 힘들다. `.box1`의 디자인을 변경할 때, 실제로 어느 부분이 수정되는지 파악하기 힘들다.

**4. 이런 방식이 실무에서 문제가 되는 이유**

> 기획이나 디자인이 변경되어 `.red-text`를 모두 orange 색상으로 바꾸려 하면, `.red-text` 코드를 바꾸면 이름과 색상이 모순되고, 새 클래스 `.orange-text`를 만들면 기존 `.red-text`가 쓰레기 값으로 남는다.
>
> 스타일 충돌을 겪다 보면 이를 강제로 덮어씌우기 위해 선택자를 길게 쓰거나 최악의 경우 `!important`를 남발하게 된다. 이는 코드의 예측 가능성을 파괴한다.

---

## 1. 조사 및 정리

### 1) CSS를 무작정 작성했을 때 생기는 문제

- **중복** — 어떤 클래스에 어떤 스타일이 정의되어 있는지 명확히 파악하기 힘들어, 같은 기능의 스타일이 중복 정의될 수 있다.
- **스타일 충돌** — 모든 클래스 이름이 전역 공간을 공유하므로, 다른 파일에서 동일한 클래스명을 쓰면 나중에 선언된 스타일이 기존 스타일을 덮어씌운다.
- **유지보수 어려움** — 특정 클래스를 수정했을 때 앱의 어느 부분이 변경·파괴될지 확신할 수 없다. 이를 피하려고 새로운 클래스를 계속 추가하게 되고 CSS 파일이 무한정 커진다.
- **컨텍스트 스위칭** — HTML 파일과 CSS 파일을 끊임없이 전환하며 작업해야 해서 개발 피로도가 높아진다.

---

### 2) BEM이란 무엇인가?

**BEM(Block, Element, Modifier)** 은 위와 같은 CSS 네이밍 문제를 해결하기 위해 Yandex에서 고안한 CSS 네이밍 컨벤션이다. 클래스 이름을 구조적으로 작성하여 이름만 보고도 해당 요소의 역할과 종속성을 파악할 수 있게 해준다.

| 개념 | 설명 | 구분자 | 예시 |
|---|---|---|---|
| **Block** | 재사용 가능한 독립적인 컴포넌트 단위 | — | `menu`, `button` |
| **Element** | 블록에 종속된 하위 요소. 블록 외부에서는 의미를 갖지 않는다 | `__` | `menu__item`, `button__icon` |
| **Modifier** | 블록이나 엘리먼트의 상태·외형 변화를 나타낸다 | `--` | `button--primary`, `menu__item--active` |

**작성 예시**

```html
<form class="search-form search-form--focused">
  <input class="search-form__input" type="text" />
  <button class="search-form__button search-form__button--disabled">
    검색
  </button>
</form>
```

> **BEM의 장점** — 이름 자체가 스코프의 역할을 하므로 CSS 클래스 충돌이 거의 사라지며, HTML 구성만 봐도 컴포넌트의 구조와 상태를 직관적으로 파악할 수 있다.

---

### 3) Tailwind CSS는 어떤 방식인가?

**Tailwind CSS** 는 의미론적인 이름(Semantic Naming)을 짓는 것 자체를 포기하고, 미리 정의된 단일 목적의 유틸리티 클래스들을 조합하여 스타일을 구성하는 **Utility-First** 프레임워크다.

과거에는 "클래스명은 디자인이 아닌 의미를 담아야 한다"는 원칙이 지배적이었으나, Tailwind는 발상을 전환하여 `display: flex` → `flex`, `padding-top: 1rem` → `pt-4`, 색상 → `text-blue-500` 처럼 원자 단위로 클래스를 제공한다.

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="text-xl font-medium text-black">경고 메시지</div>
  <p class="text-red-500 text-sm">데이터를 불러오는 데 실패했습니다.</p>
</div>
```

**장점**
- 이름 짓기 스트레스 해방
- 컨텍스트 스위칭 제로
- 스타일 충돌 원천 차단

**단점**
- 클래스 나열이 길어져 HTML 코드가 지저분해 보일 수 있다.
- 다만 컴포넌트로 분리하여 재사용하는 방식으로 극복 가능하다.

---

### 4) BEM vs. Tailwind CSS — 관점 비교

**① 관심사의 분리 vs. 행동의 지역성**

- **BEM** — HTML은 뼈대(구조)만 잡고, CSS 파일에 모든 디자인 로직을 몰아넣는다.
- **Tailwind** — 어차피 UI를 수정하려면 HTML과 CSS를 같이 봐야 하니, 태그 바로 옆에 스타일을 적어두는 것이 컨텍스트 스위칭을 줄이고 직관적이다.

**② 네이밍의 기준: "무엇인가?" vs. "어떻게 보이는가?"**

- **BEM** — 클래스 이름은 요소의 **의미와 역할**을 설명한다. 형태가 바뀌어도 역할이 같다면 클래스명은 유지된다. (`.profile-card__submit-btn`)
- **Tailwind** — 클래스 이름은 요소의 **시각적 형태**를 그대로 설명한다. (`bg-blue-500 text-white rounded`)

**③ 비대해지는 위치: CSS vs. HTML**

- **BEM** — HTML 코드는 깔끔하게 유지되지만, CSS 파일은 컴포넌트가 늘어날수록 방대해진다.
- **Tailwind** — CSS 파일은 거의 변하지 않고 가볍지만, HTML 코드가 유틸리티 클래스 나열로 길어진다.

**④ 현대 프론트엔드 환경에서의 시사점**

과거에는 BEM 같은 시맨틱 네이밍이 정답으로 여겨졌으나, React 같은 컴포넌트 기반 개발이 표준이 되면서 패러다임이 바뀌었다. JSX 안에 HTML과 JS가 이미 한 덩어리로 묶이고, 컴포넌트 파일 자체가 의미와 역할을 분리하는 캡슐화 도구가 되기 때문에, 굳이 CSS 클래스명에까지 의미를 중복 부여할 필요성이 줄어든 것이다.

따라서 태그에 바로 스타일을 조립해 넣는 Tailwind의 방식이 컴포넌트 재사용성과 시너지가 좋아 최근 트렌드가 됐다.

---

## 2. UI 구조 설계

제 자기소개 카드 설계는 다음과 같습니다.

```
카드
├── 프로필 이미지 영역
├── 텍스트 영역
│   ├── 이름
│   ├── 한 줄 소개
│   └── 연락처
├── 상태 메시지
├── 기술 태그 영역
│   ├── 메인 기술  : 가장 자신 있는 것
│   ├── Tooling/Env : 사용 가능한 생산성 툴
│   └── Base       : 기본기
└── 버튼 영역 : GitHub 링크 버튼, 블로그 버튼
```

---

## 3. 구현 (Tailwind CSS)

자기소개 카드를 Tailwind CSS 유틸리티 클래스만으로 구현했다. 별도의 CSS 파일 없이 HTML 태그에 클래스를 직접 조합하는 방식이다.

### HTML 시맨틱 구조

```
article                 ← 카드 전체 (독립 콘텐츠 단위)
├── header              ← 프로필 이미지 + 이름 + 한 줄 소개
│   ├── figure          ← 프로필 이미지 컨테이너 (원형 마스크)
│   │   └── img
│   └── div
│       ├── h1          ← 이름
│       └── p           ← 한 줄 소개
└── div                 ← 콘텐츠 영역
    ├── p               ← 인사말
    ├── section         ← 스킬 태그 영역
    │   ├── h2
    │   └── ul > li > span  ← 스킬 뱃지
    └── footer          ← 버튼 영역
        └── nav
            ├── a       ← GitHub 링크
            └── button  ← Email
```

### 주요 구현 결정

Tailwind를 처음 쓰다 보니 클래스 목록이 한 요소에 10개를 넘어가는 경우가 많았다. 이 자체가 "HTML이 비대해진다"는 Tailwind의 단점을 직접 체감하는 순간이었다. 반면 CSS 파일을 열 필요가 전혀 없었고, 어떤 스타일이 적용될지 태그만 보고 즉시 예측할 수 있다는 점은 확실히 편했다.

프로필 이미지의 원형 클리핑은 `figure`에 `rounded-full overflow-hidden`을 두고 `img`에 `w-full h-full object-cover`를 적용했다. `rounded-full`을 `img`에 직접 두면 `ring`(outline)과 `overflow`가 맞지 않는 문제가 있어, 부모 요소에서 마스킹하는 방법을 선택했다.

---

## 4. 추가 도전

### transition / animation

페이지 로드 시 카드 전체에 아래에서 위로 올라오는 `fadeInUp` 애니메이션을 적용했다. Tailwind CDN에서는 커스텀 keyframe을 `animate-[fadeInUp_0.5s_ease-out]` 형태의 **arbitrary value** 문법으로 사용할 수 있다. `<style>` 블록에 `@keyframes fadeInUp`을 정의하고 Tailwind 클래스에서 참조하는 방식이다.

hover 인터랙션은 다음 요소에 적용했다.

| 요소 | 효과 |
|---|---|
| 카드 전체 | `hover:shadow-2xl` — 그림자 강화 |
| 프로필 이미지 | `group-hover:scale-110` — 확대, `hover:ring-indigo-400` — 링 색상 강조 |
| 스킬 뱃지 | `hover:-translate-y-1 hover:bg-indigo-600 hover:text-white` — 위로 튀어오르며 색상 반전 |
| 버튼 | `hover:scale-105 active:scale-95` — 확대 / 클릭 눌림 효과 |

`group` / `group-hover:` 는 부모에 `group`을 붙이면 자식 요소에서 부모의 hover 상태를 감지할 수 있는 Tailwind 기능이다. figure를 hover했을 때 내부 img를 확대하는 데 활용했다.

---

### 다크모드 스타일 적용

Tailwind의 `dark:` 접두사를 사용하여 시스템 다크모드(`prefers-color-scheme: dark`)에 자동으로 대응했다. **JS 없이 순수 CSS(미디어 쿼리) 기반**으로 동작한다.

Tailwind CDN의 기본 `darkMode` 전략은 `'media'`(시스템 설정 감지)이므로 별도 설정 없이 `dark:` 클래스를 붙이는 것만으로 동작한다.

```html
<!-- 카드 배경 -->
<article class="bg-white dark:bg-gray-800 ...">

<!-- 스킬 뱃지 -->
<span class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 ...">
```

---

### 카드 여러 개를 grid로 배치

`display: grid`에 해당하는 `grid` 클래스를 컨테이너에 적용하고, `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`으로 브레이크포인트별 컬럼 수를 지정했다.

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
  <article>...</article>
  <article>...</article>
  ...
</div>
```

그리드를 도입하면서 기존의 `max-w-xs sm:max-w-sm lg:max-w-3xl`과 `lg:flex-row`(가로 레이아웃 전환)는 제거했다. 그리드 컬럼이 너비를 결정하므로 카드 자체의 `max-width`는 불필요해지고, 여러 카드가 나란히 있는 상황에서 카드 하나를 가로로 펼치는 것도 어색하기 때문이다.

---

### 모바일/데스크탑 레이아웃 다르게 구성

반응형은 `sm:`(640px 이상)과 `lg:`(1024px 이상) **두 단계**만 사용했다.

| 항목 | 기본 (모바일) | `sm:` 640px+ | `lg:` 1024px+ |
|---|---|---|---|
| 그리드 컬럼 | 1열 | 2열 | 3열 |
| 프로필 이미지 | `w-20 h-20` | `w-24 h-24` | — |
| 이름 폰트 | `text-xl` | `text-2xl` | — |
| 본문 폰트 | `text-xs` | `text-sm` | — |
| 페이지 패딩 | `p-4` | `p-6` | `p-10` |

`md:`와 `xl:`은 처음에 추가했다가 제거했다. 브레이크포인트가 많을수록 각 요소마다 클래스 개수가 급격히 늘어나고, 실제 변화가 미미한 단계는 오히려 코드를 읽기 어렵게 만든다.

---

## 5. 비교 및 회고

### 1) BEM 방식으로 다시 설계

동일한 카드 UI를 BEM + 순수 CSS로 다시 구현했다(`index-bem.html`). HTML 구조는 그대로 유지하되, Tailwind 유틸리티 클래스 대신 BEM 클래스명을 붙이고 모든 스타일을 `<style>` 블록에 분리해 작성했다.

**BEM 클래스 구조**

```
card                      ← Block  : 카드 전체
  card__body              ← Element: 콘텐츠 패널
  card__intro             ← Element: 인사말 문구

profile                   ← Block  : 프로필 헤더
  profile__avatar         ← Element: 이미지 컨테이너 (figure)
  profile__img            ← Element: img
  profile__info           ← Element: 이름 + 태그라인 wrapper
  profile__name           ← Element: h1
  profile__tagline        ← Element: p

skills                    ← Block  : 스킬 섹션
  skills__title           ← Element: h2
  skills__list            ← Element: ul

badge                     ← Block  : 스킬 뱃지 (독립 재사용 단위)

card-footer               ← Block  : 하단 버튼 영역
links                     ← Block  : 버튼 네비게이션
  links__btn              ← Element: 버튼 공통 스타일
  links__btn--primary     ← Modifier: 진한 배경 (GitHub)
  links__btn--outline     ← Modifier: 테두리형 (Email)
```

다크모드는 `@media (prefers-color-scheme: dark)` 안에서 CSS 커스텀 프로퍼티(`:root {}`)를 오버라이드하는 방식으로 구현했다. 모든 색상을 `var(--변수명)` 으로 추상화했기 때문에, 미디어 쿼리 안에서 **변수 값만 바꾸면** 스타일 규칙은 전혀 건드리지 않아도 된다.

```css
/* 라이트 모드 */
:root {
  --card-bg:   #ffffff;
  --text-name: #111827;
  /* ... */
}

/* 다크 모드 — 값만 교체, 규칙 재작성 없음 */
@media (prefers-color-scheme: dark) {
  :root {
    --card-bg:   #1f2937;
    --text-name: #f9fafb;
    /* ... */
  }
}
```

---

### 2) Tailwind 사용 경험

**편했던 점**

- 스타일과 HTML이 분리되어 있지 않아, 현재 보는 태그에 어떤 스타일이 적용되어 있는지 바로 파악할 수 있다.
- 클래스 명을 따로 고민할 필요가 없다.

**불편했던 점**

- 구체적인 스타일을 지정하기 위해서는 클래스 나열이 매우 길어져서 HTML 코드의 구조를 파악하기가 힘들다.
- 같은 형식의 모든 태그에 같은 클래스를 넣어줘야 해서 재사용성이 떨어진다.

---

### 3) BEM vs. Tailwind — 직접 비교

같은 카드를 두 가지 방법으로 구현하고 나서 느낀 실질적인 차이를 정리했다.

**① HTML 가독성**

BEM의 HTML은 클래스명이 짧고 의미가 명확해서 구조를 한눈에 읽을 수 있다. Tailwind의 HTML은 한 태그에 클래스가 10개 이상 붙는 경우가 흔해서, 구조를 파악하려면 클래스 목록을 걷어내고 태그 자체를 봐야 한다.

```html
<!-- BEM: 구조가 먼저 눈에 들어온다 -->
<figure class="profile__avatar">
  <img class="profile__img" src="...">
</figure>

<!-- Tailwind: 스타일이 구조보다 먼저 눈에 들어온다 -->
<figure class="mb-3 sm:mb-4 group w-20 h-20 sm:w-24 sm:h-24
               rounded-full overflow-hidden ring-4 ring-indigo-200 dark:ring-indigo-800 ...">
  <img class="w-full h-full object-cover transition-transform duration-300
              group-hover:scale-110" src="...">
</figure>
```

**② CSS 관리**

Tailwind는 CSS를 거의 작성하지 않는다. 반면 BEM은 모든 스타일을 직접 작성해야 하므로 코드량이 많다. 그러나 BEM은 스타일이 한 곳에 모여 있어서 전체 색상 팔레트나 간격 체계를 바꿀 때 CSS 커스텀 프로퍼티 값 하나만 수정하면 된다. Tailwind에서 같은 작업을 하려면 해당 클래스가 쓰인 모든 태그를 일일이 찾아 수정해야 한다.

**③ 다크모드 구현 난이도**

| | Tailwind | BEM |
|---|---|---|
| 방식 | `dark:` 접두사를 모든 요소에 추가 | CSS 변수 값만 오버라이드 |
| 코드 위치 | HTML 각 태그마다 분산 | CSS `:root` 한 곳에 집중 |
| 새 색상 추가 시 | 해당 태그에 `dark:` 클래스 추가 | 변수 선언 한 줄 추가 |

다크모드만 놓고 보면 CSS 커스텀 프로퍼티를 활용한 BEM 방식이 훨씬 체계적이었다. Tailwind는 스킬 뱃지 하나를 다크모드로 만들기 위해 `dark:bg-indigo-900 dark:text-indigo-300`을 뱃지마다 반복해서 붙여야 했다.

**④ 반응형**

Tailwind의 `sm:` `lg:` 접두사는 미디어 쿼리를 완전히 인라인화한다. 어떤 브레이크포인트에서 어떤 값이 적용되는지 태그 한 줄로 파악할 수 있다는 점은 장점이다. BEM은 별도 `@media` 블록을 작성해야 하지만, 반응형 변경 사항이 CSS 파일에 모여 있어서 "이 브레이크포인트에서 뭐가 달라지는가"를 한 곳에서 볼 수 있다.

**⑤ 유지보수 측면 비교**

| 비교 항목 | BEM | Tailwind |
|---|---|---|
| 스타일 수정 위치 | CSS 파일을 열어서 수정 | HTML / 컴포넌트 파일에서 수정 |
| 의존성 | 구조와 CSS 이름이 강하게 결합됨 | 스타일이 클래스 자체에 고립되어 결합도가 낮음 |
| 확장성 | 새로운 요소 추가 시 새 클래스 이름 필요 | 기존 클래스 조합만으로 거의 모든 UI 대응 가능 |
| 파일 크기 | 프로젝트가 커질수록 CSS 파일도 커짐 | CSS 크기는 일정 수준에서 멈추지만 HTML 파일 크기가 증가 |

**⑥ 결론**

두 방식 모두 "CSS를 무작정 작성했을 때"의 문제(충돌, 중복, 유지보수 어려움)를 해결하지만, 접근 방향이 정반대다.

- **BEM** — *"CSS를 잘 조직화"* 하는 방식. HTML은 가볍게, 스타일은 CSS에 집중한다.
- **Tailwind** — *"CSS를 쓰지 않는"* 방식. 스타일을 HTML에 직접 조립해서 CSS 파일 자체를 최소화한다.

React처럼 컴포넌트가 이미 재사용 단위를 보장하는 환경에서는 **Tailwind**가 더 잘 맞고, 컴포넌트 시스템 없이 HTML/CSS만 다루는 환경이나 디자인 토큰을 중앙에서 관리해야 하는 프로젝트에서는 **BEM + CSS 커스텀 프로퍼티** 조합이 유리하다고 느꼈다.
