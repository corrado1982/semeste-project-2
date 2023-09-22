import { BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import handleErrors from "../handleErrors.mjs";

console.log("greet from CREATE");

export async function create(listingData) {
  const createUrl = BASE_URL + "/listings";

  const method = "post";
  const body = JSON.stringify(listingData);
  const token = storage.load("token");

  const response = await fetch(createUrl, {
    method,
    body,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  if (response.ok) {
    return json;
  }
  handleErrors(json);
  console.log(response);
}
