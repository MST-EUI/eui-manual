const setRootFontSize = () => {
  const deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = `${deviceWidth / 3.75}px`;
};

window.onload = setRootFontSize();
window.onresize = setRootFontSize();
