import * as storage from "../storage/index.mjs";

const profile = storage.load("profile");

export async function populateNavigation() {
  const storedAvatar = storage.load("avatar");

  const displayPoints = document.querySelector("#points");
  const displayName = document.querySelector("#loggedName");
  const displayAvatar = document.querySelector("#image-avatar");

  // Se non c'è un profilo loggato, esci dalla funzione senza dare errori
  if (!profile) return;

  const credits = profile.credits;
  const avatar = storedAvatar;
  const userName = profile.name;

  // Inseriamo i dati solo se gli elementi esistono nel DOM
  if (displayPoints) displayPoints.innerHTML = credits;
  if (displayName) displayName.innerHTML = userName;

  if (avatar && displayAvatar) {
    displayAvatar.innerHTML = `<img src="${avatar}" class="m-auto p-0 rounded-circle" style="width:35px; height:35px; object-fit:cover;" alt="Avatar of ${userName}">`;
  }
}
