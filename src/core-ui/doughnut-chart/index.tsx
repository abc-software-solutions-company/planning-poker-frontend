import chartPluginDataLabels from 'chartjs-plugin-datalabels';
import React, {FC, useEffect, useRef, useState} from 'react';

import {CHARTCOLORS, FIBONACCI} from '@/utils/constant';

interface IProps {
  className?: string;
  votedData: (number | null)[];
}

const DoughnutChart: FC<IProps> = ({className, votedData}) => {
  const [module, setModule] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundColor = Object.values(CHARTCOLORS);
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
            labels: FIBONACCI.map(e => String(e)),
            data: FIBONACCI.map(num => votedData.filter(v => v === num).length),
            backgroundColor,
            datalabels: {
              color: '#fff',
              textAlign: 'center',
              weight: 'bold',
              font: {
                size: 32,
                lineHeight: 3
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
