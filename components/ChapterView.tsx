
import React, { useState } from 'react';
import { generateNewExercise } from '../services/geminiService';
import type { Chapter, Exercise } from '../types';
import { ExerciseCard } from './ExerciseCard';
import { QuizView } from './QuizView';
import { BrainIcon, SparklesIcon, DocumentTextIcon, RefreshIcon } from './Icons';

interface ChapterViewProps {
  chapter: Chapter;
  onShowTheory: () => void;
  onAddExercise: (newExercise: Exercise) => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter, onShowTheory, onAddExercise }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateExercise = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newExercise = await generateNewExercise(chapter.title, chapter.exercises[0].type);
      if (newExercise) {
        onAddExercise(newExercise);
      } else {
        setError("L'IA n'a pas pu générer un nouvel exercice. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Failed to generate exercise:", err);
      setError("Une erreur est survenue lors de la génération de l'exercice. Consultez la console pour plus de détails.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 bg-background-light rounded-xl shadow-sm border border-slate-200">
        <div>
            <h2 className="text-2xl font-bold text-secondary-dark">{chapter.title}</h2>
            <p className="text-secondary mt-1">Complétez les exercices et testez vos connaissances.</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={onShowTheory} className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-secondary-dark font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm">
            <DocumentTextIcon />
            Revoir la théorie
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {chapter.exercises.map((exercise, index) => (
          <ExerciseCard 
            key={exercise.id} 
            exercise={exercise} 
            exerciseNumber={index + 1}
            chapterTitle={chapter.title}
            onAddExercise={onAddExercise}
          />
        ))}
      </div>
        
      <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary/50 rounded-r-lg">
          <button 
              onClick={handleGenerateExercise}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-primary-contrast font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
              {isGenerating ? <RefreshIcon className="animate-spin" /> : <SparklesIcon />}
              {isGenerating ? "Génération en cours..." : "Générer un nouvel exercice avec l'IA ✨"}
          </button>
          {error && <p className="text-danger text-center mt-2 font-medium">{error}</p>}
      </div>

      <div className="mt-10 p-6 bg-background-light rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-secondary-dark flex items-center gap-2 mb-4">
          <BrainIcon />
          Mini-Quiz de révision
        </h3>
        <QuizView quiz={chapter.quiz} chapterTitle={chapter.title} />
      </div>
    </div>
  );
};
