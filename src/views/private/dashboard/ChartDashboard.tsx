import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Tooltip,
  Legend,
  ChartDataLabels,
);
interface IPieChart {
  className?: string;
}
export function PieChart({ className }: IPieChart) {
  const dataPie: ChartData<"pie"> = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],

  };
  const optionPie: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
      },
    }
  }
  return <Pie className={className + " max-h-full max-w-full"} options={optionPie} data={dataPie} />;
}


interface IDonutChart {
  className?: string;
  cutout?: number;
  data?: number[];
  labels?: string[];
}

export function DonutChart({ className, cutout = 85, data = [64, 20], labels = ['ยืนยันแล้ว', 'ยังไม่ยืนยัน'] }: IDonutChart) {
  const raw: ChartData<"doughnut"> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
      }
    ],
  };

  const config: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        align: 'center',
        // labels: {
        //   generateLabels: (chart) => {
        //     const datasets = chart.data.datasets ?? [];
        //     const dataLabels = chart.data.labels ?? [];
        //     return datasets[0]?.data.map((data, i) => ({
        //       text: `${dataLabels[i]} ${data}`,
        //       index: i
        //     })) ?? [];
        //   }
        // }
      },
      datalabels: {
        color: '#b2b2b2'
      }
    },
    cutout: cutout,
  };

  return <Doughnut className={className + " max-h-full max-w-full"} options={config} data={raw} />
}

