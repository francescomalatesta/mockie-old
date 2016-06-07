<template>
    <h3>Output Format</h3>
    <p>4. Choose the output format for your generated data.</p>
    <p>
        <select class="form-control" v-model="output_format">
            <option v-for="format in availableOutputFormats" value="{{ format.extension }}">{{ format.name }}</option>
        </select>
    </p>
</template>

<style>
</style>

<script>
    import { availableOutputFormats } from '../config';

    export default {
        data() {
            return {
                availableOutputFormats: availableOutputFormats
            }
        },
        props: ['output_format']
    }
</script>
