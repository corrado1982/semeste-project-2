const searchInput = document.getElementById("search-imput"); // Mantengo il tuo ID con la 'm' per non romperti l'HTML
const listingCards = document.getElementsByClassName("card");

const searchListing = () => {
  const searchTerm = searchInput.value.toLowerCase();

  Array.from(listingCards).forEach((card) => {
    // CAMBIO: Usiamo .card-title invece di #itemTitle
    const titleElement = card.querySelector(".card-title");

    // Controllo di sicurezza: se l'elemento esiste, leggiamo il testo
    if (titleElement) {
      const listingTitle = titleElement.textContent.toLowerCase();

      if (listingTitle.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
};

if (searchInput) {
  searchInput.addEventListener("input", searchListing);
}
