<template>
    <div class="network-events">
        <div class="event" v-for="event in events" :key="event.id">
            <div class="event-header" @click="toggleEvent(event)">
                <span class="event-name">{{ event.name }}</span>
                <span class="event-arrow">{{ event.expanded ? '▼' : '►' }}</span>
            </div>
            <div class="event-body" v-show="event.expanded">
                <pre>{{ event.body }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        events: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        toggleEvent(event) {
            event.expanded = !event.expanded
        }
    }
}
</script>

<style>
.network-events {
    background-color: white;
    box-shadow: -1px 0px 3px rgba(0, 0, 0, 0.5);
}

.event {
    border-bottom: 1px solid black;
    background-color: #eeeeee;
}

.event > div {
    
    padding: 5px;
}

.event-header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
}

.event-name {
    font-weight: bold;
}
</style>
