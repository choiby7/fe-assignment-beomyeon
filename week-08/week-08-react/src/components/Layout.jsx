import { Link, NavLink, Outlet } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// 모든 페이지가 공유하는 공통 레이아웃 (헤더 + 네비게이션 + 푸터).
// 가운데 <Outlet /> 자리에 현재 URL 에 맞는 자식 페이지가 렌더링된다.
function Layout() {
  const { count } = useCart()

  return (
    <div className="app">
      <header className="shop-header">
        <Link to="/" className="logo">
          🛒 멋사몰
        </Link>
        <nav className="shop-nav">
          {/* NavLink: 현재 경로와 일치하면 자동으로 'active' 클래스가 붙는다 */}
          <NavLink to="/" end>
            상품
          </NavLink>
          <NavLink to="/cart">장바구니{count > 0 && ` (${count})`}</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        #LikeLion FE Week 08 · React Router + JSON Server
      </footer>
    </div>
  )
}

export default Layout
