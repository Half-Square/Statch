<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-24 16:00:26                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-25 17:16:54                                
*                                                                             
-->

<script lang="ts">
    import { defineComponent } from 'vue';
    import './nav.scss';
    import Button from '@/components/button/Button.vue';
    import Collapse from '@/components/collapse/Collapse.vue';

    export default defineComponent({
      name: 'Nav',

      components: {
        Button,
        Collapse
      },

      data() {
            return {
              name: "Half Square",
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
            },
            }
        },
    });

    // team name
    // navigation (projects, activity, add, follow, setting)
    // menu project
</script>

<template>
  <div id="nav">
    <header>
      {{ name }}
    </header>
    <nav>
      <RouterLink :to="{ path: '/projects' }">
        <Button id="goProjects" type="trd" size="l" icon="dashboard" icon-position="only" />
      </RouterLink>
      <Button id="goActivity" type="trd" size="l" icon="bell" icon-position="only" />
      <Button id="add" type="trd" size="l" icon="plus" icon-position="only" />
      <Button id="goFollow" type="trd" size="l" icon="flag" icon-position="only" />
      <Button id="goSetting" type="trd" size="l" icon="gear" icon-position="only" />
    </nav>
    <div class="menu">
      <Collapse :label="tree.label" :nodes="tree.nodes" :depth="0"></Collapse>
    </div>
  </div>
</template>