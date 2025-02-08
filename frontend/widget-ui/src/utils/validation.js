export const validationPerPage = (widgets) => {
  let sumPercentage = 0;
  widgets.forEach((widget) => {
    sumPercentage += widget.showToPercentage;
  });
  return sumPercentage === 100;
};

export const shouldDisplayWidget = (widget) => {
  const random = Math.random() * 100;
  return random < widget.showToPercentage;
};
