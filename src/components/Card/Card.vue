<template>
    <div>
        <q-card class="my-card">
            <Carousel v-if="imgUrl.length > 0" :imgUrls="imgUrl"/>
            <q-card-section>
                <div v-if="data.nick" class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                        {{data.nick}}
                    </div>
                </div>

                <q-rating v-if="data.score" readonly v-model="data.score" :max="5" size="32px" />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                    {{data.content}}
                </div>
                <div class="text-caption text-grey">
                    {{data.date}}
                </div>
            </q-card-section>

            <q-separator />

            <q-card-actions v-if="modifyBtn || deleteBtn" class="justify-end">
              <template v-if="modifyBtn">
                <q-btn
                  color="brown-13"
                  class="q-px-sm q-mr-xs"
                  dense
                  label="수정"
                  @click="onClickModify(data)"
                />
              </template>

              <template v-if="deleteBtn">
                <q-btn
                  color="red-6"
                  class="q-px-sm"
                  dense
                  label="삭제"
                  @click="onClickDelete(data)"
                />
              </template>
            </q-card-actions>
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
    modifyBtn: {
      type: Boolean,
      default: false,
    },
    deleteBtn: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Carousel,
  },

  data() {
    return{
      imgUrl: ['https://cafeodi.co.kr/api/normal/get_image?image_category_1=story&image_category_2=6&image_count=1'],
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

    onClickModify(targetRow) {
      this.$emit('onClickModify', targetRow);
    },

    onClickDelete(targetRow) {
      this.$emit('onClickDelete', targetRow);
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
