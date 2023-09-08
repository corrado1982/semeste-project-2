import * as storage from "../storage/index.mjs";
const profile = storage.load("profile");
const displayPoints = document.querySelector("#points");
const displayName = document.querySelector("#loggedName");
const displayAvatar = document.querySelector("#image-avatar");

const credits = profile.credits;
const avatar = profile.avatar;
const userName = profile.name;

export function populateNavigation() {
  displayPoints.innerHTML = credits;
  displayName.innerHTML = userName;
  if (avatar) {
    displayAvatar.innerHTML = `<img src="${avatar}" alt="image of ${userName} s Avata">`;
  }
}
