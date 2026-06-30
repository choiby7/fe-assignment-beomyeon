import { useState, useEffect, useCallback } from 'react'
import client from '../api/client'

// url 로 GET 요청을 보내고 { data, loading, error, refetch } 를 돌려주는 커스텀 훅.
// 비동기 통신의 3가지 상태(로딩 / 에러 / 성공)를 한 곳에서 관리한다.
export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // refetch 시 effect 를 다시 실행시키기 위한 트리거 값
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  useEffect(() => {
    // 컴포넌트가 사라지거나 url 이 바뀌면, 늦게 도착한 이전 응답은 무시한다.
    // (race condition / "이미 사라진 컴포넌트에 setState" 경고 방지)
    let ignore = false

    async function load() {
      setLoading(true)
      setError(null)
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

    return () => {
      ignore = true
    }
  }, [url, reloadKey])

  return { data, loading, error, refetch }
}
