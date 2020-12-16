<template>
    <q-page padding>
        <Header :title="title"/>
        <q-card flat bordered class="q-mt-md maxContainer-lg q-mx-auto">
            <q-card-section>
                <div class="row q-mb-md q-col-gutter-sm">
                    <div class="col-12 col-sm-6">
                        <div class="text-grey">
                        <q-input label-slot filled dense v-model="storyName"
                                color="blue-grey-9" ref="storyName">
                            <template v-slot:label>
                                <div class="row all-pointer-events items-center necessary">
                                    제목
                                </div>
                            </template>
                            <template v-if="storyName" v-slot:append>
                                <q-icon name="close" @click.stop="storyName = ''" class="cursor-pointer"/>
                            </template>
                        </q-input>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6">
                        <div class="text-grey">
                            <q-input label-slot filled dense v-model="date"
                                    color="blue-grey-9" ref="date">
                                <template v-slot:label>
                                    <div class="row all-pointer-events items-center necessary">
                                        날짜/시간
                                    </div>
                                </template>
                            </q-input>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-md">
                    <div class="col-12">
                        <div class="text-grey">
                            <q-input type="textarea" dense label="내용" v-model="contents"
                                color="blue-grey-9" filled ref="contents"/>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-md q-col-gutter-y-md">
                    <div class="col-12 text-center" v-if="imgSrc">
                        <q-img :src="imgSrc" style="max-width:500px"/>
                    </div>
                    <div class="col-12">
                        <q-file
                            color="blue-grey-9"
                            v-model="img"
                            filled
                            label="이미지를 선택하세요."
                            accept=".jpg, image/*"
                            @input="inputImg"
                            @rejected="onRejected"
                        />
                    </div>
                </div>
            </q-card-section>

            <q-card-actions>
                <div class="col-12 q-px-sm q-mb-md">
                    <q-btn class="full-width" color="brown-13" label="등록"/>
                </div>
            </q-card-actions>
        </q-card>

    </q-page>
</template>

<script>
import Header from 'components/Header/Header';

export default {
  name: 'StoryUpload',
  components: {
    Header,
  },
  
  data() {
    return{
      title: '카페 스토리 업로드',
      storyName: '',
      date: null,
      contents: '',
      img: null,
      imgSrc: null,
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

    inputImg() {
      this.imgSrc = URL.createObjectURL(this.img);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
