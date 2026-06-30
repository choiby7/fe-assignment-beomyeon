import { useState, useEffect, useRef } from 'react'

/**
 * useEffect 의 두 번째 인자 = "의존성 배열(dependency array)"
 * 이 배열이 "언제 effect 를 다시 실행할지"를 결정한다.
 *
 *   useEffect(fn)          → 매 렌더링마다 실행 (배열 없음)
 *   useEffect(fn, [])      → 마운트(첫 등장) 때 딱 1번만
 *   useEffect(fn, [count]) → count 가 바뀔 때마다 실행
 *
 * 아래 화면 로그로 각 effect 가 언제 찍히는지 눈으로 확인할 수 있다.
 * (StrictMode 개발 모드에서는 effect 가 일부러 2번 실행될 수 있음)
 */
function EffectDeps() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)
  const [logs, setLogs] = useState([])
  const idRef = useRef(0)

  const addLog = (msg) => {
    idRef.current += 1
    setLogs((prev) => [`#${idRef.current} ${msg}`, ...prev].slice(0, 8))
  }

  // ① 마운트 시 1번만 — 데이터 불러오기, 구독 등록 등에 사용
  useEffect(() => {
    addLog('[]  마운트 1회만 실행')
  }, [])

  // ② count 가 바뀔 때만
  useEffect(() => {
    addLog(`[count]  count = ${count} 로 변경됨`)
  }, [count])

  return (
    <div className="demo-body">
      <div className="btn-row">
        <button onClick={() => setCount((c) => c + 1)}>count +1 ({count})</button>
        <button onClick={() => setOther((o) => o + 1)}>
          other +1 ({other})
        </button>
      </div>
      <p className="note">
        <code>count</code> 버튼 → <code>[count]</code> effect 실행 /{' '}
        <code>other</code> 버튼 → 의존성에 없으므로 effect 실행 안 됨
      </p>
      <div className="log-box">
        {logs.length === 0 ? (
          <span className="empty">아직 로그 없음</span>
        ) : (
          logs.map((line, i) => (
            <div key={i} className="log-line">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EffectDeps
