<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">警情处理</p>
      </header>
      <section class="modal-card-body">
        <b-tabs type="is-toggle" expanded >
          <b-tab-item label="警情信息" icon="exclamation-circle"></b-tab-item>
          <b-tab-item label="警情复合" icon="check-circle"></b-tab-item>
          <b-tab-item label="历史报警" icon="list"></b-tab-item>
          <b-tab-item label="用户信息" icon="user-circle"></b-tab-item>
        </b-tabs>
        <div class="hero is-info">
          <div class="hero-body">
            <h1 class="title">
              Hero title
            </h1>
            <h2 class="subtitle">
              Hero subtitle
            </h2>
          </div>
        </div>
        <div class="hero is-info">
          <div class="hero-body">
            <h1 class="title">
              Hero title
            </h1>
            <h2 class="subtitle">
              Hero subtitle
            </h2>
          </div>
        </div>
        <div class="hero is-info">
          <div class="hero-body">
            <h1 class="title">
              Hero title
            </h1>
            <h2 class="subtitle">
              Hero subtitle
            </h2>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary">Login</button>
      </footer>
    </div>
  </form>
</template>

<script>
  export default {
    props: ['email', 'password']
  }
</script>

<style scoped>
  .modal-card {
    width: auto;
  }
</style>
