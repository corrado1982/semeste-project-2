import { BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

console.log("greet from CREATE");

// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const id = params.get("id");

export async function remove() {
  const createUrl =
    BASE_URL + "/listings/" + "62d8f1b7-0b4c-41fb-ac71-652be7c75866";

  const method = "delete";
  const body = JSON.stringify();
  const token = storage.load("token");

  const response = await fetch(createUrl, {
    method,
    // body,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
}

// export function removeListener() {
//     deleteButton.
// }
