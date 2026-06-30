import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

const CATEGORIES = ['전체', '상의', '하의', '신발', '가방', '악세서리']

// 홈(/) — 상품 목록 페이지.
// JSON Server 의 GET /products 로 전체 상품을 받아온 뒤, 카테고리로 걸러서 보여준다.
function ProductListPage() {
  const { data: products, loading, error, refetch } = useFetch('/products')

  // 선택한 카테고리를 URL 쿼리스트링(?category=가방)에 저장 → 새로고침·공유해도 유지됨
  const [searchParams, setSearchParams] = useSearchParams()
  const current = searchParams.get('category') || '전체'

  // 비동기 통신의 3가지 상태를 화면으로 분기 처리한다.
  if (loading) return <Loading label="상품을 불러오는 중…" />
  if (error)
    return (
      <ErrorMessage message="상품 목록을 불러오지 못했습니다." onRetry={refetch} />
    )

  const filtered =
    current === '전체'
      ? products
      : products.filter((p) => p.category === current)

  const selectCategory = (cat) => {
    setSearchParams(cat === '전체' ? {} : { category: cat })
  }

  return (
    <section>
      <h1 className="page-title">상품 목록</h1>

      <div className="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-chip${cat === current ? ' active' : ''}`}
            onClick={() => selectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="page-sub">총 {filtered.length}개 상품</p>

      <div className="grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductListPage
