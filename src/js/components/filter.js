const searchImput = document.getElementById("search-imput");
const listingCards = document.getElementsByClassName("card");
console.log("filter");

const searchListing = () => {
  const searchTerm = searchImput.value.toLowerCase();
  console.log(searchTerm);

  Array.from(listingCards).forEach((card) => {
    const listingTitle = card
      .querySelector("#itemTitle")
      .textContent.toLowerCase();

    if (listingTitle.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};
searchImput.addEventListener("input", searchListing);
