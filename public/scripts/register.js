$(() => {

  const $registerForm = $(`
  <form id="sign-up-form" class="sign-up-form">
        <p>Sign Up</p>

        <div class="registerform__field-wrapper">
            <input type="text" name="name" placeholder="Username">
          </div>

        <div class="registerform__field-wrapper">
          <input type="email" name="email" placeholder="Email">
        </div>

        <div class="registerform__field-wrapper">
            <input type="password" name="password" placeholder="Password">
          </div>

        <div class="registerform__field-wrapper">
            <button>Register</button>
            <a id="registerform__cancel" href="#">Cancel</a>
        </div>
      </form>
  `);
  window.$registerForm = $registerForm;

  $registerForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    register(data)
      .then(getMyDetails) //change to getMyDetails name later
      .then((json) => {
        header.update(json.user);
        views_manager.show('listings');
      });
  });

  $('body').on('click', '#login__cancel', function() {
    views_manager.show('listings');
    return false;
  });

});