const timeStringView = (sec: number, min: number, hours: number) => {
  return `${hours > 9 ? hours : `0${hours}`}: ${min > 9 ? min : `0${min}`}: ${
    sec > 9 ? sec : `0${sec}`
  }`;
};

export default timeStringView;
