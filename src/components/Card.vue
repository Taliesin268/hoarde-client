<template>
    <div class="card">
        <div class="card-header">
            <h1 class="card-name">{{ cardName }}</h1>
            <div class="card-wager">{{ cardWager }}</div>
        </div>
        <img :src="require('@/images/' + cardImage + '')" :style="cardImageOptions">
        <div class="textbox" :class="cardAlignments ? cardAlignments.toLowerCase() : ''">
            <span class="type" v-if="cardType">{{ cardType }}</span>
            <span class="rules-text">{{ cardRulesText }}</span>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 63mm;
    height: 88mm;

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
        cardName: String,
        cardWager: Number,
        cardType: String,
        cardRulesText: String,
        cardAlignments: String,
        cardImage: {
            type: String,
            default: 'unknown.png'
        },
        cardImageOptions: {}
    }
}
</script>