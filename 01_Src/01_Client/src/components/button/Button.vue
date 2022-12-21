<!--

  File: Button.vue

  Description: Button Component with Callback and Options support

  Author: @qdouvillez

  Date: 21 Dec 2022 at 15:08

  Last Modified: 21 Dec 2022 at 15:08

  Copyright: Copyright 2023, ©Half Square



  Purpose:

  -



  Dependencies:

  - button.scss: Style file



  Notes:

  -



  Summary:

  -

-->


<script lang='ts'>
    import { defineComponent } from 'vue';
    import './button.scss';

    export default defineComponent({
        name: 'Button',

        props: {
            label: {
                type: String,
                required: false,
            },
            btn: {
                type: String,
                default: 'btn',
            },
            type: {
                type: String,
                default: 'prm',
                validator(value: string) {
                    return ['prm', 'scnd', 'trd', 'fth'].includes(value);
                },
            },
            size: {
                type: String,
                default: 'md',
                validator(value: string) {
                    return ['sm', 'md', 'l', 'xl'].includes(value);
                },
            },
            disabled: {
                type: Boolean,
                default: false
            },
            callback: {
                type: Function as () => void,
                required: true,
            },
            icon: {
              type: String,
              default: null
            },
            iconPosition: {
              type: String,
              default: 'left',
              validator: (value: string) => ['left', 'right', 'none', 'only'].includes(value)
            },
        },

        computed: {},

        data() {
            return {}
        },

        methods: {}
    });
</script>

<template>
  <button @click="callback" :disabled="disabled" :class="[btn, type, size]" :id="id">
    <template v-if="iconPosition === 'left'">
      <i :class="icon"></i>
      {{ label }}
    </template>
    <template v-if="iconPosition === 'right'">
      {{ label }}
      <i :class="icon"></i>
    </template>
    <template v-if="iconPosition === 'none'">
      {{ label }}
    </template>
    <template v-if="iconPosition === 'only'">
      <i :class="icon"></i>
    </template>
  </button>
</template>
