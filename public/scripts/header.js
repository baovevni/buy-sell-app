$(() => {
  window.header = {};

  const $pageHeader = $('#page-header');
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="home">🏠</li>
          <li class="search_button">Search</li>
          <li class="login_button">Log In</li>
          <li class="register_button">Register</li>
        </ul>
      </nav>
      `;
    } else {
      userLinks = `
      <nav id="page-header__user-links" class="page-header__user-links">
        <ul>
          <li class="home">🏠</li>
          <li class="search_button">Search</li>
          <li>${user.name}</li>
          <li class="sellItem_button">Sell Item</li>
          <li class="myItems_button">My Items</li>
          <li class="favourites_button">Favourites</li>
          <li class="logout_button">Log Out</li>
        </ul>
      </nav>
      `;
    }

    $pageHeader.append(userLinks);
  }

  window.header.update = updateHeader;

  getMyDetails()
    .then(function( json ) {
    updateHeader(json.user);
  });

  $("header").on("click", 'favourites_button.button', function() {
    itemListings.clearListings();
    getAllFavourites()
      .then(function(json) {
        itemListing.addItem(json.reservations, true);
        views_manager.show('listings');
      })
      .catch(error => console.error(error));
  });
  $("header").on("click", '.myItems_button', function() {
    itemListings.clearListings();
    getAllListings(`owner_id=${currentUser.id}`)
      .then(function(json) {
        itemListings.addItem(json.shoes);
        views_manager.show('listings');
    });
  });

  $("header").on("click", '.home', function() {
    itemListings.clearListings();
    getAllListings()
      .then(function(json) {
        itemListings.addItem(json.items);
        views_manager.show('listings');
    });
  });

  $('header').on('click', '.search_button', function() {
    views_manager.show('searchItem');
  });

  $("header").on('click', '.login_button', () => {
    views_manager.show('logIn');
  });
  $("header").on('click', '.register_button', () => {
    views_manager.show('register');
  });
  $("header").on('click', '.logout_button', () => {
    logOut().then(() => {
      header.update(null);
    });
  });

  $('header').on('click', '.sellItem_button', function() {
    views_manager.show('newItem');
  });
});
