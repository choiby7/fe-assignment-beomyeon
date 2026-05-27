import { useMemo } from 'react'
import { captureLogs } from '../demos'
import ConsoleOutput from './ConsoleOutput'

/**
 * 함수 종류 데모 한 섹션을 렌더링한다.
 * `run` 함수의 console.log 출력을 캡처해 패널에 표시.
 * @param {{ badge: string, title: string, description: string, run: () => void }} props
 */
function DemoSection({ badge, title, description, run }) {
  // run 은 컴포넌트 라이프타임 동안 동일한 함수 참조이므로 useMemo 로 1회만 실행.
  const logs = useMemo(() => captureLogs(run), [run])

  return (
    <section className="demo-section">
      <header className="demo-header">
        <span className="demo-badge">{badge}</span>
        <h2 className="demo-title">{title}</h2>
      </header>
      <p className="demo-description">{description}</p>
      <ConsoleOutput logs={logs} />
    </section>
  )
}

export default DemoSection
