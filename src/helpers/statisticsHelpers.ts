export const convertationToDate = (time: string) => {
  const dateFormat = new Date(Number(time));
  return dateFormat.toLocaleDateString('en-GB');
};

export const convertationToMin = (timeInMSec: string) => {
  return Number(timeInMSec) / (1000 * 60);
};

export const generateColor = () => {
  const base = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += base[Math.floor(Math.random() * base.length)];
  }
  return `#${code}`;
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value: number | string) => `${value} min`,
      },
    },
  },
};
