<template>
<div class="login">
  <div class="box-login flex-center">
    <v-card class="mx-2" width="600" height="500">
      <div class="grid">
        <div class="grid-item-1 flex-center">
          <span>
            <div class="mb-4">
              <h3>Welcome To My Pets V.{{ version }}</h3>
              <small>ถ้าคุณยังไม่เป็นสมาชิก</small>
            </div>
            <div class="btn cursor">
              <v-btn class="btn--icon" @click="changeMode('register')" width="120" height="120" outlined fab color="white">
                <v-icon size="100">fas fa-paw</v-icon>
              </v-btn>
              <h3 class="text-btn" @click="changeMode('register')">คลิก!</h3>
            </div>
          </span>
        </div>
        <div class="grid-item-2 flex-center">
          <v-card elevation="0" width="90%">
            <div v-if="mode=='login'" class="text-center pa-4" :class="animation == 2? 'opacity-1': 'opacity-0'">
              <h2>ลงชื่อเข้าใช้</h2>
              <v-text-field v-model="username" hide-details label="Username" placeholder="กรุณากรอก Username"></v-text-field>
              <v-text-field v-model="password" hide-details label="Password" placeholder="กรุณากรอก Password" type="password"></v-text-field>
              <v-btn @click="login" class="mt-16" color="primary" block dark elevation="0">ตกลง</v-btn>
            </div>
            <div v-else class="text-center pa-4" :class="animation == 2? 'opacity-1': 'opacity-0'">
              <h2>สมัครใช้งาน</h2>
              <v-text-field v-model="form.firstname" hide-details label="ชื่อ" placeholder="กรุณากรอก ชื่อ"></v-text-field>
              <v-text-field v-model="form.lastname" hide-details label="นามสกุล" placeholder="กรุณากรอก นามสกุล"></v-text-field>
              <v-text-field v-model="form.username" hide-details label="Username" placeholder="กรุณากรอก Username"></v-text-field>
              <v-text-field v-model="form.password" hide-details label="Password" placeholder="กรุณากรอก Password" type="password"></v-text-field>
              <!-- <v-text-field v-model="form.email" hide-details label="อีเมล์" placeholder="กรุณากรอก อีเมล์" type="email"></v-text-field>
              <v-text-field v-model="form.mobile" hide-details label="โทรศัพท์" placeholder="กรุณากรอก โทรศัพท์"></v-text-field> -->

              <v-btn @click="registerUser(form)" class="mt-16" color="primary" block elevation="0" :dark="!checkBtnRegister" :disabled="checkBtnRegister">สมัครใช้งาน</v-btn>
              <v-btn @click="changeMode('login')" class="mt-1" color="primary" block dark elevation="0" outlined>กลับ</v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </v-card>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'not-auth',
  data() {
    return {
      version: process.env.VERSION,
      username: 'Admin',
      password: '1234',
      mode: 'login',
      animation: 2,
      form: {}
    }
  },
  computed: {
    checkBtnRegister(){
      if (this.form.firstname&&this.form.lastname&&this.form.username&&this.form.password) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapActions({
      registerMember: 'service/registerMember'
    }),
    async login(e) {
      e.preventDefault();

      const payload = {
        username: this.username,
        password: this.password,
      };

      try {
        const res = await this.$auth.loginWith('local', {
          data: payload
        });
        if (res.data.status == false) {
          Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ถูกต้อง',
          })
          await this.$auth.logout()
          return
        }
        this.$router.push('/');
      } catch (e) {
        this.$router.push('/login');
      }
    },
    async registerUser(form){
      await this.registerMember(form).then((result) => {
        if (result.status) {
          Swal.fire({
            icon: 'success',
            title: 'สมัครเรียบร้อย',
            showConfirmButton: false,
            timer: 1500
          })
          this.changeMode('login')
        } else {
          Swal.fire({
            icon: 'error',
            title: result.message
          })
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    changeMode(text) {
      if (this.mode == text) return;
      this.animation = 1
      setTimeout(() => {
        this.animation = 2
        this.mode = text
        if (this.mode == 'login') this.clearForm();
        else this.clearLogin();
      }, 100);
    },
    clearForm() {
      this.form = {}
    },
    clearLogin() {
      this.username = null
      this.password = null
    },
  }
}
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  margin: 0;
  padding: 0;
  background-image: url('@/static/img/bg.jpg') !important;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: sans-serif;

  .box-login {
    height: 100vh;

    .grid {
      display: grid;
      grid-template-columns: 1.5fr 2fr;

      .grid-item-1 {
        border: 1px solid #fd0054;
        height: 500px;
        box-sizing: border-box;
        background-color: #FF4081;
        text-align: center;
        align-content: center;

        span {
          color: #ffffff;
        }

        .btn {
          position: relative;

          .btn--icon {
            &:hover {
              width: 122px !important;
              height: 122px !important;
            }
          }

          h3 {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            color: #FF4081;

            &:hover {
              font-size: 1.2em !important;
            }
          }
        }
      }

      .grid-item-2 {
        // grid-template-columns: 10px;
      }
    }
  }

  .opacity-0 {
    opacity: 0;
  }

  .opacity-1 {
    opacity: 1;
    -moz-transition: opacity 3s ease 0.3s;
    -webkit-transition: opacity 3s ease 0.3s;
    -o-transition: opacity 3s ease 0.3s;
    transition: opacity 3.5s ease 0.3s;
  }

}
</style>
