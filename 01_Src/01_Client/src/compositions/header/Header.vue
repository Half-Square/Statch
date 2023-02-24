<!--
* @Author                : 0K00<qdouvillez@gmail.com>                         
* @CreatedDate           : 2023-02-24 14:54:57                                
* @LastEditors           : 0K00<qdouvillez@gmail.com>                         
* @LastEditDate          : 2023-02-24 17:13:02                                
*                                                                             
-->

<script lang="ts">
    import { defineComponent } from 'vue';
    import './header.scss';
    import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs.vue';
    import Modal from "@/layouts/modal/Modal.vue";
    import SearchBar from "@/compositions/searchBar/SearchBar.vue";
    import Button from '@/components/button/Button.vue';
    
    export default defineComponent({
        name: 'Header',

        components: {
          Breadcrumbs,
          Modal,
          SearchBar,
          Button,
        },

        props: {
        },

        computed: {},

        data() {
            return {
              showModal: false,
            }
        },

        methods: {
          closeModal(close: boolean) {
            this.showModal = close
          },
        }
    });
</script>

<template>
  <div id="header">
    <slot class="menu"></slot>
    <Breadcrumbs class="bread" />
    <div class="setting">
      <Button id='openSearch' type='trd' size='l' @click='showModal = true' icon='search' iconPosition='only' v-bind:class = "(showModal)?'active':''" />
      <Button id='openOption' type='trd' size='l' icon='dotshorizontal' iconPosition='only' />
    </div>
    <Modal v-if="showModal" @closeModal='closeModal'>
          <SearchBar />
    </Modal>
  </div>
</template>