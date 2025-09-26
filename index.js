const contentSection = document.getElementById('content')
const startButton = document.getElementById('start-button')
const textBox = document.createElement('div')
const answerList = document.createElement('ul')
let correctAnswers

textBox.classList.add('text')
startButton.onclick = function () {
    const copyQuestionList = [...questionList]
    correctAnswers = 0
    contentSection.appendChild(textBox)
    contentSection.appendChild(answerList)
    startButton.remove()
    getQuestion()

    function getQuestion() {
        let blockUI = false
        const randomIndex = Math.floor(Math.random() * copyQuestionList.length)
        textBox.textContent = copyQuestionList[randomIndex].question
        for (let i = 0; i <= 3; i++) getAnswer(randomIndex, i)

        function getAnswer(questionIndex, answerIndex) {
            const answer = document.createElement('li')
            const button = document.createElement('button')

            button.textContent = copyQuestionList[questionIndex].answers[answerIndex].text
            button.onclick = function () {
                if (blockUI) return
                if (copyQuestionList[questionIndex].answers[answerIndex].isCorrect) {
                    correctAnswers++
                    button.style.background = '#4CAF50'
                    button.style.borderColor = '#4CAF50'
                } else {
                    button.style.background = '#FF4C43'
                    button.style.borderColor = '#FF4C43'
                }
                blockUI = true
                setTimeout(() => {
                    answerList.innerHTML = ''
                    copyQuestionList.splice(randomIndex, 1)
                    if (copyQuestionList.length !== 0) getQuestion()
                    else {
                        answerList.remove()
                        textBox.textContent = `Вы ответили правильно на ${correctAnswers} из ${questionList.length} вопросов (${Math.round(100 / questionList.length * correctAnswers)}%)`
                        startButton.textContent = 'Перезапустить'
                        startButton.style.margin = '50px 0 0 0'
                        contentSection.appendChild(startButton)
                    }
                }, 500)
            }

            answer.appendChild(button)
            answerList.appendChild(answer)
        }
    }
}