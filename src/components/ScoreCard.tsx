import React from 'react';

interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  color: 'blue' | 'teal' | 'green' | 'purple';
  maxScore: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ 
  title, 
  score, 
  description, 
  color,
  maxScore
}) => {
  // Round to 1 decimal
  const roundedScore = Math.round(score * 10) / 10;
  
  // Calculate percentage
  const percentage = (roundedScore / maxScore) * 100;
  
  // Determine color classes
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-700',
      light: 'bg-blue-100'
    },
    teal: {
      bg: 'bg-teal-500',
      text: 'text-teal-700',
      light: 'bg-teal-100'
    },
    green: {
      bg: 'bg-green-500',
      text: 'text-green-700',
      light: 'bg-green-100'
    },
    purple: {
      bg: 'bg-purple-500',
      text: 'text-purple-700',
      light: 'bg-purple-100'
    }
  };
  
  // Determine assessment text based on score
  const getAssessment = (score: number) => {
    if (score < 2) return 'Inicial';
    if (score < 3) return 'Básico';
    if (score < 4) return 'Definido';
    if (score < 4.5) return 'Gestionado';
    return 'Optimizado';
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="flex items-end gap-3 mb-3">
        <div className="text-4xl font-bold">{roundedScore.toFixed(1)}</div>
        <div className={`${colorClasses[color].text} text-sm font-medium`}>
          / {maxScore.toFixed(1)} - {getAssessment(roundedScore)}
        </div>
      </div>
      
      <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
        <div 
          className={`h-full ${colorClasses[color].bg} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ScoreCard;