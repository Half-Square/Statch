<!--

  File: SearchBar.vue

  Description: Search Bar Component with live search and keyboard navigation

  Author: @qdouvillez

  Date: 20 Dec 2022 at 17:38

  Last Modified: 21 Dec 2022 at 18:51

  Copyright: Copyright 2023, ©Half Square



  Purpose:

  -



  Dependencies:

  - searchBar.scss: Style file



  Notes:

  -



  Summary:

  -

-->

<script lang='ts'>
    import { defineComponent } from 'vue';
    import './searchBar.scss';

    export default defineComponent({
        name: 'SearchBar',

        components: {
        },

        props: [],

        computed: {},

        data() {
            return {
              query: '',
              results: [],
              focusedResult: -1,
            }
        },

        methods: {
            handleInput() {
              this.search(this.query);
            },
            search(query: string) {
                return new Promise((resolve, reject) => {
                  fetch(`https://demo.dataverse.org/api/search?q=${query}`)
                    .then(response => response.json())
                    .then(data => {
                      this.results = data.data.items;
                      resolve(data);
                    })
                    .catch(error => {
                      console.error(error);
                      this.results = [];
                      reject(error);
                    });
                });
            },
            focusNextResult() {
              this.focusedResult = Math.min(this.focusedResult + 1, this.results.length - 1);
            },
            focusPrevResult() {
              this.focusedResult = Math.max(this.focusedResult - 1, 0);
            },
            focusResult(index: number) {
              this.focusedResult = index;
            },
            selectResult(result: any) {
              console.log('clicked', result)
            },
            handleEnter() {
              if (this.focusedResult > -1) {
                this.selectResult(this.results[this.focusedResult]);
              }
            },
        }
    });
</script>

<template>
  <div>
    <input type="text" v-model="query" @input="handleInput" @keydown.down="focusNextResult" @keydown.up="focusPrevResult" @keydown.enter="handleEnter" />
    <ul v-if="results.length > 0">
      <li v-for="(result, index) in results" :key="index" :ref="'result-' + index" :class="{ focused: index === focusedResult }" @click="selectResult(result)" @mouseover="focusResult(index)">{{ result }}</li>
    </ul>
  </div>
</template>
