export const addClasses = (element, ...classes) => {
  const classArray = classes.join(' ').split(' ');
  element.classList.add(...classArray);
};

export const removeClasses = (element, ...classes) => {
  const classArray = classes.join(' ').split(' ');
  element.classList.remove(...classArray);
};
