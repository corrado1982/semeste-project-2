import { login } from "../api/auth/login.mjs";
import displayMessage from "../components/displayMessage.mjs";
console.log("hello");

export function setDataLoginListener() {
  const form = document.querySelector("#loginForm"); //to update?

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    // console.log(profile);

    try {
      const response = await login(profile);
      console.log(response);
      displayMessage(
        "success",
        "you successfully logged. Please Login!",
        "#message"
      );
      form.reset();
    } catch (error) {
      displayMessage("danger", error, "#message");
      console.log(error);
    }
  });
}
