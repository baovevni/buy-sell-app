$(() => {
  window.itemListing = {};

  function createListing(item, isFavourite) {
    return `
    <article class="item-listing">
        <section class="item-listing__preview-image">
          <img src="${item.thumbnail_photo_url}" alt="item">
        </section>
        <section class="item-listing__details">
          <h3 class="item-listing__title">${item.title}</h3>
          <ul class="item-listing__details">
            <li>item_price: ${item.price}</li>
            <li>item description: ${item.description}</li>
          </ul>
          ${isFavourite ?
            `<p>&#128525;</p>`
            : ``}

        </section>
      </article>
    `
  }

  window.itemListing.createListing = createListing;

});
