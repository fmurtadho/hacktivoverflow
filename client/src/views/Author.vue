<template>
    <div class="container">
        <div class="text-center">
            <h3>Author Profile</h3>
        </div>
        <br>
        <div class="row">
            <div class="col-md-6 img">
                <img v-bind:src="profile_avatar"
                    alt="" class="img-rounded" style="max-width:100px;">
                <br>
                <br>
            </div>
            <div class="col-md-6 details">
                <blockquote>
                    <h5>{{profile_name}}</h5>
                    <small><cite title="Source Title">{{profile_email}} <i class="icon-map-marker"></i></cite></small>
                </blockquote>
                <p>
                    age :<br>
                    {{profile_age}} <br>
                    bio :<br>
                    <textarea type="text" v-model="profile_bio" readonly="readonly"></textarea> <br>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'

export default {
  name: 'authorprofile',
  props: ['islogin'],
  data () {
    return {
      profile_name: '',
      profile_email: '',
      profile_age: '',
      profile_bio: '',
      profile_avatar: ''
    }
  },
  methods: {
    getProfile (id) {
      let self = this

      axios({
        method: 'GET',
        url: `${config.port}/users/${id}`
      })
        .then((response) => {
          self.profile_name = response.data.name
          self.profile_email = response.data.email
          self.profile_age = response.data.age
          self.profile_bio = response.data.bio
          self.profile_avatar = response.data.avatar
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    console.log('sudah masuk ke author menu tapi gak muncul')
  },
  mounted () {
    this.getProfile(this.$route.params.authorId)
  }
}
</script>

<style scoped>
.container{
    padding:5%;
}
.container .img{
    text-align:center;
}
.container .details{
    border-left:3px solid #ded4da;
}
.container .details p{
    font-size:15px;
    font-weight:bold;
}
</style>
