<template>
  <div>
    <div class="Input-box">
      <div class="field is-grouped-multiline is-grouped">
        <b class="Input-title">{{selectTitle}}</b>

        <b-select :placeholder="firstTitle" prop="firstList" v-model="firstCode">
          <option value="">{{firstTitle}}</option>
          <option
            v-for="option in firstList"
            :value="option.id"
            :key="option.name">
            {{ option.name }}
          </option>
        </b-select>
        <b-select :placeholder="secordTitle" prop="secordList" v-model="secordCode">
          <option value="">{{secordTitle}}</option>
          <option
            v-for="option in secordList"
            :value="option.id"
            :key="option.name">
            {{ option.name }}
          </option>
        </b-select>
        <b-select  v-if="thirdList.length>0" :placeholder="thirdTitle" prop="thirdList" v-model="thirdCode">
          <option value="">{{thirdTitle}}</option>
          <option
            v-for="option in thirdList"
            :value="option.id"
            :key="option.name">
            {{ option.name }}
          </option>
        </b-select>
      </div>
    </div>

  </div>

</template>

<style>

</style>

<script>
    export default {
      name: 'dynamicSelect',
      props:{
        selectList:Array,
        selectTitle:String,
        firstTitle:String,
        secordTitle:String,
        thirdTitle:String,
        pid:String,

      },
        data:function() {
          return {
            firstCode:"",
            selectList:this.selectList,
            selectTitle:this.selectTitle,
            secordCode:"",
            thirdCode:"",


          }
        },
      computed: {
        firstList () {
            const vm = this
            return this.selectList.filter(function (item) {
              return item.pid === vm.pid
            })
        },
        secordList () {
          const vm = this
          if (this.firstCode) {

            return this.selectList.filter(function (item) {
              return item.pid === vm.firstCode
            })
          } else {
            return []
          }
        },
        thirdList () {
          const vm = this
          if (this.secordCode) {
            return this.selectList.filter(function (item) {
              return item.pid === vm.secordCode
            })
          } else {
            return []
          }
        }
      },
      methods:{
       /* firstTitle(){
           return this.firstTitle;
        },
        secordTitle(){
          return  this.secordTitle;
        },
        thirdTitle(){
          return  this.thirdTitle;
        }*/

      },
      watch: {
        /**
         * Set internal message when prop change.
         */
        firstCode (value) {
          this.secordCode = value
        },
        secordCode (value) {
          this.thirdCode = value
        }
      },
      created(){

      }



    }
</script>
