<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-27 14:51:14                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-27 14:54:12                                
*                                                                             
-->

<script lang="ts">
  import { defineComponent } from 'vue';
  import './status.scss';

  export default defineComponent({
    name: "Status",

    props: {
      icon: {
        type: String,
        default: {
          icon: "icon"
        }
      },
      status: {
        type: String,
        required: true
      }
    }
  });
</script>

<template>
  <i :class="[icon, status]"></i>
</template>