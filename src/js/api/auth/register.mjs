import { BASE_URL } from "../constants.mjs";
import { REGISTER_URL } from "../constants.mjs";
import handleErrors from "../handleErrors.mjs";

const action = REGISTER_URL;
const method = "post";
//sending a Post request to register
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
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  handleErrors(json);
}
