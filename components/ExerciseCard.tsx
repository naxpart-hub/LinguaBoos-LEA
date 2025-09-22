
import React, { useState, useEffect } from 'react';
import { Exercise, ExerciseType, FillInTheBlankContent, RewriteAccentContent, MultipleChoiceContent, ClassifyWordsContent, TranslationContent } from '../types';
import { getClarification, generateNewExercise } from '../services/geminiService';
import { CheckCircleIcon, XCircleIcon, LightBulbIcon, RefreshIcon, GlobeIcon, SparklesIcon } from './Icons';

type ResultStatus = 'correct' | 'incorrect' | 'empty' | 'unevaluated';

interface ExerciseCardProps {
  exercise: Exercise;
  exerciseNumber: number;
  onAddExercise: (newExercise: Exercise) => void;
  chapterTitle: string;
}

const loadingMessages = [
  "M. Collado consulte ses grimoires ancestraux...",
  "M. Collado accorde sa guitare pour trouver l'inspiration...",
  "Un instant, M. Collado est en pleine discussion avec Cervantes...",
  "M. Collado prépare sa meilleure explication, avec un café bien serré...",
  "Connexion neuronale avec M. Collado en cours...",
  "M. Collado hoche la tête d'un air entendu et commence à taper...",
  "Analyse grammaticale en cours par le maestro Collado...",
];

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, exerciseNumber, onAddExercise, chapterTitle }) => {
  const isClassifyExercise = exercise.type === ExerciseType.CLASSIFY_WORDS;
  const isTranslationExercise = exercise.type === ExerciseType.TRANSLATION;

  // State for classic exercises
  const [userAnswers, setUserAnswers] = useState<string[][]>([]);
  const [results, setResults] = useState<ResultStatus[][]>([]);

  // State for classification exercise
  const [classificationSelections, setClassificationSelections] = useState<{ [word: string]: string | null }>({});
  const [classificationResults, setClassificationResults] = useState<{ [word: string]: 'correct' | 'incorrect' | 'unevaluated' }>({});

  // Common state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number, total: number } | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  
  // State for AI clarification
  const [clarificationQuestion, setClarificationQuestion] = useState('');
  const [clarificationAnswer, setClarificationAnswer] = useState<string | null>(null);
  const [isClarifying, setIsClarifying] = useState(false);
  const [clarificationError, setClarificationError] = useState<string | null>(null);
  const [clarificationLoadingMessage, setClarificationLoadingMessage] = useState('');

  // State for generating new translation
  const [isGeneratingTranslation, setIsGeneratingTranslation] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const initializeState = () => {
    setIsSubmitted(false);
    setScore(null);
    setClarificationQuestion('');
    setClarificationAnswer(null);
    setClarificationError(null);
    setGenerationError(null);
    setAnimationKey(prev => prev + 1);

    if (isClassifyExercise) {
        const content = exercise.content[0] as ClassifyWordsContent;
        const initialSelections = content.words.reduce((acc, w) => {
            acc[w.word] = null;
            return acc;
        }, {} as { [word: string]: string | null });
        setClassificationSelections(initialSelections);
        
        const initialResults = content.words.reduce((acc, w) => {
            acc[w.word] = 'unevaluated';
            return acc;
        }, {} as { [word: string]: 'correct' | 'incorrect' | 'unevaluated' });
        setClassificationResults(initialResults);

    } else if (isTranslationExercise) {
        setUserAnswers([['']]);
        setResults([['unevaluated']]);
    } else {
        const initialAnswers = exercise.content.map(item => 'solutions' in item ? Array((item as FillInTheBlankContent).solutions.length).fill('') : ['']);
        setUserAnswers(initialAnswers);
        const initialResults = exercise.content.map(item => 'solutions' in item ? Array((item as FillInTheBlankContent).solutions.length).fill('unevaluated') : ['unevaluated']);
        setResults(initialResults as ResultStatus[][]);
    }
  };

  useEffect(() => {
    initializeState();
  }, [exercise]);

  const handleInputChange = (itemIndex: number, solutionIndex: number, value: string) => {
    if (results[itemIndex][solutionIndex] === 'correct' && isSubmitted) return;

    const newAnswers = userAnswers.map(arr => [...arr]);
    newAnswers[itemIndex][solutionIndex] = value;
    setUserAnswers(newAnswers);
    
    if (isSubmitted) {
        const newResults = results.map(arr => [...arr]);
        newResults[itemIndex][solutionIndex] = 'unevaluated';
        setResults(newResults);
    }
  };

  const handleSelectCategory = (word: string, category: string) => {
    if (isSubmitted) return;
    setClassificationSelections(prev => ({
        ...prev,
        [word]: category
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let totalCount = 0;

    if (isClassifyExercise) {
        const content = exercise.content[0] as ClassifyWordsContent;
        const solutions = content.words.reduce((acc, w) => {
            acc[w.word] = w.category;
            return acc;
        }, {} as { [word: string]: string });

        const newResults: { [word: string]: 'correct' | 'incorrect' } = {};
        totalCount = content.words.length;

        content.words.forEach(({ word }) => {
            const userCategory = classificationSelections[word];
            const correctCategory = solutions[word];
            if (userCategory === correctCategory) {
                newResults[word] = 'correct';
                correctCount++;
            } else {
                newResults[word] = 'incorrect';
            }
        });
        
        setClassificationResults(newResults);
        setScore({ correct: correctCount, total: totalCount });

    } else if (isTranslationExercise) {
        const item = exercise.content[0] as TranslationContent;
        const userAnswer = userAnswers[0][0].trim();
        totalCount = 1;

        const isCorrect = item.possibleSolutions.some(
            solution => solution.trim().toLowerCase().replace(/[.,;!?]/g, '') === userAnswer.toLowerCase().replace(/[.,;!?]/g, '')
        );

        if (isCorrect) {
            correctCount++;
        }
        
        const newResults: ResultStatus[][] = [['unevaluated']];
        newResults[0][0] = userAnswer === '' ? 'empty' : (isCorrect ? 'correct' : 'incorrect');

        setResults(newResults);
        setScore({ correct: correctCount, total: totalCount });
    } else {
        const newResults = userAnswers.map((answers, itemIndex) => {
          const item = exercise.content[itemIndex];
          const solutions = 'solutions' in item ? item.solutions : ('solution' in item ? [item.solution] : []);
          
          return answers.map((answer, solutionIndex) => {
            totalCount++;
            if (answer.trim() === '') return 'empty';
            if (answer.trim().toLowerCase() === solutions[solutionIndex]?.toLowerCase()) {
              correctCount++;
              return 'correct';
            }
            return 'incorrect';
          });
        });
        setResults(newResults as ResultStatus[][]);
        setScore({ correct: correctCount, total: totalCount });
    }
    
    setIsSubmitted(true);
    setAnimationKey(prev => prev + 1);

    setClarificationQuestion('');
    setClarificationAnswer(null);
    setClarificationError(null);
  };
  
  const handleSubmitClick = () => {
    if (isSubmitted) {
        initializeState();
    }
    else {
        handleSubmit();
    }
  }

  const handleClarificationRequest = async () => {
      if (!clarificationQuestion.trim()) return;

      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setClarificationLoadingMessage(loadingMessages[randomIndex]);

      setIsClarifying(true);
      setClarificationAnswer(null);
      setClarificationError(null);
      try {
        const answer = await getClarification(exercise, clarificationQuestion);
        setClarificationAnswer(answer);
      } catch (err) {
        console.error("Failed to get clarification:", err);
        setClarificationError("Désolé, une erreur est survenue lors de la récupération de l'explication.");
      } finally {
        setIsClarifying(false);
      }
    };

    const handleGenerateTranslation = async () => {
      setIsGeneratingTranslation(true);
      setGenerationError(null);
      try {
        const newExercise = await generateNewExercise(chapterTitle, ExerciseType.TRANSLATION);
        if (newExercise) {
          onAddExercise(newExercise);
        } else {
          setGenerationError("L'IA n'a pas pu générer une nouvelle traduction. Veuillez réessayer.");
        }
      } catch (err) {
        console.error("Failed to generate translation:", err);
        setGenerationError("Une erreur est survenue lors de la génération de la traduction.");
      } finally {
        setIsGeneratingTranslation(false);
      }
    };

  const isAllCorrect = isSubmitted && score?.correct === score?.total;

  const renderFeedback = () => {
    if (!isSubmitted) return null;
    return (
      <div className={`mt-4 p-4 rounded-lg text-sm ${isAllCorrect ? 'bg-green-500/10 border-success' : 'bg-amber-500/10 border-warning'} border-l-4`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {isAllCorrect ? <CheckCircleIcon className="text-success" /> : <LightBulbIcon className="text-warning" />}
          </div>
          <div className="ml-3">
            <p className={`font-bold ${isAllCorrect ? 'text-green-800' : 'text-amber-800'}`}>
              {isAllCorrect ? exercise.feedback.correct : exercise.feedback.incorrect}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const getStatusStyles = (status: ResultStatus) => {
    switch (status) {
      case 'correct': return { icon: '🎉', inputBg: 'bg-green-100', borderColor: 'border-success' };
      case 'incorrect': return { icon: '🤔', inputBg: 'bg-red-100', borderColor: 'border-danger' };
      case 'empty': return { icon: '👀', inputBg: 'bg-amber-100', borderColor: 'border-warning' };
      default: return { icon: null, inputBg: 'bg-slate-100', borderColor: 'border-slate-300' };
    }
  };
  
  const renderContent = () => {
    switch (exercise.type) {
      case ExerciseType.TRANSLATION: {
        const item = exercise.content[0] as TranslationContent;
        const status = results[0]?.[0] ?? 'unevaluated';
        const isCorrect = status === 'correct';
        return (
          <div className="space-y-4">
            <p className="text-secondary-dark italic">"{item.frenchSentence}"</p>
            <textarea
              value={userAnswers[0]?.[0] ?? ''}
              onChange={(e) => handleInputChange(0, 0, e.target.value)}
              disabled={isCorrect && isSubmitted}
              placeholder="Écrivez votre traduction ici..."
              className={`w-full px-3 py-2 border-2 rounded-md transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none text-secondary-dark ${isCorrect && isSubmitted ? 'bg-green-50' : 'bg-slate-50'} ${isSubmitted && !isCorrect ? 'border-danger' : 'border-slate-200'}`}
              rows={2}
              aria-label="Zone de traduction"
            />
            {isSubmitted && !isCorrect && (
              <div className="text-sm">
                <p className="font-semibold text-secondary-dark">Réponse(s) correcte(s) :</p>
                <ul className="list-disc list-inside text-success">
                  {item.possibleSolutions.map((sol, i) => <li key={i} className="font-medium">{sol}</li>)}
                </ul>
              </div>
            )}
            {isSubmitted && item.note && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border-l-4 border-primary/20">
                  <h4 className="font-semibold text-primary-dark flex items-center gap-2 mb-2">
                      <GlobeIcon />
                      Note Linguistique et Culturelle
                  </h4>
                  <div 
                      className="prose prose-sm max-w-none text-secondary-dark prose-strong:text-secondary-dark"
                      dangerouslySetInnerHTML={{ __html: item.note }} 
                  />
              </div>
            )}
          </div>
        );
      }
      case ExerciseType.CLASSIFY_WORDS: {
        const content = exercise.content[0] as ClassifyWordsContent;
        const solutions = content.words.reduce((acc, w) => {
            acc[w.word] = w.category;
            return acc;
        }, {} as { [word: string]: string });

        return (
            <div className="space-y-4">
              {content.words.map(({ word }) => {
                const result = classificationResults[word];
                const userSelection = classificationSelections[word];
                const correctSolution = solutions[word];
          
                let rowClass = "p-3 border rounded-lg transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ";
                if (isSubmitted) {
                  if (result === 'correct') rowClass += 'bg-green-500/10 border-green-500/30';
                  else if (result === 'incorrect') rowClass += 'bg-red-500/10 border-red-500/30';
                } else {
                  rowClass += 'bg-white border-slate-200';
                }
          
                return (
                  <div key={word} className={rowClass}>
                    <span className="font-medium text-secondary-dark">{word}</span>
                    <div className="flex flex-wrap gap-2 flex-shrink-0">
                      {content.categories.map(category => {
                        const isSelected = userSelection === category;
          
                        let buttonClass = 'px-3 py-1.5 rounded-lg border-2 transition-all duration-200 text-sm font-medium ';
                        if (isSubmitted) {
                          const isCorrectSolution = correctSolution === category;
                          if (isCorrectSolution) {
                            buttonClass += 'bg-green-100 border-green-400 text-green-800';
                          } else if (isSelected && !isCorrectSolution) {
                            buttonClass += 'bg-red-100 border-red-400 text-red-800 line-through';
                          } else {
                            buttonClass += 'bg-slate-50 border-slate-200 text-slate-500 opacity-60';
                          }
                        } else {
                          buttonClass += isSelected ? 'bg-primary/10 border-primary' : 'bg-slate-50 hover:bg-slate-100 border-slate-200';
                        }
          
                        return (
                          <button
                            key={category}
                            onClick={() => handleSelectCategory(word, category)}
                            disabled={isSubmitted}
                            className={buttonClass}
                          >
                            {category}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
      }
      case ExerciseType.REWRITE_ACCENT:
      case ExerciseType.FILL_IN_THE_BLANK:
        // FIX: Guard against rendering before state is initialized to prevent crash
        if (results.length === 0 || userAnswers.length === 0) {
            return null;
        }
        return (
          <ul className="space-y-4">
            {(exercise.content as (FillInTheBlankContent | RewriteAccentContent)[]).map((item, itemIndex) => {
                const isRewrite = 'word' in item;
                const processedSentenceParts = isRewrite 
                    ? [`${itemIndex + 1}. ${item.word} -> `] 
                    : (item as FillInTheBlankContent).sentenceParts.join('').split('__');
                
                const solutions = isRewrite ? [item.solution] : (item as FillInTheBlankContent).solutions;
              
                return (
                    <li key={itemIndex} className="flex items-center flex-wrap gap-x-2 gap-y-3 text-secondary-dark leading-8">
                    {processedSentenceParts.map((part, partIndex) => (
                        <React.Fragment key={partIndex}>
                        <span>{part}</span>
                        {partIndex < solutions.length && (
                            (() => {
                                const status = results[itemIndex][partIndex];
                                const styles = getStatusStyles(status);
                                const isCorrect = status === 'correct';
                                return (
                                    <div className="relative inline-flex items-center">
                                        <input
                                            type="text"
                                            value={userAnswers[itemIndex][partIndex]}
                                            onChange={(e) => handleInputChange(itemIndex, partIndex, e.target.value)}
                                            disabled={isCorrect && isSubmitted}
                                            className={`w-28 sm:w-32 px-3 py-1.5 border-2 rounded-md transition-colors focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none ${isCorrect && isSubmitted ? styles.inputBg : 'bg-slate-50'} ${isSubmitted && !isCorrect ? styles.borderColor : 'border-slate-200'}`}
                                            aria-label={`Réponse ${partIndex + 1} pour l'item ${itemIndex + 1}`}
                                        />
                                        {isSubmitted && styles.icon && (
                                            <span key={animationKey} className={`absolute right-2 text-lg ${isSubmitted ? 'animate-float-up' : ''}`}>{styles.icon}</span>
                                        )}
                                    </div>
                                );
                            })()
                        )}
                        </React.Fragment>
                    ))}
                    {isSubmitted && results[itemIndex].some(r => r === 'incorrect') && (
                       <span className="text-success font-semibold text-sm">(Réponse(s) : {solutions.join(', ')})</span>
                    )}
                    </li>
                );
            })}
          </ul>
        );
    case ExerciseType.MULTIPLE_CHOICE:
        return (
            <ul className="space-y-5">
                {(exercise.content as MultipleChoiceContent[]).map((item, index) => {
                    const userAnswer = userAnswers[index]?.[0];
                    const status = results[index]?.[0];
                    return (
                    <li key={index}>
                        <p className="mb-2 text-secondary-dark">{index + 1}. {item.question}</p>
                        <div className="flex flex-wrap gap-2">
                        {item.options.map((option, optionIdx) => {
                            const isSelected = userAnswer === option;
                            const isCorrectSolution = item.solution === option;

                            let buttonClass = 'px-3 py-1.5 rounded-lg border-2 transition-all duration-200 text-sm font-medium ';
                            if (isSubmitted) {
                                if (isCorrectSolution) {
                                    buttonClass += 'bg-green-100 border-green-400 text-green-800';
                                } else if (isSelected && !isCorrectSolution) {
                                    buttonClass += 'bg-red-100 border-red-400 text-red-800 line-through';
                                } else {
                                    buttonClass += 'bg-slate-50 border-slate-200 text-slate-500 opacity-60';
                                }
                            } else {
                                buttonClass += isSelected ? 'bg-primary/10 border-primary' : 'bg-slate-50 hover:bg-slate-100 border-slate-200';
                            }
                            
                            return (
                            <button
                                key={optionIdx}
                                onClick={() => handleInputChange(index, 0, option)}
                                disabled={isSubmitted}
                                className={buttonClass}
                            >
                                {option}
                            </button>
                            );
                        })}
                        </div>
                        {isSubmitted && userAnswer !== item.solution && (
                        <div className="mt-2 text-sm">
                            <span className="font-semibold text-success">Réponse correcte : {item.solution}</span>
                        </div>
                        )}
                    </li>
                    );
                })}
            </ul>
        );
      default:
        return <p>Type d'exercice non supporté.</p>;
    }
  };

  return (
    <div className="bg-background-light p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start mb-5">
        <div>
            <h3 className="font-bold text-lg text-secondary-dark mb-1">
                <span className="text-primary">Exercice {exerciseNumber}</span>
            </h3>
            <p className="text-secondary">{exercise.instructions}</p>
        </div>
        {isSubmitted && score && (
            <div className="text-right flex-shrink-0 ml-4">
                <p className="font-bold text-lg text-secondary-dark">Score : {score.correct}/{score.total}</p>
                {isAllCorrect && <p className="text-amber-500 font-semibold">🏆 Parfait !</p>}
            </div>
        )}
      </div>

      <div className="mb-5">
        {renderContent()}
      </div>
      
      <button onClick={handleSubmitClick} className="bg-primary hover:bg-primary-dark text-primary-contrast font-bold py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm">
        {isSubmitted ? 'Recommencer' : 'Vérifier mes réponses'}
      </button>
      
      {renderFeedback()}

      {isSubmitted && isTranslationExercise && (
        <div className="mt-4">
          <button
            onClick={handleGenerateTranslation}
            disabled={isGeneratingTranslation}
            className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary-dark disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md disabled:cursor-not-allowed"
          >
            {isGeneratingTranslation ? <RefreshIcon className="animate-spin" /> : <SparklesIcon />}
            {isGeneratingTranslation ? 'Génération en cours...' : 'Générer une autre traduction ✨'}
          </button>
          {generationError && <p className="text-danger text-center mt-2 font-medium">{generationError}</p>}
        </div>
      )}

      {isSubmitted && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="font-semibold text-secondary-dark flex items-center gap-2 mb-3">
            <LightBulbIcon className="text-primary" />
            <span>Besoin d'aide ? Posez une question sur cet exercice.</span>
          </h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={clarificationQuestion}
              onChange={(e) => setClarificationQuestion(e.target.value)}
              placeholder="Ex: Pourquoi 'alegría' prend un accent sur le 'i' ?"
              className="flex-grow px-3 py-2 border-2 border-slate-200 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-colors bg-white"
              aria-label="Poser une question sur l'exercice"
            />
            <button
              onClick={handleClarificationRequest}
              disabled={isClarifying || !clarificationQuestion.trim()}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark disabled:bg-slate-400 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed"
            >
              {isClarifying ? <RefreshIcon className="animate-spin" /> : 'Expliquer'}
            </button>
          </div>

          {isClarifying && <p className="text-secondary mt-3 text-sm animate-pulse">{clarificationLoadingMessage}</p>}
          {clarificationError && <p className="text-danger mt-3">{clarificationError}</p>}

          {clarificationAnswer && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border-l-4 border-primary/20">
                <div 
                    className="prose prose-sm max-w-none text-secondary-dark prose-strong:text-secondary-dark"
                    dangerouslySetInnerHTML={{ __html: clarificationAnswer }} 
                />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
