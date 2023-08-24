import { faker } from '@faker-js/faker';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Tooltip,
  Legend
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
  // position: "right",
  // labels: {
  //   usePointStyle: true,
  //   pointStyle: "circle",
  // },
  return <Pie className={className + " max-h-full max-w-full"} options={optionPie} data={dataPie} />;
}


interface IDonutChart {
  className?: string;
  cutout?: number;
}
export function DonutChart({ className }: IDonutChart) {
  const data: ChartData<"doughnut"> = {
    labels: ['ยืนยันแล้ว', 'ยังไม่ยืนยัน'],
    datasets: [
      {
        data: [64, 20],
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
        position: 'top',
        align: 'center',
      },
    },
    cutout: "85%",
  };

  return <Doughnut className={className + " max-h-full max-w-full"} options={config} data={data} />
}

