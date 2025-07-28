const questionnaire = document.getElementById('questionnaire');
const submitBtn = document.getElementById('submit-btn');
const suggestion = document.getElementById('suggestion');

const questions = [
    {
        question: "Você prefere atividades em grupo ou sozinho?",
        id: "social",
        answers: {
            grupo: "Em grupo",
            sozinho: "Sozinho"
        }
    },
    {
        question: "Você gosta de estar em contato com a natureza?",
        id: "natureza",
        answers: {
            sim: "Sim",
            nao: "Não"
        }
    },
    {
        question: "Você prefere atividades que exigem esforço físico?",
        id: "fisico",
        answers: {
            sim: "Sim",
            nao: "Não"
        }
    },
    {
        question: "Você gosta de atividades que estimulam a mente?",
        id: "mental",
        answers: {
            sim: "Sim",
            nao: "Não"
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
                <input type="radio" name="${q.id}" value="${key}">
                ${q.answers[key]}
            `;
            questionDiv.appendChild(label);
        }
        questionnaire.appendChild(questionDiv);
    });
}

buildQuestionnaire();

function prepareData() {
    const data = hobbies.map(hobby => {
        return [
            hobby.social === 'grupo' ? 1 : 0,
            hobby.natureza === 'sim' ? 1 : 0,
            hobby.fisico === 'sim' ? 1 : 0,
            hobby.mental === 'sim' ? 1 : 0
        ];
    });
    const labels = hobbies.map(hobby => hobby.hobby);
    return { data, labels };
}

const { data, labels } = prepareData();
const knn = new KNN(data, labels, { k: 1 });

let userProfile = {
    username: 'Usuário',
    suggestedHobbies: [],
    lastLogin: null,
    loginDays: 0
};

function loadProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
    }
}

function saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

submitBtn.addEventListener('click', () => {
    const inputs = questionnaire.querySelectorAll('input:checked');
    const userAnswers = Array.from(inputs).map(input => {
        return input.value === 'sim' || input.value === 'grupo' ? 1 : 0;
    });

    const prediction = knn.predict(userAnswers);
    suggestion.innerHTML = `<h2>Sugestão:</h2><p>${prediction}</p>`;

    if (!userProfile.suggestedHobbies.includes(prediction)) {
        userProfile.suggestedHobbies.push(prediction);
        saveProfile();
    }
});

function updateProfileDisplay() {
    document.getElementById('username').textContent = userProfile.username;
    document.getElementById('level').textContent = getLevel(userProfile.loginDays);
    const hobbyList = document.getElementById('hobby-list');
    hobbyList.innerHTML = '';
    userProfile.suggestedHobbies.forEach(hobby => {
        const li = document.createElement('li');
        li.textContent = hobby;
        hobbyList.appendChild(li);
    });
}

function getLevel(loginDays) {
    if (loginDays <= 5) {
        return 'Iniciante';
    } else if (loginDays <= 15) {
        return 'Entusiasta';
    } else {
        return 'Mestre dos Hobbies';
    }
}

function handleLogin() {
    const today = new Date().toDateString();
    if (userProfile.lastLogin !== today) {
        userProfile.loginDays++;
        userProfile.lastLogin = today;
        saveProfile();
    }
}

loadProfile();
handleLogin();
updateProfileDisplay();
