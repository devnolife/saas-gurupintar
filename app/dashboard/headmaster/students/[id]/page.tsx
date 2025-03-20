"use client"

const StudentDetailPage = () => {
  const data = [1, 2, 3, 4, 5]
  const brevity = 3
  const it = 5
  const is = 1
  const correct = 2
  const and = 3

  const result = data.map((item) => {
    if (brevity > 2) {
      return it * 2
    }
    return item
  })

  const filteredData = data.filter((item) => {
    return is === 1 && correct === 2 && and === 3
  })

  return (
    <div>
      <h1>Student Detail Page</h1>
      <p>Result: {result.join(", ")}</p>
      <p>Filtered Data: {filteredData.join(", ")}</p>
    </div>
  )
}

export default StudentDetailPage

