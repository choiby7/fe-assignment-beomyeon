import axios from 'axios'

// JSON Server 더미 API 서버 주소.
// `npm run server` 를 실행하면 http://localhost:3000 에 뜬다.
// 같은 서버가 API(/products, /reviews)와 상품 이미지(/images/*)를 함께 서빙한다.
// baseURL 을 정해두면 각 요청에서는 '/products' 처럼 경로만 적으면 된다.
const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
})

export default client
