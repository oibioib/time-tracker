/* eslint-disable no-console */
import { useEffect, useRef } from 'react';

import './MainClocks.scss';

const MainClocks = () => {
  const date = new Date();

  const seconds = date.getSeconds() * 6;
  const minutes = date.getMinutes() * 6 + seconds / 60;
  const hours = (date.getHours() % 12) * 30 + minutes / 12;

  const refSecond = useRef<HTMLDivElement>(null);
  const refMinute = useRef<HTMLDivElement>(null);
  const refHour = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refSecond.current) {
      refSecond.current.style.transform = `rotate(${seconds}deg)`;
    }
    if (refMinute.current) {
      refMinute.current.style.transform = `rotate(${minutes}deg)`;
    }
    if (refHour.current) {
      refHour.current.style.transform = `rotate(${hours}deg)`;
    }
  });

  return (
    <div className="clock">
      <div className="clock__top clock__element" />
      <div className="clock__right clock__element" />
      <div className="clock__bottom clock__element" />
      <div className="clock__left clock__element" />
      <div className="clock__center clock__element" />
      <div ref={refHour} className="clock__wrapper clock__hour_wrapper">
        <div className="clock__hour" />
      </div>
      <div ref={refMinute} className="clock__wrapper clock__minute_wrapper">
        <div className="clock__minute" />
      </div>
      <div ref={refSecond} className="clock__wrapper clock__second_wrapper">
        <div className="clock__second" />
      </div>
    </div>
  );
};

export default MainClocks;
