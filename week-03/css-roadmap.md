# [CSS 마스터 로드맵: 기초부터 심화까지]

1. CSS 기초 (Fundamentals)
•	1.1 CSS 개요: CSS의 역할과 HTML 문서에 적용하는 3가지 방법 (Inline, Internal, External)
•	1.2 기본 문법: 선택자(Selector), 속성(Property), 값(Value)의 구조
•	1.3 기본 선택자: 전체(*), 태그, 클래스(.), 아이디(#) 선택자
•	1.4 타이포그래피: 폰트 종류, 크기, 굵기, 행간, 텍스트 정렬 (font-family, font-size, line-height 등)
•	1.5 ⭐️ 박스 모델 (Box Model): 웹 디자인의 뼈대 (content, padding, border, margin, box-sizing)
•	1.6 색상과 배경: 색상 표현법(HEX, RGB, HSL)과 배경 이미지 제어 (background)
2. CSS 중급 (Intermediate)
•	2.1 ⭐️ 캐스케이딩과 명시도: 스타일 적용 우선순위(Specificity)와 상속(Inheritance)의 원리
•	2.2 결합자 (Combinators): 자손( ), 자식(>), 인접 형제(+), 일반 형제(~) 선택자
•	2.3 가상 클래스 (Pseudo-classes): 요소의 상태에 따른 스타일 (:hover, :focus, :active, :nth-child 등)
•	2.4 ⭐️ 가상 요소 (Pseudo-elements): HTML 없이 내용 추가하기 (::before, ::after)
•	2.5 ⭐️ 포지셔닝 (Positioning): 요소의 위치 제어 (static, relative, absolute, fixed, sticky, z-index)
•	2.6 크기 단위 (Units): 절대 단위(px)와 상대 단위(em, rem, %, vw, vh)의 이해와 활용
•	2.7 플로트 (Float & Clear): 전통적인 레이아웃 방식과 해제 기법 (현재는 주로 이미지 주변 텍스트 흐름에 사용)
3. 모던 레이아웃 (Modern Layout)
•	3.1 ⭐️ Flexbox (1차원 레이아웃):
•	Flex Container 속성 (display: flex, justify-content, align-items, flex-wrap)
•	Flex Item 속성 (flex-grow, flex-shrink, flex-basis)
•	3.2 ⭐️ CSS Grid (2차원 레이아웃):
•	Grid Container 설정 (display: grid, grid-template-columns, gap)
•	Grid 영역 배치 (grid-area, minmax(), repeat())
•	3.3 반응형 웹 (Responsive Web Design):
•	뷰포트(Viewport) 메타 태그
•	미디어 쿼리 (@media) 작성법
•	모바일 퍼스트(Mobile-first) vs 데스크톱 퍼스트 전략
4. 동적 스타일링 및 응용 (Interaction & Application)
•	4.1 ⭐️ 변형 (Transform): 요소의 형태 변화 (translate, scale, rotate, skew 및 3D 변형)
•	4.2 전환 (Transition): 상태 변화를 부드럽게 만드는 애니메이션 효과 (transition-property, duration, timing-function)
•	4.3 ⭐️ 키프레임 애니메이션 (Animation): @keyframes를 활용한 다단계/무한반복 애니메이션 제어
•	4.4 시각적 효과 (Visual Effects): 그림자(box-shadow, text-shadow), 필터(filter, backdrop-filter), 불투명도(opacity)
•	4.5 사용자 정의 속성 (CSS Variables): --변수명을 활용한 테마(다크모드 등) 및 재사용성 관리
5. 심화 및 아키텍처 (Advanced & Architecture)
•	5.1 CSS 방법론: 유지보수성을 높이는 클래스 명명 규칙 (BEM, OOCSS, SMACSS)
•	5.2 ⭐️ CSS 전처리기 (Sass / SCSS): 변수, 중첩(Nesting), 믹스인(Mixin), 함수(Function)를 활용한 프로그래밍적 CSS 작성
•	5.3 모던 CSS 생태계 이해:
•	Utility-first 프레임워크 (Tailwind CSS)
•	CSS-in-JS (Styled-components, Emotion)
•	CSS Modules
•	5.4 웹 성능 최적화: 브라우저 렌더링 과정 이해 (Reflow & Repaint 방지), 폰트 로딩 최적화
•	5.5 최신 CSS 스펙 (Modern CSS Features):
•	컨테이너 쿼리 (Container Queries: @container)
•	부모 선택자 (:has())
•	캐스케이드 레이어 (@layer)
•	네이티브 CSS 중첩 (Native CSS Nesting)