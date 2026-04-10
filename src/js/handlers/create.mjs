import { create } from "../api/auth/create.mjs";
import displayMessage from "../components/displayMessage.mjs";

export function createListener() {
  const form = document.querySelector("#createForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries());

    const mediaArray = rawData.media
      ? rawData.media.split(",").map((link) => ({
          url: link.trim(),
          alt: rawData.title || "Listing image",
        }))
      : [];

    const tagsArray = rawData.tags
      ? rawData.tags.split(",").map((tag) => tag.trim())
      : [];

    const listingData = {
      title: rawData.title,
      description: rawData.description,
      tags: tagsArray,
      media: mediaArray, // Ora è un array di oggetti!
      endsAt: new Date(rawData.endsAt).toISOString(), // Assicuriamoci che sia in formato ISO
    };

    console.log(formData);

    try {
      const response = await create(listingData);
      console.log(response);
      displayMessage("success", "you created a Listing!", "#message");
      form.reset();
    } catch (error) {
      displayMessage("danger", error, "#message");
      console.log(error);
    }
  });
}
