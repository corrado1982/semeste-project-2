import * as storage from "../storage/index.mjs";
const profile = storage.load("profile");
const displayPoints = document.querySelector("#points");
const displayName = document.querySelector("#loggedName");

const credits = profile.credits;
const avatar = profile.avatar;
const userName = profile.name;

export function populateNavigation() {
  displayPoints.innerHTML = credits;
  displayName.innerHTML = userName;
}
