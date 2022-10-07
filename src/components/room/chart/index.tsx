import classNames from 'classnames';
import {FC} from 'react';

import Button from '@/core-ui/button';
import DoughnutChart, {IChartData} from '@/core-ui/doughnut-chart';

import style from './style.module.scss';

interface IProps {
  className?: string;
  voteInfo?: string;
  chartData?: IChartData[];
  showBtnNextStory?: boolean;
  onNext: () => void;
}

const Chart: FC<IProps> = ({className, voteInfo, chartData, showBtnNextStory, onNext}) => {
  return (
    <>
      {chartData && (
        <div className={classNames(style['chart-holder'], className)}>
          <div className="chart">
            <DoughnutChart chartData={chartData} />
            <div className="chart-center-text">
              <p>{voteInfo} players</p>
              <p className="opacity-50">voted</p>
              {showBtnNextStory && (
                <Button
                  className="chart-center-btn"
                  variant="outlined"
                  color="primary"
                  text="Next Story"
                  onClick={onNext}
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
      )}
    </>
  );
};

export default Chart;
