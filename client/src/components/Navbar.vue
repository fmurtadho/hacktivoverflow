<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">PET OVERFLOW</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                <router-link to="/" class="nav-link" href="#">Home
                    <span class="sr-only">(current)</span>
                </router-link>
                </li>
                <li class="nav-item">
                <router-link :to="`/about`" class="nav-link" href="#">About</router-link>
                </li>
                <div class="dropdown">
                <a class="btn nav-link dropdown-toggle" href="#" v-if="islogin === true" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User Menu
                </a>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <router-link :to="`/myprofile`" class="dropdown-item" href="">My Profile</router-link>
                    <router-link :to="`/myquestion`" class="dropdown-item" href="">My Question</router-link>
                    <router-link :to="`/create`" class="dropdown-item" href="">Post Question</router-link>
                </div>
                </div>
                <li class="nav-item" v-if="islogin === false" data-toggle="modal" data-target="#exampleModalCenter">
                    <a class="nav-link" href="#">Login</a>
                </li>
                <li class="nav-item" v-if="islogin === false" data-toggle="modal" data-target="#registerModal">
                    <a class="nav-link" href="#">Register</a>
                </li>
                <li class="nav-item" v-if="islogin === true">
                    <a class="nav-link" @click="signout()" >Logout</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>

        <div class="alert alert-success" v-if="success === true" role="alert">
            Registration Success! You can now login with your email and password
        </div>
        <div class="alert alert-danger" v-if="failed === true" role="alert">
            Registration Failed :(
        </div>
        <div class="alert alert-danger" v-if="login_failed === true" role="alert">
            Login Failed :( ... please recheck your email and password
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Email<br>
                    <input type="text" v-model="login_email"><br>
                    Password<br>
                    <input type="password" v-model="login_password">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="signin()">Login</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Name<br>
                    <input type="text" v-model="register_name"><br>
                    <p v-if="register_name_failed === true">*name minimum length is 4</p>
                    Email<br>
                    <input type="email" v-model="register_email"><br>
                    <p v-if="register_email_failed === true">*email is required</p>
                    Password<br>
                    <input type="password" v-model="register_password">
                    <p v-if="register_password_failed === true">*password minimum length is 4</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="register()">Register</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'Navbar',
  data () {
    return {
      islogin: false,
      isadmin: false,
      login_email: '',
      login_password: '',

      triggerchange: '',

      register_name: '',
      register_email: '',
      register_password: '',

      register_name_failed : false,
      register_email_failed : false,
      register_password_failed : false,
      
      success : false,
      failed : false,

      login_failed : false,
    }
  },
  mounted () {
    this.checkToken()
  },
  methods: {
    checkToken () {
      let token = localStorage.getItem('token')
      if (token) {
        this.islogin = true
      }

      let admin = localStorage.getItem('admin')
      if (admin === true) {
        this.isadmin = true
      }
    },
    register () {
      let self = this

      let data = {
        name: this.register_name,
        email: this.register_email,
        password: this.register_password
      }

      axios({
        url: `${config.port}/users/signup`,
        method: 'POST',
        data
      })
      .then((response) => {
        self.success = true
        // console.log(response.data)
      })
      .catch((err) => {
        self.failed = true
        console.log(err)
      })
    
    },
    signin () {
      this.success = false
      this.failed = false
      this.login_failed = false

      let email = this.login_email
      let password = this.login_password

      let data = {
        email,
        password
      }

      let self = this

      axios({
        method: 'POST',
        url: `${config.port}/users/signin`,
        data
      })
        .then((response) => {
          self.login_failed = false

          self.login_email = ''
          self.login_password = ''

        //   console.log(response.data.name)

          localStorage.setItem('token', response.data.token)
          localStorage.setItem('admin', response.data.isAdmin)
          localStorage.setItem('currentuser', response.data.userId)
          localStorage.setItem('name', response.data.name)

          if (response.data.isAdmin === true) {
            self.isadmin = true
          }
          self.islogin = true

          this.$store.commit('mutStoreIsLogin',true)
          console.log('is login di dalam store',this.$store.state.storeislogin)
          self.$emit('islogin-data', self.islogin)
          self.$emit('isadmin-data', self.isadmin)
          // console.log(this.isadmin)
        })
        .catch((err) => {
          self.login_failed = true
          console.log(err)
        })
    },
    signout () {
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      localStorage.removeItem('currentuser')
      localStorage.removeItem('name')
      this.islogin = false
      this.isadmin = false
      this.$emit('trigger-change', this.triggerchange)
      this.$emit('islogin-data', this.islogin)
      this.$emit('isadmin-data', this.isadmin)

      this.$store.commit('mutStoreIsLogin',false)
    }
  }
}
</script>

<style>
li { cursor: pointer; }
</style>
