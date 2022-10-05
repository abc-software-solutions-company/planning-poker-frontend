import {FC} from 'react';

import Button from '@/core-ui/button';
import DoughnutChart, {IChartData} from '@/core-ui/doughnut-chart';
import useRoom from '@/hooks/useRoom';
import {CHARTCOLORS, StoryTypes} from '@/utils/constant';

interface IProps {
  className?: string;
  votedInfo?: string;
  showBtnNextStory?: boolean;
  onClickNext: () => void;
}

const Chart: FC<IProps> = ({className, votedInfo, showBtnNextStory, onClickNext}) => {
  const {roomData} = useRoom();
  const storyType = roomData?.story?.type || 'Fibonacci';

  const backgroundColor = Object.values(CHARTCOLORS);
  const chartData: IChartData[] = Object.keys(StoryTypes[storyType]).map((value, index) => {
    return {
      label: StoryTypes[storyType][Number(value)],
      value: roomData?.users.filter(({votePoint}) => votePoint === Number(value)).length || 0,
      color: String(backgroundColor[index])
    };
  });

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
          .map((item, index) => {
            return (
              <div key={index} className="label">
                <div className="wrapper">
                  <p className="value" style={{backgroundColor: item.color}}>
                    {item.label}
                  </p>
                </div>
                <span className="most">Most</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chart;
