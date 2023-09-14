import { setDataRegisterListener } from "./handlers/register.mjs";
import { setDataLoginListener } from "./handlers/login.mjs";
import { logoutListener } from "./handlers/logout.mjs";
import { readListings } from "./api/listing/read.mjs";
import { readListing } from "./api/listing/read.mjs";
import { populateNavigation } from "./components/populateNav.mjs";
import { setAvatarListener } from "./handlers/avatar.mjs";
// import { updateAvatar } from "./handlers/avatar.mjs";
import { bidListener } from "./handlers/bid.mjs";
// import { create } from "./api/auth/create.mjs";
import { remove } from "./api/auth/delete.mjs"; // REMOVE LISTENER TO BE MADE
import { createListener } from "./handlers/create.mjs";

import { redirectBasedOnLogin } from "./api/helpers/auth.mjs";
const path = window.location.pathname;
function router() {
  const path = window.location.pathname;

  console.log(path);

  switch (path) {
    case "/profile/register/":
    case "/profile/register/index.html":
      setDataRegisterListener();
      break;
    case "/profile/login/":
    case "/profile/login/index.html":
      setDataLoginListener();
      break;
    case "/listings/":
    case "/listings/index.html":
      readListings();
      logoutListener();
      populateNavigation();

      break;
    case "/":
    case "/index.html":
      readListings();

      break;
    case "/listing/":
    case "/listing/index.html":
      readListing();
      bidListener();
      remove();
      break;
    case "/avatar/":
    case "/avatar/index.html":
      setAvatarListener();
      break;
    case "/listing/create/":
    case "/listing/create/index.html":
      createListener();
      break;
  }
}
router();
redirectBasedOnLogin(path);
// const year = 2003;
// const monthIndex = 5;
// const day = 1;
// const hours = 14;
// const minutes = 34;
// const seconds = 22;
// const ms = 0;
// const milliseconds = 23;

// const newDate = new Date(year, monthIndex, day, hours, minutes, seconds, ms);

// console.log(newDate);

// console.log(new Date(day));
