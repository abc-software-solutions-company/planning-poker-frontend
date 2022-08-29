import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import React, {useEffect, useRef, useState} from 'react';

import VoteCard from '@/components/cards';
import ModalStory from '@/components/modal-stories';
import Button from '@/core-ui/button';
import Chart from '@/core-ui/chart';
import Heading from '@/core-ui/heading';
// import VoteCard from '@/components/cards';
import Input from '@/core-ui/input';
import useToast from '@/core-ui/toast';
import HttpBase from '@/data/http';
import {IVoteUser} from '@/types';

import styles from './style.module.scss';
import VoteUser from './voters';

interface IProps {
  dataUsers: IVoteUser[];
}
const VoteRoom: React.FC<IProps> = ({dataUsers}) => {
  const toast = useToast();
  const router = useRouter();
  const {roomId} = router.query;

  const [open, setOpen] = React.useState(true);
  const [roomName, setRoomName] = useState<string>('');

  const inputLink = useRef<HTMLInputElement>(null);
  const handleCopy = () => {
    navigator.clipboard.writeText(inputLink.current!.value);
  };

  const session = useSession();
  useEffect(() => {
    if (session.status === 'authenticated') {
    }
  }, []);

  useEffect(() => {
    HttpBase.rooms.get(roomId + '').then(res => {
      setRoomName(res.data.name);
    });
  }, [roomId]);

  const [isFinish, setIsFinish] = useState(false);

  const toggleIsFinish = () => {
    // 👇️ passed function to setState
    setIsFinish(current => !current);
  };

  return (
    <>
      <div className={styles['section-vote-room']}>
        <div className="container">
          <Heading className="room-name" as="h4">
            {roomName}
          </Heading>
          <div className="content">
            <div className="left-content">
              <Heading as="h4">Story Name</Heading>
              {!isFinish && (
                <div className="card-holder">
                  <VoteCard>0</VoteCard>
                  <VoteCard>1</VoteCard>
                  <VoteCard>2</VoteCard>
                  <VoteCard>3</VoteCard>
                  <VoteCard>5</VoteCard>
                  <VoteCard>8</VoteCard>
                  <VoteCard>13</VoteCard>
                  <VoteCard>21</VoteCard>
                </div>
              )}
              {isFinish && (
                <Chart
                  className="chart-holder"
                  data={{
                    type: 'doughnut',
                    data: {
                      // labels: ['0', '1', '2', '3', '5', '8', '13', '21'],
                      datasets: [
                        {
                          data: [0, 1, 2, 3, 5, 6, 7, 9],
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
              )}
            </div>
            <div className="right-content">
              <Heading className="title" as="h5">
                {!isFinish && 'Wait for voting'}
                {isFinish && 'Result'}
              </Heading>
              <Heading className="sub-title border-line" as="h5">
                Players:
              </Heading>
              {dataUsers.map(({name, host, vote}, index) => {
                return (
                  <VoteUser
                    className="border-line"
                    key={index}
                    name={name}
                    host={host}
                    vote={vote}
                    isFinish={isFinish}
                  />
                );
              })}
              <div className="action border-line">
                {!isFinish && (
                  <Button
                    variant="white"
                    type="button"
                    onClick={() => {
                      toast.show({
                        type: 'success',
                        title: 'Success!',
                        content: 'Show all votes',
                        lifeTime: 3000
                      });
                      toggleIsFinish();
                    }}
                  >
                    Finish
                  </Button>
                )}
                {isFinish && (
                  <Button variant="white" type="button" onClick={toggleIsFinish}>
                    New Story
                  </Button>
                )}
              </div>
              <ModalStory placeholder="Enter story " title="Create New Story" open={open} setOpen={setOpen} />
              <div className="sharing">
                {!isFinish && 'Wait for voting'}
                <Heading as="h5">Invite a teammate</Heading>
                <div className="share-link">
                  <Input defaultValue={window.location.href} ref={inputLink} readOnly />
                  <button
                    className="copy-btn"
                    onClick={() => {
                      toast.show({
                        type: 'success',
                        title: 'Success!',
                        content: 'Copy success',
                        lifeTime: 3000
                      });
                      handleCopy();
                    }}
                  >
                    Copy
                    {/* <Icon className="abc-copy text-black/[0.2]" size={16} /> */}
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
