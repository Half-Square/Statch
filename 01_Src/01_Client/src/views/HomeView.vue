<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <Button type='submit' id='btntest' class='prm sm' label='New project (Alt + P)' />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Button from '@/components/button/Button.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
    Button,
  },
});
</script>
