<template>
  <div class="home">
    <Collapse :label="tree.label" :nodes="tree.nodes" :depth="0"></Collapse>
    <div class="test">
      <Button id='btntest' type='prm' size='md' label='New element' @click='myCallback' icon='test' iconPosition='right' />
      <ProgressBar id="test" value="50" />
      <Breadcrumbs />
      <SearchBar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Button from '@/components/button/Button.vue';
import ProgressBar from "@/components/progressBar/ProgressBar.vue";
import Collapse from "@/components/collapse/Collapse.vue";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs.vue";
import SearchBar from "@/compositions/searchBar/SearchBar.vue";

export default defineComponent({
    name: 'HomeView',
    components: {
        HelloWorld,
        Button,
        ProgressBar,
        Collapse,
        Breadcrumbs,
        SearchBar
    },
    methods: {
        myCallback() {
            console.log('Button clicked!')
        }
    },
    data: function () {
        return {
            tree: {
                label: 'root',
                nodes: [
                    {
                        label: 'item1',
                        nodes: [
                            {
                                label: 'item1.1'
                            },
                            {
                                label: 'item1.2',
                                nodes: [
                                    {
                                        label: 'item1.2.1',
                                        nodes: [
                                            {
                                                label: 'item1.2.1.1'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'item2'
                    }
                ]
            }
        }
    }
});
</script>
