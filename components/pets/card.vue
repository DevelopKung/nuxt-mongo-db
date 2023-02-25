<template>
<div>
  <v-card class="pa-4" outlined>
    <v-row align="center">
      <v-col cols="12" sm="5" md="4">
        <v-row justify="center" align="center">
          <v-avatar size="200" class="my-5 avatar mx-auto">
            <v-img :src="form_pet.profile"></v-img>
          </v-avatar>
        </v-row>
      </v-col>
      <v-col class="pa-auto" cols="12" sm="7" md="8">
        <v-row>
          <v-col cols="6">
            <v-text-field label="ชื่อสัตว์เลี้ยง" dense v-model="form_pet.pet_name" readonly hide-details></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="วันเกิด" dense v-model="form_pet.birthday" readonly hide-details></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="อายุ" dense v-model="form_pet.age" readonly hide-details></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="ประเภท" dense v-model="form_pet.type_pet" readonly hide-details></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="เพศ" dense v-model="form_pet.sex_pet" readonly hide-details></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="สายพันธุ์" dense v-model="form_pet.species" readonly hide-details></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</div>
</template>

<script>
export default {
data() {
  return {
    form_pet: {
      profile: 'https://images.livemint.com/img/2022/08/01/1600x900/Cat-andriyko-podilnyk-RCfi7vgJjUY-unsplash_1659328989095_1659328998370_1659328998370.jpg',
      pet_name: 'cat',
      birthday: new Date('2023-05-01').toLocaleDateString(),
      age: 2,
      type_pet: 'แมว',
      sex_pet: 'ผู้',
      species: 'เปอร์เซีย',
      status: true
    }
  }
},
}
</script>

<style lang="scss" scoped>
.avatar { border: 2px solid #ddd; }
</style>
