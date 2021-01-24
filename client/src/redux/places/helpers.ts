export const addExtraQuote = (...args: string[]) => {
  const argsWithExtraQuote: string[] = [];

  args.forEach((arg: string) => {
    argsWithExtraQuote.push(arg.replace(/'/g, `''`));
  })

  return argsWithExtraQuote;
};
