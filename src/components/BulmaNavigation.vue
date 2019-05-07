<template>
  <div class="container">
    <nav class="navbar">
      <div class="navbar-brand">
        <g-link @click="mobileMenuIsOpened = false" to="/" class="navbar-item">
          <strong>VINTED 👟</strong>
        </g-link>
        <a
          role="button"
          @click="mobileMenuIsOpened = !mobileMenuIsOpened"
          :class="{'is-active': mobileMenuIsOpened}"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <!-- This "nav-menu" is hidden on mobile -->
      <!-- Add the modifier "is-active" to display it on mobile -->
      <div id="app-menu" class="navbar-menu" :class="{'is-active': mobileMenuIsOpened}">
        <div class="navbar-end">
          <g-link @click="mobileMenuIsOpened = false" to="/" class="navbar-item">Home</g-link>
          <g-link @click="mobileMenuIsOpened = false" to="/about" class="navbar-item">About</g-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      mobileMenuIsOpened: false
    };
  }
};
</script>

<style scoped>
.navbar-menu {
  border-style: solid;
  border-color: hsl(0, 0%, 98%);
  border-width: thin 0;
}

.navbar-end {
  margin: auto !important;
}

/* Create slide animation on mobile */

@media screen and (max-width: 1007px) {
  .navbar-item img {
    height: 2.75rem;
    max-height: 2.75rem;
  }

  .navbar-end {
    padding: 0.5rem 1rem;
  }

  .navbar-menu {
    display: block;
    overflow: hidden;
    max-height: 0;
    padding: 0 1rem;
    transition: max-height 0.2s;
  }

  .navbar-menu.is-active {
    max-height: 100vh;
    transition: max-height 0.5s;
  }
}

.navbar-item {
  font-size: 1rem;
  padding: 1rem 2rem;
}

.nuxt-link-exact-active {
  color: #363636;
}
</style>
