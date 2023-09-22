export default function handleErrors(json) {
  //getting the array of errors from the response, so the error message
  //is more accurated, getting the answere from the response and not from hard code
  if (json && json.errors && Array.isArray(json.errors)) {
    const errorMessage = json.errors.map((error) => error.message).join("\n");
    throw new Error(errorMessage);
  }
  // it throw a message just if the response is not providing a proper message
  throw new Error("There is a request error...");
}
