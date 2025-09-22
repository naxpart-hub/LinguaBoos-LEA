
import React from 'react';
import { XCircleIcon } from './Icons';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">{title} - Théorie</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <XCircleIcon />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <div 
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
        <footer className="p-4 bg-slate-50 border-t border-slate-200 text-right rounded-b-xl">
            <button onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Fermer
            </button>
        </footer>
      </div>
    </div>
  );
};
