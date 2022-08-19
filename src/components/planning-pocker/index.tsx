import React from 'react';

import Heading from '@/components/heading';
import InputText from '@/components/input-text';
import Button from '@/core-ui/button';

import styles from './style.module.scss';

const PlanningPocker: React.FC = () => {
  return (
    <>
      <div className={styles['planning-pocker']}>
        <div className="container">
          <Heading as="h2">PLANNING POKER</Heading>
          <Heading as="h3">High-functioning teams here also rely on Planning Poker</Heading>
          <div className="input-button">
            <Button className="btn button-left">Create</Button>
            <div className="input-right">
              <InputText className="form-input" placeholder="Enter a link or ID"></InputText>
              <Button className="btn button-right">Join</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningPocker;
