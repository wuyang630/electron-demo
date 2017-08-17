<template>
  <div id="fileTable">
    <Table ref="table" :columns="tableData.columns" :data="tableData.data"></Table>
  </div>
</template>

<script>
export default {
  name: 'rtable',
  computed: {
      tableData: function () {
          return this.$store.state.TableFile.tableResult
      }
  },
  methods: {
  }
}

</script>

<style>
</style>
