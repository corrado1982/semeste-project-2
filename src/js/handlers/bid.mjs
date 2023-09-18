import { makeBid } from "../api/listing/bid.mjs";
import { BASE_URL } from "../api/constants.mjs";

const bidsUrl = "?_bids=true";
const listingsUrlEnd = "/listings/";
const listingsUrl = BASE_URL + listingsUrlEnd;

const displayLastBid = document.querySelector("#display-last-bid");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function bidListener() {
  const response = await fetch(listingsUrl + id + bidsUrl + "&_seller=true");
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

  displayLastBid.innerHTML = `${lastBid}`;
  const yourBid = document.querySelector("#your-bid");

  const bidButton = document.querySelector("#bid-button");

  bidButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const myBid = parseInt(yourBid.value);
    console.log(myBid);

    const newBid = lastBid + myBid;
    await makeBid(newBid);
  });
}
