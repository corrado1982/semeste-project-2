import { BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

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
  console.log(response);
}

// const data = {
//   title: "title",
//   description: "I am a description",
//   tags: ["adeal"],
//   media: [
//     "https://upload.wikimedia.org/wikipedia/commons/6/60/Modern-tractor.jpg",
//   ],
//   endsAt: "2024-01-01T00:00:00.000Z",
// };

// create(data);
