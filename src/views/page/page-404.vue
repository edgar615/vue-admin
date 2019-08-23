<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <h1 class="title error-title">
          ERROR  404
        </h1>
        <div class="split error-split"></div>
        <h1 class="title">
          <span class="icon">
            <i class="mdi mdi-emoticon-sad"></i>
          </span>
          真不巧，您要访问的页面弄丢了
        </h1>
        <router-link class="button" to="/" >
          返回首页
        </router-link>
      </div>
    </div>
  </section>
</template>
<script>
</script>
<style scoped>
  .error-title {
    font-size: 80px;
  }
  .error-split {
    background-color: #a779e9;
    width: 4rem;
    height: .25rem;
    margin-top: .75rem;
    margin-bottom: .75rem;
  }
</style>
