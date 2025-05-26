import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { chartGroups, getQuestionsByChartGroup } from "../data/questions";
import RadarChart from "./charts/RadarChart";
import BarChart from "./charts/BarChart";
import ComplianceChart from "./charts/ComplianceChart";
import ScoreCard from "./ScoreCard";
import { Home, Download, FileText, RotateCcw } from "lucide-react";
import * as XLSX from "xlsx";

const Results: React.FC = () => {
  const { answers, resetForm } = useFormContext();
  const navigate = useNavigate();

  // Calculate average scores for each category
  const calculateCategoryScore = (chartGroup: string) => {
    const questions = getQuestionsByChartGroup(chartGroup);
    if (questions.length === 0) return 0;

    let sum = 0;
    let count = 0;

    questions.forEach((q) => {
      if (answers[q.id] && q.type === "escala") {
        sum += Number(answers[q.id]);
        count++;
      }
    });

    return count > 0 ? sum / count : 0;
  };

  // Get company info
  const companyName = answers.q01 || "Su Empresa";
  const sector = answers.q02 || "N/A";
  const evaluationDate = answers.q06 || new Date().toISOString().slice(0, 10);

  // Calculate scores
  const governanceScore = calculateCategoryScore(chartGroups.governanceScore);
  const strategyScore = calculateCategoryScore(chartGroups.strategyScore);
  const implementationScore = calculateCategoryScore(
    chartGroups.implementationScore
  );
  const serviceScore = calculateCategoryScore(chartGroups.serviceScore);
  const improvementScore = calculateCategoryScore(chartGroups.improvementScore);

  // Compliance data
  const complianceData = [
    { label: "Políticas", value: answers.q32 === "Sí" ? 1 : 0 },
    { label: "Auditorías", value: answers.q33 === "Sí" ? 1 : 0 },
    { label: "Capacitación", value: answers.q34 === "Sí" ? 1 : 0 },
  ];

  // Monitoring indicators
  const monitoringIndicators = answers.q35 || "";

  // Overall score (average of all category scores)
  const overallScore =
    (governanceScore +
      strategyScore +
      implementationScore +
      serviceScore +
      improvementScore) /
    5;

  // Data for radar chart
  const radarData = {
    labels: ["EDM", "APO", "BAI", "DSS", "MEA"],
    datasets: [
      {
        data: [
          governanceScore,
          strategyScore,
          implementationScore,
          serviceScore,
          improvementScore,
        ],
        backgroundColor: "rgba(74, 111, 165, 0.2)",
        borderColor: "rgba(74, 111, 165, 0.8)",
        pointBackgroundColor: "rgba(74, 111, 165, 1)",
      },
    ],
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleDownloadReport = () => {
    const resumenData = [
      ["Empresa", companyName],
      ["Sector", sector],
      ["Fecha de evaluación", formatDate(evaluationDate)],
      ["Responsable", answers.q04 || "N/A"],
      ["Email", answers.q05 || "N/A"],
      ["Empleados", answers.q03 || "N/A"],
      [],
      ["Puntuación Global", overallScore],
      ["Gobernanza", governanceScore],
      ["Estrategia", strategyScore],
      ["Implementación", implementationScore],
      ["Servicios", serviceScore],
      ["Mejora", improvementScore],
      [],
      ["Cumplimiento"],
      ...complianceData.map((c) => [c.label, c.value === 1 ? "Sí" : "No"]),
      [],
      ["Indicadores para Monitoreo"],
      ...(Array.isArray(monitoringIndicators)
        ? monitoringIndicators.map((ind: string) => [ind])
        : typeof monitoringIndicators === "string"
        ? monitoringIndicators
            .split(/\r?\n|,/)
            .filter((ind: string) => ind.trim())
            .map((ind: string) => [ind.trim()])
        : []),
    ];

    const allQuestions = Object.values(chartGroups).flatMap((group) =>
      getQuestionsByChartGroup(group)
    );

    // Construir la hoja de preguntas y respuestas
    const preguntasData = [
      ["ID", "Pregunta", "Respuesta"],
      ...allQuestions.map((q) => [
        q.id,
        q.text,
        Array.isArray(answers[q.id])
          ? answers[q.id].join(", ")
          : answers[q.id] ?? "",
      ]),
    ];

    // Crear workbook y hojas
    const wb = XLSX.utils.book_new();
    const wsResumen = XLSX.utils.aoa_to_sheet(resumenData);
    const wsPreguntas = XLSX.utils.aoa_to_sheet(preguntasData);

    XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen");
    XLSX.utils.book_append_sheet(wb, wsPreguntas, "Preguntas");

    // Descargar archivo
    XLSX.writeFile(
      wb,
      `evaluacion-cobit5-${companyName
        .toLowerCase()
        .replace(/\s+/g, "-")}-${evaluationDate}.xlsx`
    );
  };

  const handleNewEvaluation = () => {
    if (
      window.confirm(
        "¿Está seguro que desea iniciar una nueva evaluación? Se perderán todas las respuestas actuales."
      )
    ) {
      resetForm();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      <div className="bg-white shadow-md p-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Resultados de Evaluación COBIT 5
              </h1>
              <p className="text-gray-600">
                {companyName} - {sector} ({formatDate(evaluationDate)})
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadReport}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                <Download className="mr-1 h-4 w-4" />
                Descargar Informe
              </button>
              <button
                onClick={handleNewEvaluation}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
              >
                <RotateCcw className="mr-1 h-4 w-4" />
                Nueva Evaluación
              </button>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
              >
                <Home className="mr-1 h-4 w-4" />
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        {/* Overview section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ScoreCard
            title="Puntuación Global"
            score={overallScore}
            description="Promedio de todas las áreas evaluadas"
            color="blue"
            maxScore={5}
          />
          <ScoreCard
            title="EDM"
            score={governanceScore}
            description="Promedio de Evaluar, Dirigir y Monitorear"
            color="teal"
            maxScore={5}
          />
          <ScoreCard
            title="APO"
            score={strategyScore}
            description="Promedio de Alinear, Planificar y Organizar"
            color="teal"
            maxScore={5}
          />
          <ScoreCard
            title="BAI"
            score={implementationScore}
            description="Promedio de Construir, Adquirir e Implementar"
            color="green"
            maxScore={5}
          />
          <ScoreCard
            title="DSS"
            score={serviceScore}
            description="Promedio de Entregar, Servir y Soportar"
            color="green"
            maxScore={5}
          />
          <ScoreCard
            title="MEA"
            score={improvementScore}
            description="Promedio de Monitorear, Evaluar y Mejorar"
            color="green"
            maxScore={5}
          />
        </div>

        {/* Main charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Perfil de Madurez COBIT 5
            </h2>
            <div className="h-80">
              <RadarChart data={radarData} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Puntuación por Dominio
            </h2>
            <div className="h-80">
              <BarChart
                labels={["EDM", "APO", "BAI", "DSS", "MEA"]}
                data={[
                  governanceScore,
                  strategyScore,
                  implementationScore,
                  serviceScore,
                  improvementScore,
                ]}
              />
            </div>
          </div>
        </div>

        {/* Additional charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Estado de Cumplimiento
            </h2>
            <div className="h-64">
              <ComplianceChart data={complianceData} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recomendaciones
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-blue-100 p-1 rounded">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Gobernanza de TI
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {governanceScore < 3
                      ? "Priorizar la implementación de controles básicos y revisiones regulares de alineación con objetivos de negocio."
                      : "Consolidar los mecanismos existentes y documentar procesos formales de gobernanza."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-teal-100 p-1 rounded">
                  <FileText className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Estrategia y Planificación
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {strategyScore < 3
                      ? "Desarrollar un plan estratégico de TI alineado con los objetivos empresariales y gestionar proactivamente los riesgos."
                      : "Refinar el plan existente con KPIs más específicos y una asignación de recursos optimizada."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 p-1 rounded">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Implementación y Desarrollo
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {implementationScore < 3
                      ? "Establecer procesos formales de gestión de proyectos y capacitación del personal en nuevas tecnologías."
                      : "Mejorar las pruebas y validaciones antes de la implementación de cambios."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-purple-100 p-1 rounded">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Gestión de Servicios
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {serviceScore < 3
                      ? "Implementar monitoreo básico de servicios y procedimientos de gestión de incidentes."
                      : "Refinar la gestión de accesos y seguridad de la información."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Indicators section */}
        {monitoringIndicators && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Indicadores para Monitoreo
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-blue-100 p-1 rounded">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <ul className="list-disc pl-5 text-gray-700">
                    {Array.isArray(monitoringIndicators)
                      ? monitoringIndicators.map(
                          (indicator: string, idx: number) =>
                            indicator.trim() ? (
                              <li key={idx}>{indicator.trim()}</li>
                            ) : null
                        )
                      : typeof monitoringIndicators === "string"
                      ? monitoringIndicators
                          .split(/\r?\n|,/)
                          .map((indicator: string, idx: number) =>
                            indicator.trim() ? (
                              <li key={idx}>{indicator.trim()}</li>
                            ) : null
                          )
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next steps */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Próximos Pasos Recomendados
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Revisar los resultados con el equipo directivo y de TI</li>
            <li>
              Priorizar las áreas con puntuaciones más bajas para acciones
              inmediatas
            </li>
            <li>
              Desarrollar un plan de acción con responsables y fechas claras
            </li>
            <li>Implementar medidas de seguimiento continuo</li>
            <li>
              Programar una reevaluación en 6-12 meses para medir el progreso
            </li>
          </ol>
        </div>

        <div className="text-center text-gray-500 text-sm pt-8">
          <p>© 2025 - Evaluación COBIT 5 | Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default Results;
