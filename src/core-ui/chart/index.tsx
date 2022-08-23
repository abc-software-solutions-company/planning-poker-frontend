import React, {FC, memo, useEffect, useRef, useState} from 'react';

interface IProps {
  className?: string;
  data: any;
}

const Chart: FC<IProps> = ({className, data}) => {
  const [module, setModule] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const chartJs = import(/* webpackChunkName: "vendor.chartjs" */ 'chart.js');
    chartJs.then(resp => setModule(resp));

    if (!canvasRef.current || !module) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const chartModule = module;
    console.log(module);
    chartModule.Chart.register(...module.registerables);
    chartModule.Chart.register(module.plugins.Decimation);
    chartModule.Chart.register(module.plugins.Filler);
    chartModule.Chart.register(module.plugins.Legend);
    chartModule.Chart.register(module.plugins.SubTitle);
    chartModule.Chart.register(module.plugins.Tooltip);
    const chartInstance = new chartModule.Chart(ctx, data);

    return () => chartInstance.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} width="340" height="340"></canvas>
      <div className="chart-center-text">
        <p>6/6 players</p>
        <p>voted</p>
      </div>
      <div className="chart-info">
        <div className="label">
          <p>5</p>
        </div>
        <div className="label">
          <p>3</p>
        </div>
        <div className="label">
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Chart);
