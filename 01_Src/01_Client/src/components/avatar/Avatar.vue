<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-23 10:21:44                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-23 10:30:34                                
*                                                                             
-->

<script lang='ts'>
    import { defineComponent } from 'vue';
    import './avatar.scss';

    export default defineComponent({
        name: 'Avatar',

        components: {},

        props: {
          url: {
            type: String,
          },
          alt: {
            type: String,
          },
          id: {
            type: String,
            required: true
          }
        },

        computed: {
          classes() {
            return {
              avatar: true,
            };
          }
        },
        methods: {}
    });
</script>

<template>
  <div :id="id" :class="classes">
    <img v-if="url != null" :src="url" :alt="alt" />
  </div>
</template>