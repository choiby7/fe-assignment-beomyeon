import { createContext, useContext, useState } from 'react'

// 장바구니 상태를 앱 전체에서 공유하기 위한 Context.
// props 로 일일이 넘기지 않고, 어느 페이지에서든 useCart() 로 꺼내 쓴다.
const CartContext = createContext(null)

export function CartProvider({ children }) {
  // items: [{ ...product, qty }]
  const [items, setItems] = useState([])

  // 담기: 이미 있으면 수량 +1, 없으면 새로 추가
  const addItem = (product) => {
    setItems((prev) => {
      const found = prev.find((it) => it.id === product.id)
      if (found) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + 1 } : it,
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id))
  const clear = () => setItems([])

  // 파생 값: 총 수량, 총 금액
  const count = items.reduce((sum, it) => sum + it.qty, 0)
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0)

  const value = { items, addItem, removeItem, clear, count, total }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// 장바구니 값/함수를 꺼내 쓰는 커스텀 훅
// (Provider 와 같은 파일에 둬서 Context 예제를 한눈에 보이게 함 — fast-refresh 규칙만 끔)
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart 는 <CartProvider> 안에서만 사용할 수 있습니다.')
  }
  return ctx
}
