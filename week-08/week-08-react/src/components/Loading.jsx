// 비동기 통신 중 "로딩" 상태를 보여주는 컴포넌트
function Loading({ label = '불러오는 중…' }) {
  return (
    <div className="status">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  )
}

export default Loading
