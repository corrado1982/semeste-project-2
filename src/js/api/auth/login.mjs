import { BASE_URL } from "../constants.mjs";
import { LOGIN_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = LOGIN_URL; //to update
const method = "post";

export async function login(profile) {
  const loginUrl = BASE_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(loginUrl, {
    headers: {
      "Content-type": "application/json",
    },
    method,
    body,
  });

  if (response.ok) {
    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);
    console.log(response);
    // location.href = "/posts";      //    ----change location-----
    return;
  }

  throw new Error("Login failed!");
}
