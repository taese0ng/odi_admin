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
                            :disable="img.length!==0"
                        />
                    </div>
                    <div class="col-3">
                      <q-btn :disable="img.length===0" label="사진 전부 삭제" @click="removeImgAll"
                        color="red" class='full-width' dense/>
                    </div>
                </div>

                <div class="row q-mb-md" v-if="imgUrls.length !== 0">
                  <div class="col-12">
                    <Carousel :imgUrls="imgUrls"/>
                  </div>
                </div>
            </q-card-section>

            <q-card-actions>
                <div class="col-12 q-px-sm q-mb-md">
                    <q-btn @click='onClickUpload' class="full-width" color="brown-13" label="등록"/>
                </div>
            </q-card-actions>
        </q-card>

    </q-page>
</template>

<script>
import rootStoreHelper from 'src/mixins/rootStoreHelper';
import Header from 'components/Header/Header';
import API from 'src/repositories/CafeStory/UploadAPI';
import Carousel from 'components/Card/Carousel';

export default {
  name: 'StoryUpload',
  
  components: {
    Header,
    Carousel,
  },
  
  mixins: [rootStoreHelper],

  data() {
    return{
      title: '카페 스토리 업로드',
      contents: '',
      img: [],
      imgUrls: [],
    };
  },

  methods: {
    onRejected (rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
    },

    async onClickUpload() {
      console.log(this.img);
      // const body = {
      //   cafe_srl: this.getCafeSrl,
      //   story_content: this.contents,
      //   image_file: this.img,
      // };

      const body = new FormData();
      body.append('cafe_srl', this.getCafeSrl);
      body.append('story_content', this.contents);
      this.img.forEach((item) => body.append('image_file', item));
      const apiResult = await API.uploadStory(body);

      if(apiResult.status === 200 && apiResult.statusText === 'OK') {
        console.log(apiResult);
      } else {
        console.log(apiResult.response);
      }
    },

    removeImgAll() {
      this.img = [];
    },

    inputImage() {
      this.imgUrls = [];
      this.img.forEach(item => {
        this.imgUrls.push(URL.createObjectURL(item));
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
