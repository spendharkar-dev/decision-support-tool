import React, { useState } from 'react';

function App() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});

  const questions = [
    {
      type: 'intro',
      content: {
        welcome: 'Welcome to the Questionnaire!',
        instructions: 'Please answer the following questions. Use the Next and Previous buttons to navigate.'
      }
    },
    {
      type: 'questions',
      content: [
        { label: 'What is your favorite color?', type: 'dropdown', options: ['Red', 'Blue', 'Green'] },
        { label: 'Select your hobbies:', type: 'checkbox', options: ['Reading', 'Traveling', 'Cooking'] },
        { label: 'Choose your preferred pet:', type: 'radio', options: ['Dog', 'Cat', 'Other'] }
      ]
    },
    {
      type: 'review',
      content: 'Please review your responses before submitting.'
    },
    {
      type: 'confirmation',
      content: {
        thankYou: 'Thank you for completing the questionnaire!',
        nextSteps: 'We will contact you with the results soon.'
      }
    }
  ];

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleChange = (questionLabel, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionLabel]: value
    }));
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'dropdown':
        return (
          <div key={question.label}>
            <label>{question.label}</label>
            <select onChange={(e) => handleChange(question.label, e.target.value)}>
              {question.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'checkbox':
        return (
          <div key={question.label}>
            <label>{question.label}</label>
            {question.options.map((option) => (
              <div key={option}>
                <input
                  type="checkbox"
                  value={option}
                  onChange={(e) => handleChange(question.label, e.target.checked ? option : '')}
                />
                {option}
              </div>
            ))}
          </div>
        );
      case 'radio':
        return (
          <div key={question.label}>
            <label>{question.label}</label>
            {question.options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name={question.label}
                  value={option}
                  onChange={(e) => handleChange(question.label, e.target.value)}
                />
                {option}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {step === 0 && (
        <div>
          <h1>{questions[0].content.welcome}</h1>
          <p>{questions[0].content.instructions}</p>
          <button onClick={handleNext}>Start</button>
        </div>
      )}

      {step === 1 && (
        <div>
          {questions[1].content.map(renderQuestion)}
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Review Your Responses</h2>
          <pre>{JSON.stringify(responses, null, 2)}</pre>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Submit</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1>{questions[3].content.thankYou}</h1>
          <p>{questions[3].content.nextSteps}</p>
        </div>
      )}
    </div>
  );
}

export default App;
