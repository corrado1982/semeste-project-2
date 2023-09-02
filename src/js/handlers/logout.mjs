import * as storage from "../storage/index.mjs";

console.log("from logoutsay hello");

export function logoutListener() {
  const logoutButton = document.querySelector("#logOutButton");
  logoutButton.addEventListener("click", () => {
    console.log("logoutListener say hello");
    storage.remove("token");
    storage.remove("profile");
  });
}
