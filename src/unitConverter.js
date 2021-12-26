const ctof = (celsius) => (celsius * (9 / 5)) + 32;

const ftoc = (fahrenheit) => (fahrenheit - 32) * (5 / 9);

const mtokm = (metre) => (metre / 1000).toFixed(2);

export {
  ctof,
  ftoc,
  mtokm,
};
