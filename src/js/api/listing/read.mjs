import { BASE_URL } from "../constants.mjs";

const cardTitle = document.querySelector("#itemTitle");
const cardBids = document.querySelector("#bids");
const cardExpire = document.querySelector("#remainingTime");
const cardDescription = document.querySelector("#description");
const cardBidsContainer = document.querySelector("#bid-details");
const cardsContainer = document.querySelector("#cardsContainer");
const sellerName = document.querySelector("#seller-name");
const sellerAvatar = document.querySelector("#seller-avatar");

const displayActive = "&_active=true";
const bidsUrl = "?_bids=true";
const listingsUrlEnd = "/auction/listings/";
const listingsUrl = BASE_URL + listingsUrlEnd;

export async function readListings() {
  const response = await fetch(
    listingsUrl + bidsUrl + "&_seller=true" + displayActive,
  );
  console.log(displayActive);
  const result = await response.json();
  console.log(result.data);

  result.data.forEach((element) => {
    // Uso l'optional chaining ?. per evitare crash se media o avatar mancano
    const imageUrl = element.media?.[0]?.url || "https://placeholder.com";
    const sellerAvatarUrl =
      element.seller?.avatar?.url || "https://placeholder.com";

    cardsContainer.innerHTML += `
    <div id="card" class="col-6 m-5 card" style="width: 18rem">
      <h5 class="card-text my-1 d-flex justify-content-around align-items-center">
          <p class="text-secondary my-auto">by:</p> ${element.seller?.name || "Unknown"}
          <img src="${sellerAvatarUrl}" class="rounded float-end w-25" alt="avatar" />
      </h5>
      <div class="card-body">
          <img src="${imageUrl}" class="card-img-top" alt="${element.title}" />
          <h5 class="card-title mt-2">${element.title}</h5>
          <hr>
          <div class="row">
              <p class="card-text col-6">Bids</p>
              <p class="card-text col-6 d-flex justify-content-end">${element._count.bids}</p>
          </div>
          <hr>
          <div class="row d-flex flex-wrap">
              <p class="card-text mb-0">Expiring :</p>
              <p class="card-text">${new Date(element.endsAt).toLocaleString()}</p>
          </div>
          <a href="/listing/index.html?id=${element.id}" class="btn btn-primary d-flex justify-content-center mt-3">See details</a>
      </div>
    </div>`;
    // ELIMINATO il console.log che rompeva tutto
  });
}

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function readListing() {
  const response = await fetch(listingsUrl + id + bidsUrl + "&_seller=true");
  const result = await response.json();
  const listing = result.data; // Nella v2 i dati sono dentro .data

  // 1. POPOLIAMO I BIDS (Offerte)
  cardBidsContainer.innerHTML = ""; // Puliamo prima di aggiungere
  if (listing.bids && listing.bids.length > 0) {
    listing.bids.forEach((bidDetail) => {
      cardBidsContainer.innerHTML += `
      <div class="d-flex justify-content-between border-bottom py-1">
        <p class="mb-0">${bidDetail.bidder.name}</p>
        <p class="mb-0 fw-bold">${bidDetail.amount} credits</p>
      </div>`;
    });
  } else {
    cardBidsContainer.innerHTML = "<p>No bids yet.</p>";
  }

  // 2. INFORMAZIONI VENDITORE E TESTI
  sellerName.innerHTML = `<p class="text-secondary d-inline">by: </p>${listing.seller.name}`;

  const sellerAvatarUrl =
    listing.seller.avatar?.url || "https://placeholder.com";
  sellerAvatar.innerHTML = `<img
                              src="${sellerAvatarUrl}"
                              id="avatar"
                              class="rounded float-end w-50"
                              alt="avatar of ${listing.seller.name}"
                            />`;

  cardTitle.innerHTML = listing.title;
  cardExpire.innerHTML = new Date(listing.endsAt).toLocaleString(); // Formattiamo la data
  cardBids.innerHTML = listing._count.bids;
  cardDescription.innerHTML = listing.description || "No description provided.";

  // 3. GESTIONE CAROSELLO (Immagini)
  const carouselInner = document.querySelector("#carousel-inner");
  const preArrow = document.querySelector(".pre-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  carouselInner.innerHTML = ""; // Puliamo il carosello

  if (listing.media && listing.media.length > 0) {
    listing.media.forEach((item, index) => {
      const divItem = document.createElement("div");
      // La prima immagine DEVE avere la classe 'active' per essere visibile subito
      divItem.className =
        index === 0 ? "carousel-item active" : "carousel-item";

      const pic = document.createElement("img");
      pic.src = item.url; // Fondamentale .url per v2
      pic.className = "d-block w-100";
      pic.alt = listing.title;
      pic.style.height = "400px"; // Opzionale: per uniformare l'altezza
      pic.style.objectFit = "cover";

      divItem.appendChild(pic);
      carouselInner.appendChild(divItem);
    });
  } else {
    // Immagine di fallback se non ci sono foto
    carouselInner.innerHTML = `
      <div class="carousel-item active">
        <img src="https://placeholder.com" class="d-block w-100" />
      </div>`;
  }

  // 4. NASCONDIAMO LE FRECCE SE C'È SOLO UNA FOTO
  if (listing.media.length <= 1) {
    if (preArrow) preArrow.classList.add("visually-hidden");
    if (nextArrow) nextArrow.classList.add("visually-hidden");
  } else {
    if (preArrow) preArrow.classList.remove("visually-hidden");
    if (nextArrow) nextArrow.classList.remove("visually-hidden");
  }
}
