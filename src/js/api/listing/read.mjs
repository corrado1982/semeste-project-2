import { BASE_URL } from "../constants.mjs";

const itemContainer = document.querySelector("#listItem");
const cardsContainer = document.querySelector("#cardsContainer");
const listingsUrlEnd = "/listings/";
const listingsUrl = BASE_URL + listingsUrlEnd;

// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const id = params.get("id");

export async function readListings() {
  const response = await fetch(listingsUrl);
  const result = await response.json();
  //   console.log(result);

  result.forEach((element) => {
    console.log(element);

    cardsContainer.innerHTML += `
    <div  class="col-6 m-5 card" style="width: 18rem">
        
          <div class="card-body">
          <img src="${element.media[0]}" id="itemImage" class="card-img-top" alt="image here" />
            <h5 id="itemTitle" class="card-title">${element.title}</h5>
            <div class="row">
              <p class="card-text col-6">price now</p>
              <p
                id="actualPrice"
                class="card-text col-6 d-flex justify-content-end"
              >
                1000
              </p>
            </div>
            <div class="row">
              <p class="card-text col-6">contdown</p>
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
  const response = await fetch(listingsUrl + id);
  const result = await response.json();
  console.log(id);

  itemContainer.innerHTML = `
  <div  class="col-6 m-5 card" style="width: 18rem">
        
          <div class="card-body">
          <img src="${result.media}" id="itemImage" class="card-img-top" alt="image here" />
            <h5 id="itemTitle" class="card-title">${result.title}</h5>
            <div class="row">
              <p class="card-text col-6">price now</p>
              <p
                id="actualPrice"
                class="card-text col-6 d-flex justify-content-end"
              >
                1000
              </p>
            </div>
            <div class="row">
              <p class="card-text col-6">contdown</p>
              <p
                id="remainingTime"
                class="card-text col-6 d-flex justify-content-end"
              >
              ${result.endsAt}
              </p>
            </div>
            <a href="/listing/" class="btn btn-primary">Bid Now</a>
          </div>
        </div>
    `;
}
