<!--
Author — @qdouvillez
Create Time — 19 Dec 2022 at 16:02
Description — Breadcrumbs Components
-->

<script lang='ts'>
    import { defineComponent } from 'vue';
    import './breadcrumbs.scss';

    export default defineComponent({
        name: 'Breadcrumbs',

        props: [],

        computed: {
            crumbs() {
              // Get the current route's full path
              const path = this.$route.path
              // Split the path into an array of segments
              const segments = path.split('/')
              // Remove the first element (it's always empty)
              segments.shift()
              // Map the segments to an array of objects with a name and path
              return segments.map((segment, index) => {
                // Use the name field from the route's meta data instead of the segment
                const name = this.$router.resolve(`/${segments.slice(0, index + 1).join('/')}`).name
                return {
                  name: name,
                  path: `/${segments.slice(0, index + 1).join('/')}`
                }
              })
            }
        },

        data() {
            return {}
        },

        methods: {}
    });
</script>

<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="item" v-for="(crumb, index) in crumbs" :key="index">
                <router-link :to="crumb.path">{{ crumb.name }}</router-link>
            </li>
        </ol>
    </nav>
</template>
