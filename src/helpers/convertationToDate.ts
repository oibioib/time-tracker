const convertationToDate = (time: string) => {
  const dateFormat = new Date(Number(time));
  return dateFormat.toLocaleDateString('en-GB');
};

export default convertationToDate;
