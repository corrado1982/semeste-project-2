import { updateAvatar } from "../api/auth/avatar.mjs";

import { actualAvatar } from "../api/auth/avatar.mjs";

export function setAvatarListener() {
  actualAvatar();

  const avatarForm = document.querySelector("#avatar-form");

  avatarForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const rawData = Object.fromEntries(formData.entries());
    console.log("rawData", rawData);
    const avatarUrl = rawData.avatar;

    if (avatarUrl) {
      console.log("profileUrl", avatarUrl);
      await updateAvatar(avatarUrl);

      event.target.reset();
    }
  });
}
