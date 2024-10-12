const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9']
const answers = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9']

questions.forEach((q, i) => {
  let question = document.getElementById(q)
  question.addEventListener('click', () => {
      $(`#${answers[i]}`).toggleClass("slidedown slideup");
  })
})
