<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : Invalid Date                                       
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-23 15:11:59                                
*                                                                             
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
            other: {
                type: String,
                default: null,
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
            return {
                value: ""
            }
        },

        methods: {}
    });
</script>

<template>
    <div :ref="id" :class="[input, type, size, other]">
      <input :type="is" v-model="value" :disabled="disabled" :placeholder="placeholder" :autocomplete="autocomplete" :id="id" />
      <label v-if="isLabel === 'true'" :for="id">{{ labelText }}</label>
    </div>
</template>
