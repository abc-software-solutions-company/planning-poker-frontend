import {FC} from 'react';

import Button from '@/core-ui/button';
import Chart from '@/core-ui/chart';
import {CHARTCOLORS, FIBONACCI} from '@/utils/constant';

interface IProps {
  className?: string;
  voted: (number | null)[];
}

const ComChart: FC<IProps> = ({className, voted}) => {
  const lenVotedUser = voted.filter(v => v !== null).length;
  const lenUsers = voted.length;

  const backgroundColor = Object.values(CHARTCOLORS);
  const sortedArray: {value: number; len: number; color: string}[] = FIBONACCI.map((item, index) => {
    return {value: item, len: voted.filter(v => v === item).length, color: backgroundColor[index]};
  }).sort((a, b) => b.len - a.len);

  return (
    <div className={className}>
      <div className="chart">
        <Chart voted={voted} />
        <div className="chart-center-text z-40">
          <p>{`${lenVotedUser}/${lenUsers}`} players</p>
          <p>voted</p>
          {/* //FIXME: button to create next story */}
          <Button
            className="mt-3 block py-2.5 sm:hidden"
            variant="outlined"
            color="primary"
            text="Next Story"
            onClick={() => alert()}
          />
        </div>
      </div>

      <div className="chart-info">
        {sortedArray
          .filter(item => item.len > 0)
          .map((item, index) => {
            return (
              <>
                {item.len === sortedArray[0].len && (
                  <div key={index} className="label">
                    <div className="wrapper">
                      <p className="value" style={{backgroundColor: item.color}}>
                        {item.value}
                      </p>
                    </div>
                    <span className="most">Most</span>
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ComChart;
