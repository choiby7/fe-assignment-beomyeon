/* eslint-disable react-hooks/refs --
 * 보통은 렌더링 중에 ref(.current)를 읽거나 바꾸지 않는 게 권장된다.
 * 이 컴포넌트는 바로 그 "렌더와 무관함"(값이 바뀌어도 화면이 안 바뀜)을
 * 눈으로 보여주려는 의도라서, 이 파일에서만 해당 규칙을 끈다.
 */
import { useState, useRef } from 'react'

/**
 * useState vs useRef 의 핵심 차이 = "값이 바뀔 때 리렌더링이 일어나는가?"
 *
 *  - stateCount : useState  → 값을 바꾸면 컴포넌트가 다시 그려진다(화면 갱신 O)
 *  - refCount   : useRef    → 값을 바꿔도 리렌더링이 안 된다(화면 갱신 X)
 *
 * renderCount(useRef)로 "이 컴포넌트가 실제로 몇 번 그려졌는지"를 센다.
 * 리렌더링 자체를 유발하지 않으므로 카운터로 쓰기에 딱 좋다.
 */
function StateVsRef() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)

  // 렌더링이 일어날 때마다 1 증가 (리렌더 유발 X)
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div className="demo-body">
      <p className="render-badge">렌더링 횟수: {renderCount.current}</p>

      <div className="compare">
        <div className="compare-col">
          <h4>useState</h4>
          <p className="big-num">{stateCount}</p>
          <button onClick={() => setStateCount((c) => c + 1)}>
            state +1
          </button>
          <p className="note">버튼을 누르면 값이 바뀌고 → 화면이 즉시 갱신</p>
        </div>

        <div className="compare-col">
          <h4>useRef</h4>
          {/* ref.current 는 화면에 자동 반영되지 않는다 */}
          <p className="big-num">{refCount.current}</p>
          <button onClick={() => (refCount.current += 1)}>
            ref +1
          </button>
          <p className="note">
            값은 올라가지만 화면은 그대로. <br />
            state 버튼으로 리렌더되는 순간 그제야 반영됨
          </p>
        </div>
      </div>
    </div>
  )
}

export default StateVsRef
