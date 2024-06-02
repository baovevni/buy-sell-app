$(() => {

  const $itemListings = $(`
  <section class="item-listings" id="item-listings">
      <p>Loading...</p>
    </section>
  `);
  window.$itemListings = $itemListings;

  window.itemListings = {};

  function addListing(listing) {
    $itemListings.append(listing);
  }
  function clearListings() {
    $itemListings.empty();
  }
  window.itemListings.clearListings = clearListings;

  function addItems(items, isFavourite = false) {
    clearListings();
    for (const itemId in items) {
      const item = items[itemId];
      const listing = itemListing.createListing(item, isFavourite);
      addListing(listing);
    }
  }
  window.itemListings.addItems = addItems;

});
