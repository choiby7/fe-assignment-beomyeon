/**
 * 콘솔 출력을 다크 테마 패널 형태로 렌더링하는 프레젠테이션 컴포넌트.
 * @param {{ logs: string[] }} props
 */
function ConsoleOutput({ logs }) {
  if (!logs || logs.length === 0) {
    return <pre className="console-output empty">(출력 없음)</pre>
  }

  return (
    <pre className="console-output">
      {logs.map((line, i) => (
        <div key={i} className="log-line">
          {line}
        </div>
      ))}
    </pre>
  )
}

export default ConsoleOutput
