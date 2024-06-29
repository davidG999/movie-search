const getRatingBg = (vote_average: number): string => {
  let ratingBg: string;

  if (vote_average >= 7) {
    ratingBg = "bg-green-600";
  } else if (vote_average >= 5) {
    ratingBg = "bg-orange-600";
  } else if (vote_average >= 0.1) {
    ratingBg = "bg-red-600";
  } else {
    ratingBg = "bg-blue-600";
  }

  return ratingBg;
};

export default getRatingBg;
