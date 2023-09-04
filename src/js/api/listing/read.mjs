import { BASE_URL } from "../constants.mjs";

const cardsContainer = document.querySelector("#cardsContainer");

console.log("ciao");

export async function readListings() {
  const listingsUrl = BASE_URL + "/listings";

  const response = await fetch(listingsUrl);
  const result = await response.json();
  //   console.log(result);

  result.forEach((element) => {
    console.log(element);

    //  <img src="" id="itemImage" class="card-img-top" alt="image here" />
    cardsContainer.innerHTML += `
    <div class="col-6 m-5 card" style="width: 18rem">
        
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
            <a href="/profile/login/" class="btn btn-primary">Bid Now</a>
          </div>
        </div>
    `;
  });
}
