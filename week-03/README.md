# 0. 문제인식

```
.box1 {}
.box2 {}
.red-text {}
.big-text {}
```

```
<div class="box1">
<p class="red-text big-text">안녕하세요</p>
</div>
```

Q. 아래 질문에 답하시오.
1. 클래스 이름만 보고 역할을 명확하게 알 수 있는가?
> 알기 힘들다. .red-text나 .big-text는 텍스트가 어떻게 보이는지에 대한 시각적인 정보만 알려줄 뿐, 어떤 역할을 하는지는 알 수 없는 이름이다.
2. 스타일 충돌(겹침)이 발생할 가능성은 없는가?
> 충돌할 가능성이 매우 높다. .box1이나 .red-text라는 이름을 동일하게 쓰고 다른 스타일은 적용한다면, 기존에 작성한 스타일이 덮어씌워지는 충돌이 발생하기 쉽다.
3. 프로젝트가 커졌을 때 유지보수는 쉬울까?
> 매우 어렵다. .box1이 프로젝트에서 얼마나 많이 쓰이고 있는지 알기 힘들다. 그리고 .box1라는 디자인을 변경하였을 때, 실제로 어느부분이 수정되는지 알기 힘들다.
4. 이런 방식이 실무에서 문제가 되는 이유
> 이런 방식은 위와 같이 기존의 디자인을 새롭게 변경할 때 힘들다. 만약 기획이나 디자인이 변경되어 .red-text을 모두 orange 색상으로 변경하고자 하면 .red-text의 코드를 바꿔야 하는데, 그러면 .red-text인데 orange 색상인 모순이 발생한다. 반대로 새로운 클래스 .orange-text를 만들어서 각 클래스를 변경하게 되면, 기존 .red-text가 쓰레기 값이 되어 남아있을 수도 있다.
스타일 충돌을 겪다보면 이를 강제로 덮어씌우기 위해 id, classname을 붙여서 선택자를 길게 쓰거나 최악의 경우 !important를 남발하게 된다. 이는 코드의 예측 가능성을 파괴한다.

# 1. 조사 및 정리

1) CSS를 무작정 작성했을 때 생기는 문제
- 중복: 어떤 클래스에 어떤 스타일이 정의되어있는지 명확한 파악이 힘들기 때문에, 같은 기능의 스타일이 중복되어 정의될 수 있다.
- 스타일 충돌: 모든 클래스 이름이 전역 공간을 공유하므로, 다른 파일이나 페이지에서 동일한 클래스명을 사용하면 나중에 선언된 스타일이 기존 스타일을 덮어씌워 예상하던 UI와 다른 결과가 나타날 수 있다.
- 유지보수 어려움: 특정 클래스를 수정했을 때 앱의 어느 부분이 변경, 파괴될지 확신할 수 없다. 이를 해결하기 위해서 새로운 클래스를 계속 밑에 추가하는 방식을 택하게 되고, CSS 파일의 용량은 무한정 커지게 된다.
- 컨텍스트 스위칭: HTML파일과 CSS 파일을 끊임없이 전환하며 작업해야 하므로, 개발 피로도가 높아지고, 생산이 일 떨어진다.

2) BEM이란 무엇인가?
BEM(Block, Element, Modifier)은 위와 같은 CSS의 네이밍 문제를 해결하기 위해 Yandex에서 고안한 CSS 네이밍 컨벤션이다. 클래스 이름을 구조적으로 작성하여 이름만 보고도 해당 요소의 역할과 종속성을 파악할 수 있게 해준다. 

- Block: 재사용 가능한 독립적인 컴포넌트 단위이다.
- Element: 블록에 종속된 하위 요소이다. 블록 외부에서는 의미를 가지지 않는다. 클래스 명에 밑줄 2개(__)를 사용하여 연결한다. (ex menu__item, button__icon)
- Modifier: 블록이나 엘리먼트 '상태'나 '외형'의 변화를 나타낸다. 하이픈 두 개(--)를 사용하여 연결한다.(ex: button--primary, menu__item--active)

BEM 작성 예시
```
<form class="search-form search-form--focused"> 
  <input class="search-form__input" type="text" />
  
  <button class="search-form__button search-form__button--disabled">
    검색
  </button>
</form>
```

BEM의 장점: 이름 자체가 스코프의 역할을 하므로 CSS 클래스 충돌이 거의 사라지며, HTML의 구성만 봐도 컴포넌트의 구조와 상태를 직관적으로 파악할 수 있다.

3) Tailwind CSS는 어떤 방식인가
Tailwind CSS는 의미론적인 이름(Semantic Naming)을 짓는 것 자체를 포기하고, 미리 정의된 단일 목적의 유틸리티 클래스들을 조합하여 스타일을 구성하는 'Utility-First' 프레임워크이다.

과거에는 "클래스명은 디자인이 아닌 의미를 담아야 한다."는 원칙이 지배적이었으나, Tailwind는 발상을 전환하여 'display: flex'는 flex로, 'padding-top: 1rem'은 pt-4로, 색상은 text-blue-500 처럼 원자 단위로 클래스를 제공한다.

TailwindCSS 예시 
```
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="text-xl font-medium text-black">경고 메시지</div>
  <p class="text-red-500 text-sm">데이터를 불러오는 데 실패했습니다.</p>
</div>
```

TailwindCSS의 장단점 및 특징
- 이름 짓기 스트레스 해방
- 컨텍스트 스위칭 제로
- 스타일 충돌 원천 차단
- 단점
    - 클래스의 이름이 매우 길어지기 때문에 초기에는 HTML 코드가 지저분해보일 수 있다.
    - 다만 이를 컴포넌트로 분리하여 재사용하는 방식으로 극복 가능하다.


## BEM vs. Tailwind CSS

1. 관심사의 분리(BEM) vs. 행동의 지역성 (Tailwind)
- BEM: HTML은 뼈대(구조)만 잡고, CSS 파일에 모든 디자인 로직을 몰아 넣기.
- Tailwind CSS (행동의 지역성): 어차피 UI를 수정하려면 HTML과 CSS를 같이 봐야하니, HTML 태그 바로 옆에 스타일(유틸리트 클래스)을 적어두는 것이 컨텍스트 스위칭을 줄이고 훨씬 직관적이다.

2. 네이밍의 기준: "무엇인가?" vs. "어떻게 보이는가?"
- BEM(의미론적 네이밍): 클래스 이름은 요소의 **의미와 역할**을 설명해야 한다. 형태가 바뀌어도 역할이 같다면 클래스 명은 유지된다. (.profile-card__submit-btn)
- Tailwind CSS(시각적 네이밍): 클래스 이름은 요소의 **시각적 형태**를 그대로 설명한다. 의미보다는 당장 눈에 어떻게 보이는지가 중요하다. (bg-blue-500 text-white rounded)

3. 비대해지는 위치: CSS vs. HTML
- BEM: HTML의 코드 자체는 깔끔하게 유지되지만, CSS 파일은 컴포넌트가 점점 방대해지고 복잡해진다.
- Tailwind CSS: CSS 파일은 거의 변하지 않고 가볍게 유지되지만, 반대로 HTML 코드가 유틸리트 클래스의 나열로 매우 길고 지저분해진다.

4. 현대 프론트엔드 환경에서의 시사점

과거 전통적인 웹 개발 환경에서는 BEM 같은 시맨틱 네이밍이 정답으로 여겨졌으나, 현대 React와 같은 컴포넌트 기반 UI 개발이 표준이 되면서 패러다임이 크게 바뀌었다.

React환경에서 개발을 진행하다보면, 이미 JSX 안에 HTML과 JS가 한 덩어리로 뭉쳐있게 된다. 컴포넌트 파일 자체가 이미 의미와 역할을 분리하는 훌륭한 캡슐화 도구이기 때문에, 굳이 BEM처럼 CSS 클래스명에까지 중복해서 의므를 부여할 필요성이 줄어든 것이다.

따라서 태그에 바로 스타일을 바로 조립해 넣는 Tailwind CSS의 방식이 컴포넌트의 재사용성과 시너지가 좋기 때문에 최근 트렌드가 된 것이다.

# 2. UI 구조 설계

제 자기소개 카드 설계는 다음과 같습니다.

```
카드 
- 프로필 이미지 영역
- 텍스트 영역
    - 이름
    - 한 줄 소개
    - 연락처
- 상태 메시지
- 기술 태그 영역
    - 메인 기술 : 가장 자신 있는 것.
    - Tooling/Env : 사용가능한 생산성 툴
    - Base: 기본기
- 버튼 영역: 깃허브 링크 버튼, 블로그 버튼
```

# 3. 구현 (Tailwind CSS)

자기소개 카드를 Tailwind CSS 유틸리티 클래스만으로 구현했다. 별도의 CSS 파일 없이 HTML 태그에 클래스를 직접 조합하는 방식이다.

**HTML 시맨틱 구조**

```
article.card          ← 카드 전체 (article 태그로 독립 콘텐츠 표현)
  header              ← 프로필 이미지 + 이름 + 한 줄 소개
    figure            ← 프로필 이미지 컨테이너 (원형 마스크)
      img
    div
      h1              ← 이름
      p               ← 한 줄 소개
  div.card__body      ← 우측 콘텐츠 영역
    p                 ← 인사말
    section           ← 스킬 태그 영역
      h2
      ul > li > span  ← 스킬 뱃지
    footer            ← 버튼 영역
      nav
        a             ← GitHub 링크
        button        ← Email
```

**주요 구현 결정**

Tailwind를 처음 쓰다 보니 클래스 목록이 한 요소에 10개를 넘어가는 경우가 많았다. 이 자체가 "HTML이 비대해진다"는 Tailwind의 단점을 직접 체감하는 순간이었다. 반면 CSS 파일을 열 필요가 전혀 없었고, 어떤 스타일이 적용될지 태그만 보고 즉시 예측할 수 있다는 점은 확실히 편했다.

프로필 이미지의 원형 클리핑은 `figure`에 `rounded-full overflow-hidden`을 두고, `img`에 `w-full h-full object-cover`를 적용하는 방식으로 처리했다. `rounded-full`을 `img`에 직접 두면 outline(ring)과 overflow가 맞지 않는 문제가 있어서 부모 요소에서 마스킹하는 방법을 선택했다.

# 4. 추가 도전

## transition / animation

페이지 로드 시 카드 전체에 아래에서 위로 올라오는 `fadeInUp` 애니메이션을 적용했다. Tailwind CDN에서는 커스텀 keyframe을 `animate-[fadeInUp_0.5s_ease-out]` 형태의 임의값(arbitrary value) 문법으로 사용할 수 있다. `<style>` 블록에 `@keyframes fadeInUp`을 정의하고 Tailwind 클래스에서 참조하는 방식이다.

hover 인터랙션은 다음 요소에 적용했다.

| 요소 | 효과 |
|---|---|
| 카드 전체 | `hover:shadow-2xl` — 그림자 강화 |
| 프로필 이미지 | `group-hover:scale-110` — 확대, `hover:ring-indigo-400` — 링 색상 강조 |
| 스킬 뱃지 | `hover:-translate-y-1 hover:bg-indigo-600 hover:text-white` — 위로 튀어오르며 색상 반전 |
| 버튼 | `hover:scale-105 active:scale-95` — 확대/클릭 눌림 효과 |

`group` / `group-hover:`는 부모에 `group`을 붙이면 자식 요소에서 부모의 hover 상태를 감지할 수 있는 Tailwind 기능이다. 프로필 이미지 확대처럼 figure를 hover했을 때 내부 img를 변화시키는 데 활용했다.

## 다크모드 스타일 적용

Tailwind의 `dark:` 접두사를 사용하여 시스템 다크모드(`prefers-color-scheme: dark`)에 자동으로 대응했다. JS 없이 순수 CSS(미디어 쿼리) 기반으로 동작한다.

Tailwind CDN의 기본 `darkMode` 전략은 `'media'`(시스템 설정 감지)이므로 별도 설정 없이 `dark:` 클래스를 붙이는 것만으로 동작한다.

```html
<!-- 예시: 카드 배경 -->
<article class="bg-white dark:bg-gray-800 ...">

<!-- 예시: 스킬 뱃지 -->
<span class="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 ...">
```

## 카드 여러 개를 grid로 배치

`display: grid`에 해당하는 `grid` 클래스를 컨테이너에 적용하고, `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`으로 브레이크포인트별 컬럼 수를 지정했다.

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
  <article class="card">...</article>
  <article class="card">...</article>
  ...
</div>
```

그리드를 도입하면서 기존에 카드 단독으로 보여줄 때 사용했던 `max-w-xs sm:max-w-sm lg:max-w-3xl`과 `lg:flex-row`(가로 레이아웃 전환)는 제거했다. 그리드 컬럼이 너비를 결정하기 때문에 카드 자체의 `max-width`는 불필요해지고, 여러 카드가 나란히 있는 상황에서 카드 하나를 가로로 펼치는 것도 어색하기 때문이다.

## 모바일/데스크탑 레이아웃 다르게 구성

반응형은 `sm:`(640px 이상)과 `lg:`(1024px 이상) 두 단계만 사용했다.

| 항목 | 기본(모바일) | `sm:` | `lg:` |
|---|---|---|---|
| 그리드 컬럼 | 1열 | 2열 | 3열 |
| 프로필 이미지 | `w-20 h-20` | `w-24 h-24` | — |
| 이름 폰트 | `text-xl` | `text-2xl` | — |
| 본문 폰트 | `text-xs` | `text-sm` | — |
| 페이지 패딩 | `p-4` | `p-6` | `p-10` |

`md:`와 `xl:`은 처음에 추가했다가 "너무 많다"는 판단 하에 제거했다. 브레이크포인트가 많을수록 각 요소마다 클래스 개수가 급격히 늘어나고, 실제 변화가 미미한 단계는 오히려 코드를 읽기 어렵게 만든다는 것을 느꼈다.


# 5. 비교 및 회고

1) BEM 방식으로 다시 설계
