// 비동기 통신 실패 시 "에러" 상태를 보여주는 컴포넌트.
// onRetry 를 넘기면 "다시 시도" 버튼이 나타난다.
function ErrorMessage({ message = '문제가 발생했습니다.', onRetry }) {
  return (
    <div className="status error">
      <p>⚠️ {message}</p>
      <p className="status-hint">
        JSON Server 가 켜져 있는지 확인하세요. (<code>npm run server</code>)
      </p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          다시 시도
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
