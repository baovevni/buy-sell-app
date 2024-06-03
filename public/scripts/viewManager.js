$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(itemView) {
    $newItemForm.detach();
    $itemListings.detach();
    $searchItemForm.detach();
    $loginForm.detach();
    $registerForm.detach();

    switch (itemView) {
      case 'listings':
        $itemListings.appendTo($main);
        break;
      case 'newItem':
        $newItemForm.appendTo($main);
        break;
      case 'searchItem':
        $searchItemForm.appendTo($main);
        break;
      case 'login':
        $loginForm.appendTo($main);
        break;
      case 'register':
        $registerForm.appendTo($main);
        break;
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('listings');
        }, 2000);

        break;
      }
    }
  }

});
