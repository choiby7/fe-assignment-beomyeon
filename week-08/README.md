# 배운 내용 정리 - Week 08 (React Router · JSON Server · 비동기 통신)

이번 주는 세 가지를 배우고, 그걸 합쳐 **기초 쇼핑몰 앱(멋사몰)** 을 만들었다.

1. **React Router** - 리액트 앱에 페이지 라우팅 붙이기
2. **JSON Server** - 준비된 데이터셋으로 더미 API 서버 띄우기 (상품 50개 + 리뷰)
3. **비동기 통신** - API 연동 + 로딩 / 에러 상태 처리
4. 위 셋을 합친 쇼핑몰 앱

> 그 전에, 2·3번의 바탕이 되는 **JS 비동기 기본기(`async`/`await`/`fetch`)** 를 0장에 먼저 정리했다.

> 프로젝트: [week-08-react/](week-08-react/)

---

## 0. 비동기 기초 - async / await / fetch

자바스크립트의 **비동기** 기본기

### 동기 vs 비동기

| 구분 | 뜻 |
|------|----|
| **동기(synchronous)** | 코드가 위→아래로 한 줄씩, 앞 작업이 끝나야 다음 줄 실행 |
| **비동기(asynchronous)** | 오래 걸리는 작업(네트워크 요청 등)은 시켜만 놓고 기다리지 않고 다음 줄로, 끝나면 그때 결과를 처리 |



> API 요청은 "서버에 다녀오는" 시간이 걸리는 일이라 **비동기**로 처리한다.
>
> 그 "나중에 끝날 작업"을 담은 객체가 **Promise** 다.
>  
> 즉, Promise는 비동기적인 내용을 동기적으로 사용할 수 있게하는 객체이다. 


### fetch - 브라우저 내장 요청 함수

```js
// fetch 는 Promise 를 돌려준다
fetch('http://localhost:3000/products')
  .then((res) => res.json())          // 응답 본문을 JSON 으로 파싱 (이것도 Promise)
  .then((data) => console.log(data))  // 실제 데이터 사용
  .catch((err) => console.error(err)) // 통신 에러 처리
```

- 별도 설치 없이 브라우저에 내장.
- !! `fetch` 는 404·500 같은 **HTTP 에러를 `.catch` 로 보내지 않는다**. 네트워크 자체가 끊긴 경우만 실패로 본다.
  그래서 `res.ok` 를 직접 확인해야 한다.

### async / await - Promise 를 동기 코드처럼

`.then` 을 길게 잇는 대신, **`await`** 로 "결과가 올 때까지 그 줄에서 기다렸다가" 변수에 담는다. 읽기가 훨씬 쉽다.

```js
async function getProducts() {   // await 를 쓰려면 함수에 async
  try {
    const res = await fetch('http://localhost:3000/products') // 응답 올 때까지 대기
    if (!res.ok) throw new Error('요청 실패')                  // HTTP 에러 직접 체크
    const data = await res.json()                            // 파싱 끝날 때까지 대기
    console.log(data)        // 성공
  } catch (err) {
    console.error(err)       // 에러
  } finally {
    // 성공·실패와 무관하게 항상 실행 (로딩 끄기 등)
  }
}
```

| 키워드 | 역할 |
|--------|------|
| `async` | 이 함수가 비동기 함수임을 표시. 안에서 `await` 사용 가능 |
| `await` | Promise 가 끝날 때까지 기다렸다가 결과값을 꺼냄 (반드시 `async` 함수 안에서만) |
| `try / catch / finally` | 성공 / 에러 / 정리(로딩) 를 한 곳에서 깔끔하게 처리 |

### fetch vs axios

| 구분 | `fetch` | `axios` |
|------|---------|---------|
| 설치 | 브라우저 내장 (설치 X) | `npm i axios` 필요 |
| JSON 파싱 | `res.json()` 한 번 더 호출 | `res.data` 로 바로 사용 |
| HTTP 에러(4xx/5xx) | `res.ok` 직접 확인 | 자동으로 `catch` 로 감 |
| baseURL · timeout | 수동 | 옵션으로 간단 설정 |

> 요즘에는 Tanstack Query라는 라이브러리를 사실상 표준급으로 많이 쓴다고 한다. (캐싱, 메모리 관리 기능)

> **이 프로젝트는 `axios` 를 쓴다** ([src/api/client.js](week-08-react/src/api/client.js)). 개념은 동일하고,
> 3장 `useFetch` 의 `await client.get(url)` 이 위 `await fetch(...)` 와 같은 역할이다.
> 즉 **3장의 커스텀 훅이 바로 이 `async/await` + `try/catch/finally` 패턴**이다.

---

## 실행 방법

```bash
cd week-08-react
npm install

# 터미널 2개로 따로 실행하거나…
npm run server   # ① JSON Server (API + 이미지) → http://localhost:3000
npm run dev      # ② React 앱 (Vite)           → http://localhost:5173

# 한 번에 둘 다 실행
npm run dev:all
```
---

## 1. React Router - 페이지 라우팅

SPA(단일 페이지 앱)에서 **URL 마다 다른 화면**을 보여주게 해주는 라이브러리.
새로고침 없이 컴포넌트만 바꿔치기한다.

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | [ProductListPage](week-08-react/src/pages/ProductListPage.jsx) | 상품 목록 (카테고리 필터) |
| `/products/:id` | [ProductDetailPage](week-08-react/src/pages/ProductDetailPage.jsx) | 상품 상세 (`:id` 동적 경로) + 리뷰 |
| `/cart` | [CartPage](week-08-react/src/pages/CartPage.jsx) | 장바구니 |
| `*` | [NotFoundPage](week-08-react/src/pages/NotFoundPage.jsx) | 그 외 모든 경로 → 404 |

```jsx
// main.jsx - 앱 전체를 BrowserRouter 로 감싼다
<BrowserRouter>
  <App />
</BrowserRouter>

// App.jsx - 경로별로 어떤 페이지를 그릴지 정의 (중첩 라우트)
<Routes>
  <Route path="/" element={<Layout />}>      {/* 공통 헤더/네비 */}
    <Route index element={<ProductListPage />} />
    <Route path="products/:id" element={<ProductDetailPage />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```

### 자주 쓰는 도구

| API | 용도 | 사용처 |
|-----|------|--------|
| `<Link to="...">` | 클릭 시 페이지 이동 (a 태그 대체) | [ProductCard](week-08-react/src/components/ProductCard.jsx) |
| `<NavLink>` | Link + 현재 경로면 `active` 클래스 자동 부여 | [Layout](week-08-react/src/components/Layout.jsx) |
| `<Outlet>` | 중첩 라우트에서 자식 페이지가 그려질 자리 | [Layout](week-08-react/src/components/Layout.jsx) |
| `useParams()` | URL 의 `:id` 같은 동적 값 꺼내기 | ProductDetailPage |
| `useNavigate()` | 코드로 페이지 이동 (`navigate('/cart')`, `navigate(-1)`) | ProductDetailPage |
| `useSearchParams()` | URL 쿼리스트링(`?category=가방`) 읽기/쓰기 | ProductListPage (카테고리 필터) |

---

## 2. JSON Server - 더미 API 서버

`db.json` 파일 하나만 있으면 **진짜 REST API 처럼** 동작하는 가짜 서버를 띄워준다.
백엔드 없이 프론트 연습할 때 최고. 여기선 **상품 50개 + 리뷰**를 담았다.

[데이터셋: db.json](week-08-react/db.json)

```json
{
  "products": [
    {
      "id": "4",
      "category": "상의",
      "name": "[✨럭셔리라인]카라넥 실크 블라우스",
      "price": 129000,
      "image": "http://localhost:3000/images/product_4.webp",
      "description": "…"
    }
  ],
  "reviews": [
    { "id": "1", "productId": "34", "username": "alex_92", "rating": 5, "text": "…" }
  ]
}
```

`db.json` 의 최상위 키(`products`, `reviews`)가 그대로 엔드포인트가 된다.

| 메서드 | 엔드포인트 | 결과 |
|--------|-----------|------|
| GET | `/products` | 상품 전체 목록 (50개) |
| GET | `/products/4` | id 가 "4"인 상품 하나 |
| GET | `/reviews?productId=34` | productId 가 34인 리뷰만 (필터 쿼리) |
| POST / PATCH / DELETE | `/products`, `/products/4` | 생성 / 수정 / 삭제 (이번 앱은 GET 만 사용) |

### 이미지도 같은 서버가 서빙

상품 이미지는 `server/images/product_*.webp` 에 들어 있고, `--static ./server` 옵션으로
JSON Server 가 함께 내보낸다. 그래서 `db.json` 의 `image` 값이 `http://localhost:3000/images/...` 다.

```bash
npm run server
# = json-server --watch db.json --port 3000 --static ./server
#   ├─ API:   http://localhost:3000/products, /reviews
#   └─ 이미지: http://localhost:3000/images/product_4.webp  (server/ 폴더를 정적 서빙)
```

---

## 3. 비동기 통신 - 로딩 / 에러 상태 처리

API 요청은 **시간이 걸리는 비동기 작업**이라, 한 화면이 3가지 상태를 거친다.

```
요청 시작 → [ 로딩 중 ] → 성공이면 [ 데이터 표시 ] / 실패면 [ 에러 표시 ]
```

이 3가지를 매 페이지마다 새로 짜면 중복이라, **커스텀 훅 [`useFetch`](week-08-react/src/hooks/useFetch.js)** 로 묶었다.

```jsx
// useFetch.js - 핵심
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false              // 늦게 온 옛 응답 무시 (race condition 방지)
    async function load() {
      setLoading(true); setError(null)
      try {
        const res = await client.get(url)
        if (!ignore) setData(res.data)
      } catch (err) {
        if (!ignore) setError(err)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true } // cleanup
  }, [url, reloadKey])

  return { data, loading, error, refetch }
}
```

```jsx
// 쓰는 쪽 (ProductListPage) - 상태별로 화면을 분기
const { data: products, loading, error, refetch } = useFetch('/products')

if (loading) return <Loading />
if (error)   return <ErrorMessage onRetry={refetch} />
return <상품목록 />
```

| 상태 | 보여주는 컴포넌트 |
|------|------------------|
| 로딩 | [Loading.jsx](week-08-react/src/components/Loading.jsx) (스피너) |
| 에러 | [ErrorMessage.jsx](week-08-react/src/components/ErrorMessage.jsx) (+ 다시 시도 버튼) |
| 성공 | 실제 데이터 |

> **axios**: [`src/api/client.js`](week-08-react/src/api/client.js) 에서 `baseURL`(`localhost:3000`)을 박아둔
> 인스턴스를 만들어, 각 요청에선 `/products` 처럼 경로만 적는다.

---

## 4. 합치기 - 쇼핑몰 앱 흐름

```
[상품 목록 /]                 GET /products → 카테고리 필터(?category=) 후 카드 렌더
   │ 카드 클릭 (Link)
   ▼
[상품 상세 /products/:id]      useParams 로 id → GET /products/:id
                              + GET /reviews?productId=:id (해당 상품 리뷰)
   │ "장바구니에 담기" (Context.addItem + navigate)
   ▼
[장바구니 /cart]              Context 에 담긴 항목·합계 표시
```

- **장바구니 상태**는 페이지가 바뀌어도 유지돼야 해서 **Context API**([CartContext](week-08-react/src/context/CartContext.jsx))로 전역 공유했다.
  헤더의 `장바구니 (n)` 배지도 같은 Context 를 구독한다.
- **카테고리 필터**는 선택값을 URL 쿼리스트링에 저장(`useSearchParams`)해서 새로고침·공유해도 유지된다.

---

## 디렉토리 구조

```
week-08-react/
├── db.json                      # JSON Server 데이터셋 (products 50 + reviews)
├── server/images/               # 상품 이미지 webp (--static 으로 서빙)
├── src/
│   ├── api/client.js            # axios 인스턴스 (baseURL: localhost:3000)
│   ├── hooks/useFetch.js        # 로딩/에러/데이터 상태 처리 커스텀 훅
│   ├── context/CartContext.jsx  # 장바구니 전역 상태 (Context API)
│   ├── components/
│   │   ├── Layout.jsx           # 공통 헤더/네비 + <Outlet/>
│   │   ├── ProductCard.jsx
│   │   ├── Loading.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/
│   │   ├── ProductListPage.jsx  # /            (카테고리 필터)
│   │   ├── ProductDetailPage.jsx# /products/:id (+ 리뷰)
│   │   ├── CartPage.jsx         # /cart
│   │   └── NotFoundPage.jsx     # *
│   ├── App.jsx                  # <Routes> 라우팅 정의
│   └── main.jsx                 # BrowserRouter + CartProvider
```

---

## 핵심 한 줄 정리

| 주제 | 한 줄 |
|------|-------|
| React Router | URL 마다 다른 컴포넌트를 새로고침 없이 보여준다 |
| JSON Server | `db.json` 으로 REST API 를, `--static` 으로 이미지를 즉석에서 띄운다 |
| 비동기 통신 | 요청은 `로딩 → 성공/에러` 3상태 - `useFetch` 로 묶어 처리 |
| Context API | 장바구니처럼 페이지를 넘나드는 상태를 전역 공유 |
