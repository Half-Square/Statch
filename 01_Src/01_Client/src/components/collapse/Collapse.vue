<!--
Author – @0K00
Create Time – 2022-11-04 11:30
Description – Collapse component
-->

<script lang='ts'>
    import { defineComponent } from "vue";
    import './collapse.scss';

    export default defineComponent({
        name: 'Collapse',

        props: [ 'label', 'nodes', 'depth' ],

        computed: {
            indent() {
                return { transform: `translate(${this.depth * 50}px)` }
            },
            iconCollapse() {
                return {
                    '+': !this.showCollapse,
                    '-': this.showCollapse
                }
            },
        },

        data() {
            return { showCollapse: false }
        },

        methods: {
            toggleCollapse() {
                this.showCollapse = !this.showCollapse;
            }
        }
    });
</script>

<template>
    <div class="collapse">
        <div :style="indent" @click="toggleCollapse">
            <i v-if="nodes" class="icon" :class="iconCollapse"></i>
            {{ label }}
        </div>
        <Collapse
            v-if="showCollapse"
            v-for="node in nodes"
            :nodes="node.nodes"
            :label="node.label"
            :depth="depth + 1"
        >
        </Collapse>
    </div>
</template>