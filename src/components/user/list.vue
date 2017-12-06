<template>
    <div>
       <!--工具条-->
        <el-col :span="24" class="toolbar">
         <el-form :inline="true" :model="formFilter" class="demo-form-inline">
           <el-form-item label="审批人">
             <el-input v-model="formFilter.user" placeholder="审批人"></el-input>
           </el-form-item>
           <el-form-item label="活动区域">
             <el-select v-model="formFilter.region" placeholder="活动区域">
               <el-option label="区域一" value="shanghai"></el-option>
               <el-option label="区域二" value="beijing"></el-option>
             </el-select>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
              <el-button @click="onAdd" icon="el-icon-plus">新增</el-button>
           </el-form-item>
         </el-form>
        </el-col>
        <el-table :data="tableData" border style="width: 100%;" stripe border>
            <el-table-column prop="date" label="日期" width="180" align="left">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180" align="left">
            </el-table-column>
            <el-table-column prop="address" label="地址" align="left">
            </el-table-column>
            <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
          </el-table>
        <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                 formFilter: {
                  user: '',
                  region: ''
                },
                tableData: [{
                                date: '2016-05-02',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1518 弄'
                              }, {
                                date: '2016-05-04',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1517 弄'
                              }, {
                                date: '2016-05-01',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1519 弄'
                              }, {
                                date: '2016-05-03',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1516 弄'
                              }]
            };

        },
       methods: {
         onSubmit() {
           console.log('submit!');
           console.log(this.formFilter.user);
            console.log(this.formFilter.region);
         },
         onAdd() {
          console.log('onAdd!');
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        handleClick(row) {
          console.log(row.name);
        }
       }
    };
</script>
