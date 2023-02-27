<template>
<div>
  <loading v-if="loading" :loading="loading"/>
  <v-card v-else class="pa-4 card-pet" outlined :style="BgImage(preview_image||form.path_profile)">
    <v-row align="center">
      <v-col cols="12" sm="5" md="5">
        <v-row justify="center" align="center">
          <v-file-input v-show="false" ref="uploadpic" accept="image/png, image/jpeg ,image/jpg" outlined dense hide-details label="รูป" v-model="image_browse" @change="PreviewImage"></v-file-input>
          <v-avatar size="190" class="my-5 avatar mx-auto cursor">
            <v-img v-if="preview_image||form.path_profile" :src="preview_image||form.path_profile" @click="choosePicture"></v-img>
            <v-icon class="br-2" v-else size="140" color="#777" @click="choosePicture">fa-user</v-icon>
          </v-avatar>
        </v-row>
      </v-col>
      <v-col class="pa-auto" cols="12" sm="7" md="7">
        <v-row>
          <v-col cols="6">
            <v-text-field label="ชื่อสัตว์เลี้ยง" dense v-model="form.pet_name" :readonly="mode=='view'" hide-details></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-if="mode=='view'" label="วันเกิด" dense v-model="form.birthday" :readonly="mode=='view'" hide-details></v-text-field>
            <v-menu v-else ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form.birthday" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateRangeText" label="วันเกิด" readonly v-bind="attrs" v-on="on" dense hide-details></v-text-field>
              </template>
              <v-date-picker :allowed-dates="setDisabledDates" v-model="form.birthday" color="primary" no-title scrollable locale="TH">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false"> ยกเลิก </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(form.birthday)"> ตกลง </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-text-field label="อายุ" dense v-model="agetText" readonly hide-details></v-text-field>
          </v-col>
          <v-col cols="6" v-if="listPets">
            <v-text-field v-if="mode=='view'" label="ประเภท" dense v-model="form.type_pet" :readonly="mode=='view'" hide-details></v-text-field>
            <v-select v-else dense v-model="form.type_pet" :items="listPets.type_pet" item-text="text" item-value="value" label="ประเภท" hide-details></v-select>
          </v-col>
          <v-col cols="6" v-if="listPets">
            <v-text-field v-if="mode=='view'" label="เพศ" dense v-model="form.sex_pet" :readonly="mode=='view'" hide-details></v-text-field>
            <v-select v-else dense v-model="form.sex_pet" :items="listPets.sex_pet" item-text="text" item-value="value" label="เพศ" hide-details></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field label="สายพันธุ์" dense v-model="form.species" :readonly="mode=='view'" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row cols="12" class="mt-4">
          <v-spacer></v-spacer>
          <v-btn class="mx-2" outlined color="primary" @click="clearData" v-if="mode=='new'">เคลียร์ข้อมูล</v-btn>
          <v-btn class="mx-2" depressed color="primary" @click="submit" v-if="mode!='view'"> {{ modeSubmit(mode) }} </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
export default {
  props: {
    mode: {
      type: String,
      default: 'new'
    },
    form: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      image_browse: null,
      preview_image: null,
      menu: false
    }
  },
  computed: {
    ...mapGetters({
      listPets: 'service/listPets',
      loading: 'pets/loading'
    }),
    agetText() {
      let age = this.form.birthday
      let dateNow = new Date();
      let setDate = new Date(age);
      let currdate = dateNow - setDate
      const days = this.$moment.duration(currdate).days()
      const weeks = this.$moment.duration(currdate).weeks()
      const month = this.$moment.duration(currdate).months()
      const year = this.$moment.duration(currdate).years()
      if (year) {
        return year + 'ปี'
      } else if (month) {
        return month + 'เดือน'
      } else if (weeks) {
        return weeks + 'สัปดาห์'
      } else if (days) {
        return days + 'วัน'
      }
      return null
    },
    dateRangeText() {
      return new Date(this.form.birthday).toLocaleDateString()
    },
  },
  methods: {
    ...mapActions({
      optionPets: 'service/getOptionPets',
      create: 'pets/create',
      update: 'pets/update',
      loadData: 'pets/loadData'
    }),
    BgImage(image) {
      return `
        background: url(${image})  top no-repeat;
        width: 100%;
        background-size: cover;
        position: relative;
      `;
    },
    getDates(start, end) {
      var oneDay = 24 * 3600 * 1000;
      for (var d = []; start < end; start += oneDay) {
        d.push(new Date(start));
      }
      return d;
    },
    setDisabledDates(val) {
      if (val < this.$moment().format('YYYY-MM-DD')) {
        return true
      }
      return false
    },
    async getOptionPets() {
      await this.optionPets()
    },
    PreviewImage() {
      let file = this.image_browse
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL( file );
        reader.addEventListener('load', () => {
          if (reader.result) {
            this.preview_image = reader.result;
          }
        });
      }
    },
    choosePicture() {
      this.$refs.uploadpic.$refs.input.click()
    },
    clearData(){
      this.image_browse = null
      this.preview_image = null
      this.form = {
        birthday: this.$moment(new Date()).format('YYYY-MM-DD'),
      }
    },
    valideteDate(){
      if (!this.form.pet_name) {
        Swal.fire({
          icon: 'error',
          title: 'กรุณากรอก ชื่อ',
        })
        return false
      }
      return true
    },
    async submit(){
      if (this.valideteDate()) {
        if (this.mode == 'new') {
          this.createData()
        } else {
          this.updateData()
        }
      }
    },
    async createData(){
      let form = this.form
      form.profile = this.image_browse
      form.created_by = this.$auth.user._id
      let res = await this.create(form)
      if (res.status) {
        Swal.fire({ 
          icon: "success", 
          title: res.message, 
          showConfirmButton: false,
          timer: 1500
        }).then(async (result) => {
          await this.loadData(this.$auth.user._id)
          this.$router.replace('/')
        })
      } else {
        Swal.fire({ 
          icon: "error", 
          title: res.message,
        })
      }
    },
    async updateData(){
      let form = this.form
      if (this.image_browse) {
        form.new_profile = this.image_browse
      }
      form.updated_by = this.$auth.user._id
      let res = await this.update(form)
      if (res.status) {
        Swal.fire({ 
        icon: "success", 
        title: res.message,
        }).then(async (result) => {
          await this.loadData(this.$auth.user._id)
          if (result.isConfirmed||!result.isConfirmed){
            this.$router.replace('/')
          }
        })
      } else {
        Swal.fire({ 
          icon: "error", 
          title: res.message,
        })
      }
    },
    modeSubmit(mode){
      if (mode == 'new') return 'สร้าง';
      else if (mode == 'edit') return 'อัพเดท';
    }
  },
  async fetch() {
    await this.getOptionPets()
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  border: 2px solid #ddd;
  position: relative;
}
.cursor {
  cursor: pointer;
}
.card-pet {

  &:before {
    content: "";
    background: #ffffffe5;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
