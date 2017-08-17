<template>
  <div id="fileTable">
    <Table :columns="tableData.columns" :data="tableData.data"></Table>
  </div>
</template>

<script>
import xlsx from 'xlsx'
export default {
  name: 'xtable',
  computed: {
      tableData: function () {
          let file = this.$store.state.TableFile.file
          if (file !== undefined && file !== '') {
              let workbook = xlsx.readFile(file)
              this.$store.commit('SET_ORIGIN_FILE',workbook)
              let worksheet = workbook.Sheets[workbook.SheetNames[0]]
              let json = xlsx.utils.sheet_to_json(worksheet)
              let keys = Object.keys(xlsx.utils.sheet_to_json(worksheet)[0]).map(key => {
                  let item = {}
                  item.title = key
                  item.key = key
                  return item
              })
              let tableData = {}
              tableData.columns = keys
              tableData.data = json
              this.update(tableData)
          }
          return this.$store.state.TableFile.tableData
      }
  },
  methods: {
      update: function (value) {
          this.$store.commit('SET_TABLE_DATA', value)
      },
  }
}

</script>

<style>
</style>
