import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import { ArrowRight, ArrowLeft, BarChart, RotateCcw } from 'lucide-react';

const EvaluationForm: React.FC = () => {
  const navigate = useNavigate();
  const formEndRef = useRef<HTMLDivElement>(null);
  const { 
    questions, 
    currentQuestionIndex,
    answers,
    progress, 
    isLastQuestion,
    handleNext,
    handlePrevious,
    resetForm
  } = useFormContext();

  useEffect(() => {
    if (formEndRef.current) {
      formEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentQuestionIndex]);

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!answers[currentQuestion.id] || answers[currentQuestion.id] === '') {
      alert('Por favor, responda la pregunta antes de continuar.');
      return;
    }
    navigate('/results');
  };

  const handleReset = () => {
    if (window.confirm('¿Está seguro que desea iniciar una nueva evaluación? Se perderán todas las respuestas actuales.')) {
      resetForm();
      navigate('/');
    }
  };

  const canAdvance = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return answers[currentQuestion.id] && answers[currentQuestion.id] !== '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      <div className="sticky top-0 z-10 bg-white shadow-md p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold text-gray-800">Evaluación COBIT 5</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleReset}
                className="text-gray-600 hover:text-gray-800 transition-colors"
                title="Iniciar nueva evaluación"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <div className="text-sm text-gray-600 font-medium">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </div>
            </div>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-8">
        {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
          <div 
            key={question.id}
            className={`mb-8 transition-opacity duration-500 ${
              index < currentQuestionIndex ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <QuestionCard 
              question={question} 
              isActive={index === currentQuestionIndex}
            />
          </div>
        ))}
        
        <div ref={formEndRef} className="flex justify-center gap-4 mt-8">
          {currentQuestionIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Anterior
            </button>
          )}
          
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!canAdvance()}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                canAdvance()
                  ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              <BarChart className="mr-2 h-5 w-5" />
              Ver Resultados
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canAdvance()}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                canAdvance()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              Siguiente
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;