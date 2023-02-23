<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-23 15:46:48                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-23 16:01:48                                
*                                                                             
-->

<script lang="ts">
  import { defineComponent } from "vue";
  import './label.scss';

  export default defineComponent({
    name: 'Label',

    props: {
      level: {
          type: String,
          required: true,
          validator(value: string) {
                    return ['high', 'moderate', 'normal', 'low'].includes(value);
                },
        },
      id: {
          type: String,
      },
      lbl: {
          type: String,
          default: 'lbl',
      },
    },

  });
</script>

<template>
  <div :id='id' :class="[lbl, level]">{{ level }}</div>
</template>