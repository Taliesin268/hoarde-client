<template>
  <div class="card-container">
    <div v-for="card in cards">
      <Card v-bind="card"/>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 10px;
  margin-top: 10px;
}

.card {
  height: 88mm;
  width: 69mm;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import Card from '@/components/Card.vue'

export default {
  name: 'Cards',
  components: { Card },
  methods: {
    ...mapActions([
      'fetchCards'
    ])
  },
  computed: {
    ...mapGetters({
      cards: 'getCards'
    })
  },
  mounted() {
    // When this page loads, fetch all cards from the server and log them
    this.fetchCards().then(()=>{console.log (this.cards)});
  }
}
</script>
