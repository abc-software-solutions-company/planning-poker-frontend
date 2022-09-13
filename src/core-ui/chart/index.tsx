import React, {FC, useEffect, useRef, useState} from 'react';

import {COLORVOTE, FIBONACCI} from '@/utils/constant';

interface IProps {
  className?: string;
  voted: (number | null)[];
}

const Chart: FC<IProps> = ({className, voted}) => {
  const [module, setModule] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lenVotedUser = voted.filter(v => v !== null).length;
  const lenUsers = voted.length;
  const backgroundColor: string[] = Object.values(COLORVOTE);
  const sortedArray: {value: number; len: number; color: string}[] = FIBONACCI.map((item, index) => {
    return {value: item, len: voted.filter(v => v === item).length, color: backgroundColor[index]};
  }).sort((a, b) => b.len - a.len);

  useEffect(() => {}, [voted]);

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
            data: FIBONACCI.map(num => voted.filter(v => v === num).length),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} width="338" height="338"></canvas>
      <div className="chart-center-text">
        <p>{`${lenVotedUser}/${lenUsers}`} players</p>
        <p>voted</p>
      </div>
      <div className="chart-info">
        {sortedArray
          .filter(item => item.len > 0)
          .map((item, index) => {
            return (
              <div key={index} className={'label'}>
                <div className="circle" style={{backgroundColor: item.color}}></div>
                <div>{item.value}</div>
                {item.len === sortedArray[0].len && <span className="most">Most</span>}
                <div className="result"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chart;
