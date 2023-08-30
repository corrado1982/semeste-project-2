import { setDataRegisterListener } from "./handlers/register.mjs";
import { setDataLoginListener } from "./handlers/login.mjs";

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
  }
}
router();
