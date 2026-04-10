import { BASE_URL, API_KEY } from "../constants.mjs"; // Assicurati di importare API_KEY
import * as storage from "../../storage/index.mjs";
import { refreshStorage } from "../../components/common/refreshStorage.mjs";
//import populateNavigation from "../../../js/components/populateNav.mjs";
import { populateNavigation } from "../../../js/components/populateNav.mjs";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const token = storage.load("token");

export async function makeBid(bidAmount) {
  // 1. URL corretto per Auction V2
  const bidUrl = `${BASE_URL}/auction/listings/${id}/bids`;

  try {
    const response = await fetch(bidUrl, {
      method: "POST",
      body: JSON.stringify({
        amount: Number(bidAmount), // 2. Deve essere un numero!
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY, // 3. Obbligatorio in v2
      },
    });

    const result = await response.json();

    if (response.ok) {
      // alert("Bid placed successfully!");
      // 4. Aggiorniamo lo storage per vedere i nuovi crediti nell'header
      await refreshStorage();
      location.reload();
    } else {
      // Gestione errore (es: credito insufficiente o offerta troppo bassa)
      const message = result.errors?.[0]?.message || "Could not place bid";
      alert(`Error: ${message}`);
    }
  } catch (error) {
    console.error("Bid error:", error);
    alert("An error occurred while placing the bid.");
  }
}
