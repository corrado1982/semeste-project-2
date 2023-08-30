import { BASE_URL } from "../constants.mjs";
import { REGISTER_URL } from "../constants.mjs";

const action = REGISTER_URL;
const method = "post";

export async function register(profile) {
  const registerUlr = BASE_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerUlr, {
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

  throw new Error("Registration failed!");
}
