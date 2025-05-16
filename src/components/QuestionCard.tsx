import React from "react";
import { Question } from "../data/questions";
import { useFormContext } from "../context/FormContext";
import TextInput from "./inputs/TextInput";
import NumberInput from "./inputs/NumberInput";
import EmailInput from "./inputs/EmailInput";
import DateInput from "./inputs/DateInput";
import SelectInput from "./inputs/SelectInput";
import ScaleInput from "./inputs/ScaleInput";
import SelectMultipleInput from "./inputs/SelectMultipleInput";

interface QuestionCardProps {
  question: Question;
  isActive: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, isActive }) => {
  const { answers, handleSetAnswer } = useFormContext();

  const renderInput = () => {
    switch (question.type) {
      case "texto_abierto":
        return (
          <TextInput
            value={answers[question.id] || ""}
            onChange={(value) => handleSetAnswer(question.id, value)}
            isActive={isActive}
          />
        );
      case "numero":
        return (
          <NumberInput
            value={answers[question.id] || ""}
            onChange={(value) => handleSetAnswer(question.id, value)}
            isActive={isActive}
          />
        );
      case "email":
        return (
          <EmailInput
            value={answers[question.id] || ""}
            onChange={(value) => handleSetAnswer(question.id, value)}
            isActive={isActive}
          />
        );
      case "fecha":
        return (
          <DateInput
            value={answers[question.id] || ""}
            onChange={(value) => handleSetAnswer(question.id, value)}
            isActive={isActive}
          />
        );
      case "seleccion":
        return (
          <SelectInput
            value={answers[question.id] || ""}
            options={question.respuestas || []}
            onChange={(value) => handleSetAnswer(question.id, value)}
            isActive={isActive}
          />
        );
      case "seleccion_multiple":
        return (
          <SelectMultipleInput
            value={answers[question.id] || ""}
            options={question.respuestas || []}
            onChange={(value) => handleSetAnswer(question.id, value)}
            isActive={isActive}
          />
        );
      case "escala":
        return (
          <ScaleInput
            value={answers[question.id] || 0}
            options={(question.respuestas as number[]) || [1, 2, 3, 4, 5]}
            onChange={(value) => handleSetAnswer(question.id, value)}
            isActive={isActive}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 ${
        isActive ? "transform hover:shadow-lg" : ""
      }`}
    >
      <div className="p-6">
        <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-4">
          {question.text}
        </h3>
        {renderInput()}
      </div>
    </div>
  );
};

export default QuestionCard;
