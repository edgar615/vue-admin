<template>
  <section class="m-5">
    <div class="columns is-multiline">
      <div class="column">
        <div class="notification is-primary">
          <div class="heading">Top Seller Total</div>
          <div class="title">56,950</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Sales $</div>
                <div class="title is-5">250K</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Overall $</div>
                <div class="title is-5">750K</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Sales %</div>
                <div class="title is-5">25%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box notification is-warning">
          <div class="heading">Revenue / Expenses</div>
          <div class="title">55% / 45%</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Rev Prod $</div>
                <div class="title is-5">30%</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Rev Serv $</div>
                <div class="title is-5">25%</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Exp %</div>
                <div class="title is-5">45%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box notification is-info">
          <div class="heading">Feedback Activity</div>
          <div class="title">78% &uarr;</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Pos</div>
                <div class="title is-5">1560</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Neg</div>
                <div class="title is-5">368</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Pos/Neg %</div>
                <div class="title is-5">77% / 23%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box notification is-danger">
          <div class="heading">Orders / Returns</div>
          <div class="title">75% / 25%</div>
          <div class="level">
            <div class="level-item">
              <div class="">
                <div class="heading">Orders $</div>
                <div class="title is-5">425K</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Returns $</div>
                <div class="title is-5">106K</div>
              </div>
            </div>
            <div class="level-item">
              <div class="">
                <div class="heading">Success %</div>
                <div class="title is-5">+ 28,5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-3 pl-0 pr-0">

        <div class="widget widget-counter">
          <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
          <div class="widget-label">
            <span>Server uptime</span>
          </div>
          <div class="widget-label">
            <strong class="num">0.0%</strong>
          </div>
        </div>

      </div>
      <div class="column is-3 pl-0 pr-0">

        <div class="widget widget-counter is-info">
          <b-icon icon="star" class="widget-icon"></b-icon>
          <div class="widget-label">
            <span>Users Total</span>
          </div>
          <div class="widget-label">
            <strong class="num">1k</strong>
          </div>
        </div>

      </div>
      <div class="column is-3 pl-0 pr-0">

        <div class="widget widget-counter is-success">
          <b-icon icon="star" class="widget-icon"></b-icon>
          <div class="widget-label">
            <span>New Daily Photos</span>
          </div>
          <div class="widget-label">
            <strong class="num">1000</strong>
          </div>
        </div>

      </div>
      <div class="column is-3 pl-0 pr-0">

        <div class="widget widget-counter is-danger">
          <b-icon icon="star" class="widget-icon"></b-icon>
          <div class="widget-label">
            <span>Exchange Commission</span>
          </div>
          <div class="widget-label">
            <strong class="num">0%</strong>
          </div>
        </div>
      </div>
    </div>

    <!--Counter-->
    <div class="columns is-multiline">
      <div class="column is-3">

        <div class="widget widget-counter">
          <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
          <div class="widget-label">
            <strong class="num">0.0%</strong>
            <span>Server uptime</span>
          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget widget-counter is-info">
          <b-icon icon="star" class="widget-icon"></b-icon>
          <div class="widget-label">
            <strong class="num">1k</strong>
            <span>Users Total</span>
          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget widget-counter is-success">
          <b-icon icon="star" class="widget-icon"></b-icon>
          <div class="widget-label">
            <strong class="num">1000</strong>
            <span>New Daily Photos</span>
          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget widget-counter is-danger">
          <b-icon icon="star" class="widget-icon"></b-icon>
          <div class="widget-label">
            <strong class="num">0%</strong>
            <span>Exchange Commission</span>
          </div>
        </div>
      </div>
    </div>

    <!--counter block-->

    <div class="columns">
      <div class="column is-3">

        <div class="widget">
          <div class="widget-upper">

            <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
            <div class="widget-label">
              <strong class="num">0.0%</strong>
              <span>Server uptime</span>
            </div>

          </div>
          <div class="widget-lower">
            <div class="border"></div>
            <span class="mb-1">Result</span>
            <strong>78% Increase</strong>
          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget is-primary">
          <div class="widget-upper">

            <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
            <div class="widget-label">
              <strong class="num">0</strong>
              <span>Photos Taken</span>
            </div>

          </div>
          <div class="widget-lower">
            <div class="border"></div>

            <span class="mb-1">Increase</span>
            <strong>512 more photos</strong>
          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget is-dark">
          <div class="widget-upper">

            <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
            <div class="widget-label">
              <strong class="num">0k</strong>
              <span>Daily Visits</span>
            </div>

          </div>
          <div class="widget-lower">
            <div class="border"></div>

            <span class="mb-1">Bounce Rate</span>
            <strong>51.55%</strong>
          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget is-warning">
          <div class="widget-upper">

            <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
            <div class="widget-label">
              <strong class="num">24/7</strong>
              <span>Live Support</span>
            </div>

          </div>
          <div class="widget-lower">
            <div class="border"></div>

            <span class="mb-1">Tickets Opened</span>
            <strong>0</strong>
          </div>
        </div>

      </div>
    </div>

    <!-- Todo List -->
    <div class="columns">
      <div class="column is-3">

        <div class="widget">
          <div class="widget-header">
            <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
            <div class="widget-label">
              <span>to do list</span>
              <strong>Tasks</strong>
            </div>
          </div>
          <div class="widget-body">
            <ul class="list-unstyled">
              <li class="done">
                <label>
                  <input type="checkbox" class="cbr" checked />
                  <span>Web Design</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>Slicing</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>WooCommerce</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>Programming</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>SEO Optimize</span>
                </label>
              </li>
            </ul>

          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget is-primary">
          <div class="widget-header">
            <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
            <div class="widget-label">
              <span>to do list</span>
              <strong>Tasks</strong>
            </div>
          </div>
          <div class="widget-body">
            <ul class="list-unstyled">
              <li class="done">
                <label>
                  <input type="checkbox" class="cbr" checked />
                  <span>Web Design</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>Slicing</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>WooCommerce</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>Programming</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>SEO Optimize</span>
                </label>
              </li>
            </ul>

          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget is-info">
          <div class="widget-header">
            <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
            <div class="widget-label">
              <span>to do list</span>
              <strong>Tasks</strong>
            </div>
          </div>
          <div class="widget-body">
            <ul class="list-unstyled">
              <li class="done">
                <label>
                  <input type="checkbox" class="cbr" checked />
                  <span>Web Design</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>Slicing</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>WooCommerce</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>Programming</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>SEO Optimize</span>
                </label>
              </li>
            </ul>

          </div>
        </div>

      </div>
      <div class="column is-3">

        <div class="widget is-danger">
          <div class="widget-header">
            <b-icon icon="star" class="widget-icon" size="is-medium"></b-icon>
            <div class="widget-label">
              <span>to do list</span>
              <strong>Tasks</strong>
            </div>
          </div>
          <div class="widget-body">
            <ul class="list-unstyled">
              <li class="done">
                <label>
                  <input type="checkbox" class="cbr" checked />
                  <span>Web Design</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>Slicing</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>WooCommerce</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>Programming</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" class="cbr" />
                  <span>SEO Optimize</span>
                </label>
              </li>
            </ul>

          </div>
        </div>

      </div>
    </div>

  </section>
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
