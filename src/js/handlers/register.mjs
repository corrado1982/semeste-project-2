// abc@stud.noroff.no
import { register } from "../api/auth/register.mjs";
console.log("hello");

export function setDataRegisterListener() {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());
    register(profile);
  });
}
