import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useCart } from '../context/CartContext'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

// 별점(정수 rating)을 ★/☆ 문자열로
function Stars({ rating }) {
  return (
    <span className="review-stars" aria-label={`별점 ${rating}점`}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </span>
  )
}

// 상품 상세(/products/:id) 페이지.
// useParams 로 URL 의 :id 를 꺼내 GET /products/:id 로 해당 상품을 받아온다.
function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const { data: product, loading, error, refetch } = useFetch(`/products/${id}`)
  // 이 상품의 리뷰만 따로: json-server 의 필터 쿼리 (?productId=)
  const { data: reviews } = useFetch(`/reviews?productId=${id}`)

  if (loading) return <Loading label="상품 정보를 불러오는 중…" />
  if (error)
    return <ErrorMessage message="상품을 불러오지 못했습니다." onRetry={refetch} />

  const handleAdd = () => {
    addItem(product)
    navigate('/cart') // 담은 뒤 장바구니로 이동
  }

  return (
    <article className="detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← 뒤로
      </button>

      <div className="detail-body">
        <img className="detail-img" src={product.image} alt={product.name} />
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-price">{product.price.toLocaleString()}원</p>
          <p className="detail-desc">{product.description}</p>
          <button className="add-btn" onClick={handleAdd}>
            장바구니에 담기
          </button>
        </div>
      </div>

      <section className="reviews">
        <h2 className="reviews-title">
          리뷰{reviews ? ` (${reviews.length})` : ''}
        </h2>

        {!reviews ? (
          <p className="reviews-msg">리뷰 불러오는 중…</p>
        ) : reviews.length === 0 ? (
          <p className="reviews-msg">아직 등록된 리뷰가 없습니다.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((r) => (
              <li key={r.id} className="review-item">
                <div className="review-head">
                  <span className="review-user">{r.username}</span>
                  <Stars rating={r.rating} />
                </div>
                <p className="review-text">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  )
}

export default ProductDetailPage
