import { makeBid } from "../api/listing/bid.mjs";
import { BASE_URL } from "../api/constants.mjs";

// 1. URL corretto per v2
const bidsUrl = "?_bids=true";
const listingsUrlEnd = "/auction/listings/"; // Aggiunto /auction
const listingsUrl = BASE_URL + listingsUrlEnd;

const displayLastBid = document.querySelector("#display-last-bid");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function bidListener() {
  const response = await fetch(listingsUrl + id + bidsUrl + "&_seller=true");
  const result = await response.json();

  // 2. Accedi a .data per la v2
  const listing = result.data;
  let lastBid = 0;

  if (listing.bids && listing.bids.length > 0) {
    // Prendiamo l'ultimo elemento dell'array bids
    const lastBidObject = listing.bids[listing.bids.length - 1];
    lastBid = lastBidObject.amount;
  }

  if (displayLastBid) displayLastBid.innerHTML = lastBid;

  const yourBidInput = document.querySelector("#your-bid");
  const bidButton = document.querySelector("#bid-button");

  bidButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const myBidAmount = parseInt(yourBidInput.value);

    if (isNaN(myBidAmount) || myBidAmount <= 0) {
      alert("Please enter a valid number");
      return;
    }

    // Se vuoi che l'utente inserisca il TOTALE (scelta consigliata):
    // const newBid = myBidAmount;

    // Se vuoi che l'utente inserisca solo il RIALZO (tua logica attuale):
    const newBid = lastBid + myBidAmount;

    if (newBid <= lastBid) {
      alert(`Your bid must be higher than ${lastBid}`);
      return;
    }

    await makeBid(newBid);
  });
}
