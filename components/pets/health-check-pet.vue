<template>
<div v-if="mode == 'edit'">
  <v-card outlined>
    <v-card-title>
      <v-row class="px-2" justify="space-between" align="center">
        <span>ตรวจสุขภาพ</span>
        <v-btn class="mx-2" fab dark small color="primary" elevation="0" @click="open_new = true">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-expand-transition>
        <div v-show="open_new">
          <v-text-field label="สถานที่ตรวจ" dense v-model="form_hcp.examination_site"></v-text-field>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="form_hcp.date" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="dateRangeText" label="วันที่ตรวจ" readonly v-bind="attrs" v-on="on" dense></v-text-field>
            </template>
            <v-date-picker v-model="form.date" color="primary" no-title scrollable locale="TH">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> ยกเลิก </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(form_hcp.date)"> ตกลง </v-btn>
            </v-date-picker>
          </v-menu>

          <v-text-field label="หัวข้อ" dense v-model="form_hcp.title"></v-text-field>
          <v-textarea v-model="form_hcp.description" prepend-inner-icon="mdi-comment" label="รายละเอียด" rows="2" outlined></v-textarea>
          <v-row class="px-1">
            <v-spacer></v-spacer>
            <v-btn class="mx-1" outlined color="error" small @click="open_new = false">ยกเลิก</v-btn>
            <v-btn class="mx-1" depressed color="primary" small @click="submit">{{form_hcp.hcp_id ? 'อัพเดท':'สร้าง'}}</v-btn>
          </v-row>
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
  <v-expansion-panels v-if="lists.status">

    <v-expansion-panel class="elevation-0" v-for="(item,i) in lists.payload" :key="i">
      <v-expansion-panel-header>
         {{item.title}} 
         <span class="ml-4 date">{{new Date(item.date).toLocaleDateString()}}</span>
       </v-expansion-panel-header>
      <v-expansion-panel-content>
        
        <div>
          <div v-if="item.examination_site"> 
            <div class="caption" >สถานที่ตรวจ</div>
            <div class="subtitle-2">{{ item.examination_site }}</div>  
          </div>
          <div class="mt-3" v-if="item.description"> 
            <div class="caption" >รายละเอียด</div>
            <div class="subtitle-2">{{ item.description }}</div>  
          </div>

          <v-row>
            <v-spacer></v-spacer>
            <v-btn class="mx-1" outlined color="primary" small @click="deleteDate(item)">ลบ</v-btn>
            <v-btn class="mx-1" depressed color="primary" small @click="setInfo(item)">แก้ไข</v-btn>
          </v-row>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </v-expansion-panels>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  props: {
    mode: {
      type: String,
      default: 'edit'
    },
    form: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      open_new: false,
      menu: false,
      form_hcp: {
        date: this.$moment().format('YYYY-MM-DD')
      },
      items: []
    }
  },
  watch: {
    open_new(v) {
      if (!v) {
        this.form_hcp = {
          date: this.$moment().format('YYYY-MM-DD')
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      lists: 'health-check-pet/lists'
    }),
    dateRangeText() {
      return new Date(this.form_hcp.date).toLocaleDateString()
    },
  },
  methods: {
    ...mapActions({
      create: 'health-check-pet/create',
      loadData: 'health-check-pet/loadData'
    }),
    async submit() {
      if (this.form_hcp.hcp_id) {
        await this.updateData()
      } else {
        await this.createData()
      }
    },
    async createData(){
      this.form_hcp.pet_id = this.form.pet_id
      this.form_hcp.created_by = this.$auth.user._id
      let res = await this.create(this.form_hcp)
      if (res.status) {
        Swal.fire({ 
          icon: "success", 
          title: res.message,
        }).then(async (result) => {
          this.open_new = false
          await this.getData(this.form.pet_id)
        })
      } else {
        Swal.fire({ 
          icon: "error", 
          title: res.message,
        })
      }
    },
    async updateData(){
      this.form_hcp.update_by = this.$auth.user._id
      let res = await this.update({ id: this.form_hcp.hcp_id, form: this.form_hcp })
      if (res.status) {
        Swal.fire({ 
          icon: "success", 
          title: res.message,
        }).then(async (result) => {
          this.open_new = false
          await this.loadData(this.form.pet_id)
        })
      } else {
        Swal.fire({ 
          icon: "error", 
          title: res.message,
        })
      }
    },
    setInfo(item){
      this.form_hcp = item
      this.open_new = true
    }
  },
}
</script>

<style lang="scss" scoped>
.date { font-size: 8px !important; color: #858585; }
</style>
