import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { chartGroups, getQuestionsByChartGroup } from "../data/questions"; // Asegúrate de que el import apunte a questions.ts actualizado
import RadarChart from "./charts/RadarChart";
import BarChart from "./charts/BarChart";
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
    const governanceScore = calculateCategoryScore(chartGroups.edmScore);
    const strategyScore = calculateCategoryScore(chartGroups.apoScore);
    const implementationScore = calculateCategoryScore(chartGroups.baiScore);
    const serviceScore = calculateCategoryScore(chartGroups.dssScore);
    const improvementScore = calculateCategoryScore(chartGroups.meaScore);

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
        const findDomainWithLargestGap = () => {
            const scores = [
                governanceScore,
                strategyScore,
                implementationScore,
                serviceScore,
                improvementScore,
            ];
            const domains = ["EDM", "APO", "BAI", "DSS", "MEA"];
            const gaps = scores.map((score) => 4 - score);
            const maxGapIndex = gaps.indexOf(Math.max(...gaps));
            return domains[maxGapIndex];
        };
        const resumenData = [
            ["INFORMACIÓN GENERAL"],
            ["Empresa", companyName],
            ["Sector", sector],
            ["Fecha de evaluación", formatDate(evaluationDate)],
            ["Responsable", answers.q04 || "N/A"],
            ["Email", answers.q05 || "N/A"],
            ["Empleados", answers.q03 || "N/A"],
            [],
            ["PUNTUACIONES DETALLADAS"],
            ["Puntuación Global", overallScore.toFixed(2)],
            ["EDM - Evaluar, Dirigir y Monitorear", governanceScore.toFixed(2)],
            ["APO - Alinear, Planear y Organizar", strategyScore.toFixed(2)],
            [
                "BAI - Construir, Adquirir, Implementar",
                implementationScore.toFixed(2),
            ],
            ["DSS - Entregar, Servicio, Soporte", serviceScore.toFixed(2)],
            ["MEA - Monitorear, Evaluar, Valorar", improvementScore.toFixed(2)],
            [],
            ["ESTADÍSTICAS RESUMEN"],
            [
                "Dominios en nivel crítico (< 2)",
                [
                    governanceScore,
                    strategyScore,
                    implementationScore,
                    serviceScore,
                    improvementScore,
                ].filter((s) => s < 2).length,
            ],
            [
                "Dominios que requieren mejora (2-3)",
                [
                    governanceScore,
                    strategyScore,
                    implementationScore,
                    serviceScore,
                    improvementScore,
                ].filter((s) => s >= 2 && s < 3).length,
            ],
            [
                "Dominios en nivel aceptable (≥ 3)",
                [
                    governanceScore,
                    strategyScore,
                    implementationScore,
                    serviceScore,
                    improvementScore,
                ].filter((s) => s >= 3).length,
            ],
            ["Dominio con mayor brecha", findDomainWithLargestGap()],
            [
                "Recomendación principal",
                overallScore < 2.5
                    ? "Enfoque en fundamentos básicos de gobernanza"
                    : overallScore < 3.5
                    ? "Optimización de procesos existentes"
                    : "Mejora continua y automatización",
            ],
        ];

        // Exportar todas las preguntas y respuestas
        const allChartGroups = Object.values(chartGroups);
        const allQuestions = allChartGroups.flatMap((group) =>
            getQuestionsByChartGroup(group)
        );

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

        const brechasData = [
            [
                "Dominio",
                "Puntuación Actual",
                "Objetivo",
                "Brecha",
                "Nivel de Prioridad",
                "Estado",
            ],
            [
                "EDM",
                governanceScore.toFixed(2),
                "4.00",
                (4 - governanceScore).toFixed(2),
                governanceScore < 2
                    ? "Alta"
                    : governanceScore < 3
                    ? "Media"
                    : "Baja",
                governanceScore >= 3 ? "Aceptable" : "Requiere Mejora",
            ],
            [
                "APO",
                strategyScore.toFixed(2),
                "4.00",
                (4 - strategyScore).toFixed(2),
                strategyScore < 2
                    ? "Alta"
                    : strategyScore < 3
                    ? "Media"
                    : "Baja",
                strategyScore >= 3 ? "Aceptable" : "Requiere Mejora",
            ],
            [
                "BAI",
                implementationScore.toFixed(2),
                "4.00",
                (4 - implementationScore).toFixed(2),
                implementationScore < 2
                    ? "Alta"
                    : implementationScore < 3
                    ? "Media"
                    : "Baja",
                implementationScore >= 3 ? "Aceptable" : "Requiere Mejora",
            ],
            [
                "DSS",
                serviceScore.toFixed(2),
                "4.00",
                (4 - serviceScore).toFixed(2),
                serviceScore < 2 ? "Alta" : serviceScore < 3 ? "Media" : "Baja",
                serviceScore >= 3 ? "Aceptable" : "Requiere Mejora",
            ],
            [
                "MEA",
                improvementScore.toFixed(2),
                "4.00",
                (4 - improvementScore).toFixed(2),
                improvementScore < 2
                    ? "Alta"
                    : improvementScore < 3
                    ? "Media"
                    : "Baja",
                improvementScore >= 3 ? "Aceptable" : "Requiere Mejora",
            ],
        ];

        const getMaturityLevel = (score: number) => {
            if (score < 1)
                return {
                    level: 0,
                    name: "Inexistente",
                    description: "No hay procesos identificados",
                };
            if (score < 2)
                return {
                    level: 1,
                    name: "Inicial",
                    description: "Procesos ad-hoc y desorganizados",
                };
            if (score < 3)
                return {
                    level: 2,
                    name: "Repetible",
                    description: "Procesos básicos establecidos",
                };
            if (score < 4)
                return {
                    level: 3,
                    name: "Definido",
                    description: "Procesos documentados y comunicados",
                };
            if (score < 5)
                return {
                    level: 4,
                    name: "Gestionado",
                    description: "Procesos monitoreados y medidos",
                };
            return {
                level: 5,
                name: "Optimizado",
                description: "Procesos en mejora continua",
            };
        };

        const madurezData = [
            [
                "Dominio",
                "Puntuación",
                "Nivel",
                "Nombre del Nivel",
                "Descripción",
            ],
            [
                "EDM",
                governanceScore.toFixed(2),
                getMaturityLevel(governanceScore).level,
                getMaturityLevel(governanceScore).name,
                getMaturityLevel(governanceScore).description,
            ],
            [
                "APO",
                strategyScore.toFixed(2),
                getMaturityLevel(strategyScore).level,
                getMaturityLevel(strategyScore).name,
                getMaturityLevel(strategyScore).description,
            ],
            [
                "BAI",
                implementationScore.toFixed(2),
                getMaturityLevel(implementationScore).level,
                getMaturityLevel(implementationScore).name,
                getMaturityLevel(implementationScore).description,
            ],
            [
                "DSS",
                serviceScore.toFixed(2),
                getMaturityLevel(serviceScore).level,
                getMaturityLevel(serviceScore).name,
                getMaturityLevel(serviceScore).description,
            ],
            [
                "MEA",
                improvementScore.toFixed(2),
                getMaturityLevel(improvementScore).level,
                getMaturityLevel(improvementScore).name,
                getMaturityLevel(improvementScore).description,
            ],
        ];

        // Crear workbook y hojas
        const wb = XLSX.utils.book_new();
        const wsResumen = XLSX.utils.aoa_to_sheet(resumenData);
        const wsPreguntas = XLSX.utils.aoa_to_sheet(preguntasData);
        const wsBrechas = XLSX.utils.aoa_to_sheet(brechasData);
        const wsMadurez = XLSX.utils.aoa_to_sheet(madurezData);

        XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen");
        XLSX.utils.book_append_sheet(wb, wsPreguntas, "Preguntas");
        XLSX.utils.book_append_sheet(wb, wsBrechas, "Brechas");
        XLSX.utils.book_append_sheet(wb, wsMadurez, "Matriz de Madurez");

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
                                {companyName} - {sector} (
                                {formatDate(evaluationDate)})
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
                        description="Promedio de Alinear, Planear y Organizar"
                        color="green"
                        maxScore={5}
                    />
                    <ScoreCard
                        title="BAI"
                        score={implementationScore}
                        description="Promedio de Construir, Adquirir, Implementar"
                        color="teal"
                        maxScore={5}
                    />
                    <ScoreCard
                        title="DSS"
                        score={serviceScore}
                        description="Promedio de Entregar, Servicio, Soporte"
                        color="green"
                        maxScore={5}
                    />
                    <ScoreCard
                        title="MEA"
                        score={improvementScore}
                        description="Promedio de Monitorear, Evaluar, Valorar"
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
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Análisis de Brechas por Dominio
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    name: "EDM",
                                    score: governanceScore,
                                    target: 4,
                                },
                                {
                                    name: "APO",
                                    score: strategyScore,
                                    target: 4,
                                },
                                {
                                    name: "BAI",
                                    score: implementationScore,
                                    target: 4,
                                },
                                { name: "DSS", score: serviceScore, target: 4 },
                                {
                                    name: "MEA",
                                    score: improvementScore,
                                    target: 4,
                                },
                            ].map((domain) => {
                                const gap = domain.target - domain.score;
                                return (
                                    <div
                                        key={domain.name}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                    >
                                        <span className="font-medium">
                                            {domain.name}
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-600">
                                                Actual:{" "}
                                                {domain.score.toFixed(1)} |
                                                Objetivo: {domain.target}
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${
                                                    gap > 1
                                                        ? "bg-red-100 text-red-800"
                                                        : gap > 0.5
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                Brecha: {gap.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Matriz de Priorización de Mejoras
                        </h2>
                        <div className="grid grid-row-1 md:grid-rows-1 gap-4">
                            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                <h3 className="font-medium text-red-800 mb-2">
                                    Alta Prioridad
                                </h3>
                                <ul className="text-sm text-red-700 space-y-1">
                                    {[
                                        governanceScore,
                                        strategyScore,
                                        implementationScore,
                                        serviceScore,
                                        improvementScore,
                                    ]
                                        .map((score, idx) => ({
                                            score,
                                            domain: [
                                                "EDM",
                                                "APO",
                                                "BAI",
                                                "DSS",
                                                "MEA",
                                            ][idx],
                                        }))
                                        .filter((item) => item.score < 2)
                                        .map((item) => (
                                            <li key={item.domain}>
                                                • {item.domain} - Puntuación:{" "}
                                                {item.score.toFixed(1)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                                <h3 className="font-medium text-yellow-800 mb-2">
                                    Prioridad Media
                                </h3>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    {[
                                        governanceScore,
                                        strategyScore,
                                        implementationScore,
                                        serviceScore,
                                        improvementScore,
                                    ]
                                        .map((score, idx) => ({
                                            score,
                                            domain: [
                                                "EDM",
                                                "APO",
                                                "BAI",
                                                "DSS",
                                                "MEA",
                                            ][idx],
                                        }))
                                        .filter(
                                            (item) =>
                                                item.score >= 2 &&
                                                item.score < 3
                                        )
                                        .map((item) => (
                                            <li key={item.domain}>
                                                • {item.domain} - Puntuación:{" "}
                                                {item.score.toFixed(1)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="bg-green-50 border-l-4 border-green-500 p-4">
                                <h3 className="font-medium text-green-800 mb-2">
                                    Mantener
                                </h3>
                                <ul className="text-sm text-green-700 space-y-1">
                                    {[
                                        governanceScore,
                                        strategyScore,
                                        implementationScore,
                                        serviceScore,
                                        improvementScore,
                                    ]
                                        .map((score, idx) => ({
                                            score,
                                            domain: [
                                                "EDM",
                                                "APO",
                                                "BAI",
                                                "DSS",
                                                "MEA",
                                            ][idx],
                                        }))
                                        .filter((item) => item.score >= 3)
                                        .map((item) => (
                                            <li key={item.domain}>
                                                • {item.domain} - Puntuación:{" "}
                                                {item.score.toFixed(1)}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next steps */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Próximos Pasos Recomendados
                    </h2>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                        <li>
                            Revisar los resultados con el equipo directivo y de
                            TI
                        </li>
                        <li>
                            Priorizar las áreas con puntuaciones más bajas para
                            acciones inmediatas
                        </li>
                        <li>
                            Desarrollar un plan de acción con responsables y
                            fechas claras
                        </li>
                        <li>Implementar medidas de seguimiento continuo</li>
                        <li>
                            Programar una reevaluación en 6-12 meses para medir
                            el progreso
                        </li>
                    </ol>
                </div>

                <div className="text-center text-gray-500 text-sm pt-8">
                    <p>
                        © 2025 - Evaluación COBIT 5 | Todos los derechos
                        reservados
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Results;
