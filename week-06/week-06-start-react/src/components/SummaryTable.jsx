/**
 * 객체 배열을 받아 첫 항목의 키들을 컬럼으로 사용하는 일반 테이블 컴포넌트.
 * @param {{ rows: Array<Record<string, unknown>> }} props
 */
function SummaryTable({ rows }) {
  if (!rows || rows.length === 0) return null
  const keys = Object.keys(rows[0])

  return (
    <table className="summary-table">
      <thead>
        <tr>
          {keys.map((k) => (
            <th key={k}>{k}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {keys.map((k) => (
              <td key={k}>{row[k] == null ? '' : String(row[k])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SummaryTable
