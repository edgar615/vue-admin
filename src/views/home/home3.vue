<template>
  <div>
    <div class="nav menu mb-3">
      <div class="nav-left">
        <a class="nav-item is-tab"><b-icon icon="plus-circle-outline" class="icon-btn"></b-icon></a>
        <a class="nav-item is-tab">
		  <span class="icon-btn is-info">
			<i class="fa fa-print"></i>
		  </span>
        </a>
        <a class="nav-item is-tab">
		  <span class="icon-btn thin">
			<i class="fa fa-lock"></i>
		  </span>
        </a>
        <div class="nav-item">
          <router-link to="/backend/system/add"
                       exact class="button is-primary is-tab">
            <b-icon icon="plus-circle-outline"></b-icon>
            <span>新增</span>
          </router-link>
        </div>

        <div class="nav-item is-tab">
          <strong>2 items selected</strong>
        </div>
      </div>
      <div class="nav-right is-hidden-mobile">
        <a class="nav-item is-tab">Name</a>
        <a class="nav-item is-tab">Size</a>
        <a class="nav-item is-tab">Views</a>
        <a class="nav-item"><span class=" button is-success">Uploaded</span></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        region: '370832'
      }
    }
  }
</script>

<style scoped>

</style>
