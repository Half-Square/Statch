<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-24 14:57:58                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-03-01 12:03:25                                
*                                                                             
-->

<script lang="ts">
import './assets/scss/main.scss';
import { defineComponent } from 'vue';
import Header from './compositions/header/Header.vue';
import Nav from './compositions/nav/Nav.vue';
import Button from './components/button/Button.vue';

export default defineComponent({
  name: 'App',

  components: {
    Header,
    Nav,
    Button
  },

  data() {
    return {
      show: true,
      connected: true
    }
  },

  methods: {
    showMenu() {
      this.show = !this.show;
    }
  }
  
});
</script>

<template>
  <div v-if="connected" class="sidebar">
    <Transition name="slide">
      <Nav v-if="show" />
    </Transition>
    <aside>
      <Header>
        <Button id='openMenu' type='trd' size='l' @click='showMenu' icon='panel' iconPosition='only' v-bind:class = "(show)?'active':''" />
      </Header>
      <router-view />
    </aside>
  </div>
  <div v-if="!connected">
    <router-view />
  </div>
</template>

<style lang="scss">
  .slide-enter-active {
    transition: all 0.3s ease-in;
  }

  .slide-leave-active {
    transition: all 0.3s ease-in;
  }

  .slide-enter-from,
  .slide-leave-to {
    margin-left: -248px;
  }

  a {
    text-decoration: none;
  }

  .router-link-exact-active button .icon,  .router-link-exact-active{
    color: rgba(0, 108, 255, 1);
  }
</style>
