<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div class="test">
      <Button type='submit' id='btntest' class='prm md' label='New element' />
      <Button type='submit' id='btntest' class='scnd md' label='New element' />
      <Button type='submit' id='btntest' class='trd md' label='New element' />
      <Button type='submit' id='btntest' class='fth sm' label='New element' />
    </div>
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
