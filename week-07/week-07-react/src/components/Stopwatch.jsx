import { useState, useRef, useEffect } from 'react'

/**
 * 세 훅을 한 번에 쓰는 예제 = 스톱워치
 *
 *  - useState : seconds  → 화면에 보여줄 경과 시간(바뀌면 리렌더 필요하므로 state)
 *  - useRef   : timerId  → setInterval 의 id 보관(화면과 무관하므로 ref)
 *  - useEffect: running 이 바뀔 때 타이머를 켜고 끈다 + cleanup 으로 정리
 *
 * useEffect 의 cleanup(return 함수)이 없으면 타이머가 계속 쌓여 메모리 누수 발생.
 */
function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const timerId = useRef(null) // interval id 를 담아두는 그릇

  useEffect(() => {
    if (!running) return

    // running 이 true 가 되면 타이머 시작
    timerId.current = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    // cleanup: running 이 바뀌거나 컴포넌트가 사라질 때 타이머 정리
    return () => clearInterval(timerId.current)
  }, [running]) // 의존성 배열: running 이 바뀔 때만 effect 재실행

  return (
    <div className="demo-body">
      <p className="big-num">{seconds}s</p>
      <div className="btn-row">
        <button onClick={() => setRunning(true)} disabled={running}>
          시작
        </button>
        <button onClick={() => setRunning(false)} disabled={!running}>
          정지
        </button>
        <button
          onClick={() => {
            setRunning(false)
            setSeconds(0)
          }}
        >
          리셋
        </button>
      </div>
      <p className="note">
        시작 - useEffect 가 setInterval 등록 / 정지 - cleanup 이 clearInterval 호출
      </p>
    </div>
  )
}

export default Stopwatch
