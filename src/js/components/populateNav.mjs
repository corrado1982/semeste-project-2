import * as storage from "../storage/index.mjs";
const profile = storage.load("profile");
const displayPoints = document.querySelector("#points");
const displayName = document.querySelector("#loggedName");
const displayAvatar = document.querySelector("#image-avatar");

// const credits = profile.credits;
// const avatar = profile.avatar;
// const userName = profile.name;

export async function populateNavigation() {
  const credits = profile.credits;
  const avatar = profile.avatar;
  const userName = profile.name;
  displayPoints.innerHTML = credits;
  displayName.innerHTML = userName;
  if (avatar) {
    displayAvatar.innerHTML = `<img src="${avatar}" style="width: 100px" alt="image of ${userName} s Avata">`;
  }
}
