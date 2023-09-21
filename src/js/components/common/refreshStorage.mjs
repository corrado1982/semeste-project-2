import * as storage from "../../storage/index.mjs";
import { BASE_URL } from "../../api/constants.mjs";

export async function refreshStorage() {
  const token = storage.load("token");
  const myProfile = storage.load("profile");
  const myName = myProfile.name;
  const profileRequest = BASE_URL + "/profiles/" + myName;
  const response = await fetch(profileRequest, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result);
  storage.save("profile", result);
}
