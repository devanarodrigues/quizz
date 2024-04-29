let a = document.getElementById('A')
let b = document.getElementById('B')
let c = document.getElementById('C')
let d = document.getElementById('D')
let total = document.getElementById('total')
let start = document.getElementById('iniciar')
let questionNumber = document.getElementsByClassName('questionNumber')
let next = document.getElementById('next')
let question = document.getElementById('question')
let containerQuizz = document.getElementById('containerQuizz')
let pontos = document.getElementById('pontos')
let title = document.getElementById('title')
let difficulty = document.getElementById('difficulty')
let again = document.getElementById('fim')
let alternativa = document.getElementsByClassName('alternativa')
let arrayQuestoes = [a, b, c, d]
let cont = 0
let i = 0
let score = 0
let data, answers

pontos.innerHTML = score
questionNumber[0].innerHTML = (cont + 1)
questionNumber[1].innerHTML = (cont + 1)

async function consultarAPI() {
    const apiURL = "https://opentdb.com/api.php?amount=10&type=multiple"
    const result = await fetch(apiURL)
    data = await result.json()
    console.log(data.results)
    console.log("question number " + questionNumber[0].innerText)
    total.innerHTML = data.results.length
    answers = [...data.results[cont].incorrect_answers, data.results[cont].correct_answer]

    gerarQuestoes(cont)
    start.style.display = 'none'
    again.style.display = 'none'
    containerQuizz.style.display = 'flex'
}

function proximaPergunta() {
    if (cont >= 9) {
        again.style.display = 'flex'
        console.log(again)
        containerQuizz.style.display = 'none'
    } else {
        cont++
        console.log(data.results[cont].incorrect_answers)
        answers = [...data.results[cont].incorrect_answers, data.results[cont].correct_answer]
        console.log(cont)
        questionNumber[0].innerHTML = (cont + 1)
        questionNumber[1].innerHTML = (cont + 1)
        gerarQuestoes(cont)
        console.log(questionNumber)
    }
    return cont
}

function gerarQuestoes(cont) {
    title.innerHTML = data.results[cont].category
    difficulty.innerHTML = data.results[cont].difficulty
    if (difficulty.innerText === "easy") {
        difficulty.style.color = "#4caf50"
    } else if (difficulty.innerText == "medium") {
        difficulty.style.color = "#ffeb3b"
    } else {
        difficulty.style.color = "#f44336"
    }
    question.innerHTML = data.results[cont].question
    alternativas(shuffleArray(answers))
    cont++
    return cont, answers
}

async function alternativas(answers) {
    for (j in arrayQuestoes) {
        arrayQuestoes[j].innerHTML = `${answers[j]}`
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function selected(e) { // pegar value do html
    let selected = e
    if (selected.innerText === data.results[cont].correct_answer) {
        pontos.innerHTML = (score += 10)
        selected.parentElement.classList.add('certo')
        setTimeout(function () {
            selected.parentElement.classList.remove('certo')
            proximaPergunta()
        }, 1000)
    } else {
        selected.parentElement.classList.add('errado')
        setTimeout(function () {
            selected.parentElement.classList.remove('errado')
            proximaPergunta()
        }, 1000)

    }
}



