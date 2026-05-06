# CSS 학습 로드맵: 기초 ~ 심화

---

## 1. 기초 단계 (Fundamentals)
웹의 스타일링을 시작하기 위한 가장 필수적인 기본 개념들입니다.

### 1.1 기본 구조 및 문법
- **CSS 개요:** CSS의 역할과 HTML과의 관계.
- **적용 방법:** External(외부), Internal(내부), Inline(인라인) 방식의 차이.
- **기본 문법:** 선택자(Selector), 속성(Property), 값(Value)의 구성.

### 1.2 선택자 (Selectors)
- **기본 선택자:** 전체(`*`), 태그, 클래스(`.`), 아이디(`#`).
- **속성 선택자:** 특정 속성을 가진 요소 선택.

### 1.3 텍스트 스타일링 (Typography)
- **폰트 제어:** `font-family`, `font-size`, `font-weight`, `line-height`.
- **텍스트 제어:** `color`, `text-align`, `text-decoration`, `text-transform`.
- **웹 폰트:** Google Fonts 등을 활용한 외부 폰트 적용법.

### 1.4 박스 모델 (The Box Model)
- **구성 요소:** Content, Padding, Border, Margin.
- **박스 사이징:** `box-sizing: content-box` vs `border-box`.
- **블록(Block) vs 인라인(Inline):** 요소의 흐름과 표시 방식의 이해.

---

## 2. 중간 단계 (Intermediate)
요소의 배치와 스타일링의 우선순위를 결정하는 정교한 규칙들을 학습합니다.

### 2.1 스타일 적용 규칙
- **캐스케이딩(Cascading):** 스타일이 겹칠 때 적용되는 순서.
- **명시도(Specificity):** 점수 계산법을 통한 우선순위 결정.
- **상속(Inheritance):** 부모 요소의 스타일이 자식에게 전달되는 원리.

### 2.2 결합자 및 가상 요소 (Advanced Selectors)
- **결합자:** 자손(공백), 자식(`>`), 인접 형제(`+`), 일반 형제(`~`).
- **가상 클래스(Pseudo-classes):** `:hover`, `:focus`, `:nth-child()`, `:not()`.
- **가상 요소(Pseudo-elements):** `::before`, `::after`를 활용한 장식 요소 추가.

### 2.3 배치와 포지셔닝 (Positioning)
- **포지션 속성:** `static`, `relative`, `absolute`, `fixed`, `sticky`.
- **층 쌓기:** `z-index`와 쌓임 맥락(Stacking Context).
- **부유 요소:** `float`와 이를 해제하는 `clear` 기법.

### 2.4 반응형 단위 (Units)
- **절대 단위:** `px`.
- **상대 단위:** `em`, `rem`, `%`, `vw`, `vh`, `vmin`, `vmax`.

---

## 3. 모던 레이아웃 (Modern Layout Systems)
현재 웹 개발에서 가장 많이 쓰이는 강력한 레이아웃 설계 방식입니다.

### 3.1 Flexbox (1차원 레이아웃)
- **컨테이너 속성:** `display: flex`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`.
- **아이템 속성:** `flex-grow`, `flex-shrink`, `flex-basis`, `align-self`.

### 3.2 CSS Grid (2차원 레이아웃)
- **그리드 구조:** `grid-template-columns`, `grid-template-rows`, `gap`.
- **영역 배치:** `grid-column`, `grid-row`, `grid-template-areas`.
- **함수 활용:** `repeat()`, `minmax()`, `fit-content()`.

### 3.3 반응형 디자인 (Responsive Design)
- **미디어 쿼리(Media Queries):** `@media`를 이용한 중단점(Breakpoint) 설정.
- **뷰포트(Viewport):** 모바일 기기 대응을 위한 메타 태그.
- **유연한 이미지:** `max-width: 100%`, `object-fit`.

---

## 4. 응용 및 비주얼 효과 (Visuals & Interactions)
사용자 경험을 풍부하게 만드는 동적 효과와 고급 스타일링입니다.

### 4.1 변형 및 애니메이션
- **Transform:** `translate`, `rotate`, `scale`, `skew`.
- **Transition:** 상태 변화 시 부드러운 전환 효과(`duration`, `timing-function`).
- **Animation:** `@keyframes`를 이용한 복잡한 움직임 구현.

### 4.2 고급 비주얼 효과
- **배경 심화:** `background-gradient`, `background-size: cover`, `parallax`.
- **그림자 및 투명도:** `box-shadow`, `text-shadow`, `opacity`, `rgba`.
- **필터:** `filter: blur()`, `backdrop-filter`.

### 4.3 CSS 변수 (Custom Properties)
- **변수 선언:** `--main-color: #333;`.
- **변수 사용:** `color: var(--main-color);`.
- **테마 관리:** 다크모드/라이트모드 효율적 구현.

---

## 5. 심화 및 아키텍처 (Advanced & Professional)
대규모 프로젝트의 유지보수와 성능 최적화를 위한 지식입니다.

### 5.1 CSS 방법론 및 구조화
- **명명 규칙:** BEM (Block Element Modifier), OOCSS, SMACSS.
- **파일 구조:** 프로젝트 규모에 따른 CSS 파일 분할 및 관리.

### 5.2 전처리기 (Preprocessors)
- **Sass / SCSS:** 변수(Variables), 중첩(Nesting), 믹스인(Mixins), 함수(Functions), 상속(`@extend`).

### 5.3 모던 생태계 및 라이브러리
- **Tailwind CSS:** Utility-first 방식의 이해.
- **CSS-in-JS:** Styled-components, Emotion 등 React 환경에서의 활용.
- **CSS Modules:** 클래스명 충돌 방지 기법.

### 5.4 성능 및 최적화
- **브라우저 렌더링:** Reflow(리플로우)와 Repaint(리페인트)의 이해.
- **Critical CSS:** 초기 렌더링 속도 향상을 위한 핵심 CSS 추출.
- **최신 스펙:** Container Queries, `:has()` 선택자, `@layer` (Cascade Layers).