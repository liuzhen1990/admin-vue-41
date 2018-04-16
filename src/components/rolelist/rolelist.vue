<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right bread-title">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item class="authRights">权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
    <el-button type="success">添加角色</el-button>
  </el-row>
  <el-table
   :data="tableData5"
   style="width: 100%">
   <el-table-column type="expand">
     <template slot-scope="scope">
       <el-form label-position="left" inline class="demo-table-expand">
         <el-row
           v-for="level1 in scope.row.children"
           :key="level1.id"
           class="role-level1">
           <!-- 一级权限 -->
           <el-col :span="4">
             <el-tag
               closable
               type="">
               {{ level1.authName }}
             </el-tag>
             <i class="el-icon-arrow-right"></i>
           </el-col>
           <el-col :span="20">
             <!-- 二级权限 -->
             <el-row
             class="role-level2"
               v-for="level2 in level1.children"
               :key="level2.id">
               <el-col :span="4">
                 <el-tag
                   closable
                   type="success">
                   {{ level2.authName }}
                 </el-tag>
                 <i class="el-icon-arrow-right"></i>
               </el-col>
               <el-col :span="20">
                 <el-tag
                   v-for="level3 in level2.children"
                   :key="level3.id"
                   closable
                   type="warning"
                   class="role-leve3">
                     {{ level3.authName }}
                 </el-tag>
               </el-col>
             </el-row>
           </el-col>
         </el-row>
       </el-form>
     </template>
   </el-table-column>
   <el-table-column
     label="#"
     type="index">
   </el-table-column>
   <el-table-column
     label="角色名称"
     prop="roleName">
   </el-table-column>
   <el-table-column
     label="描述"
     prop="roleDesc">
   </el-table-column>
   <el-table-column
     label="标签"
     width="500"
     filter-placement="bottom-end">
     <template slot-scope="scope">
       <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
       <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
       <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
     </template>
   </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  created () {
    this.loadRoles()
  },
  data () {
    return {
      tableData5: []
    }
  },
  methods: {
    async loadRoles () {
      const res = await this.$http.get('/roles')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.tableData5 = res.data.data
      }
    }
  }
}
</script>

<style>
.bread-title{
  font-size: 14px;
  line-height: 3;
  /* text-align: center; */
  margin-bottom: 10px;
}
.authRights{
  margin-top: 14px;
}
.role-level1{
  margin-bottom: 5px;
}
.role-leve3,.role-level2{
  margin-bottom: 5px;
}
.role-leve3{
  margin-right:5px;
}
</style>
