<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : Invalid Date                                       
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-27 16:07:38                                
*                                                                             
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
      <img src="@/assets/logotype.svg" alt="Statch logotype" width="102" height="28">
      <div class="container">
        <Input id="mail" placeholder="Enter your email..." type="prm" size="md" other="full" />
        <Input id="pwd" is="password" placeholder="Enter your password..." type="prm" size="md" other="full" />
        <Button id='btnLogin' type='prm' size='md' label='Open' other="full" @click='login' icon='enter' iconPosition='right' />
        <a href="/create">
          <div>
            Create your account<i class="icon arrowright"></i>
          </div>
        </a>
      </div>
    </div>
</template>
