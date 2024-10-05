const levels = ["kayak", "sailboat", "motorboat", "sailvane"]
levels.forEach((id, i) => {
    level = document.getElementById(id)
    level.addEventListener('mouseover', () =>{
      text = document.getElementById(`${id}-text`)
      text.classList.remove('hidden')
    })
    level.addEventListener('mouseleave', () =>{
      text = document.getElementById(`${id}-text`)
      text.classList.add('hidden')
    })
});
