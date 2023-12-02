const Log = (message: any, type: string = "normal"): void => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  switch (type) {
    case "normal":
      console.log(message.cyan.underline);
      break;

    case "success":
      console.log(`SUCCESS ${message}`.green.underline);
      break;

    case "warning":
      console.log(`WARNING ${message}`.yellow.underline);
      break;

    case "error":
      console.log(`ERROR ${message}`.red.underline);
      break;

    default:
      console.log(message.cyan.underline);
      break;
  }
};

export { Log };
