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
                return { transform: `translate(${this.depth * 16 / this.depth}px)` }
            },
            iconCollapse() {
                return {
                    'more': !this.showCollapse,
                    'less': this.showCollapse
                }
            },
            isOpen() {
                return {
                    'close': !this.showCollapse,
                    'open': this.showCollapse
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
    <div class="collapse" :style="indent" :class="isOpen">
        <div class="label">
        <div v-if="nodes" class="icon" :class="iconCollapse" @click="toggleCollapse">{{ showCollapse }}</div>
            <div class="link">
                {{ label }}
            </div>
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