<template>
    <pre>{{ formattedJson }}</pre>
</template>

<script lang="ts">
export default {
    props: {
        formattedJson: {
            type: String,
            default: ""
        }
    }
}
</script>