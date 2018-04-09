<template>
  <div>
    <div class="header">
      <h1>CJ OJ Manager</h1>
      <h2>cqjtu online judge</h2>
    </div>
    <nav>
      <ul>
        <li>
          <router-link tag="a" to="/home">Index</router-link>
        </li>
        <li>
          <router-link tag="a" to="/problems">
            Problem M
          </router-link>
        </li>
        <li>
          <router-link tag="a" to="/contests">
            Contest M
          </router-link>
        </li>
        <li>
          <router-link tag="a" to="/users">
            User M
          </router-link>
        </li>
        <li>
          <router-link tag="a" to="/languages">
            Language M
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base/variable';
@import '../../styles/base/mixin';
.header {
  text-align: center;
  text-transform: uppercase;
  padding: 20px;
}
nav {
  background: $black-color;
  padding: 20px 0;
  @include normalBoxShadow;
  text-align: center;
  ul {
    li {
      display: inline-block;
      a {
        color: $white-color;
        padding: 24px;
      }
    }
  }
}

.router-link-active {
  background: $nav-active-color;
  color: $black-color;
}

@include mq('screen', $mq_small_only) {
  nav {
    padding: 0;
    ul {
      li {
        display: block;
        border-bottom: 1px solid white;
        a {
          text-align: left;
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
