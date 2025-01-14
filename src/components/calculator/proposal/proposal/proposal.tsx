import React from 'react';
import { localRus } from '../../../../utils/const';
import './proposal-styles.css';

interface ProposalProps {
  modificatorFour: string,
  totalSum: number,
  calculatedPercent: number,
  monthPayment: number,
  setIsFormOpen: (arg: boolean) => void,
  minTime: number,
  maxTime: number,
  currentRangeOfTime: number,
}

export default function Proposal({totalSum, calculatedPercent, monthPayment, modificatorFour, setIsFormOpen, minTime, maxTime, currentRangeOfTime}: ProposalProps) {
  const isError = monthPayment === Infinity;
  const isRightTime = currentRangeOfTime >= minTime && currentRangeOfTime <= maxTime;
  const formattedPercent = calculatedPercent.toFixed(2).replace('.', ',');

  return (
    <div className="proposal">
      <h3>Наше предложение</h3>
      <ul className="proposal-list">
        <li className="proposal-list__item">
          <h3>{totalSum.toLocaleString(localRus)} рублей</h3>
          <span>Сумма {modificatorFour}</span>
        </li>
        <li className="proposal-list__item">
          <h3>{formattedPercent}%</h3>
          <span>Процентная ставка</span>
        </li>
        <li className="proposal-list__item">
          {!isError && isRightTime && (
            <>
              <h3>{monthPayment.toLocaleString(localRus)} рублей</h3>
              <span>Ежемесячный платеж</span>
            </>)}
        </li>
        <li className="proposal-list__item">
          {!isError && isRightTime && (
            <>
              <h3>{Math.round(monthPayment * 2.1).toLocaleString(localRus)} рублей</h3>
              <span>Необходимый доход</span>
            </>)}
        </li>
      </ul>
      <button
        type="button"
        className="btn long-btn"
        onClick={() => setIsFormOpen(true)}
        aria-label="Оформить заявку"
      >
        Оформить заявку
      </button>
    </div>);
}
