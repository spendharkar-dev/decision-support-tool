const app = document.getElementById('app');

const form = document.createElement('form');
const questionInput = document.createElement('input');
questionInput.setAttribute('type', 'text');
questionInput.setAttribute('placeholder', 'Enter your question');

const typeSelect = document.createElement('select');
['Free Text', 'Single Choice', 'Multiple Choice', 'Other'].forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
});

const answerContainer = document.createElement('div');

const updateAnswerInputs = () => {
    answerContainer.innerHTML = '';
    if (typeSelect.value === 'Multiple Choice') {
        for (let i = 0; i < 4; i++) {
            const answerInput = document.createElement('input');
            answerInput.setAttribute('type', 'text');
            answerInput.setAttribute('placeholder', `Answer choice ${i + 1}`);
            answerContainer.appendChild(answerInput);
        }
    } else {
        const answerInput = document.createElement('input');
        answerInput.setAttribute('type', 'text');
        answerInput.setAttribute('placeholder', 'Enter answer choices, separated by commas');
        answerContainer.appendChild(answerInput);
    }
};

typeSelect.addEventListener('change', updateAnswerInputs);
updateAnswerInputs();

const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';

form.appendChild(questionInput);
form.appendChild(typeSelect);
form.appendChild(answerInput);
form.appendChild(submitButton);
app.appendChild(form);

const questionList = document.createElement('ul');
app.appendChild(questionList);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const question = questionInput.value;
    const type = typeSelect.value;
    const answers = answerInput.value.split(',').map(answer => answer.trim());
    let listItem = document.createElement('li');
    listItem.textContent = `Question: ${question}, Type: ${type}`;
    questionList.appendChild(listItem);

    if (type === 'Single Choice') {
        const select = document.createElement('select');
        answers.forEach(answer => {
            const option = document.createElement('option');
            option.value = answer;
            option.textContent = answer;
            select.appendChild(option);
        });
        listItem.appendChild(select);
    } else {
        listItem.textContent += `, Answers: ${answers.join(', ')}`;
    }
    questionInput.value = '';
    answerInput.value = '';
});