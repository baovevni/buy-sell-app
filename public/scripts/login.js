$(() => {

  const $loginForm = $(`
  <form id="login-form" class="login-form">
      <p>Login</p>
      <div class="login-form__field-wrapper">
        <input type="email" name="email" placeholder="Email">
      </div>

      <div class="login-form__field-wrapper">
          <input type="password" name="password" placeholder="Password">
        </div>

      <div class="login-form__field-wrapper">
          <button>Login</button>
          <a id="login-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `);

  window.$loginForm = $loginForm;

  $loginForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    login(data)
      .then(json => {
        console.log(json);
        if (!json.user) {
          views_manager.show('error', 'Failed to login');
          return;
        }
        console.log(json.user);
        header.update(json.user);
        views_manager.show('listings');
      });
  });

  $('body').on('click', '#login-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });

});
