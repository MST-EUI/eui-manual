import lang from './zh-cn'; // TODO zh-cn should be dynamic later

export default (...args) => {
  let langText;
  if (args) {
    langText = lang[args[0]];
    if (args.length > 1 && langText) {
      for (let i = 1; i < args.length; i += 1) {
        const replaceReg = new RegExp(`\\{${i}\\}`, 'g');
        langText = langText.replace(replaceReg, args[i]);
      }
    }
  }
  return langText;
};
