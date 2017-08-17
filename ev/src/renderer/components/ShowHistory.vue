<template>
  <div>
      <MHeader :show=true></MHeader>
      <HTable></HTable>
  </div>
</template>
<script>
import MHeader from './Common/MHeader'
import HTable from './TableReview/HTable'

export default {
    components: {
        HTable,
        MHeader
    },
    methods: {
    }
}
</script>
<style>

</style>