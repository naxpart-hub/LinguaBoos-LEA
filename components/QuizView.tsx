
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';
import { generateNewQuizQuestions } from '../services/geminiService';
import { CheckCircleIcon, XCircleIcon, SparklesIcon, RefreshIcon } from './Icons';

interface QuizViewProps {
  quiz: QuizQuestion[];
  chapterTitle: string;
}

export const QuizView: React.FC<QuizViewProps> = ({ quiz, chapterTitle }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };
  
  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuestions(quiz);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizFinished(false);
    setError(null);
  };

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newQuestions = await generateNewQuizQuestions(chapterTitle);
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(prev => [...prev, ...newQuestions]);
        if (isQuizFinished) {
            setIsQuizFinished(false);
        }
      } else {
        setError("L'IA n'a pas pu générer de nouvelles questions. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Failed to generate questions:", err);
      setError("Une erreur est survenue lors de la génération. Consultez la console.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!questions || questions.length === 0) {
      return (
        <div className="text-center p-4">
            <p className="text-slate-600">Pas de quiz disponible pour ce chapitre.</p>
        </div>
      );
  }

  if (isQuizFinished) {
    return (
      <div className="text-center p-4">
        <h4 className="text-xl font-bold text-slate-800">Quiz terminé !</h4>
        <p className="text-slate-600 mt-2">Votre score : <span className="font-bold text-sky-600">{score} / {questions.length}</span></p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
          <button onClick={handleRestartQuiz} className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">
            Recommencer le quiz
          </button>
          <button 
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-primary-contrast font-bold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            {isGenerating ? <RefreshIcon className="animate-spin" /> : <SparklesIcon />}
            {isGenerating ? "Génération..." : "Générer d'autres questions"}
          </button>
        </div>
        {error && <p className="text-danger text-center mt-2 text-sm font-medium">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <p className="font-semibold text-slate-700">{currentQuestionIndex + 1}. {currentQuestion.question}</p>
        <p className="text-sm font-medium text-slate-500 flex-shrink-0 ml-4">{currentQuestionIndex + 1} / {questions.length}</p>
      </div>

      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.answer;
          const isSelected = option === selectedOption;
          
          let buttonClass = 'w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ';
          if (isAnswered) {
            if (isCorrect) {
              buttonClass += 'bg-green-100 border-green-400 text-green-800 font-semibold';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-red-100 border-red-400 text-red-800';
            } else {
              buttonClass += 'bg-slate-50 border-slate-200 text-slate-600';
            }
          } else {
            buttonClass += isSelected ? 'bg-sky-100 border-sky-500' : 'bg-slate-50 hover:bg-slate-100 border-slate-200';
          }

          return (
            <button key={index} onClick={() => handleSelectOption(option)} className={buttonClass} disabled={isAnswered}>
              {option}
            </button>
          );
        })}
      </div>
      
      {isAnswered && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${selectedOption === currentQuestion.answer ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-start">
                  <div className="flex-shrink-0">
                      {selectedOption === currentQuestion.answer ? <CheckCircleIcon className="text-green-500" /> : <XCircleIcon className="text-red-500" />}
                  </div>
                  <div className="ml-2">
                      <p className={`font-semibold ${selectedOption === currentQuestion.answer ? 'text-green-800' : 'text-red-800'}`}>
                          {selectedOption === currentQuestion.answer ? currentQuestion.feedback.correct : currentQuestion.feedback.incorrect}
                      </p>
                  </div>
              </div>
          </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
        <div>
          {!isAnswered ? (
            <button onClick={handleCheckAnswer} disabled={!selectedOption} className="bg-slate-700 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">
              Confirmer
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">
              {currentQuestionIndex < questions.length - 1 ? 'Suivant' : 'Terminer'}
            </button>
          )}
        </div>
        
        <div className="flex-shrink-0">
          <button 
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              title="Générer de nouvelles questions avec l'IA"
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary-dark font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? <RefreshIcon className="animate-spin" /> : <SparklesIcon />}
            {isGenerating ? "Génération..." : "Ajouter des questions"}
          </button>
        </div>
      </div>
      {error && <p className="text-danger text-right mt-1 text-sm font-medium">{error}</p>}
    </div>
  );
};
