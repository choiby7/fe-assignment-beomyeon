import { Link } from 'react-router-dom'

// 정의되지 않은 모든 경로(*)에서 보여주는 404 페이지.
function NotFoundPage() {
  return (
    <div className="empty">
      <p className="big-404">404</p>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="link-btn">
        홈으로 돌아가기
      </Link>
    </div>
  )
}

export default NotFoundPage
