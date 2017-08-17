<template>
  <div id="fileTable">
    <Table border :columns="tableData.columns" :data="tableData.data"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page ref="page" :total="totalPage" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
    <Modal v-model="modal" title="回看数据">
      <Table height="500" :columns="subData.columns" :data="subData.data"></Table>
    </Modal>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  data() {
    return {
      totalPage: 0,
      pageNo: 1,
      modal: false,
      subData: {
        columns: [{
          title: '列名',
          key: 'c'
        },
        ],
        data: [{
          c: '数据1',
        }]
      },
      totalData: undefined
    }
  },
  computed: {
    tableData: function () {
      if (this.totalData === undefined) {
        let data = {
          columns: [
            {
              title: '日期',
              key: 'date',
              width: 150
            },
            {
              title: '文件名',
              key: 'filename'
            },
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.show(params.row)
                      }
                    }
                  }, '查看')
                ]);
              }
            }
          ]
        }
        data.data = ipcRenderer.sendSync('get-history').sort( (a,b) => {
          return Date.parse(b.date) - Date.parse(a.date)
        })
        this.totalPage = Math.ceil(data.data.length)
        this.totalData = data
      }
      let pageData = {}
      pageData.columns = this.totalData.columns
      pageData.data = this.totalData.data.slice((this.pageNo - 1) * 10, (this.pageNo) * 10)
      return pageData
    },
  },
  methods: {
    show: function (data) {
      this.modal = true
      this.subData = data.data
    },
    changePage: function (pageNo) {
      this.pageNo = pageNo
    }
  }
}

</script>

<style>

</style>
