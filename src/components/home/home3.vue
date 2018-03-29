<template>
  <div class="nav menu">
      <div class="nav-left">
        <a class="nav-item is-tab"><b-icon icon="plus" class="icon-btn is-info"></b-icon></a>
        <a class="nav-item is-tab">
		  <span class="icon-btn">
			<i class="fa fa-print"></i>
		  </span>
        </a>
        <a class="nav-item is-tab">
		  <span class="icon-btn thin">
			<i class="fa fa-lock"></i>
		  </span>
        </a>
        <a class="nav-item is-tab">
		  <span class="icon-btn">
			<i class="fa fa-trash"></i>
		  </span>
        </a>
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
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
      }
    }
  }
</script>

<style scoped>

</style>
