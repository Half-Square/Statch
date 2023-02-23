<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-23 12:56:17                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-23 13:30:50                                
*                                                                             
-->

<script lang="ts">
    import { defineComponent } from "vue";
    import './comment.scss';
    import Avatar from "@/components/avatar/Avatar.vue";

    export default defineComponent({
        name: 'Comment',

        components: {
          Avatar,
        },

        props: {
          id: {
            type: String,
            required: true
          },
          name: {
            type: String,
            required: true
          },
          lastName: {
            type: String,
            required: true
          },
          email: {
            type: String,
          },
          img: {
            type: String,
          },
          created: {
            type: String,
            required: true
          },
          content: {
            type: String,
            required: true
          }
        },

        computed: {},
    });
</script>

<template>
  <div class="comment">
    <div class="img"><Avatar :id="id" :url="img" :alt="name + 'photo'" /></div>
    <div class="info">{{ name }} {{ lastName }}, {{ created }} ago</div>
    <div class="content">{{ content }}</div>
  </div>
</template>
