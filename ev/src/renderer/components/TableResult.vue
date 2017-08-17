<template>
  <div>
    <MHeader :show="true"></MHeader>
    <Row id="result">
    <Button type="primary" shape="circle" icon="ios-search" @click="getResult()">保存并下载结果</Button>
    <Button type="primary" shape="circle" icon="ios-search" @click="getResult2()">保存并下载结果2</Button>
    </Row>
    <RTable ref="table"></RTable>
  </div>
</template>

<script>
import RTable from './TableReview/RTable'
import MHeader from './Common/MHeader'
import { ipcRenderer } from 'electron'
import json2csv from 'json2csv'
import fs from 'fs'
export default {
  name: 'table-result',
  components: {
    RTable,
    MHeader
  },
  methods: {
    getResult: function () {
      let reply = ipcRenderer.sendSync('add-history',
        { 'data': { 'data': this.$store.state.TableFile.tableResult, 'date': (new Date).toLocaleString(), 'filename': this.$store.state.TableFile.file } })
      if (reply === 'OK') {
        let json = this.$store.state.TableFile.tableResult
        let fields = json.columns.map(c => {
          return c.key
        })
        let body = json.data
        let csv = "\ufeff" + json2csv({ data: body, fields: fields })
        ipcRenderer.send('save-dialog', this.$store.state.TableFile.file)
        ipcRenderer.on('file-saved', (e, path) => {
          if (!path) {
          } else {
            fs.writeFileSync(path, csv)
            this.$Message.success('保存成功!')
          }
        })
      } else {
        this.$Message.error('添加记录失败!')
      }
    },
    getResult2: function () {
      let reply = ipcRenderer.sendSync('add-history',
        { 'data': { 'data': this.$store.state.TableFile.tableResult, 'date': (new Date).toLocaleString(), 'filename': this.$store.state.TableFile.file } })
      if (reply === 'OK') {
        let json = this.$store.state.TableFile.tableResult
        this.$refs.table.$refs.table.exportCsv({
          filename : ''
        })
      } else {
        this.$Message.error('添加记录失败!')
      }
    }
  },
  computed: {
  }
}

</script>

<style>

</style>