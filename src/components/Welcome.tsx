import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Laptop, BarChart, CheckCircle } from 'lucide-react';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-teal-50">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all transform hover:scale-[1.01]">
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Evaluación COBIT 5
          </h1>
          <p className="opacity-90 text-lg">
            Diagnóstico completo de gobernanza y gestión de TI para su organización
          </p>
        </div>
        
        <div className="p-8">
          <p className="text-gray-700 mb-8 text-lg">
            Esta herramienta le permitirá evaluar el nivel de madurez en la gestión de TI de su empresa
            según el marco de referencia COBIT 5, identificando áreas de mejora y oportunidades específicas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Evaluación Detallada</h3>
                <p className="text-gray-600">35 preguntas que cubren todos los aspectos clave de COBIT 5</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Laptop className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Experiencia Fluida</h3>
                <p className="text-gray-600">Interfaz intuitiva con navegación simple y visual</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Análisis Visual</h3>
                <p className="text-gray-600">Gráficos y métricas para visualizar resultados</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Recomendaciones</h3>
                <p className="text-gray-600">Sugerencias de mejora personalizadas</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link 
              to="/evaluation" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all"
            >
              Comenzar Evaluación
            </Link>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500 text-center">
        Basado en COBIT 5 (Control Objectives for Information and Related Technologies)
        <br />
        © 2025 - Herramienta de Evaluación de Gobernanza TI
      </p>
    </div>
  );
};

export default Welcome;