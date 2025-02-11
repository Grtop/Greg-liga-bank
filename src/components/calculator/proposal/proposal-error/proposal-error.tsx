import React from 'react';
import { localRus } from '../../../../utils/const';
import './proposal-error-styles.css';

interface ProposalErrorProps {
  minSum: number,
  modificatorOne: string,
}

export default function ProposalError({modificatorOne, minSum}: ProposalErrorProps) {

  return (
    <div className="proposal__wrong">
      <h3>
        Наш банк не выдаёт {modificatorOne} меньше {minSum.toLocaleString(localRus)} рублей.
      </h3>
      <p>Попробуйте использовать другие<br/> параметры для расчёта.</p>
    </div>
  );
}
