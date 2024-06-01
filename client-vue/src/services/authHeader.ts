import { LocalStorageAuthKeys } from "@/stores/localStorage";
import type { AuthorizedUser } from "./authService";

export default () => {
  const usrStr = localStorage.getItem(LocalStorageAuthKeys.USER);

  if (usrStr) {
    const user = JSON.parse(usrStr) as AuthorizedUser;

    if (user && user.accessToken) {
      return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
  }
  return {};
};
