import c from './color';

const styleLabel = (bg: string, fg: string, msg: string) => {
  return bg + fg + ` ${msg} ` + c.Reset;
};

const styleMessage = (fg: string, msg: string) => {
  return fg + msg + c.Reset;
};

const warn = (msg: string) => {
  return console.log(
    styleLabel(c.bg.Yellow, c.fg.White, 'WARNING'),
    styleMessage(c.fg.Yellow, msg)
  );
};

const info = (msg: string) => {
  const label = styleLabel(c.bg.Blue, c.fg.White, 'INFO');
  return console.log(label, msg);
};

const error = (msg: string) => {
  return console.log(
    styleLabel(c.bg.Red, c.fg.White, 'ERROR'),
    styleMessage(c.fg.Red, msg)
  );
};

const success = (msg: string) => {
  return console.log(
    styleLabel(c.bg.Green, c.fg.White, 'SUCCESS'),
    styleMessage(c.fg.Green, msg)
  );
};

export default {
  info,
  success,
  warn,
  error,
};
