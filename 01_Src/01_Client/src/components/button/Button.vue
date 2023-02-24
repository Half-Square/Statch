<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : Invalid Date                                       
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-24 15:04:32                                
*                                                                             
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
            other: {
              type: String,
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
              default: 'none',
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
  <button @click="callback" :disabled="disabled" :class="[btn, type, size, other]" :id="id">
    <template v-if="iconPosition === 'left'">
      <i class="icon" :class="icon"></i>
      {{ label }}
    </template>
    <template v-if="iconPosition === 'right'">
      {{ label }}
      <i class="icon" :class="icon"></i>
    </template>
    <template v-if="iconPosition === 'none'">
      {{ label }}
    </template>
    <template v-if="iconPosition === 'only'">
      <i class="icon" :class="icon"></i>
    </template>
  </button>
</template>
