<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-27 16:20:24                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-03-02 14:47:56                                
*                                                                             
-->

<script lang='ts'>
    import { defineComponent } from "vue";
    import './collapse.scss';
    import Status from "../status/Status.vue";

    export default defineComponent({
        name: 'Collapse',

        components: {
          Status  
        },

        props: [ 'label', 'nodes', 'depth', 'status', 'id', 'type' ],

        computed: {
            indent() {
                return { transform: `translate(${this.depth * 16 * this.depth}px)` }
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
    <div class="collapse" :class="isOpen">
        <div class="label" v-bind:class = "($route.params.id == id)?'active':''">
            <div v-if="nodes" class="icons" :style="indent" :class="iconCollapse" @click="toggleCollapse">
                <i v-if="!showCollapse" class="icon chevron-right"></i>
                <i v-if="showCollapse" class="icon chevron-down"></i>
            </div>
            <RouterLink :to="{ name: 'project', params: {type: type, id: id } }">
                <div class="link" :style="indent">
                    <Status :status="status" />
                    <div class="text">{{ label }}</div>
                </div>
            </RouterLink>
        </div>
        <Collapse
            v-if="showCollapse"
            v-for="node in nodes"
            :id="node.id"
            :type="node.type"
            :status="node.status"
            :nodes="node.nodes"
            :label="node.label"
            :depth="depth + 1"
        >
        </Collapse>
    </div>
</template>