import Vue from 'vue';
import 'suneditor/dist/css/suneditor.min.css';
import suneditor from 'suneditor';
import lang from 'suneditor/src/lang';
import plugins from 'suneditor/src/plugins';

Vue.prototype.$sunEditor = (id) => {
  return suneditor.create(id, {
    lang: lang.ko,
    plugins: plugins,
    buttonList: [
      ['undo', 'redo'],
      ['fontSize', 'font', 'formatBlock'],
      ['paragraphStyle', 'blockquote'],
      ['bold', 'underline', 'italic', 'strike'],
      ['fontColor'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'lineHeight'],
      ['table', 'link', 'image'],
      ['preview'],

      ['%767', [
        ['undo', 'redo'],
        ['fontSize', 'font', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike'],
        ['fontColor'],
        [':r-기능-default.more_plus', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight', 'table', 'link', 'image', 'preview'],
      ]],

      // ['outdent', 'indent'],
      // ['align', 'horizontalRule', 'list', 'lineHeight'],
      // ['table', 'link', 'image', /** 'video', 'audio' ,'math' **/], // You must add the 'katex' library at options to use the 'math' plugin.
      // /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
      // ['fullScreen', 'showBlocks', 'codeView'],
      // ['preview', /**'print' **/],
      // ['save', 'template']
    ],
    width: '100%',
    minWidth: 370,
    height: 450,
    maxHeight: 650,
    imageRotation: false,
    charCounter: true,
    maxCharCount: 1000,
    // callBackSave : this.callbackSave
  });
};
