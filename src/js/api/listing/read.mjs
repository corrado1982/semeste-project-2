import { BASE_URL } from "../constants.mjs";
// import { makeBid } from "./bid.mjs";

//some experiment of populare the form
const cardTitle = document.querySelector("#itemTitle");
const cardBids = document.querySelector("#bids");
const cardExpire = document.querySelector("#remainingTime");
const cardDescription = document.querySelector("#description");
const cardBidsContainer = document.querySelector("#bid-details");
// const cardAppendPicture = document.querySelector("#card-body");
//til here

// const itemContainer = document.querySelector("#listItem");
const cardsContainer = document.querySelector("#cardsContainer");

// "&_active=true"
// let isItActive = "";
const displayActive = "&_active=true";
const bidsUrl = "?_bids=true";
const listingsUrlEnd = "/listings/";
const listingsUrl = BASE_URL + listingsUrlEnd;

const filterActive = document.querySelector("#filter-active");

// const filterClass = document.getElementsByClassName("isActive");
// console.log(filterActive.value);
// filterActive.addEventListener("click", () => {
//   // location.reload();
// console.log(filterActive.value);
// if (filterActive.value === 2) {
//   isItActive = "&_active=true";
// } //else if (filterActive.value === 1) {
//isItActive = "";
//}
// console.log(isItActive);
// });

// console.log(filterActive.value);
// console.log(filterClass.value);
// if (filterActive.value === 2) {
//   displayActive === "&_active=true";
// }

export async function readListings() {
  const response = await fetch(
    listingsUrl + bidsUrl + "&_seller=true" + displayActive
  );

  // const filterActive = document.querySelector("#filter-active");
  // const filterActive = document.querySelector("#filter-active");

  // if (filterActive.value === 2) {
  //   console.log(filterActive.value);
  //   displayActive = "&_active=true";
  // } else if (filterActive.value === 1) {
  //   displayActive = "";
  // }
  // console.log(displayActive);

  const result = await response.json();
  console.log(result);

  result.forEach((element) => {
    // console.log(element);
    // console.log(element._count.bids);

    cardsContainer.innerHTML += `
    <div id="card" class="col-6 m-5 card" style="width: 18rem">

      <p id="seller-name" class="card-text"
          >by: ${element.seller.name}
          <img src="${element.seller.avatar}" id="seller-avatar" class="rounded float-end w-25" alt="avatar of ${element.seller.name}" />
      </p>
        
          <div class="card-body">
          <img src="${element.media[0]}" id="itemImage" class="card-img-top" alt="image of ${element.title}" />
            <h5 id="itemTitle" class="card-title">${element.title}</h5>
            <div class="row">
              <p class="card-text col-6">Bids</p>
              <p
                id="actualPrice"
                class="card-text col-6 d-flex justify-content-end"
              >${element._count.bids}
                
              </p>
            </div>
            <div class="row">
              <p class="card-text col-6">Expiring</p>
              <p
                id="remainingTime"
                class="card-text col-6 d-flex justify-content-end"
              >
              ${element.endsAt}
              </p>
            </div>


          <a href="/listing/index.html?id=${element.id}" class="btn btn-primary"
          >a See details</a
        >
           
          </div>
        </div>
    `;
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
    <p>${bidDetail.amount}</p>
    </div>`;
  });
  // here event
  console.log(result);
  cardTitle.innerHTML = `${result.title}`;
  cardExpire.innerHTML = `${result.endsAt}`;
  cardBids.innerHTML = `${result._count.bids}`;
  cardDescription.innerHTML = `${result.description}`;

  const img = document.createElement("img");

  img.src = result.media[0];
  img.className = "card-img-top";
  img.alt = `image of ${result.title}`;

  const src = document.getElementById("card-body");

  src.appendChild(img);
}
