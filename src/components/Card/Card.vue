<template>
    <div>
        <q-card class="my-card">
            <!-- <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" /> -->
            <Carousel :imgUrls="imgUrl"/>
            <q-card-section>
                <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                        {{data.nick}}
                    </div>
                </div>

                <q-rating readonly v-model="data.score" :max="5" size="32px" />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                    {{data.content}}
                </div>
                <div class="text-caption text-grey">
                    {{data.date}}
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import Carousel from './Carousel.vue';

export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
    mode: {
      type: String,
      default: 'review',
    },
  },

  components: {
    Carousel,
  },

  data() {
    return{
      imgUrl: [],
    };
  },

  created() {
    this.getImage();
  },

  methods: {
    getImage() {
      for(let i = 1; i <= this.data.imgCount; i++) {
        const queryString = `https://cafeodi.co.kr/api/normal/get_image?image_category_1=${this.mode}&image_category_2=${this.data.srl}&image_count=${i}`;
        this.imgUrl.push(queryString);
      }
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
