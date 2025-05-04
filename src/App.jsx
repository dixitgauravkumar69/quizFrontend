import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        axios.get('https://quizbackend-production-ed22.up.railway.app/api/quiz')
            .then(response => setQuestions(response.data))
            .catch(error => console.error("❌ Failed to fetch questions:", error));
    }, []);

    const handleSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (selectedAnswer === questions[currentIndex].correctAnswer) {
            setScore(score + 1);
        }

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
        } else {
            setQuizCompleted(true);
        }
    };

    return (
        <div className="body">
            <div className="container">
                <h1 className="title">🚀 Ultimate Quiz Challenge</h1>

                {quizCompleted ? (
                    <div className="text-center">
                        <h2 className="score">🎉 Your Score: {score} / {questions.length}</h2>
                    </div>
                ) : questions.length > 0 ? (
                    <div className="p-6">
                        <h3 className="question">{questions[currentIndex].question}</h3>
                        <div className="options">
                            {questions[currentIndex].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(opt)}
                                    className={`option ${selectedAnswer === opt ? 'selected' : ''}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <h2 className="text-center text-lg">Loading questions...</h2>
                )}

                {!quizCompleted && questions.length > 0 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={handleNext}
                            disabled={!selectedAnswer}
                            className={`submit-button ${selectedAnswer ? '' : 'disabled'}`}
                        >
                            {currentIndex === questions.length - 1 ? "Finish Quiz 🚀" : "Next Question →"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
