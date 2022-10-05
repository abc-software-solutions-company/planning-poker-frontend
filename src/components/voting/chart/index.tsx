import {FC} from 'react';

import Button from '@/core-ui/button';
import DoughnutChart, {IChartData} from '@/core-ui/doughnut-chart';

interface IProps {
  className?: string;
  votedInfo?: string;
  chartData: IChartData[];
  showBtnNextStory?: boolean;
  onClickNext: () => void;
}

const Chart: FC<IProps> = ({className, votedInfo, chartData, showBtnNextStory, onClickNext}) => {
  return (
    <div className={className}>
      <div className="chart">
        <DoughnutChart chartData={chartData} />
        <div className="chart-center-text">
          <p>{votedInfo} players</p>
          <p className="opacity-50">voted</p>
          {showBtnNextStory && (
            <Button
              className="chart-center-btn"
              variant="outlined"
              color="primary"
              text="Next Story"
              onClick={onClickNext}
            />
          )}
        </div>
      </div>
      <div className="chart-info">
        {chartData
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value)
          .map((item, index, arr) => {
            const fontSize = 23 - item.label.length * 3;
            return (
              <div key={index} className="label">
                <div className="wrapper">
                  <p className="value" style={{backgroundColor: item.color, fontSize}}>
                    {item.label}
                  </p>
                </div>
                {item.value === arr[0].value && <span className="most">Most</span>}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chart;
