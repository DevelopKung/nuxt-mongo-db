<template>
<div>
  <v-container>
   <v-row>
    <v-col cols="12" sm="12" md="7">
      <CardPet :mode="mode" :form="form_pet" />
    </v-col>
    <v-col v-if="mode == 'edit'" cols="12" sm="12" md="5">
      <HealthCheckPet :form="form_pet" />
    </v-col>
   </v-row>
  </v-container>
</div>
</template>

<script>
import CardPet from "@/components/pets/card";
import HealthCheckPet from '../../components/pets/health-check-pet.vue';
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    CardPet,
    HealthCheckPet,
  },
  data() {
    return {
      id: this.$route.params.id,
      mode: 'new',
      preview_image: null,
      form_pet: {
        birthday: this.$moment().add(-1, 'days').format('YYYY-MM-DD'),
        sex_pet: 'male',
        type_pet: 'cat'
      },
    }
  },
  methods: {
    ...mapActions({
      loadInfo: 'pets/loadInfo',
      loadData: 'health-check-pet/loadData'
    }),
    async getInfo(){
      let res = await this.loadInfo({ id: this.id, user_id: this.$auth.user._id })
      this.form_pet = res.docs
    },
  },
  async fetch() {
    if (this.id != 'new') {
      this.mode = 'edit'
      await this.getInfo()
      await this.loadData(this.form_pet.pet_id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
