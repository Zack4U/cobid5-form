import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EvaluationForm from './components/EvaluationForm';
import Results from './components/Results';
import Welcome from './components/Welcome';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <FormProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/evaluation" element={<EvaluationForm />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;