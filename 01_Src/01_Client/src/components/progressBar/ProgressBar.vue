<!--
Author – @0K00
Create Time – 2022-11-04 10:19
Description – Progress Bar component
-->

<script lang="ts">
    import { defineComponent } from "vue";
    import './progressBar.scss';

    export default defineComponent({
        name: 'ProgressBar',

        props: {
            value: {
                type: Number,
                required: true
            },
            id: {
                type: String,
                required: true
            }
        },

        computed: {
            classes() {
                return {
                  prbar: true,
                };
            },
            size() {
                return 'width: ' + this.value + '%';
            }
        },
    });
</script>

<template>
    <div :id='id' :class='classes'>
        <div class='prbar-title'>Advancement</div>
        <div class='prbar-container'>
            <div class='prbar-parent'>
                <div class='prbar-child' :style='size'></div>
            </div>
            <div class='prbar-value'>{{ value }}% done</div>
        </div>
    </div>
</template>