import { onMounted, onBeforeUnmount, type Ref } from "vue";

export const useClickOutside = (component: Ref, callback: Function) => {
  if (!component) return;

  const listener = (event: Event): void => {
    if (
      event.target !== component.value &&
      event.composedPath().includes(component.value)
    )
      return;
    if (typeof callback === "function") callback();
  };

  onMounted(() => {
    window.addEventListener("click", listener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", listener);
  });

  return { listener };
};
