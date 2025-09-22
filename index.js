const startButton = document.getElementById('start')

startButton.onclick = function () {
    const question = document.createElement('div')
    const answerList = document.createElement('ul')
    const randomIndex = Math.floor(Math.random() * questions.length)
    
    question.textContent = questions[randomIndex].question
    for (let i = 0; i <= 3; i++) getAnswer(randomIndex, i)

    document.getElementById('content').appendChild(question)
    document.getElementById('content').appendChild(answerList)
    
    startButton.remove()

    function getAnswer(questionIndex, answerIndex) {
        const answer = document.createElement('li')
        const button = document.createElement('button')
        button.textContent = questions[questionIndex].answers[answerIndex].text
        answer.appendChild(button)
        answerList.appendChild(answer)
    }
}