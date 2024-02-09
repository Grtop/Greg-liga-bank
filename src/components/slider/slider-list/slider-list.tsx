import React from 'react';
import { FIRST_SLIDE, LAST_SLIDE, SECOND_SLIDE, slidersNumbers } from '../../../utils/const';
import './slider-list-styles.css';

export default function SliderList({activeSlide}: {activeSlide: number}) {
  const currentSlide = slidersNumbers[activeSlide];

  return (
    <ul className="slider__list">
      {activeSlide === FIRST_SLIDE && (
        <li className={`slider__list--${currentSlide}-slide`}>
          <h2>Лига Банк</h2>
          <p>Кредиты на все случаи в жизни</p>
          <a href="#calculator">Рассчитать кредит</a>
        </li>)}
      {activeSlide === SECOND_SLIDE && (
        <li className={`slider__list--${currentSlide}-slide`}>
          <h2>Лига Банк</h2>
          <p>Мы всегда поможем вам</p>
        </li>)}
      {activeSlide === LAST_SLIDE && (
        <li className={`slider__list--${currentSlide}-slide`}>
          <h2>Лига Банк</h2>
          <p>Мы всегда рядом</p>
          <a href="#offices">Найти наши отделения</a>
        </li>)}
    </ul>);
}
