import { Link } from 'react-router-dom'

// 상품 목록에서 한 상품을 보여주는 카드. 클릭하면 상세 페이지로 이동.
function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="card">
      <div className="card-thumb">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-price">{product.price.toLocaleString()}원</p>
      </div>
    </Link>
  )
}

export default ProductCard
