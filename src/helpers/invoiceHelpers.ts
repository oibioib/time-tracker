const generateInvoiceNumber = () => {
  const today = new Date();
  return `${today.getUTCFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getMilliseconds()}`;
};

export default generateInvoiceNumber;
