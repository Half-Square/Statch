<!--

  File: Login.vue

  Description: Login page

  Author: @qdouvillez

  Date: 24 Dec 2022 at 14:52

  Last Modified: 24 Dec 2022 at 14:52

  Copyright: Copyright 2023, ©Half Square



  Purpose:

  -



  Dependencies:

  - login.scss: Style file



  Notes:

  -



  Summary:

  -

-->


<script lang='ts'>
    import { defineComponent } from 'vue';
    import './login.scss';
    import Input from '@/components/input/Input.vue';
    import Button from '@/components/button/Button.vue';

    export default defineComponent({
        name: 'Login',

        components: {
          Input,
          Button
        },

        props: [],

        computed: {},

        data() {
            return {}
        },

        methods: {

         login() {
          console.log('click');
         }
        }
    });
</script>

<template>
    <div id="login">
      <div class="container">
        <Input id="mail" placeholder="Enter your email..." type="prm" size="md" />
        <Input id="pwd" is="password" placeholder="Enter your password..." type="prm" size="md" />
        <Button id='btnLogin' type='prm' size='md' label='Open' @click='login' icon='enter' iconPosition='right' />
        <a href="/create">
          <div>
            Create your account<i class="icon arrowright"></i>
          </div>
        </a>
      </div>
    </div>
</template>
