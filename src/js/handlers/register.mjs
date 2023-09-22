// abc@stud.noroff.no
import { register } from "../api/auth/register.mjs";
import displayMessage from "../components/displayMessage.mjs";
import { login } from "../api/auth/login.mjs"; //experiment login from register page

export function setDataRegisterListener() {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    // const profile contain email and password
    // now is collected inside const profileToLogin to be passed inside login() function
    const profileEmail = profile.email;
    const profilePassword = profile.password;
    const profileToLogin = { email: profileEmail, password: profilePassword };

    try {
      const response = await register(profile);
      console.log(response);

      displayMessage("success", "you successfully registered!", "#message");
      //login() function get passed data to make a login
      //so the user can access the his own profile without make again a login
      await login(profileToLogin);
    } catch (error) {
      displayMessage("danger", error, "#message");
      console.log(error);
    }
  });
}
