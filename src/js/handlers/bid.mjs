import { makeBid } from "../api/listing/bid.mjs";
import { BASE_URL } from "../api/constants.mjs";

const bidsUrl = "?_bids=true";
const listingsUrlEnd = "/listings/";
const listingsUrl = BASE_URL + listingsUrlEnd;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function bidListener() {
  const response = await fetch(listingsUrl + id + bidsUrl);
  const result = await response.json();
  console.log(result);

  //   EVENT;
  if (result.bids.length === 0) {
    var lastBid = 0;
  } else if (result.bids.length > 0) {
    const lastBidIndex = result.bids[result.bids.length - 1];
    lastBid = lastBidIndex.amount;
  }
  console.log(lastBid);

  const bidButton = document.querySelector("#bid-button");
  const newBid = lastBid + 1;
  bidButton.addEventListener("click", () => {
    makeBid(newBid);
  });
}
