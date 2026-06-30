import { useRef } from 'react'

/**
 * useRef 의 또 다른 용도 = "DOM 요소에 직접 접근하기"
 *
 * <input ref={inputRef} /> 로 연결하면
 * inputRef.current 가 실제 DOM 노드를 가리킨다.
 * → .focus(), .value 등 DOM API 를 직접 호출할 수 있다.
 *
 * useState 로는 DOM 요소 자체를 잡을 수 없다. (값만 다룸)
 */
function FocusInput() {
  const inputRef = useRef(null)

  const handleFocus = () => {
    inputRef.current.focus() // 실제 DOM 메서드 호출
    inputRef.current.value = '' // 입력값 비우기
  }

  return (
    <div className="demo-body">
      <input
        ref={inputRef}
        type="text"
        placeholder="여기를 클릭하지 않아도..."
        className="text-input"
      />
      <button onClick={handleFocus}>버튼으로 input 포커스 주기</button>
      <p className="note">
        버튼을 누르면 코드가 직접 input 에 커서를 옮긴다. (DOM 직접 제어)
      </p>
    </div>
  )
}

export default FocusInput
