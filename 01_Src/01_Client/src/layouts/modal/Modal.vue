<!--

  File: Modal.vue

  Description: Modal Component

  Author: @qdouvillez

  Date: 22 Dec 2022 at 16:08

  Last Modified: 22 Dec 2022 at 16:08

  Copyright: Copyright 2023, ©Half Square



  Purpose:

  -



  Dependencies:

  - .scss:



  Notes:

  -



  Summary:

  -

-->


<script lang='ts'>
    import { defineComponent } from 'vue';
    import './modal.scss';

    export default defineComponent({
        name: 'Modal',

        props: ['show'],

        computed: {},

        data() {
            return {
              isModalVisible: false,
            }
        },

        methods: {
            closeModal() {
              this.$emit('closeModal', false)
              this.isModalVisible = true;
            },
        }
    });
</script>

<template>
  <div class="modal" v-if="!isModalVisible" @click="closeModal" @keydown.esc="closeModal">
    <div class="modal-content" @click.stop>
        <slot></slot>
    </div>
  </div>
</template>
