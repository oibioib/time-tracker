const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
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

export default options;
