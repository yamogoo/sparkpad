import { LocalStorageAuthKeys, type AuthorizedUser } from "@/typings";

export default (): { "x-access-token": string } | {} => {
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
