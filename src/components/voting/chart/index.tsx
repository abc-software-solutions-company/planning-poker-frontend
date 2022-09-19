import {FC} from 'react';

import Button from '@/core-ui/button';
import DoughnutChart from '@/core-ui/doughnut-chart';
import {CHARTCOLORS, FIBONACCI} from '@/utils/constant';

interface IProps {
  className?: string;
  votedData: (number | null)[];
  showBtnNextStory?: boolean;
  onClickNext: () => void;
}

const Chart: FC<IProps> = ({className, votedData, showBtnNextStory, onClickNext}) => {
  const numVotedUser = votedData.filter(point => point !== undefined && point !== null).length || 0;
  const numJoinUser = votedData.length || 0;

  const backgroundColor = Object.values(CHARTCOLORS);
  const sortedArray: {value: number; len: number; color: string}[] = FIBONACCI.map((item, index) => {
    return {value: item, len: votedData.filter(v => v === item).length, color: backgroundColor[index]};
  }).sort((a, b) => b.len - a.len);

  return (
    <div className={className}>
      <div className="chart">
        <DoughnutChart votedData={votedData} />
        <div className="chart-center-text">
          <p>{`${numVotedUser}/${numJoinUser}`} players</p>
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
        {sortedArray
          .filter(item => item.len == sortedArray[0].len)
          .map((item, index) => {
            return (
              <div key={index} className="label">
                <div className="wrapper">
                  <p className="value" style={{backgroundColor: item.color}}>
                    {item.value}
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
