import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

// 장바구니(/cart) 페이지. Context 에 담긴 장바구니 상태를 그대로 보여준다.
function CartPage() {
  const { items, removeItem, clear, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="empty">
        <p>장바구니가 비어 있습니다.</p>
        <Link to="/" className="link-btn">
          상품 보러 가기
        </Link>
      </div>
    )
  }

  return (
    <section>
      <h1 className="page-title">장바구니</h1>
      <ul className="cart-list">
        {items.map((it) => (
          <li key={it.id} className="cart-item">
            <img className="cart-img" src={it.image} alt={it.name} />
            <div className="cart-meta">
              <span className="cart-name">{it.name}</span>
              <span className="cart-qty">
                {it.price.toLocaleString()}원 × {it.qty}개
              </span>
            </div>
            <span className="cart-sub">
              {(it.price * it.qty).toLocaleString()}원
            </span>
            <button className="remove-btn" onClick={() => removeItem(it.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-footer">
        <strong className="cart-total">
          총 합계 {total.toLocaleString()}원
        </strong>
        <button className="clear-btn" onClick={clear}>
          전체 비우기
        </button>
      </div>
    </section>
  )
}

export default CartPage
