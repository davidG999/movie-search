const formatTitle = (title: string): string => {
  if (title.length > 30) {
    return title.substring(0, 27) + "...";
  } else if (title.length > 25) {
    return title.substring(0, 24) + "...";
  }
  return title;
};

export default formatTitle;
