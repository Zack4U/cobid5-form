import React, { createContext, useState, useContext, ReactNode } from 'react';
import { questionsArray, Question } from '../data/questions';

interface FormContextType {
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  isLastQuestion: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSetAnswer: (questionId: string, value: any) => void;
  questions: Question[];
  getCurrentQuestion: () => Question | null;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = questionsArray;
  
  const progress = Math.round(((currentQuestionIndex) / questions.length) * 100);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSetAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const getCurrentQuestion = (): Question | null => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      return questions[currentQuestionIndex];
    }
    return null;
  };
  
  const resetForm = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
  };
  
  const value = {
    answers,
    setAnswers,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    progress,
    isLastQuestion,
    handleNext,
    handlePrevious,
    handleSetAnswer,
    questions,
    getCurrentQuestion,
    resetForm
  };
  
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};