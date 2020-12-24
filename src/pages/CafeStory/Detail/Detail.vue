<template>
    <q-page padding>
        <Header :title="title"/>
        <q-card flat bordered class="q-mt-md maxContainer-lg q-mx-auto">
            <q-card-section>
                <div class="row q-mb-md">
                    <div class="col-12">
                        <div class="text-grey">
                            <q-input type="textarea" dense label="내용" v-model="contents"
                                color="blue-grey-9" filled ref="contents"/>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-md q-col-gutter-y-md q-col-gutter-sm items-center">
                    <div class="col-9">
                        <q-file
                            color="blue-grey-9"
                            v-model="img"
                            filled
                            dense
                            multiple
                            label="이미지를 선택하세요."
                            accept=".jpg, image/*"
                            @rejected="onRejected"
                        />
                    </div>
                    <div class="col-3">
                      <q-btn label="사진 전부 삭제" @click="removeImgAll"
                        color="red" class='full-width' dense/>
                    </div>
                </div>

                <div class="row q-mb-md">
                  <div class="col-12">
                    <Carousel :imgUrls="imgUrls"/>
                  </div>
                </div>
            </q-card-section>

            <q-card-actions class="q-col-gutter-sm">
                <div class="col-12 q-px-sm">
                    <q-btn @click='onClickUpload' class="full-width" color="brown-13" label="저장"/>
                </div>
                <div class="col-12 q-px-sm">
                    <q-btn @click="onClickCancel" class="full-width" color="red" label="취소"/>
                </div>
            </q-card-actions>
        </q-card>

    </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import API from 'src/repositories/CafeStory/DetailAPI';
import Carousel from 'components/Card/Carousel';
import { image } from 'suneditor/src/plugins';

export default {
  name: 'StoryDetail',

  components: {
    Header,
    Carousel,
  },
  
  mixins: [rootStoreHelper],

  data() {
    return{
      title: '카페 스토리 수정',
      contents: '',
      img: [],
      imgUrls: [],
      storySrl: null,
      cafeSrl: null,
      test: null,
    };
  },

  created() {
    console.log(this.$route.params);
    this.initStory();
  },

  methods: {
    initStory() {
      this.cafeSrl = this.getCafeSrl;
      this.contents = this.$route.params.content;
      this.storySrl = this.$route.params.storySrl;
      this.getImage(this.$route.params.imageCount);
    },

    getImage(imageCount) {
      for(let i = 1; i <= imageCount; i++) {
        const queryString = `https://cafeodi.co.kr/api/normal/get_image?image_category_1=story&image_category_2=${this.storySrl}&image_count=${i}`;
        this.imgUrls.push(queryString);
        // this.img.push(queryString);
      }
    },

    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },

    async onClickUpload() {
      // const body = {
      //   cafe_srl: this.getCafeSrl,
      //   story_srl: this.storySrl,
      //   story_content: this.contents,
      //   image_file: this.img,
      // };

      const body = new FormData();
      body.append('cafe_srl', this.getCafeSrl);
      body.append('story_srl', this.storySrl);
      body.append('story_content', this.contents);
      if(this.img.length !== 0) {
        body.append('remove_image_flag', 'Y');
        this.img.forEach(item => body.append('image_file', item));
      }

      const apiResult = await API.modifyStory(body);

      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        console.log(apiResult);
      } else {
        console.log(apiResult.response);
      }
    },

    onClickCancel() {
      this.$router.back();
    },

    removeImgAll() {
      this.img = [];
      this.imgUrls = [];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
