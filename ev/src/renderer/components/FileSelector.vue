<template>
  <div>
    <MHeader :show="true"></MHeader>
    <Row id="main">
      <Col :md="{span:8,offset:8}">
      <Holder id="holder"></Holder>  
      </Col>
      </Row>
  </div>
</template>

<script>
import Holder from './FileSelector/Holder'
import MHeader from './Common/MHeader'
export default {
  name: 'landing-page-main',
  components: {
    Holder,
    MHeader
  },
  methods: {
  },
  computed: {
  }
}

</script>

<style>
</style>