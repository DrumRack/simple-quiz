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
        const randomIndex = Math.floor(Math.random() * copyQuestionList.length)
        textBox.textContent = copyQuestionList[randomIndex].question
        for (let i = 0; i <= 3; i++) getAnswer(randomIndex, i)

        function getAnswer(questionIndex, answerIndex) {
            const answer = document.createElement('li')
            const button = document.createElement('button')

            button.textContent = copyQuestionList[questionIndex].answers[answerIndex].text
            button.onclick = function () {
                if (copyQuestionList[questionIndex].answers[answerIndex].isCorrect) {
                    alert('Вы ответили правильно')
                    correctAnswers++
                } else alert('Не верный ответ')
                answerList.innerHTML = ''
                copyQuestionList.splice(randomIndex, 1)

                if (copyQuestionList.length !== 0) getQuestion()
                else {
                    answerList.remove()
                    textBox.textContent = `Вы ответили правильно на ${correctAnswers} вопросов`
                    startButton.textContent = 'Перезапустить'
                    startButton.style.margin = '50px 0 0 0'
                    contentSection.appendChild(startButton)
                }
            }

            answer.appendChild(button)
            answerList.appendChild(answer)
        }
    }
}