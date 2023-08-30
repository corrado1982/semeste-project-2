import { BASE_URL } from "../constants.mjs";
import { LOGIN_URL } from "../constants.mjs";

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
    const result = await response.json();
    return result;
  }

  throw new Error("Login failed!");
}
