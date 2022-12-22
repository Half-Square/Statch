<!--

  File: SearchBar.vue

  Description: Search Bar Component with live search and keyboard navigation

  Author: @qdouvillez

  Date: 20 Dec 2022 at 17:38

  Last Modified: 22 Dec 2022 at 17:56

  Copyright: Copyright 2023, ©Half Square



  Purpose:

  -



  Dependencies:

  - searchBar.scss: Style file



  Notes:

  - Fake api : https://demo.dataverse.org/api/search?q=${query}



  Summary:

  - mounted
  - handleInput
  - search
  - focusNextResult
  - focusPrevResult
  - focusResult
  - selectResult
  - handleEnter

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

        /*
         * Name: mounted
         *
         * Description: This function is called when the component is mounted. It focuses the input element.
         *
        */
        mounted() {
            document.getElementById("inputSearch")!.focus();
        },
        /***/

        methods: {

            /*
             * Name: handleInput
             *
             * Description: This function is called when the input element's value changes. It updates the query data property and calls the search function with the updated query.
             *
            */
            handleInput() {
              this.search(this.query);
            },
            /***/

            /*
             * Name: search
             *
             * Description: This function sends a fetch request to the demo dataverse API to retrieve search results for the given query.
             *
             * @param {string} query - The search query entered by the user.
             *
            */
            search(query: string) {
                return new Promise((resolve, reject) => {
                  fetch(`https://demo.dataverse.org/api/search?q=${query}`)
                    .then(response => response.json())
                    .then(data => {
                      this.focusedResult = 0;
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
            /***/

            /*
             * Name: focusNextResult
             *
             * Description: This function increments the focusedResult data property by 1, unless it is already at the maximum value (the last result).
             *
            */
            focusNextResult() {
              this.focusedResult = Math.min(this.focusedResult + 1, this.results.length - 1);
              this.followFocus()
            },
            /***/

            /*
             * Name: focusPrevResult
             *
             * Description: This function decrements the focusedResult data property by 1, unless it is already at the minimum value (the first result).
             *
            */
            focusPrevResult() {
              this.focusedResult = Math.max(this.focusedResult - 1, 0);
              this.followFocus()
            },
            /***/

            /*
             * Name: focusResult
             *
             * Description: This function sets the focusedResult data property to the given index.
             *
             * @param {number} index - The index of the result to focus
             *
            */
            focusResult(index: number) {
              this.focusedResult = index;
            },
            /***/

            /*
             * Name: followFocus
             *
             * Description: This function follow the selected result and scroll into element.
             *
             *
            */
            followFocus() {
              const selectedResult = document.getElementById(`result-${this.focusedResult}`);
              if (selectedResult) {
                selectedResult.scrollIntoView({ behavior: 'smooth' });
              }
            },
            /***/

            /*
             * Name: selectResult
             *
             * Description: This function logs the selected result to the console.
             *
             * @param {any} result - The result to be selected
             *
            */
            selectResult(result: any) {
              console.log('clicked', result)
            },
            /***/

            /*
             * Name: handleEnter
             *
             * Description: This function selects the currently focused result if there is one.
             *
            */
            handleEnter() {
              if (this.focusedResult > -1) {
                this.selectResult(this.results[this.focusedResult]);
              }
            },
        }
    });
</script>

<template>
  <div class="searchBar">
    <input type="text" id="inputSearch" autocomplete="off" placeholder="Search for commands or in projects..." v-model="query" @input="handleInput" @keydown.down="focusNextResult" @keydown.up="focusPrevResult" @keydown.enter="handleEnter" />
    <Transition name="nested">
        <div v-if="results.length > 0" class="subtitle">Results</div>
    </Transition>
    <Transition name="nested">
        <ul class="results" v-if="results.length > 0">
          <li v-for="(result, index) in results" :key="index" :ref="'result-' + index" :id="'result-' + index" :class="{ focused: index === focusedResult }" @click="selectResult(result)" @mouseover="focusResult(index)">{{ result.name }}</li>
        </ul>
    </Transition>
    <Transition name="nested">
        <div v-if="results.length > 0" class="footer">Go to</div>
    </Transition>
  </div>
</template>
