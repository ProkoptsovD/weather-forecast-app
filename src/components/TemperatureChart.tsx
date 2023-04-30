import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export function TemperatureChart({ data, labels }: TemperatureChartProps) {
  return (
    <Line
      options={getChartConfig()}
      data={{
        labels,
        datasets: [
          {
            borderColor: 'rgb(237, 196, 33)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            data,
            datalabels: {
              color: '#676767',
              backgroundColor: (ctx) => {
                const canvas2D = ctx.chart.canvas.getContext('2d');
                const gradient = canvas2D?.createLinearGradient(0, 90, 90, 0);

                gradient?.addColorStop(0, '#E0FFFF');
                gradient?.addColorStop(0.5, '#FFFFBF');
                gradient?.addColorStop(1, '#FFE099');
                return gradient as CanvasGradient;
              },
              borderRadius: 4,
              anchor: 'center'
            }
          }
        ]
      }}
    />
  );
}

export type TemperatureChartProps = {
  data: string[];
  labels: ChartData['labels'];
};

function getChartConfig() {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
      title: {
        display: true,
        text: 'Temperature by hours'
      },
      tooltip: {
        enabled: true,
        showTooltips: true
      },
      datalabels: {
        color: '#36A2EB'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature in ℃',
          color: 'orangered',
          font: {
            size: 20,
            weight: '700'
          }
        },
        ticks: {
          color: 'orangered',
          font: {
            size: 16,
            weight: '500'
          },
          padding: 20
        }
      },
      x: {
        title: {
          display: true,
          text: 'Hours',
          color: '#979393',
          font: {
            size: 20,
            weight: '700'
          }
        },
        ticks: {
          color: 'skyblue',
          font: {
            size: 18,
            weight: '700'
          }
        }
      }
    }
  };
}
