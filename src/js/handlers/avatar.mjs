import { BASE_URL } from "../api/constants.mjs";
import * as storage from "../storage/index.mjs";

export function actualAvatar() {
  const showAuctualAvatar = document.querySelector("#actual-avatar");
  const actualAvatar = storage.load("avatar");
  const user = storage.load("profile");
  const userName = user.name;

  showAuctualAvatar.innerHTML = `<img src="${actualAvatar}" class=" m-auto  p-0" alt="image of ${userName} s Avata">`;
}

const method = "put";

export async function updateAvatar(avatarUrl) {
  const body = JSON.stringify(avatarUrl);
  const token = storage.load("token");
  const profile = storage.load("profile");
  const userName = profile.name;

  const avatarRequest = BASE_URL + "/profiles/" + userName + "/media";

  const response = await fetch(avatarRequest, {
    method,
    body,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  storage.save("avatar", avatarUrl.avatar); //saving new avatar on local storage
  location.reload(); //try to update rigth away
}
export function setAvatarListener() {
  actualAvatar();

  const avatarForm = document.querySelector("#avatar-form");

  avatarForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profileUrl = Object.fromEntries(formData.entries());

    await updateAvatar(profileUrl);
    console.log(profileUrl);
    form.reset();
  });
}
