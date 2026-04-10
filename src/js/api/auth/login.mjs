import { BASE_URL, API_KEY } from "../constants.mjs"; // Assicurati di importare API_KEY
import * as storage from "../../storage/index.mjs";

export async function login(userCredentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });

  const result = await response.json();

  if (response.ok) {
    const { accessToken, name, avatar } = result.data;

    // 1. Salva i dati base immediati
    storage.save("token", accessToken);
    storage.save("username", name);
    storage.save("avatar", avatar?.url || "");

    // 2. Recupero crediti dal profilo (Endpoint Auction v2)
    const profileResponse = await fetch(
      `${BASE_URL}/auction/profiles/${name}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": "7fccfec0-78b7-453b-8740-7ea3d687a25b", // Usa la variabile reale qui!
        },
      },
    );

    const profileData = await profileResponse.json();

    if (profileResponse.ok) {
      // 3. Salviamo l'intero oggetto profilo (che ora contiene i credits)
      storage.save("profile", profileData.data);
      console.log("Crediti recuperati:", profileData.data.credits);
    }

    // alert("Login successful!");
    window.location.href = "/listings";
    return result.data;
  } else {
    const errorMessage = result.errors?.[0]?.message || "Login failed";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
}
