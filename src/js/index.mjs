import { setDataRegisterListener } from "./handlers/register.mjs";
import { setDataLoginListener } from "./handlers/login.mjs";
import { logoutListener } from "./handlers/logout.mjs";
import { readListings } from "./api/listing/read.mjs";
import { readListing } from "./api/listing/read.mjs";

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
      readListing();
      break;
    case "/":
    case "/index.html":
      readListings();
      readListing();
      break;
    case "/listing/":
    case "/listing/index.html":
      readListing();
      break;
  }
}
router();
