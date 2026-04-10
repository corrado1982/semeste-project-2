import { BASE_URL, API_KEY } from "../../api/constants.mjs";
import * as storage from "../../storage/index.mjs";

//showing in the avatar html the avatar is saved now
//to have a feedback if the avatar it will be updated
export function actualAvatar() {
  const showAuctualAvatar = document.querySelector("#actual-avatar");
  const actualAvatar = storage.load("avatar");
  const user = storage.load("profile");
  const userName = user.name;

  showAuctualAvatar.innerHTML = `<img src="${actualAvatar}" class=" m-auto  p-0" alt="image of ${userName} s Avata">`;
}

export async function updateAvatar(newUrl) {
  const token = storage.load("token");
  const userName = storage.load("username");

  const response = await fetch(`${BASE_URL}/auction/profiles/${userName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY,
    },
    // V2 richiede l'oggetto avatar con url e alt
    body: JSON.stringify({
      avatar: {
        url: newUrl,
        alt: `${userName} avatar`,
      },
    }),
  });

  const result = await response.json();

  if (response.ok) {
    // alert("Avatar updated!");
    // Aggiorniamo lo storage con l'URL pulito della v2
    storage.save("avatar", result.data.avatar.url);
    location.reload();
  } else {
    alert("Error: " + result.errors?.[0]?.message);
  }
}
