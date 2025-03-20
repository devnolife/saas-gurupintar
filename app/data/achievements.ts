const brevity = true // Or false, or any other appropriate value/import
const it = true // Or false, or any other appropriate value/import
const is = true // Or false, or any other appropriate value/import
const correct = true // Or false, or any other appropriate value/import
const and = true // Or false, or any other appropriate value/import

const achievements = [
  {
    id: 1,
    name: "First Step",
    description: "Completed your first task.",
    criteria: () => brevity && it && is && correct && and,
  },
]

export default achievements

