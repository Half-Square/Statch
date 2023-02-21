<!--

  File: Input.vue

  Description: Input Component with Callback and Options support

  Author: @qdouvillez

  Date: 22 Dec 2022 at 20:37

  Last Modified: 22 Dec 2022 at 20:37

  Copyright: Copyright 2023, ©Half Square



  Purpose:

  -



  Dependencies:

  - input.scss: Style file



  Notes:

  -



  Summary:

  -

-->


<script lang='ts'>
    import { defineComponent } from 'vue';
    import './input.scss';

    export default defineComponent({
        name: 'Input',

        props: {
            id: {
                type: String,
                required: true,
            },
            value: {
              type: String,
              default: ''
            },
            is: {
              type: String,
              default: 'text'
            },
            placeholder: {
                type: String,
                required: false,
            },
            input: {
                type: String,
                default: 'input',
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
            autocomplete: {
                type: String,
                required: false,
            },
            isLabel: {
              type: String,
              default: 'false'
            },
            labelText: {
              type: String
            }
        },

        computed: {},

        data() {
            return {}
        },

        methods: {
            onInput(event: any) {
              this.$emit('input', event.target.value);
            }
        }
    });
</script>

<template>
    <div :class="[input, type, size]">
      <input :type="is" v-model="value" @input="onInput" :disabled="disabled" :placeholder="placeholder" :autocomplete="autocomplete" :id="id" />
      <label v-if="isLabel === 'true'" :for="id">{{ labelText }}</label>
    </div>
</template>
