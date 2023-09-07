import { BASE_URL } from "../constants.mjs";
import { makeBid } from "./bid.mjs";

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

const bidsUrl = "?_bids=true";
const listingsUrlEnd = "/listings/";
const listingsUrl = BASE_URL + listingsUrlEnd;

export async function readListings() {
  const response = await fetch(listingsUrl + bidsUrl);
  const result = await response.json();
  //   console.log(result);

  result.forEach((element) => {
    // console.log(element);
    // console.log(element._count.bids);

    cardsContainer.innerHTML += `
    <div  class="col-6 m-5 card" style="width: 18rem">
        
          <div class="card-body">
          <img src="${element.media[0]}" id="itemImage" class="card-img-top" alt="image here" />
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
            <a href="/listing/index.html?id=${element.id}" class="btn btn-primary">Bid Now</a>
          </div>
        </div>
    `;
  });
}

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
// const id = "dc4b2b25-c51a-4e76-a334-148d4af9f8e2";

export async function readListing() {
  const response = await fetch(listingsUrl + id + bidsUrl);
  const result = await response.json();

  result.bids.forEach((bidDetail) => {
    console.log(bidDetail.bidderName);

    cardBidsContainer.innerHTML += `
    <div class="d-flex justify-content-between">
    <p>${bidDetail.bidderName}</p>
    <p>${bidDetail.amount}</p>
    </div>`;
  });
  // console.log(id);
  console.log(result);
  console.log(result.bids);
  //prove da qui

  cardTitle.innerHTML = `${result.title}`;
  cardBids.innerHTML = `${result._count.bids}`;
  cardExpire.innerHTML = `${result.endsAt}`;
  cardDescription.innerHTML = `${result.description}`;

  // cardAppendPicture.append(result.media[0]);
  const img = document.createElement("img");
  //   .classList.add("card-img-top");

  img.src = result.media[0];
  img.className = "card-img-top";
  img.alt = `image of ${result.title}`;

  const src = document.getElementById("card-body");

  src.appendChild(img);
  //prova bid

  //fino qui
  //   itemContainer.innerHTML = `
  //     <div  class="col-6 m-auto card">

  //             <div class="card-body">
  //             <img src="${result.media[0]}" id="itemImage" class="card-img-top" alt="image of ${result.title}" />
  //               <h5 id="itemTitle" class="card-title">${result.title}</h5>

  //               <div class="row">
  //                 <p class="card-text col-6">Expiring</p>
  //                 <p
  //                   id="remainingTime"
  //                   class="card-text col-6 d-flex justify-content-end"
  //                 >
  //                 ${result.endsAt}
  //                 </p>
  //               </div>
  //               <div class="row">
  //                 <p class="card-text col-6">Bids</p>
  //                 <p
  //                   id="actualPrice"
  //                   class="card-text col-6 d-flex justify-content-end"
  //                 >
  //                 ${result._count.bids}
  //                 </p>
  //               </div>
  //               <div class="row">
  //                 <p class="card-text col-6">Bid Amount</p>
  //                 <p
  //                   id="actualPrice"
  //                   class="card-text col-6 d-flex justify-content-end"
  //                 >
  //                 Amount
  //                 </p>
  //               </div>
  //               <div class="d-grid gap-2 col-3 mx-auto">
  //               <a href="#" class="btn btn-primary">Bid Now</a>
  //             </div>
  //             </div>
  //           </div>
  //       `;
}
