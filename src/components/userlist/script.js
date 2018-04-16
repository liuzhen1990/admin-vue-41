// 分页的每页几条是组件的子组件，而currentPage是父组件提供的数据，这里需要选中
// 每页几条，更改currentPage,视图驱动数据
// import axios from 'axios'
// import {getToken} from '@/assets/js/auth'
// import http from '@/assets/js/http' // 默认的不加大括号
export default {
  async created () {
    // 第一次进来请求分页数据： 第1页，每页2条
    // const token = JSON.parse(getUserInfo()).token
    // const token = getToken()
    // const token = JSON.parse(window.localStorage.getItem('admin-token')).token
    // const token = window.localStorage.getItem('admin-token')
    // console.log(token)
    // const ret = await this.$http.get('/users', {
    //   headers: {
    //     Authorization: token
    //   },
    this.loadUsersByPage(1, 1)
  },
  data () {
    return {
      // value1: true,
      searchText: '',
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      // value2: true,
      tableData: [
      // {
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // },
      // {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // },
      ],
      totalSize: 0,
      pageSize: 1,
      currentPage: 1,
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      console.log(`每页 ${pageSize} 条`)
      this.pageSize = pageSize
      this.loadUsersByPage(1, pageSize)
      // 让第1页高亮显示
      this.currentPage = 1
    },
    handleCurrentChange (currentPage) {
      console.log(`当前页: ${currentPage}`)
      this.loadUsersByPage(currentPage, this.pageSize)
    },
    handleSearch () {
      this.loadUsersByPage(this.currentPage, this.pageSize)
    },
    // 根据页码加载用户列表数据
    async loadUsersByPage (pagenum, pagesize = 1) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: pagenum,
          pagesize: pagesize,
          query: this.searchText
        }
      })
      console.log(res)
      this.tableData = res.data.data.users
      const total = res.data.data.total
      this.totalSize = total
    },
    // 切换用户状态
    async handleStateChange (state, user) {
      // console.log(state, user)
      // users/:uId/state/:type
      const {id: uId} = user
      const res = await this.$http.put(`/users/${uId}/state/${state}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          // message: `用户状态${'启用'}成功`
          message: `用户状态${state ? '开启' : '禁用'}成功`
        })
      }
    },
    async handleAddUser (ruleForm) {
      // 1.获取表单数据
      // 2.表单验证
      // 3.发起请求添加用户
      // 4.根据响应做交互
      // 添加用户成功，给出提示
      // 关闭对话框
      // 重新加载当前列表数据
      this.$refs[ruleForm].validate(async (valid) => {
        if (!valid) {
          return false
        }
        const res = await this.$http.post('/users', this.userForm)
        console.log('ok', res)
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
        }
        // 关闭对话框
        this.dialogFormVisible = false
        // 重新加载用户列表数据
        this.loadUsersByPage(this.currentPage, this.pageSize)
        // 清空表单内容
        for (var key in this.userForm) {
          this.userForm[key] = ''
        }
      })
    },
    async handleDeleteUser (user) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${user.id}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新加载数据
          this.loadUsersByPage(this.currentPage, this.pageSize)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleShowEditForm (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`/users/${user.id}`)
      console.log(res)
      this.editUserForm = res.data.data
    },
    async handleEditUser () {
      console.log(this.editUserForm)
      const {id: userId} = this.editUserForm
      const res = await this.$http.put(`/users/${userId}`, this.editUserForm)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新数据成功'
        })
        this.dialogEditFormVisible = false
        // 重新加载当前页数据
        this.loadUsersByPage(this.currentPage, this.pageSize)
      }
    }
  }
}
