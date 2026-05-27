import DemoSection from './components/DemoSection'
import SummaryTable from './components/SummaryTable'
import { demos, summaryTable } from './demos'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>JavaScript 함수의 모든 종류</h1>
        <p className="subtitle">
          Mastering JavaScript Functional Programming · CH3 — 발표용 데모
        </p>
      </header>

      <main className="app-main">
        <div className="hint">
          💡 각 섹션은 React 컴포넌트로 렌더링되며, 데모 함수의{' '}
          <code>console.log</code> 출력을 캡처해 패널에 표시합니다. 데이터는{' '}
          <code>src/demos.js</code> 에 정의되어 있고, <code>DemoSection</code>{' '}
          컴포넌트가 각 항목을 순회하며 렌더링합니다.
        </div>

        <section className="demo-section">
          <header className="demo-header">
            <span className="demo-badge summary">📋</span>
            <h2 className="demo-title">요약: JS 함수의 9가지 종류</h2>
          </header>
          <SummaryTable rows={summaryTable} />
        </section>

        {demos.map((demo) => (
          <DemoSection
            key={demo.id}
            badge={demo.badge}
            title={demo.title}
            description={demo.description}
            run={demo.run}
          />
        ))}

      </main>

      <footer className="app-footer">
        JS Functions Demo · #LikeLion FE Week 06
      </footer>
    </div>
  )
}

export default App
