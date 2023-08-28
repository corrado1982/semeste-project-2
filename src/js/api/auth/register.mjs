import { BASE_URL } from "../constants.mjs";
import { REGISTER_URL } from "../constants.mjs";
const method = "post";
const action = REGISTER_URL;

export async function register(profile) {
  const registerUlr = BASE_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerUlr, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    method,
    body,
  });
  const result = await response.json();
  console.log(result);
}
