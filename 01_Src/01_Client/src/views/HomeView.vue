<template>
  <div class="home">
    <Collapse :label="tree.label" :nodes="tree.nodes" :depth="0"></Collapse>
    <div class="test">
      <Button type='submit' id='btntest' class='prm md' label='New element' />
      <Button type='submit' id='btntest' class='scnd md' label='New element' />
      <Button type='submit' id='btntest' class='trd md' label='New element' />
      <Button type='submit' id='btntest' class='fth sm' label='New element' />
      <ProgressBar id="test" value="50" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Button from '@/components/button/Button.vue';
import ProgressBar from "@/components/progressBar/ProgressBar.vue";
import Collapse from "@/components/collapse/Collapse.vue";

export default defineComponent({
    name: 'HomeView',
    components: {
        HelloWorld,
        Button,
        ProgressBar,
        Collapse
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
