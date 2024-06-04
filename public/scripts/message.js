$(() => {

  const createMessage = (message, id) => $(`<article class="message">
              <form class="update-form" data-id=${id}>
                <input type="text" id="message" name="message" value="${message}" autocomplete="off" required>
                <button class="edit-btn" type="submit">Edit</button>
              </form>
              <button class="delete-btn" data-id=${id}>Delete</button>
            </article>`);

  //message render
  const renderMessages = (messages) => {
    const messagesList = messages.map(message => createMessage(message));
    $('#messages').empty();
    $('#messages').append(messagesList);
  };

  //get messages

  const getMessages = () => {
    $.get('/messages')
      .then((messages) => {
        renderMessages(messages);
      });
  };

  //add message

  const addMessage = (message) => {
    $.post('/messages', { message })
      .then(() => {
        getMessages();
      });
  };


  //delete message
  const deleteMessage = (id) => {
    $.post(`/messages/${id}/delete`)
      .then(() => {
        getMessages();
      });
  };

  //event listeners
  $('#add-message').on('submit', function(event) {
    event.preventDefault();
    const message = $('#message').val();
    addMessage(message);
  });


  $('#messages').on('click', '.delete-btn', function() {
    const id = $(this).data('id');
    deleteMessage(id);
  });

  getMessages();
});
