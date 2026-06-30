import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

// BrowserRouter: 앱 전체를 라우팅 가능하게 감싸준다 (URL ↔ 화면 연결)
// CartProvider: 장바구니 상태를 모든 페이지에서 공유 (Context API)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
