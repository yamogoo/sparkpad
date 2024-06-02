export const setAppTitle = (name: string): void => {
  const title = document.querySelector("title");
  if (title) title.innerHTML = name;
  else {
    const head = document.querySelector("head");
    if (head) {
      const el: HTMLTitleElement = document.createElement("title");
      el.innerHTML = name;
      head.appendChild(el);
    }
  }
};
