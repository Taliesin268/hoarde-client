<template>
    <div class="state-window">
        <div class="property" v-for="(value, key, index) in object" :key="key">
            <div class="property-header" :class="isObject(value) || isArray(value) ? 'clickable' : ''" @click="toggleProperty(index)">
                <span class="property-name">{{ key }}</span>
                <span v-if="isObject(value) || isArray(value)" class="property-arrow">{{ expandedItems[index] === true ? '▼' : '►' }}</span>
            </div>
            <div class="property-body" v-if="isObject(value) || isArray(value)" v-show="expandedItems[index] === true">
                <span class="property-value">
                    <json-display :object="value"></json-display>
                </span>
            </div>
            <div class="property-value" v-else>{{ value }}</div>
        </div>
    </div>
</template>

<style>
.state-window {
    background-color: white;
    box-shadow: -1px 0px 3px rgba(0, 0, 0, 0.5);
    min-height: 80px;
    box-sizing: border-box;
    width: 100%;
}

.state-window .state-window {
    box-shadow: none;
    background-color: #00000022;
    margin: 2rem;
}

.property {
    border-bottom: 1px solid black;
    box-sizing: border-box;
    width: 100%;
}

.property > div {
    padding: 5px;
}

.property-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
}

.clickable {
    cursor: pointer;
}

.property-name {
    font-weight: bold;
    word-wrap: normal;
}

.property-body {
    word-wrap: normal;
    background-color: #00000022;
}

.property-value {
    background-color: #00000022;
}
</style>

<script lang="ts">

export default {
    name: "json-display",
    props: {
        object: {
            type: Object,
            default: ""
        }
    },
    data() {
        return {
            expandedItems: new Array<boolean>()
        }
    },
    methods: {
        isObject(value: any) {
            return typeof value === 'object' && value !== null && !Array.isArray(value);
        },
        isArray(value: any) {
            return Array.isArray(value);
        },
        toggleProperty(index: number) {
            this.expandedItems[index] = !this.expandedItems[index]
        }
    }
}
</script>