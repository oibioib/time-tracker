const generateColor = () => {
  const base = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += base[Math.floor(Math.random() * base.length)];
  }
  return `#${code}`;
};

export default generateColor;
