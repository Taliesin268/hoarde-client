<template>
  <main>
    <Card card-name="Aspect of Bahamut" :card-wager=13 card-type="Dragon"
      card-rules-text="Lawful Good, unchangeable. Trumps unchangeable." card-alignments="Lawful Good"
      card-image="bahamut.png" :card-image-options="{
        'object-position': '25% 75%'
      }" />
    <Card card-name="Aspect of Tiamat" :card-wager=13 card-type="Dragon"
      card-rules-text="Chaotic Evil, unchangeable. Trumps unchangeable." card-alignments="Chaotic Evil"
      card-image="tiamat.png" />
    <Card />
  </main>
</template>

<style>
.card {
  margin: 10mm;
}

main {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'Home',
  components: { Card }
}
</script>