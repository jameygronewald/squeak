export const addExtraQuote = (...args: string[]) => {
  const argsWithExtraQuote: string[] = args.map(arg => {
    const array: string[] = arg.split(`'`);
    for (let i = 0; i < array.length - 1; i++) array[i] += `''`;
    return array.join('');
  });
  return argsWithExtraQuote;
};
