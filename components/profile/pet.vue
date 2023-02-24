<template>
<div class="pet">
  <v-card elevation="1">
    <v-tabs show-arrows v-model="tab" color="primary" fixed-tabs>
      <v-tabs-slider color="primary"></v-tabs-slider>
      <v-tab v-for="(tab, i) in tabs" :key="i"> {{ tab.name }} </v-tab>
    </v-tabs>

    <v-tabs-items class="mb-10" v-model="tab">
      <v-tab-item>
        <v-card color="basil" flat>
          <v-card-text>
            <v-card class="grid" v-if="false">
              <div class="grid-item img">
                <v-img aspect-ratio="1" :src="pet.profile ? pet.profile : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'"></v-img>
              </div>
              <div class="grid-item align-self-center">
                <div class="pa-4">
                  <h2 class="text-center text-sm-start">My Profile</h2>
                  <div class="text-form py-2" v-if="pet.firstname"> ชื่อ: {{pet.firstname}} </div>
                  <div class="text-form py-2" v-if="pet.lastname">นามสกุล: {{pet.lastname}} </div>
                </div>
              </div>
            </v-card>
            <v-card class="grid">
              <div  v-for="(list, i) in lists" :key="i" class="pa-4">
                <v-img max-height="200" max-width="200" :src="list.profile ? list.profile : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'"></v-img>
              </div>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card color="basil" flat>
          <v-card-text>
            <v-card class="pa-2">
              <div>
                <div class="mb-2">
                  <v-btn v-if="image != null" @click="image = null" small color="primary" outlined elevation="0">
                    <v-icon class="mr-2"> fas fa-caret-left </v-icon> กลับ
                  </v-btn>
                </div>
                <v-row v-if="image == null">
                  <v-col @click="ImageAll(i)" class="cursor" v-for="i in 6" :key="i" cols="6" sm="4" md="3">
                    <v-img :src="`https://picsum.photos/500/300?image=${i * 5 + 10}`" :lazy-src="`https://picsum.photos/10/6?image=${i * 5 + 10}`" aspect-ratio="1"></v-img>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col @click="ImageAll(i)" class="cursor" v-for="i in 10" :key="i" cols="6" sm="4" md="3">
                    <v-img :src="`https://picsum.photos/500/300?image=${i * i * 5 + 10}`" :lazy-src="`https://picsum.photos/10/6?image=${i * i * 5 + 10}`" aspect-ratio="1"></v-img>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card color="basil" flat>
          <v-card-text>
            <div class="pa-2">
              <v-alert v-for="(his, i) in historys" :key="i" outlined :color="his.color">
                <div class="d-flex justify-space-between align-center">
                  <div class="text-h6"> {{ his.title }}</div>
                  <v-btn @click="his.active =! his.active" small :color="his.color" outlined elevation="0">
                    {{his.active ? 'ซ่อน': 'แสดง'}} <v-icon class="ml-2" :v-text="his.active ? 'fas fa-caret-right' : 'fas fa-caret-down'"> </v-icon>
                  </v-btn>
                </div>
                <div class="caption"> {{ his.date }} </div>
                <div v-if="his.active"> {{ his.desc }} </div>
              </v-alert>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card color="basil" flat>
          <v-card-text> test 2 </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

  </v-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    pet: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      tab: 2,
      image: null,
      images: [],
      tabs: [{
          name: "ประวัติ"
        },
        {
          name: "รูปภาพ"
        },
        {
          name: "ประวัติ"
        },
        {
          name: "อื่นๆ"
        },
      ],
      historys: [
        { 
          active: false,
          title:'Lorem Ipsum', 
          date: new Date().toLocaleString(),
          desc: `Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit.
                  Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin,
                  ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.
                `,
          color: 'info'
        },
        { 
          active: false,
          title:'Lorem Ipsum', 
          date: new Date().toLocaleString(),
          desc: `Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit.
                  Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin,
                  ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.
                `,
          color: 'purple'
        },
        { 
          active: false,
          title:'Lorem Ipsum', 
          date: new Date().toLocaleString(),
          desc: `Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit.
                  Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin,
                  ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.
                `,
          color: 'success'
        },
        { 
          active: false,
          title:'Lorem Ipsum', 
          date: new Date().toLocaleString(),
          desc: `Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Duis vel nibh at velit scelerisque suscipit.
                  Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin,
                  ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.
                `,
          color: 'primary'
        },
      ]
    };
  },
  watch: {
    tab(v) {
      if (v != 1) {
        this.image = null
      }
    }
  },
  computed:{
    ...mapGetters({
      lists: 'pets/lists'
    }),
    newHistorys() {
      let randomArray = ['error', 'success', 'info', 'purple', 'primary']
      var item = randomArray[Math.floor(Math.random()*randomArray.length)];
      // for
    }
  },
  methods: {
    async ImageAll(index) {
      if (index) {
        this.image = index
      }
    },
    randomColor(){
      let randomArray = ['error', 'success', 'info', 'purple', 'primary']
      var item = randomArray[Math.floor(Math.random()*randomArray.length)];
      return item
    }
  },
};
</script>

<style lang="scss" scoped>
.pet {
  box-sizing: border-box;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    column-gap: 10px;

    .img {
      margin: 10px 0;
      border-right: 2px solid #ccc;
    }

    .grid-item {
      max-width: 100%;
    }

    .text-form {
      border-bottom: 2px solid #ccc;
    }
  }
}

@media only screen and (max-width: 540px) {
  .grid {
    grid-template-columns: 1fr !important;

    .img {
      margin: 0;
      border-right: none !important;
    }
  }

  ::V-deep .v-slide-group {
    display: none;
  }
}
</style>
