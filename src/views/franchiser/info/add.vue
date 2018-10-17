<template>
    <section style="padding: 20px 20px 31px 20px;">
      <div class="card">
        <div class="card-content" style="padding: 40px;">
          <!--horizontal使用:message="errors.first('sorted')
        "显示错误提示会导致元素向左便宜，垂直布局没这个问题，可以直接使用:message显示错误提示-->
          <!--<jcc-field label="标识符" horizontal-->
                     <!--:type="errors.has('sysIdentifier') ? 'is-danger' : ''"-->
                     <!--:message="errors.first('sysIdentifier')">-->
            <!--<b-input name="sysIdentifier" v-model="model.sysIdentifier"-->
                     <!--v-validate="'required|max:64|alpha_underscore|remote:/system/idetifier-vertify'"  data-vv-as="标识符" class="w-25"></b-input>-->
          <!--</jcc-field>-->

          <!--<jcc-field label="名称" horizontal-->
                     <!--:type="errors.has('name') ? 'is-danger' : ''"-->
                     <!--:message="errors.first('name')">-->
            <!--<b-input name="name" v-model="model.name"-->
                     <!--v-validate="'required|max:64'"  data-vv-as="名称" class="w-25"></b-input>-->
          <!--</jcc-field>-->

          <!--<jcc-field label="图标" horizontal  :type="errors.has('icon') ? 'is-danger' : ''" :message="errors.first('icon')">-->
            <!--<b-input name="icon" v-model="model.icon"-->
                     <!--v-validate="'required|max:32'"  data-vv-as="图标" class="w-25"></b-input>-->
          <!--</jcc-field>-->

          <!--<jcc-field label="排序" horizontal-->
                     <!--:type="errors.has('sorted') ? 'is-danger' : ''"-->
                     <!--:message="errors.first('sorted')">-->
            <!--<b-input name="sorted" expanded v-model="model.sorted"-->
                     <!--v-validate="'required|numeric|min_value:0|max_value:9999'"  data-vv-as="排序" class="w-25">-->
            <!--</b-input>-->
          <!--</jcc-field>-->
          <!--<jcc-field label="类型" horizontal-->
                     <!--:type="errors.has('type') ? 'is-danger' : ''"-->
                     <!--:message="errors.first('type')">-->
            <!--<b-select name="type"  expanded  v-model="model.type"-->
                      <!--v-validate="'required'" data-vv-as="类型" class="w-15">-->
              <!--<option-->
                <!--v-for="option in dictList(this, 'systemType')"-->
                <!--:value="option.dictValue"-->
                <!--:key="option.dictValue">-->
                <!--{{ option.dictText }}-->
              <!--</option>-->
            <!--</b-select>-->
          <!--</jcc-field>-->
          <!--<jcc-field class="field" horizontal message="内部访问的系统不对外公开，SP、SO均无法访问">-->
            <!--<b-switch v-model="model.internal"-->
                      <!--true-value="true"-->
                      <!--false-value="false"-->
                      <!--type="is-info">-->
              <!--内部访问-->
          <!--</b-switch>-->
          <!--</jcc-field>-->
          <!--<b-field horizontal>&lt;!&ndash; Label left empty for spacing &ndash;&gt;-->
            <!--<p class="control btn_margin">-->
              <!--<button class="button is-primary" @click="save" :disabled='errors.any()'-->
                      <!--:class="{'is-loading' : saving}">-->
                <!--<b-icon icon="check-circle"></b-icon>-->
                <!--<span>保存</span>-->
              <!--</button>-->
              <!--<button class="button" @click="back">-->
                <!--<b-icon icon="undo"></b-icon>-->
                <!--<span>返回</span>-->
              <!--</button>-->
            <!--</p>-->
          <!--</b-field>-->

          <div class="add-Wrap">
            <!--<b-field label="加盟商姓名(必填)">-->
              <!--<b-input class="add-input"></b-input>-->
            <!--</b-field>-->
            <div class="area-wrap">
              <span class="left-title"><span style="color: red;">*</span> 加盟商姓名:</span>
              <b-input type="text" class="right-input"></b-input>
            </div>

            <div class="area-wrap">
              <span class="left-title"><span style="color: red;">*</span> 联系电话:</span>
              <b-input type="text" class="right-input"></b-input>
            </div>


            <!--省市区-->
            <div class="area-wrap">
              <span class="left-title"><span style="color: red;">*</span> 所在区域:</span>
              <div class="drop-menu">
                <b-select placeholder="省">
                  <option value="flint">湖北</option>
                  <option value="silver">湖南</option>
                  <option value="vane">河北</option>
                  <option value="billy">湖南</option>
                  <option value="jack">Jack</option>
                </b-select>
                <b-select placeholder="市">
                  <option value="flint">武汉市</option>
                  <option value="silver">黄石市</option>
                  <option value="vane">宜昌市</option>
                  <option value="billy">襄阳市</option>
                  <option value="jack">Jack</option>
                </b-select>
                <b-select placeholder="区/县" class="qu">
                  <option value="flint">武昌区</option>
                  <option value="silver">洪山区</option>
                  <option value="vane">东西湖开发区</option>
                  <option value="billy">汉口区</option>
                  <option value="jack">Jack</option>
                </b-select>
              </div>
            </div>

            <div class="area-wrap">
              <span class="left-title"><span style="color: red;">*</span> 具体地址:</span>
              <b-input type="text" class="right-input"></b-input>
            </div>

            <div class="map-wrap">
              <span class="left-title"><span style="color: red;">*</span> 所属业务组:</span>
              <img src="../../../assets/aaa.png" alt="">
            </div>

            <div class="area-wrap">
              <span class="left-title"><span style="color: red;">*</span> 所属业务组:</span>
              <b-input type="text" class="right-input"></b-input>
            </div>

            <div class="time-box">
              <span class="left-title"><span style="color: red;">*</span> 授权时间：</span>
              <b-datepicker
                placeholder="开始时间"
                icon="calendar-today"
                class="first-drop">
              </b-datepicker>
              <b-datepicker
                placeholder="结束时间"
                icon="calendar-today">
              </b-datepicker>
              <div style="clear: both;"></div>
            </div>

            <!--授权协议上传图片-->
            <div class="uploading-img">
              <span class="left-title"><span style="color: red;">*</span> 授权协议(最多上传3张):</span>
              <!--图片部分-->
              <div class="shi-ming">
                <div>
                  <img :src="url1" alt="" id="img" accept="image/*"/>
                  点击上传
                  <!--<img src="../../../static/imgbiao/shimingtu.png" alt="">-->
                  <input type="file" class="file" v-on:change="change($event,1)">
                </div>
                <div class="shen-fan">
                  <!--<img src="../../../static/imgbiao/shimingtu.png" alt="">-->
                  <img :src="url2" alt="" id="img1" accept="image/*"/>
                  点击上传
                  <input type="file" class="file" v-on:change="change($event,2)">
                </div>
                <div class="shen-fan">
                  <!--<img src="../../../static/imgbiao/shimingtu.png" alt="">-->
                  <img :src="url3" alt="" id="img2" accept="image/*"/>
                  点击上传
                  <input type="file" class="file" v-on:change="change($event,3)">
                </div>
              </div>
            </div>

            <!--营业执照上传图片-->
            <div class="uploading-img">
              <span class="left-title"><span style="color: red;">*</span> 营业执照(最多上传3张):</span>
              <!--图片部分-->
              <div class="shi-ming">
                <div>
                  <img :src="url1" alt="" id="img" accept="image/*"/>
                  点击上传
                  <!--<img src="../../../static/imgbiao/shimingtu.png" alt="">-->
                  <input type="file" class="file" v-on:change="change($event,1)">
                </div>
                <div class="shen-fan">
                  <!--<img src="../../../static/imgbiao/shimingtu.png" alt="">-->
                  <img :src="url2" alt="" id="img1" accept="image/*"/>
                  点击上传
                  <input type="file" class="file" v-on:change="change($event,2)">
                </div>
                <div class="shen-fan">
                  <!--<img src="../../../static/imgbiao/shimingtu.png" alt="">-->
                  <img :src="url3" alt="" id="img2" accept="image/*"/>
                  点击上传
                  <input type="file" class="file" v-on:change="change($event,3)">
                </div>
              </div>
            </div>

            <div class="present-btn">
              <button class="submit" @click="">
                提交
              </button>
              <button class="cancel" @click="">
                取消
              </button>
            </div>


          </div>
          <!--add-wrap结束符-->
        </div>

      </div>
      <!--外部盒子结束符-->
    </section>
</template>
<script>
  import { addSystem} from '@/api/backend/system';

  export default {
    data() {
    return {
      loading: false,
      saving: false,
      url1:'',
      url2:'',
      url3:'',
      name:'',
      model: {
      }
    }
  },
  methods: {
      back() {
        this.$router.back();
      },
      save() {
          const vm = this
          this.saveMode(vm, addSystem,() => vm.$router.push({ path: '/backend/system' }));
      },
      // 文件上传
      change:function(e,type){
        var that=this;
        var oImg=new Image();
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload= function(){
          oImg.src=this.result;
          oImg.onload=function()
          {
            var url=that.getbase64(oImg);
            if(type==1){
              that.url1=url;
            }else if(type==2){
              that.url2=url;
            }else if(type==3){
              that.url3=url;
            }else if(type==4){
              that.url4=url;
            }else if(type==5){
              that.url5=url;
            }else if(type==6){
              that.url6=url;
            }
          }
        }
      },
      getbase64:function(img){
        var that=this;
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = width;   /*设置新的图片的宽度*/
        canvas.height = height; /*设置新的图片的长度*/
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height); /*绘图*/
        var dataURL = canvas.toDataURL("image/jpeg", 0.1);
        that.url=dataURL;
  //		            return dataURL.replace("data:image/jpeg;base64,", "");
        return dataURL;
      },
      toRen(){
        if (this.url1 == ''){
          this.$toast('请上传加盟商图片')
        }else if (this.url2 == ''){
          this.$toast('请上传加盟商图片')
        }else if (this.url3 == ''){
          this.$toast('请上传加盟商图片')
        }
        else if (this.url4 == ''){
          this.$toast('请上传营业执照')
        }
        else if (this.url5 == ''){
          this.$toast('请上传营业执照')
        }
        else if (this.url6 == ''){
          this.$toast('请上传营业执照')
        }
        else{
          var phone = localStorage.getItem('phone');
          this.$axios.post(this.$api.addreal,{
            phone:phone,
            name:this.name,
            idcardfront:this.url1,
            idcardback:this.url2,
            idcard:this.idCard
          }).then(res => {
            // this.$toast(res.data.msg)
             this.$messagebox('提示',res.data.msg).then(action => {
              if (res.data.code == 0){
                this.$router.push({path:'/my'});
              }
            });
          })
        }

      },
    }
  }
</script>
<style>

</style>
