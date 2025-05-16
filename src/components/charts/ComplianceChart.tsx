import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ComplianceDataItem {
  label: string;
  value: number;
}

interface ComplianceChartProps {
  data: ComplianceDataItem[];
}

const ComplianceChart: React.FC<ComplianceChartProps> = ({ data }) => {
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
          type: 'doughnut',
          data: {
            labels: data.map(item => item.label),
            datasets: [
              {
                data: data.map(item => item.value),
                backgroundColor: [
                  'rgba(74, 111, 165, 0.8)',
                  'rgba(105, 181, 120, 0.8)',
                  'rgba(92, 124, 174, 0.8)',
                ],
                borderColor: [
                  'rgba(74, 111, 165, 1)',
                  'rgba(105, 181, 120, 1)',
                  'rgba(92, 124, 174, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  padding: 20,
                  boxWidth: 12,
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw;
                    return `${label}: ${value === 1 ? 'Sí' : 'No'}`;
                  }
                }
              },
            },
            animation: {
              animateScale: true,
              animateRotate: true,
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

export default ComplianceChart;