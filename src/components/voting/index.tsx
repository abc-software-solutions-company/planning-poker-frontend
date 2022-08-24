import React, {useRef} from 'react';

// import VoteCard from '@/components/cards';
import LogoCopy from '@/components/icons/copy';
import ModalStory from '@/components/modal-stories';
import Button from '@/core-ui/button';
import Chart from '@/core-ui/chart';
import Heading from '@/core-ui/heading';
import Input from '@/core-ui/input';
import ModalCreate from '@/core-ui/modal';
import {createStory} from '@/data/client/story.client';
import {ICreateStory, IVoteUser} from '@/types';

import styles from './style.module.scss';
import VoteUser from './voters';

interface IProps {
  dataUsers: IVoteUser[];
}
const VoteRoom: React.FC<IProps> = ({dataUsers}) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const inputLink = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputLink.current!.value);
  };

  return (
    <>
      <div className={styles['section-vote-room']}>
        <div className="container">
          <Heading className="room-name" as="h4">
            Room name
          </Heading>
          <div className="content">
            <div className="left-content">
              <Heading as="h4">Story name</Heading>
              {/* <div className="card-holder">
                <VoteCard>0</VoteCard>
                <VoteCard>1</VoteCard>
                <VoteCard>2</VoteCard>
                <VoteCard>3</VoteCard>
                <VoteCard>5</VoteCard>
                <VoteCard>8</VoteCard>
                <VoteCard>13</VoteCard>
                <VoteCard>21</VoteCard>
              </div>  */}
              <Chart
                className="chart-holder"
                data={{
                  type: 'doughnut',
                  data: {
                    // labels: ['0', '1', '2', '3', '5', '8', '13', '21'],
                    datasets: [
                      {
                        data: [0, 1, 2, 3, 5, 6, 7, 8],
                        backgroundColor: [
                          '#56CCF2',
                          '#4F4F4F',
                          '#FBE38E',
                          '#FED0EE',
                          '#BB6BD9',
                          '#F2994A',
                          '#D14F4F',
                          '#3B8260'
                        ]
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
                }}
              />
            </div>
            <div className="right-content">
              <h5 className="title">Waiting for Admin vote</h5>
              <h5 className="sub-title border-line">Players:</h5>
              {dataUsers.map(({name, host, vote}, index) => {
                return <VoteUser className="border-line" key={index} name={name} host={host} vote={vote} />;
              })}
              <div className="action border-line">
                <Button>Finish</Button>
              </div>
              <ModalStory placeholder="Enter story " title="Create New Story" open={open} onClose={handleClose} />
              <div className="sharing">
                <h5>Invite a teammate</h5>
                <div className="share-link">
                  <Input value="https://www.google.com.vn/" />
                  <button className="copy-btn" onClick={handleCopy}>
                    <LogoCopy />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteRoom;
