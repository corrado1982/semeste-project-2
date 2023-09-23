import { updateAvatar } from "../api/auth/avatar.mjs";
import { actualAvatar } from "../api/auth/avatar.mjs";
export function setAvatarListener() {
  actualAvatar();

  const avatarForm = document.querySelector("#avatar-form");

  avatarForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profileUrl = Object.fromEntries(formData.entries());

    await updateAvatar(profileUrl);

    form.reset();
  });
}
