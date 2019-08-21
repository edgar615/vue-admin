<template>
  <section>
    <div class="container profile">

      <div class="section profile-heading">
        <div class="columns">
          <div class="column is-2">
            <div class="image is-128x128 avatar">
              <img src="https://placehold.it/256x256">
            </div>
          </div>
          <div class="column is-4 name">
            <p>
              <span class="title is-bold">John Smith</span>
              <span class="button is-primary is-outlined follow">Follow</span>
            </p>
            <p class="tagline">The users profile bio would go here, of course. It could be two lines</p>
          </div>
          <div class="column is-2 followers has-text-centered">
            <p class="stat-val">129k</p>
            <p class="stat-key">followers</p>
          </div>
          <div class="column is-2 following has-text-centered">
            <p class="stat-val">2k</p>
            <p class="stat-key">following</p>
          </div>
          <div class="column is-2 likes has-text-centered">
            <p class="stat-val">29</p>
            <p class="stat-key">likes</p>
          </div>
        </div>
      </div>
      <div class="profile-options">
        <div class="tabs is-fullwidth">
          <ul>
            <li class="link is-active"><a><span class="icon"><i class="fa fa-list"></i></span> <span>My Lists</span></a></li>
            <li class="link"><a><span class="icon"><i class="fa fa-heart"></i></span> <span>My Likes</span></a></li>
            <li class="link"><a><span class="icon"><i class="fa fa-th"></i></span> <span>My Posts</span></a></li>
            <li class="link"><a><span class="icon"><i class="fa fa-bookmark"></i></span> <span>My Bookmarks</span></a></li>
          </ul>
        </div>
      </div>

      <div class="box">
        <!-- Main container -->
        <nav class="level page-content-top">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>123</strong> posts
              </p>
            </div>
            <div class="level-item">
              <p class="control has-addons">
                <input class="input" type="text" placeholder="Find a post">
                <button class="button">
                  Search
                </button>
              </p>
            </div>
          </div>

          <!-- Right side -->
          <div class="level-right">
            <p class="level-item"><strong>All</strong></p>
            <p class="level-item"><a>Published</a></p>
            <p class="level-item"><a>Drafts</a></p>
            <p class="level-item"><a>Deleted</a></p>
            <p class="level-item"><a class="button is-success">New</a></p>
          </div>
        </nav>
      </div>

      <div class="spacer"></div>

      <div class="columns">
        <div class="column is-3">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
        </div>
        <div class="column is-3">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
        </div>
        <div class="column is-3">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
        </div>
        <div class="column is-3">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="http://placehold.it/300x225" alt="">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <span class="tag is-dark">#webdev</span>
                <strong class="timestamp">2 d</strong>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">Save</a>
              <a class="card-footer-item">Edit</a>
              <a class="card-footer-item">Delete</a>
            </footer>
          </div>
          <br>
        </div>

      </div>
    </div>
  </section>
</template>
<script>
  import {changePwd} from '@/api/profile'
  export default {
    data() {
      return {
        loading: false,
        saving: false,
        model: {
        }
      }
    },
    methods: {
      save() {
        const vm = this
        changePwd(vm.model).then(() => {
          vm.$successToast("密码修改成功");
          vm.model = {}
        })
      }
    }
  }
</script>
<style scoped>
  .container.profile {
    margin-top:50px;
  }
  .profile-heading {
    margin: 20px 0;
    padding-bottom: 30px;
  }
  .profile-heading .name {
    border-right: 1px solid #f1f1f1;
    margin:-30px 0;
    padding: 40px 30px 0 30px;
  }
  .profile-heading .followers, .profile-heading .following {
    border-right: 1px solid #f1f1f1;
    margin:-30px 0;
    padding: 70px 30px;
  }
  .profile-heading .likes {
    margin:-30px 0;
    padding: 70px 30px;
  }
  .profile-heading .stat-key {
    font-size: 20px;
    font-weight: 200;
  }
  .profile-heading .stat-val {
    font-size: 35px;
    font-weight: bold;
  }
  .profile-options {
    background-color: #f1f1f1;
    margin:-20px 0 20px 0;
  }
  .profile-options .link a {
    padding:18px;
    font-size: 18px;
  }
  .profile-options .link .icon {
    font-size: 16px;
    padding-top:2px;
  }
  .tagline {
    padding:20px 0;
    font-size: 16px;
    line-height: 1.4;
  }
  .avatar {
    float: right;
  }
  .follow {
    float: right;
  }
  .avatar img {
    border-radius: 200px;
  }
  p.title.is-bold {
    font-weight: bold;
  }
  .card .timestamp {
    float:right;
    color:#bbb;
  }
</style>
