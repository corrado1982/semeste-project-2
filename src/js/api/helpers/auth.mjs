import { isloggedIn } from "./storage.mjs";

export function redirectBasedOnLogin(path) {
  if (isloggedIn()) {
    if (
      path === "/profile/login/" ||
      path === "/profile/register/" ||
      path === "/"
    ) {
      location.href = "/listings/";
    }
  } else {
    if (
      path !== "index.html" &&
      path !== "/" &&
      path !== "/profile/login/" &&
      path !== "/profile/register/"
    ) {
      location.href = "/";
    }
  }
}
