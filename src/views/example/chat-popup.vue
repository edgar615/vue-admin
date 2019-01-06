<template>
  <section>
    <div class="chat-popup" id="myForm">
      <form class="form-container">
        <h1>Chat</h1>

        <label for="msg"><b>Message</b></label>
        <textarea id="msg" placeholder="Type message.." name="msg" required></textarea>

        <button type="submit" class="btn">Send</button>
        <button type="button" class="btn cancel">Close</button>
      </form>
    </div>
  </section>
</template>
