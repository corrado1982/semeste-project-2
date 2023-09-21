import * as storage from "../storage/index.mjs";
const profile = storage.load("profile");

const storedAvatar = storage.load("avatar"); //selected separated avatar

const displayPoints = document.querySelector("#points");
const displayName = document.querySelector("#loggedName");
const displayAvatar = document.querySelector("#image-avatar");

export async function populateNavigation() {
  const credits = profile.credits;
  const avatar = storedAvatar; //changed profile.avatar with storedAvatar
  const userName = profile.name;
  displayPoints.innerHTML = credits;
  displayName.innerHTML = userName;
  if (avatar) {
    displayAvatar.innerHTML = `<img src="${avatar}" class=" m-auto  p-0" alt="image of ${userName} s Avata">`;
  }
}
