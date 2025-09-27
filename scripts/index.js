const contentSection = document.getElementById('content')
const startButton = document.getElementById('start-button')
const textBox = document.createElement('div')
const answerList = document.createElement('ul')
const answerInput = document.createElement('input')
let correctAnswers

textBox.classList.add('text')
answerInput.classList.add('answer-input')

startButton.onclick = function () {
    const copyQuestionList = [...questionList]
    correctAnswers = 0
    contentSection.appendChild(textBox)
    startButton.remove()
    getQuestion()

    function getQuestion() {
        let blockUI = false
        const randomIndex = Math.floor(Math.random() * copyQuestionList.length)
        const isInputAnswer = typeof copyQuestionList[randomIndex].answers[0] === 'string'
        textBox.textContent = copyQuestionList[randomIndex].question

        if (isInputAnswer) {
            contentSection.appendChild(answerInput)
            answerInput.focus()
            answerInput.onchange = processAnswer.bind(null, null)
        } else {
            contentSection.appendChild(answerList)
            for (let i = 0; i <= 3; i++) getAnswer(i)
        }

        function getAnswer(answerIndex) {
            const answerListItem = document.createElement('li')
            const answerButton = document.createElement('button')

            answerButton.textContent = copyQuestionList[randomIndex].answers[answerIndex].text
            answerButton.onclick = processAnswer.bind(null, answerIndex)

            answerListItem.appendChild(answerButton)
            answerList.appendChild(answerListItem)
        }

        function processAnswer(answerIndex, event) {
            if (blockUI) return
            const targetType = event.target.tagName
            const isAnswerCorrect = answerCheck(targetType)

            if (isAnswerCorrect) {
                correctAnswers++
                event.target.style.background = '#4CAF50'
                event.target.style.borderColor = '#4CAF50'
            } else {
                event.target.style.background = '#FF4C43'
                event.target.style.borderColor = '#FF4C43'
            }
            blockUI = true

            setTimeout(() => {
                if (targetType === 'INPUT') {
                    event.target.remove()
                    event.target.value = ''
                    event.target.style = ''
                }
                if (targetType === 'BUTTON') {
                    event.target.parentElement.parentElement.remove()
                    event.target.parentElement.parentElement.innerHTML = ''
                }
                copyQuestionList.splice(randomIndex, 1)

                if (copyQuestionList.length !== 0) getQuestion()
                else {
                    textBox.textContent = `Вы ответили правильно на ${correctAnswers} из ${questionList.length} вопросов (${Math.round(100 / questionList.length * correctAnswers)}%)`
                    startButton.textContent = 'Перезапустить'
                    startButton.style.margin = '50px 0 0 0'
                    contentSection.appendChild(startButton)
                }
            }, 500)

            function answerCheck(targetType) {
                switch (targetType) {
                    case 'INPUT':
                        return copyQuestionList[randomIndex].answers.includes(event.target.value.toLowerCase())
                    case 'BUTTON':
                        return copyQuestionList[randomIndex].answers[answerIndex].isCorrect
                }
            }
        }
    }
}