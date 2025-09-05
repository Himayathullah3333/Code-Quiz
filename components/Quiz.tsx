"use client";
import { useState, useEffect } from "react";
import StatCard from "./StatCard";

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const Quiz = ({ questions, userId }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] =
    useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);

  const { question, answers, correctAnswer } =
    questions[activeQuestion];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(25);
  };

  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    nextQuestion();
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const onAnswerSelected = (
    answer: string,
    idx: number
  ) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    
    // Calculate new results
    const newResults = selectedAnswer
      ? {
          ...results,
          score: results.score + 5,
          correctAnswers: results.correctAnswers + 1,
        }
      : {
          ...results,
          wrongAnswers: results.wrongAnswers + 1,
        };
    
    setResults(newResults);
    
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      stopTimer();
      
      // Use the calculated results for API call
      fetch("/api/quizResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: newResults.score,
          correctAnswers: newResults.correctAnswers,
          wrongAnswers: newResults.wrongAnswers,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not working fam"
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log(
            "Quiz results saved successfully:",
            data
          );
        })
        .catch((error) => {
          console.error(
            "Error saving quiz results:",
            error
          );
        });
    }
    setChecked(false);
    resetTimer();
    startTimer();
  };
  return (
    <div className="min-h-[500px]">
      <div className="section-container flex justify-center py-10 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <div className="chip">
                <h2>
                  Question {activeQuestion + 1}
                  <span>/{questions.length}</span>
                </h2>
              </div>

              <div className="chip">
                {timeRemaining} seconds to answer
              </div>
            </div>

            <div className="card">
              <h3 className="mb-5 text-2xl md:text-3xl font-extrabold text-white">
                {question}
              </h3>
              <ul>
                {answers.map(
                  (answer: string, idx: number) => (
                    <li
                      key={idx}
                      onClick={() =>
                        onAnswerSelected(answer, idx)
                      }
                      className={`cursor-pointer mb-3 py-3 rounded-xl px-3 border transition-all duration-200
                      ${
                        selectedAnswerIndex === idx
                          ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white border-transparent shadow-glow"
                          : "bg-white text-gray-900 border-black/10 hover:border-indigo-300"
                      }`}
                    >
                      <span className="text-sm md:text-base">{answer}</span>
                    </li>
                  )
                )}
              </ul>
              <button
                onClick={nextQuestion}
                disabled={!checked}
                className={`mt-4 w-full md:w-auto ${checked ? 'btn-primary' : 'btn-ghost cursor-not-allowed opacity-70'}`}
              >
                {activeQuestion === questions.length - 1
                  ? "Finish"
                  : "Next Question →"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl uppercase mb-6 text-white font-extrabold">
              Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <StatCard
                title="Percentage"
                value={`${(results.score / 50) * 100}%`}
                variant="white"
              />
              <StatCard
                title="Total Questions"
                value={questions.length}
                variant="white"
              />
              <StatCard
                title="Total Score"
                value={results.score}
                variant="white"
              />
              <StatCard
                title="Correct Answers"
                value={results.correctAnswers}
                variant="white"
              />
              <StatCard
                title="Wrong Answers"
                value={results.wrongAnswers}
                variant="white"
              />
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-10 btn-primary"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
