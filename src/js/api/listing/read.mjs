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

  result.bids.forEach((bidDetail) => {
    // console.log(bidDetail);

    cardBidsContainer.innerHTML += `
    <div class="d-flex justify-content-between">
    <p>${bidDetail.bidderName}</p>
    <p class="count-bids">${bidDetail.amount}</p>
    </div>`;
  });
  // here event
  console.log(result);
  sellerName.innerHTML = `<p class="text-secondary">by: </p>${result.seller.name}`;
  sellerAvatar.innerHTML = `<img
                              src="${result.seller.avatar}"
                              id="avatar"
                              class="rounded float-end w-50"
                              alt="avatar of ${result.seller.name}"
                            />`;
  cardTitle.innerHTML = `${result.title}`;
  cardExpire.innerHTML = `${result.endsAt}`;
  cardBids.innerHTML = `${result._count.bids}`;
  cardDescription.innerHTML = `${result.description}`;

  console.log(result.media.length);

  const imgDiv = document.querySelector("#carousel-div");

  const preArrow = document.querySelector(".pre-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  const pic = document.createElement("img");
  pic.src = result.media[0];
  pic.className = "d-block w-100";
  pic.alt = `an image`;

  if (result.media.length <= 1) {
    preArrow.classList.add("visually-hidden");
    nextArrow.classList.add("visually-hidden");
  }

  imgDiv.appendChild(pic);

  if (result.media.length > 1) {
    for (let i = 1; i < result.media.length; i++) {
      const carouselInner = document.querySelector("#carousel-inner");
      const divCards = document.createElement("div");
      divCards.className = "carousel-item";
      const pic = document.createElement("img");
      pic.src = result.media[i];
      pic.className = "d-block w-100";

      carouselInner.appendChild(divCards).appendChild(pic);
    }
  }
}
