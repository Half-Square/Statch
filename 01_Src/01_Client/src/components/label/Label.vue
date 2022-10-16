<!--
Author – @0K00
Create Time – 2022-10-16 15:32
Description – Label component
-->

<script lang="ts">
  import { defineComponent } from "vue";
  import './label.scss';

  export default defineComponent({
    name: 'Label',

    props: {
      label: {
          type: String,
          required: true
        },
        id: {
          type: String,
          required: true
      },
    },

    computed: {
      classes() {
        return {
          lbl: true,
        };
      }
    },
  });
</script>

<template>
  <div :id='id' :class='classes'>{{ label }}</div>
</template>