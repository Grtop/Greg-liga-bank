import { useState } from 'react';
import Advantages from './advantages/advantages/advantages';
import Footer from './footer/footer';
import Header from './header/header';
import Modal from './modal/modal';
import Slider from './slider/slider/slider';
import Calculator from './calculator/calculator';
import Map from './map/map';
import React from 'react';

export default function Main() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <Modal setIsModalOpen={setShowModal} />}
      <Header setIsModalOpen={setShowModal} />
      <main className="main">
        <h1 className="visually-hidden">Лига Банк, описание продуктов</h1>
        <Slider />
        <Advantages />
        <section className="calculator container">
          <h2>Кредитный калькулятор</h2>
          <Calculator />
        </section>
        <Map />
      </main>
      <Footer />
    </>
  );
}
