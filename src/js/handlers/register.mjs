// abc@stud.noroff.no
import { register } from "../api/auth/register.mjs";
import displayMessage from "../components/displayMessage.mjs";
console.log("hello");

export function setDataRegisterListener() {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    // console.log(profile);

    try {
      const response = await register(profile);
      console.log(response);
      displayMessage(
        "success",
        "you successfully registered. Please Login!",
        "#message"
      );
      form.reset();
    } catch (error) {
      displayMessage("danger", error, "#message");
      console.log(error);
    }
  });
}
