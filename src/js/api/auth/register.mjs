import { BASE_URL } from "../constants.mjs";
import { REGISTER_URL } from "../constants.mjs";

const action = REGISTER_URL;
const method = "post";

console.log("auth hello");
// console.log(BASE_URL + REGISTER_URL);

// export function register() {
//   console.log("function is called");
// }

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
  const result = await response.json();
  console.log(result);
}
