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
// const body = 1;
export async function makeBid() {
  // bidButton.addEventListener("click",)
  const bidUrl = BASE_URL + "/listings/" + id + "/bids";

  const response = await fetch(bidUrl, {
    method: "POST",
    body: JSON.stringify({
      amount: 1,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
}
const bidButton = document.querySelector("#bid-button");
export function bidListener() {
  bidButton.addEventListener("click", () => {
    makeBid();
  });
}
