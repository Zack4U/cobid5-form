import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  labels: string[];
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ labels, data }) => {
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
        // Generate gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(74, 111, 165, 0.8)');
        gradient.addColorStop(1, 'rgba(74, 111, 165, 0.3)');
        
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Puntuación',
              data: data,
              backgroundColor: gradient,
              borderColor: 'rgba(74, 111, 165, 0.8)',
              borderWidth: 1,
              borderRadius: 6,
              barPercentage: 0.6,
              categoryPercentage: 0.7,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 5,
                ticks: {
                  stepSize: 1,
                },
                grid: {
                  drawBorder: false,
                },
              },
              x: {
                grid: {
                  display: false,
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
  }, [labels, data]);
  
  return <canvas ref={chartRef} />;
};

export default BarChart;