import { BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const token = storage.load("token");

const method = "post";

export async function makeBid(bid) {
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
}
