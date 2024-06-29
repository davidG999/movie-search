const kFormatter = (num: number): string => {
  if (Math.abs(num) > 999) {
    const formattedNum = (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1);
    return formattedNum + "k";
  } else {
    return String(Math.sign(num) * Math.abs(num));
  }
};

export default kFormatter;
