import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

// 라우팅 설정: URL 경로마다 어떤 페이지를 보여줄지 정의한다.
// Layout 을 부모 라우트로 두고 그 안에 페이지들을 중첩(nested) → 헤더/네비를 공유.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductListPage />} /> {/* / */}
        <Route path="products/:id" element={<ProductDetailPage />} /> {/* /products/3 */}
        <Route path="cart" element={<CartPage />} /> {/* /cart */}
        <Route path="*" element={<NotFoundPage />} /> {/* 그 외 모든 경로 → 404 */}
      </Route>
    </Routes>
  )
}

export default App
