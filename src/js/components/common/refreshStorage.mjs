import * as storage from "../../storage/index.mjs";
import { BASE_URL, API_KEY } from "../../api/constants.mjs"; // Aggiungi API_KEY

export async function refreshStorage() {
  const token = storage.load("token");
  const myProfile = storage.load("profile");

  if (!myProfile || !token) return;

  const myName = myProfile.name;

  // 1. URL corretto (aggiunto /auction e rimosso l'errore nel percorso)
  const profileRequest = `${BASE_URL}/auction/profiles/${myName}`;

  const response = await fetch(profileRequest, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": API_KEY, // 2. Obbligatorio per v2
    },
  });

  const result = await response.json();

  if (response.ok) {
    // 3. Salva SOLO result.data (così trovi credits e name al livello giusto)
    storage.save("profile", result.data);
    console.log("Storage aggiornato con successo:", result.data);
  } else {
    console.error("Errore nel refresh:", result.errors?.[0]?.message);
  }
}
