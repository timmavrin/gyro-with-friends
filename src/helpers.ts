export const create = <K extends keyof HTMLElementTagNameMap>(tag: K, options?: Partial<HTMLElementTagNameMap[K]>) => {
  const element = document.createElement(tag);
  Object.assign(element, options);
  return element;
};
