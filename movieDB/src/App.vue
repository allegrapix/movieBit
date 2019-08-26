<template>
  <v-app class="app-container">
    <Header />
    <transition name="fade" appear mode="out-in">
        <router-view></router-view>
    </transition>
    <Footer />
    <ModalLogin />
  </v-app>  
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ModalLogin from '@/components/ModalLogin.vue';

export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer,
    ModalLogin
  }  
}
</script>
<style lang="scss">
@import "@/scss/resources.scss";
html {
  scroll-behavior: smooth;
}

body {
  box-sizing: border-box;
  background: $third-color url('./assets/line.png');
  box-shadow: inset 0px 200px 100px -53px rgba(10,10,10,.2);
  font-family: $primary-font;
}

li {
  list-style-type: none;
}

a {
  text-decoration: none;
  text-transform: none;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.app-container {
  position: relative;
  max-width: 1280px;
  display: block;
  margin: 0 auto;
  font-family: $primary-font;
  box-shadow: 1px 1px 35px 5px $default-color;
  text-transform: capitalize;
  overflow: hidden;
  font-family: $primary-font;
  color: $primary-color;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.flex-between-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-start {
  display: flex;
}

.flex-start-center {
  display: flex;
  align-items: center;
}

.flex-center {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.flex-column {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
}

.flex-column-end {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
}


.fade-enter {
    opacity: 0;
}

.fade-enter-active {
    transition: opacity 300ms;
}

.fade-leave-active {
    transition: opacity 300ms;
    opacity: 0;
}

.clearfix,
.clearfix::before,
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}
</style>
