<template>
  <div class="test">
    <h1>This is an about page</h1>
    <Breadcrumbs />
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs.vue";

    export default defineComponent({
        name: 'test',
        components: {
            Breadcrumbs
        }
    })
</script>