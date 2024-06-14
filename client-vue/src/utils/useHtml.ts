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

export const setMeta = (role: string, content: string) => {
  const el: HTMLMetaElement | null = document.querySelector(
    `meta[name=${role}]`
  );

  if (el) el.setAttribute("content", content);
  else {
    const head: HTMLHeadElement | null =
      document.getElementsByTagName("head")[0];

    const el: HTMLMetaElement | null = document.createElement("meta");

    el.setAttribute("name", role);
    el.setAttribute("content", String(content));
    head.appendChild(el);
  }
};
