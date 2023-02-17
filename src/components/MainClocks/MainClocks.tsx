import './MainClocks.scss';

const MainClocks = () => {
  return (
    <div className="clock">
      <div className="clock__top clock__element" />
      <div className="clock__right clock__element" />
      <div className="clock__bottom clock__element" />
      <div className="clock__left clock__element" />
      <div className="clock__center clock__element" />
      <div className="clock__hour" />
      <div className="clock__minute" />
      <div className="clock__second" />
    </div>
  );
};

export default MainClocks;
