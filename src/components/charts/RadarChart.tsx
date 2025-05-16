import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface RadarChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor: string;
    }[];
  };
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance to prevent memory leaks
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: data.labels,
            datasets: data.datasets.map(ds => ({
              data: ds.data,
              backgroundColor: ds.backgroundColor,
              borderColor: ds.borderColor,
              pointBackgroundColor: ds.pointBackgroundColor,
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: ds.borderColor,
              borderWidth: 2,
            })),
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                beginAtZero: true,
                min: 0,
                max: 5,
                ticks: {
                  stepSize: 1,
                  display: true,
                },
                pointLabels: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: {
                  size: 14,
                },
                bodyFont: {
                  size: 13,
                },
                callbacks: {
                  label: function(context) {
                    return `Puntuación: ${context.raw}`;
                  }
                }
              },
            },
            elements: {
              line: {
                tension: 0.2,
              },
            },
            animation: {
              duration: 2000,
              easing: 'easeOutQuart',
            },
          },
        });
      }
    }
    
    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);
  
  return <canvas ref={chartRef} />;
};

export default RadarChart;