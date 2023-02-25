<!-- <template>
  <div>
    <v-container>
      <v-card class="pa-8 mb-14">
        <div>
          <h2> สมาชิก ( {{id == "new" ? 'สร้าง':'แก้ไข'}} )</h2>
        </div>
        <div class="text-center my-4">
          <v-file-input v-show="false" ref="uploadpic" accept="image/png, image/jpeg ,image/jpg" outlined dense hide-details label="รูป" v-model="image_browse" @change="PreviewImage"></v-file-input>
          <v-avatar @click="choosePicture" class="avatar" size="200">
            <v-img aspect-ratio="1" :src="preview_image"></v-img>
          </v-avatar>
        </div>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <h4>ชื่อ</h4>
            <v-text-field :rules="valid" dense v-model="form.pet_name" label="ชื่อ" outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <h4>วันเกิด</h4>
            <v-menu ref="menu" v-model="datePicker.menu" :close-on-content-click="false" :return-value.sync="datePicker.date" transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="form.birthday" label="วันเกิด" readonly v-bind="attrs" v-on="on" dense outlined hide-details></v-text-field>
              </template>
              <v-date-picker :allowed-dates="setDisabledDates" v-model="form.birthday" color="primary" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="datePicker.menu = false"> Cancel </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(datePicker.date)"> OK </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <h4>อายุ</h4>
            <v-text-field :rules="valid" dense v-model="form.age" label="อายุ" readonly outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <h4>ประเภท</h4>
            <v-select dense v-model="form.type_pet" :items="type_pet" item-text="name" item-value="value" label="ประเภท" outlined hide-details></v-select>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <h4>เพศ</h4>
            <v-select dense v-model="form.sex_pet" :items="[{name: 'ผู้', value: '0'},{name: 'เมีย', value: '1'}]" item-text="name" item-value="value" label="ประเภท" outlined hide-details></v-select>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <h4>สายพันธุ์</h4>
            <v-text-field :rules="valid" dense v-model="form.species" label="สายพันธุ์" outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <h4>สถานะ</h4>
            <v-radio-group class="mt-0" :rules="valid" v-model="form.status" dense row hide-details>
              <v-radio label="อยู่" value="live"></v-radio>
              <v-radio label="เสีย" value="died"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <h4>คำอธิบาย</h4>
            <v-textarea :rules="valid" rows="2" dense v-model="form.description" label="คำอธิบาย" append-icon="mdi-comment" outlined hide-details></v-textarea>
          </v-col>
        </v-row>
        <div class="d-flex justify-center pt-3 px-4">
          <v-btn width="114" color="tonal" class="mx-1" depressed rounded @click="$router.replace('/pets')">
            <v-icon left small>fas fa-times</v-icon> ย้อนกลับ
          </v-btn>
          <v-btn width="114" color="primary" class="mx-1" depressed rounded :disabled="validate" @click="validateForm(form)">
            <v-icon left small>fas fa-check</v-icon> บันทึก
          </v-btn>
        </div>
  
      </v-card>
    </v-container>
  </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import loadImage from 'blueimp-load-image'
  import Swal from 'sweetalert2'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        image_browse: null,
        preview_image: 'https://m.media-amazon.com/images/I/81aCJakI4DL._SL1500_.jpg',
        form: {
          status: 'live'
        },
        valid: [v => !!v || 'กรุณากรอกข้อมูลให้ครบถ้วน'],
        type_pet: [{
            name: 'หมา',
            value: 'dog'
          },
          {
            name: 'แมว',
            value: 'cat'
          }
        ],
        datePicker: {
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          menu: false,
        },
      }
    },
    watch: {
      'form.birthday': function (v) {
        this.form.age = this.calculateAge(v)
      },
    },
    computed: {
      validate() {
        if ( !this.form.pet_name || !this.form.birthday )  return true;
        return false
      },
    },
    methods: {
      ...mapActions({
        findOne: 'pets/findOne',
        create: 'pets/create',
        update: 'pets/update',
      }),
      validateForm(form) {
        if (this.validate) {
          return
        }
        console.log(this.image_browse);
        if (this.image_browse) {
          form.upload = this.image_browse
        }
  
        if (this.id == "new") {
          this.createData(form)
        } else {
          this.updateData(form)
        }
      },
      async createData(form) {
        let res = await this.create(form)
        if (res.status) {
          let result = await Swal.fire({
            icon: 'success',
            title: res.message,
          })
          if (result.isConfirmed) {
            this.$router.replace('/pets')
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
          })
          return
        }
      },
      async updateData(form) {
        let res = await this.update(form)
        if (res.status) {
          let result = await Swal.fire({
            icon: 'success',
            title: res.message,
          })
          if (result.isConfirmed) {
            this.$router.replace('/pets')
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
          })
          return
        }
      },
      async getInfo(id) {
        this.loading = true
        let res = await this.findOne(id)
        this.form = Object.assign({}, res.payload)
        this.preview_image = this.form.profile ? this.form.profile : this.preview_image
        this.loading = false
      },
      calculateAge(date) {
        try {
          let dt = date;
          let age = '';
          let vY = Number(this.$moment(dt).format('YYYY'));
          let vM = Number(this.$moment(dt).format('MM'));
          let vD = Number(this.$moment(dt).format('DD'));
  
          let Y = Number(this.$moment().format('YYYY'));
          let M = Number(this.$moment().format('MM'));
          let D = Number(this.$moment().format('DD'));
  
          age += (Y - vY) + ' ปี ';
          if (M < vM) {
            age += (M - vM + 12) + ' เดือน ';
            Y = Y - 1;
          } else age += (M - vM) + ' เดือน '
  
          if (D < vD) {
            age += (D - vD + 30) + ' วัน ';
            M = M - 1;
          } else age += (D - vD) + ' วัน '
          return age
        } catch (error) {
          return date
        }
      },
      PreviewImage() {
  
        let file = this.image_browse
        const reader = new FileReader
        reader.onload = e => {
          loadImage(
              e.target.result, {
                maxWidth: 1200,
                maxHeight: 1200,
                orientation: true,
                canvas: true
              } // Options
            ).then(data => {
              let imageData = data.image.toDataURL('image/jpeg');
              this.preview_image = imageData
            })
        }
        reader.readAsDataURL(file);
  
        // try {
        //   let image = this.image_browse;
        //   const reader = new FileReader
        //   reader.onload = e => {
        //     loadImage(
        //       e.target.result, {
        //         maxWidth: 1200,
        //         maxHeight: 1200,
        //         orientation: true,
        //         canvas: true
        //       } // Options
        //     ).then(data => {
        //       let imageData = data.image.toDataURL('image/jpeg');
        //       this.preview_image = imageData
        //     })
        //   }
        //   reader.readAsDataURL(image);
        //   this.image_browse = null;
        // } catch (error) {}
  
      },
      choosePicture() {
        this.$refs.uploadpic.$refs.input.click()
      },
      setDisabledDates(val) {
        return Math.floor(Date.now()) >= (new Date(val).getTime())
      }
    },
    async created() {
      if (this.id && this.id != "new") {
        await this.getInfo(this.id);
        this.form_mode = "edit";
      }
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .avatar {
    border: 6px solid #ccc;
    cursor: pointer;
  }
  </style>
   -->