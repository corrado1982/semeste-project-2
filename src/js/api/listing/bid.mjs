import { BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

// import { authFetch } from "../authFetch.mjs";
// const bidButton = document.querySelector("#bid-button");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const token = storage.load("token");
console.log(token);
// const method = "post";
const method = "post";
// const body = JSON.stringify({ amount: newBid }); //new bid

export async function makeBid(bid) {
  //pass new bid ?
  const bidUrl = BASE_URL + "/listings/" + id + "/bids";

  const response = await fetch(bidUrl, {
    method,
    body: JSON.stringify({ amount: bid }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  location.reload();
  //   console.log(body);
}
// const bidButton = document.querySelector("#bid-button");
// export async function bidListener() {
//   bidButton.addEventListener("click", () => {
//     makeBid();
//   });
// }
