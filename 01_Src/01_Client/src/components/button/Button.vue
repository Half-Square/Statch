<!--
Author – @0K00
Create Time – 2022-10-15 14:17
Description – Button component
-->

<script lang="ts">
  import { defineComponent } from "vue";
  import './button.scss';

  export default defineComponent({
    name: 'Button',

    props: {
      label: {
        type: String,
        required: true
      },
      type: {
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
          btn: true,
        };
      }
    },
  });
</script>

<template>
  <button :type='type' :id='id' :class='classes'>{{ label }}</button>
</template>
