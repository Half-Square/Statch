<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-22 09:18:40                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-22 11:24:36                                
*                                                                             
-->

<script lang='ts'>
    import { defineComponent } from 'vue';
    import './projects.scss';
    import Button from '@/components/button/Button.vue';

    export default defineComponent({
        name: 'Projects',

        components: {
            Button,
        },

        props: [],

        computed: {},

        data() {
            return {
                content: [
                    {status: 0, version: '0.1', name: 'Lorem', created: 'Jan 10', id: '/create'},
                    {status: 0, version: '0.1', name: 'Lorem', created: 'Jan 10', id: '/create'},
                    {status: 0, version: '0.1', name: 'Lorem', created: 'Jan 10', id: '/create'},
                ]
            }
        },

        methods: {}
    });
</script>

<template>
  <div id="projects">
    <div class="header">
        <div class="right">
            <h2>Projects</h2>
            <Button id="filter" type="fth" size="md" label="Add filter +" />
        </div>
        <Button id="newProject" type="scnd" size="md" label="New project (Alt + P)" />
    </div>
    <div class="content" >
        <a v-for="item in content" :href="item.id">
            <div class="right">
                <div class="status">{{ item.status }}</div>
                <div class="version">{{ item.version }}</div>
                <div class="name">{{ item.name }}</div>
            </div>
            <div class="date">{{ item.created }}</div>
        </a>
        
    </div>
  </div>
</template>

