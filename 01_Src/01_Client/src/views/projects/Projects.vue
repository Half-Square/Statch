<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-22 09:18:40                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-27 14:56:15                                
*                                                                             
-->

<script lang='ts'>
    import { defineComponent } from 'vue';
    import './projects.scss';
    import Button from '@/components/button/Button.vue';
    import Status from '@/components/status/Status.vue';

    export default defineComponent({
        name: 'Projects',

        components: {
            Button,
            Status
        },

        props: [],

        computed: {},

        data() {
            return {
                content: [
                    {status: "done", version: '0.1', name: 'Lorem', created: 'Jan 10', id: '/create'},
                    {status: "reject", version: '0.1', name: 'Lorem', created: 'Jan 10', id: '/create'},
                    {status: "wait", version: '0.1', name: 'Lorem', created: 'Jan 10', id: '/create'},
                    {status: "new", version: '0.1', name: 'Lorem', created: 'Jan 10', id: '/create'},
                    {status: "progress", version: '0.1', name: 'Lorem', created: 'Jan 10', id: '/create'},
                ]
            }
        },

        methods: {}
    });
</script>

<template>
  <div id="projects" class="main">
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
                <div class="status"><Status :status="item.status" /></div>
                <div class="version">{{ item.version }}</div>
                <div class="name">{{ item.name }}</div>
            </div>
            <div class="date">{{ item.created }}</div>
        </a>
        
    </div>
  </div>
</template>

