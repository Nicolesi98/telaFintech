const questionnaire = document.getElementById('questionnaire');
const submitBtn = document.getElementById('submit-btn');
const suggestion = document.getElementById('suggestion');

const questions = [
    {
        question: "O que você prefere fazer no seu tempo livre?",
        answers: {
            a: "Relaxar em casa",
            b: "Sair e explorar",
            c: "Criar algo com as mãos"
        }
    },
    {
        question: "Qual ambiente você mais gosta?",
        answers: {
            a: "Um lugar tranquilo e silencioso",
            b: "A natureza e o ar livre",
            c: "Uma oficina ou estúdio"
        }
    }
];

function buildQuestionnaire() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        for (const key in q.answers) {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="question${index}" value="${key}">
                ${q.answers[key]}
            `;
            questionDiv.appendChild(label);
        }
        questionnaire.appendChild(questionDiv);
    });
}

buildQuestionnaire();

submitBtn.addEventListener('click', () => {
    const answers = {
        a: 0,
        b: 0,
        c: 0
    };
    const inputs = questionnaire.querySelectorAll('input:checked');
    inputs.forEach(input => {
        answers[input.value]++;
    });

    let suggestedHobby = '';
    if (answers.a > answers.b && answers.a > answers.c) {
        suggestedHobby = "Que tal ler um livro ou assistir a um filme?";
    } else if (answers.b > answers.a && answers.b > answers.c) {
        suggestedHobby = "Você pode gostar de fazer uma trilha ou um piquenique.";
    } else if (answers.c > answers.a && answers.c > answers.b) {
        suggestedHobby = "Aprender a desenhar ou fazer artesanato pode ser uma boa.";
    } else {
        suggestedHobby = "Você é versátil! Que tal tentar um de cada?";
    }

    suggestion.innerHTML = `<h2>Sugestão:</h2><p>${suggestedHobby}</p>`;
});
