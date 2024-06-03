function getMyDetails() {
  console.log("getMyDetails");
  return $.ajax({
    url: "/users/me",
  });
}

function logout() {
  return $.ajax({
    method: "POST",
    url: "/users/logout",
  })
}

function login(data) {
  return $.ajax({
    method: "POST",
    url: "/users/login",
    data
  });
}

function register(data) {
  return $.ajax({
    method: "POST",
    url: "/users",
    data
  });
}

function getAllItems(params) {
  let url = "/api/items";
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
}

function getAllFavourites() {
  let url = "/api/favourites";
  return $.ajax({
    url,
  });
}

const submitItem = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/items",
    data,
  });
}
