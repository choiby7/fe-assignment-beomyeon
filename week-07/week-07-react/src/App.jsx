import StateVsRef from './components/StateVsRef'
import FocusInput from './components/FocusInput'
import Stopwatch from './components/Stopwatch'
import EffectDeps from './components/EffectDeps'
import './App.css'

const demos = [
  {
    badge: '1',
    title: 'useState vs useRef — 리렌더링의 차이',
    description:
      'state 는 값이 바뀌면 화면을 다시 그리고, ref 는 값이 바뀌어도 다시 그리지 않는다.',
    Component: StateVsRef,
  },
  {
    badge: '2',
    title: 'useRef - DOM 요소에 직접 접근',
    description:
      'ref 를 DOM 에 연결하면 .focus() 같은 DOM API 를 코드로 직접 호출할 수 있다.',
    Component: FocusInput,
  },
  {
    badge: '3',
    title: 'useEffect -의존성 배열',
    description:
      'effect 가 언제 다시 실행될지는 두 번째 인자(의존성 배열)가 결정한다.',
    Component: EffectDeps,
  },
  {
    badge: '4',
    title: '세 훅 한 번에 - 스톱워치',
    description:
      'state(표시값) + ref(타이머 id) + effect(타이머 등록/정리)를 모두 사용한다.',
    Component: Stopwatch,
  },
]

function App() {
  return (
    <div className="app">


      <main className="app-main">
        <div className="hint">
          <strong>useState</strong> = 화면에 보여줄 값(바뀌면 리렌더),{' '}
          <strong>useRef</strong> = 리렌더 없이 유지할 값 / DOM 참조,{' '}
          <strong>useEffect</strong> = 렌더 이후 실행되는 부수효과(타이머·구독).
        </div>

        {demos.map((demo) => {
          const { Component } = demo
          return (
            <section className="demo-section" key={demo.badge}>
              <header className="demo-header">
                <span className="demo-badge">{demo.badge}</span>
                <div>
                  <h2 className="demo-title">{demo.title}</h2>
                  <p className="demo-desc">{demo.description}</p>
                </div>
              </header>
              <Component />
            </section>
          )
        })}
      </main>

      <footer className="app-footer">
        React Hooks (useState · useRef · useEffect) · #LikeLion FE Week 07
      </footer>
    </div>
  )
}

export default App
