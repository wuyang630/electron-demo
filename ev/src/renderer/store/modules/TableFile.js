const state = {
  file: '',
  originFile: '',
  tableData: {
    columns: [{
        title: '列名',
        key: 'c'
      },
    ],
    data: [{
        c: '数据1',
      }]
  },
  num: 0,
  tableResult: {
    columns: [{
        title: '列名',
        key: 'c'
      },
    ],
    data: [{
        c: '数据1',
      }]
  }
}

const mutations = {
  SET_FILE_PATH(state, file) {
    state.file = file
  },
  SET_TABLE_DATA(state, data) {
    state.tableData = data
  },
  SET_ORIGIN_FILE(state, data) {
    state.originFile = data 
  },
  SET_TABLE_RESULT(state, data) {
    state.tableResult = data
  }
}

export default {
  state,
  mutations,
  //   actions
}