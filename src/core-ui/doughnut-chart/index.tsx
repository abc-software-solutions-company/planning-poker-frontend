import chartPluginDataLabels from 'chartjs-plugin-datalabels';
import React, {FC, useEffect, useRef, useState} from 'react';

export interface IChartData {
  label: string;
  value: number;
  color: string;
}

interface IProps {
  className?: string;
  chartData: IChartData[];
}

const DoughnutChart: FC<IProps> = ({className, chartData}) => {
  const [module, setModule] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const chartJs = import('chart.js');
    chartJs.then(resp => setModule(resp));

    if (!canvasRef.current || !module) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const chartModule = module;
    const data = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            labels: chartData.map(({label}) => label),
            data: chartData.map(({value}) => value),
            backgroundColor: chartData.map(({color}) => color),
            datalabels: {
              color: '#fff',
              textAlign: 'center',
              weight: 'bold',
              font: {
                size: 24,
                lineHeight: 3,
                family: 'Mulish'
              }
            }
          }
        ]
      },
      options: {
        aspectRatio: 1,
        cutout: '70%',
        responsive: true,
        borderWidth: 0,
        plugins: {
          tooltip: {
            enabled: false
          },
          legend: {
            position: 'center',
            fullWidth: true,
            labels: {
              usePointStyle: true,
              boxWidth: 8
            }
          },
          datalabels: {
            formatter: function (value: any, context: any) {
              if (value) return context.dataset.labels[context.dataIndex] as string;
              return '';
            }
          }
        }
      }
    };
    chartModule.Chart.register(...module.registerables);
    chartModule.Chart.register(module.plugins.Decimation);
    chartModule.Chart.register(module.plugins.Filler);
    chartModule.Chart.register(module.plugins.Legend);
    chartModule.Chart.register(module.plugins.SubTitle);
    chartModule.Chart.register(module.plugins.Tooltip);
    chartModule.Chart.register(chartPluginDataLabels);
    const chartInstance = new chartModule.Chart(ctx, data);

    return () => chartInstance.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module]);

  return <canvas className={className} ref={canvasRef} />;
};

export default DoughnutChart;
