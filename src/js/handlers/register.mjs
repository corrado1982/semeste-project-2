// abc@stud.noroff.no
import { register } from "../api/auth/register.mjs";
import displayMessage from "../components/displayMessage.mjs";
import { login } from "../api/auth/login.mjs"; //experiment login from register page
console.log("hello");

export function setDataRegisterListener() {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    const profileEmail = profile.email;
    const profilePassword = profile.password;
    const profileToLogin = { email: profileEmail, password: profilePassword };

    console.log(profile.password);

    try {
      const response = await register(profile);
      console.log(response);

      displayMessage(
        "success",
        "you successfully registered. Please Login!",
        "#message"
      );
      // call here the login()?
      // form.reset();
      await login(profileToLogin);
      location.href = "/listings";
    } catch (error) {
      displayMessage("danger", error, "#message");
      console.log(error);
    }
  });
}
