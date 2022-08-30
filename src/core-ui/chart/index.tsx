import React, {FC, useEffect, useRef, useState} from 'react';

import {IFullUSR} from '@/types';

interface IProps {
  className?: string;
  USRs: IFullUSR[] | undefined;
}

const Chart: FC<IProps> = ({className, USRs}) => {
  const FIBONACCI: number[] = [0, 1, 2, 3, 5, 8, 13, 21];
  const [module, setModule] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lenVotedUser = USRs?.filter(e => e.storyPoint !== null).length;
  const lenUsers = USRs?.length;
  const backgroundColor: string[] = [
    '#56CCF2',
    '#4F4F4F',
    '#FBE38E',
    '#FED0EE',
    '#BB6BD9',
    '#F2994A',
    '#D14F4F',
    '#3B8260'
  ];
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
        // labels: ['0', '1', '2', '3', '5', '8', '13', '21'],
        datasets: [
          {
            data: FIBONACCI?.map(num => USRs?.filter(usr => usr.storyPoint === num).length),
            backgroundColor
          }
        ]
      },
      options: {
        aspectRatio: 1,
        cutout: 110,
        responsive: false,
        plugins: {
          legend: {
            position: 'left',
            fullWidth: true,
            labels: {
              usePointStyle: true,
              boxWidth: 8
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
    const chartInstance = new chartModule.Chart(ctx, data);

    return () => chartInstance.destroy();
  });

  return (
    <div className={className}>
      <canvas ref={canvasRef} width="338" height="338"></canvas>
      <div className="chart-center-text">
        <p>{`${lenVotedUser}/${lenUsers}`} players</p>
        <p>voted</p>
      </div>
      <div className="chart-info">
        {FIBONACCI.map((num, index) => {
          if (USRs?.filter(usr => usr.storyPoint === num).length != 0)
            return (
              <div key={index} className={`label`}>
                <p className={`after:bg-[${backgroundColor[index]}]`}>{num}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Chart;
