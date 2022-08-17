import React from 'react';

import IconSum from '../icons/icon-sum';
import LogoABC from '../icons/logo-abc';
import styles from './style.module.scss';

const PlanningPocker: React.FC = () => {
  return (
    <>
      <div className={`PlanningPocker ${styles.PlanningPocker}`}>
        <div className="container">
          <LogoABC className="logo-abc" />
          <h1>PLANNING POKER</h1>
          <h4>High-functioning teams here also rely on Planning Poker</h4>
          <div className="button1">
            <button className="button-left btn">
              <IconSum width={28} /> Create Room
            </button>
            <div className="input-right btn">
              <input className="input-group form-input" type="text" placeholder="Enter a link or ID" />
              <button className="button-right">Join</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanningPocker;
