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
    const rawData = Object.fromEntries(formData.entries());

    // 1. TRASFORMAZIONE PER V2: Gestiamo avatar e banner come oggetti
    const profile = {
      name: rawData.name,
      email: rawData.email,
      password: rawData.password,
    };

    if (rawData.avatar) {
      profile.avatar = { url: rawData.avatar, alt: `${rawData.name} avatar` };
    }

    if (rawData.banner) {
      profile.banner = { url: rawData.banner, alt: `${rawData.name} banner` };
    }

    // Dati per il login automatico
    const profileToLogin = { email: rawData.email, password: rawData.password };

    try {
      // 2. Chiamata alla funzione register (assicurati che usi l'URL v2)
      const response = await register(profile);
      console.log("Registrazione riuscita:", response);

      displayMessage("success", "You successfully registered!", "#message");

      // 3. Login automatico
      await login(profileToLogin);

      // Opzionale: reindirizzamento dopo il login
      // window.location.href = "/profile/";
    } catch (error) {
      displayMessage("danger", error.message || error, "#message");
      console.log("Errore in registrazione:", error);
    }
  });
}

// export function setDataRegisterListener() {
//   const form = document.querySelector("#registerForm");

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const form = event.target;
//     const formData = new FormData(form);
//     const profile = Object.fromEntries(formData.entries());
//     // const profile contain email and password
//     // now is collected inside const profileToLogin to be passed inside login() function
//     const profileEmail = profile.email;
//     const profilePassword = profile.password;
//     const profileToLogin = { email: profileEmail, password: profilePassword };

//     try {
//       const response = await register(profile);
//       console.log(response);

//       displayMessage("success", "you successfully registered!", "#message");
//       //login() function get passed data to make a login
//       //so the user can access the his own profile without make again a login
//       await login(profileToLogin);
//     } catch (error) {
//       displayMessage("danger", error, "#message");
//       console.log(error);
//     }
//   });
// }
