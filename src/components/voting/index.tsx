import React, {useRef} from 'react';

// import VoteCard from '@/components/cards';
import LogoCopy from '@/components/icons/copy';
import Button from '@/core-ui/button';
import Chart from '@/core-ui/chart';
import Heading from '@/core-ui/heading';
import InputText from '@/core-ui/input-text';
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
  const handleOnSubmit = (data: ICreateStory) => {
    createStory(data);
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
                    labels: ['Level 0', 'Level 1', 'Level 2', 'Level 3', 'Level 5', 'Level 8', 'Level 13', 'Level 21'],
                    datasets: [
                      {
                        data: [1, 2, 3, 4, 5, 6, 7, 8],
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
                    rotation: 0.5 * Math.PI - (95 / 180) * Math.PI,
                    responsive: false,
                    plugins: {
                      title: {
                        display: true,
                        fullSize: true,
                        text: 'Multiple Lines of Text',
                        padding: {
                          top: 20,
                          bottom: 10
                        }
                      },
                      legend: {
                        position: 'bottom',
                        fullWidth: true,
                        labels: {
                          usePointStyle: true,
                          boxWidth: 8
                        }
                      },
                      doughnutLabel: {
                        labels: [
                          {
                            text: 'The Title',
                            color: 'blue',
                            font: {
                              size: '35',
                              family: 'Arial, Helvetica, sans-serif',
                              style: 'italic',
                              weight: 'bold'
                            }
                          },
                          {
                            text: 'The Subtitle',
                            font: {
                              size: '25'
                            },
                            color: 'grey'
                          },
                          {
                            text: '$100.00',
                            font: {
                              size: '20'
                            },
                            color: 'red'
                          },
                          {
                            font: {
                              size: '20'
                            },
                            color: 'green'
                          }
                        ]
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
              <ModalCreate
                placeholder="Enter story "
                title="Create New Story"
                open={open}
                onClose={handleClose}
                handleOnSubmit={handleOnSubmit}
              />

              <div className="sharing">
                <h5>Invite a teammate</h5>
                <div className="share-link">
                  <InputText value="https://www.google.com.vn/"></InputText>
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
