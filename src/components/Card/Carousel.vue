<template>
    <div>
      <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
      >
        <template v-for="(url,idx) in imgUrls">
          <q-carousel-slide :key="url" :name='idx+1' :img-src='url' crossorigin="anonymous" header='Content-Type: application/json'/>    
        </template>
      </q-carousel>
    </div>
</template>

<script>
export default {
  name: 'carousel',

  props: {
    imgUrls: {
      type: Array,
      default: [],
    },
  },
  
  data () {
    return {
      slide: 1,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
