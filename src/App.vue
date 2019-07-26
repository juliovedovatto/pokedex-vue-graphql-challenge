<template>
  <div id="app">
    <header>
      <b-img src="./assets/images/logo.png" fluid />
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <b-row>
        <b-col class="text-right">
          <p>created by Julio Vedovatto &lt;juliovedovatto@gmail.com&gt;</p>
          <p>made with Love, <b-img src="./assets/images/vue-logo.png" height="30" title="Vue.js" /> and <b-img src="./assets/images/graphql-logo.png" height="30" title="GraphQL" /></p>
        </b-col>
      </b-row>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
