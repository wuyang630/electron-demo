<template>
  <div :class="name" @click="upload" @dragenter="dragIn" @dragover="dragIn" @dragleave="dragEnd" @dragend="dragEnd" @drop="drop">
    <Icon type="upload"></Icon>
    {{ text }}
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  data() {
    return {
      name: "holder",
      text: "拖拽或者点击上传文件",
      pendding: false
    }
  },
  methods: {
    dragIn: function (e) {
      e.preventDefault()
      this.name = "holder holder-ondrag"
      // this.text = `可以放下了`
    },
    dragEnd: function (e) {
      e.preventDefault()
      this.name = "holder"
      // this.text = `拖过来吧`
    },
    drop: function (e) {
      e.preventDefault()
      this.name = "holder"
      // this.text = `拖过来吧`
      let file = e.dataTransfer.files[0]
      this.setFileDrag(file.path)
      // this.handleFile(file.path)
    },
    setFileDrag: function (path) {
      this.$store.commit('SET_FILE_PATH', path)
      this.$router.push('/table')
    },
    upload: function () {
      if (this.pendding === false) {
        this.pendding = true
        ipcRenderer.send('open-file-dialog')
        ipcRenderer.on('selected-file', this.setFileUpload)
      }
    },
    setFileUpload: function (channel, listener) {
      this.pendding = false
      if (listener) {
        this.$store.commit('SET_FILE_PATH', listener[0])
        this.$router.push('/table')
      }
    }
  },
}

</script>
<style>
/* 拖拽的区域样式 */

.holder {
  min-height: 100px;
  background: #eee;
  margin: 2em;
  padding: 1em;
  border: 0px dotted #eee;
  border-radius: 10px;
  transition: .3s all ease-in-out;
}


/* 拖拽时用jQuery为其添加边框样式的class */

.holder-ondrag {
  border: 20px dotted #d45700;
}
</style>
