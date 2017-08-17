<template>
  <div>
    <MHeader :show="true"></MHeader>
    <div class="layout-content">
    <Row>
    <div>共有{{getLength}}行数据</div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <Form-item prop="lineNum">
        <Input v-model="formInline.lineNum" size="large" placeholder="请输入要抽取的数量"></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" shape="circle" icon="ios-search" @click="getNum()">开始抽查</Button>
      </Form-item>
    </Form>
    <Select>
      <Option v-for="item in getList" :value="item.key" :key="item.key">{{item.title}}</Option>
    </Select>
    <XTable></XTable>
    </Row>
    </div>
  </div>
</template>

<script>
import XTable from './TableReview/XTable'
import MHeader from './Common/MHeader'
export default {
  components: {
    XTable,
    MHeader
  },
  data() {
    const validNum = (rule, value, callback) => {
      if (!Number.isInteger(+value) || value <= 0) {
        callback(new Error('请输入数字'))
      } else if (value > this.$store.state.TableFile.tableData.data.length) {
        callback(new Error('数量不能大于数据行数'))
      } else {
        callback()
      }
    };
    return {
      formInline: {
        lineNum: ''
      },
      ruleInline: {
        lineNum: [
          { required: true, message: '请填写要抽取的数量', trigger: 'blur' },
          { validator: validNum, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getNum: function () {
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          this.getRandomResult(this.formInline.lineNum)
          this.$router.push('/result')
        } else {
        }
      })
    },
    getRandomResult: function (n) {
      let arr = []
      for (let i = 0; i < this.$store.state.TableFile.tableData.data.length; i++) {
        arr.push(i)
      }
      let array = new Uint16Array(this.$store.state.TableFile.tableData.data.length)
      window.crypto.getRandomValues(array)
      for (let i = 0; i < array.length; i++) {
        arr.sort((a, b) => {
          return (array[i] - 32768)
        })
      }
      arr.length = n
      let result = {}
      result.columns = this.$store.state.TableFile.tableData.columns
      result.data = []
      arr.map( i => {
        result.data.push(this.$store.state.TableFile.tableData.data[i])
      })
      this.$store.commit('SET_TABLE_RESULT',result)
    }
  },
  computed: {
    getList: function () {
      return this.$store.state.TableFile.tableData.columns
    },
    getLength: function () {
      return this.$store.state.TableFile.tableData.data.length
    }
  }
}

</script>

<style>
 .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
</style>