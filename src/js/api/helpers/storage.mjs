import * as storage from "../../storage/index.mjs";

//checking if is logged by watching if the token is stored or not.
//if the token is there it will return true otherwise will return false
export function isloggedIn() {
  return storage.load("token") ? true : false;
}
//this will get the name from the local storage
export function getName() {
  return storage.get("name");
}
