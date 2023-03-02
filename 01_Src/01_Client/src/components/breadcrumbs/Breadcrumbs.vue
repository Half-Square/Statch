<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-03-02 15:34:55                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-03-02 16:15:14                                
*                                                                             
-->

<script lang='ts'>
    import { defineComponent } from 'vue';
    import './breadcrumbs.scss';

    export default defineComponent({
        name: 'Breadcrumbs',

        props: [],

        computed: {
            
           crumbs() {
                console.log(this.$route);
                
                return {
                    path: this.$route.fullPath,
                    name: this.$route.params
                };
            }
        },

        data() {
            return {
                type: 'test',
                id: 'test'
            }
        },

        methods: {}
    });
</script>

<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="item" v-for="(route, index) in crumbs">
                <router-link :to="crumbs.path">{{ crumbs.name }}</router-link>
            </li>
        </ol>
    </nav>
</template>
