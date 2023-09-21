import { create } from "../api/auth/create.mjs";
import displayMessage from "../components/displayMessage.mjs";

export function createListener() {
  const form = document.querySelector("#createForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    profile.tags = profile.tags.split(",").map((tag) => tag.trim());
    profile.media = profile.media.split(",").map((link) => link.trim());
    profile.endsAt;

    console.log(formData);
    console.log(profile);

    const response = await create(profile);
    console.log(response);
    form.reset();
  });
}
