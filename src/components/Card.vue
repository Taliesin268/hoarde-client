<template>
    <div class="card">
        <div class="card-header">
            <h1 class="card-name">{{ name }}</h1>
            <div class="card-wager">{{ wager }}</div>
        </div>
        <img :src="imageURL" :style="image_options">
        <div class="textbox" :class="alignments ? alignments.toLowerCase() : ''">
            <span class="type" v-if="type">{{ type }}</span>
            <span class="rules-text">{{ rules_text }}</span>
        </div>
    </div>
</template>

<style scoped>
.card {
    max-width: 63mm;
    max-height: 88mm;

    border: 2mm solid #161616;
    overflow: hidden;
    text-align: center;
    z-index: 1;
    position: relative;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    font-size: 15px;
}

.card-header {
    padding: 2mm;
    display: flex;
}

.card-name {
    display: inline;
    margin: 0 auto;
    text-align: center;
    background-color: #161616bb;
    color: white;
    font-size: 4.5mm;
    width: 45mm;
    height: 8mm;
    font-weight: normal;
}

.card-wager {
    display: inline;
    margin-left: auto;
    text-align: center;
    background-color: #161616bb;
    color: white;
    height: 8mm;
    width: 8mm;
    font-size: 4.5mm;
}

.card img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: -1;
}

.textbox {
    position: absolute;
    bottom: 0;
    background-color: #161616bb;
    color: white;
    display: flex;
    padding: 2mm;
    box-sizing: content-box;
    border: 1.5mm solid #161616bb;
    flex-direction: column;
    min-height: 12mm;
    width: 100%;
    box-sizing: border-box;
}

.textbox.lawful {
    border-left: 1.5mm solid gold;
}

.textbox.chaotic {
    border-right: 1.5mm solid red;
}

.textbox.good {
    border-top: 1.5mm solid silver;
}

.textbox.evil {
    border-bottom: 1.5mm solid #4D1A69bb;
}

.rules-text {
    margin: auto;
}

.type {
    background-color: #4D1A69bb;
    margin: auto;
    padding: 0.5mm;
}
</style>

<script>
export default {
    name: 'Card',
    props: {
        name: String,
        wager: Number,
        type: String,
        rules_text: String,
        alignments: String,
        image: String,
        image_options: {}
    },
    computed: {
        imageURL() {
            return this.image ? `http://localhost:4000/images/${this.image}` : require('@/images/unknown.png');
        }
    }
}
</script>