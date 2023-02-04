<template>
  <div class="card-container">
    <div v-for="card in cards">
      <Card :card-name="card.name" :card-wager="card.wager" :card-type="card.type" 
      :card-rules-text="card.rules_text" :card-alignments="card.alignments"
      :card-image="card.image_url" :card-image-options="JSON.parse(card.image_options)"/>
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
    this.fetchCards().then(()=>{console.log (this.cards)});
  }
}
</script>
