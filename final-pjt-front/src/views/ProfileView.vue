<template>
  <div class="wrap_myPage">
    <div class="myPage">
      <h1>{{user.nickname}}님의 페이지</h1>
      <form @submit.prevent="changeProfile">
        <div>
          <label for="email">이메일</label>
          <input id="email" class="inputgroup" type="text" disabled="true" v-model="user.email">
        </div>
        <div>
          <label for="nickname">닉네임</label>
          <input id="nickname" class="inputgroup" type="text" disabled="true" v-model="user.nickname" >
        </div>
        <div v-if="change_profile" style="margin-bottom: 30px;">
          <label for="profile_image">프로필 사진</label>
          <input class="inputgroup" type="file" id="profile_image" multiple @change="ImgChange" ref="serveyImage">
        </div>
        <input v-if="change_profile" type="submit" value="수정 완료">
        <button v-if="change_profile" >취소</button>
        <button v-else @click="ProfileInputToggle" style="margin-top: 30px;">회원정보 수정</button>
      </form>

      <button v-if="!change_password" @click="PasswordInputToggle" style="margin-top: 5px;">비밀번호 변경</button>
      <form v-if='change_password' @submit.prevent="changePassword" style="margin-top: 20px;">
        <h5>새로운 비밀번호 입력</h5>
        <input id="pw_input1" class="inputgroup" type="password" v-model="new_password1">
        <input id="pw_input2" class="inputgroup" type="password" v-model="new_password2">
        <input type="submit" value="비밀번호 변경 제출">
        <button @click="PasswordInputToggle">취소</button>
      </form>
      <section>
        <h5 style="margin: 30px 0;">내가 쓴 리뷰</h5>
        <div
        v-for="(review, idx) in userReview"
        :key="`review_${idx}`"
        :review="review"
        >
          <ProfileReview
            v-if="review.user == user.email"
            :key="review.id"
            :review="review"
            @delete-review="deleteReview"
            />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProfileReview from '@/components/ProfileReview.vue'

export default {
  name: 'ProfileView',
  components: {
    ProfileReview
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    userReview() {
      return this.$store.state.review
    },
  },
  created() {
    this.getUser()
    this.getReview()
  },
  // watch: {
  //   userReview() {
  //     this.getReview()
  //   }
  // },
  data() {
    return {
      user: {
        email: null,
        nickname: null,
        profile_image: null,
      },
      new_password1: null,
      new_password2: null,
      API_URL: this.$store.state.API_URL,
      change_profile: false,
      change_password: false,
    }
  },
  methods: {
    deleteReview(review_id) {
        const itemToFind = this.userReview.find(function(item) {return item.id === review_id})
        const idx = this.userReview.indexOf(itemToFind)
        if (idx > -1) this.userReview.splice(idx, 1)
    },
    getReview() {
      if (this.isLogin) {
        this.$store.dispatch('getReview')
      } else {
        alert('로그인이 필요한 서비스입니다')
        this.$router.push({ name: 'login' })
      }
    },
    getUser() {
      axios({
        method: 'get',
        url: `${this.API_URL}/accounts/user/`,
        headers: {
          'Authorization': `Token ${this.$store.state.token}`
        },
      })
      .then((res) => {
        console.log(res)
        this.email = res.data.email
        this.user = res.data
        console.log(res.data)
        console.log('회원정보')
      })
      .catch((error) => {
        console.log('회원정보 실패')
        console.log(error)
      })
    },
    ProfileInputToggle() {
      const input1 = document.querySelector('#nickname')
      input1.classList.toggle('active')
      input1.disabled = false
      if (this.change_profile) {
        this.change_profile = false
      } else {
        this.change_profile = true
      }
    },
    PasswordInputToggle() {
      if (this.change_password) {
        this.change_password = false
      } else {
        this.change_password = true
      }
    },
    ImgChange(event) {
      console.log(event)
      this.user.profile_image = event.target.files[0];
    },
    changeProfile() {
      console.log(`Token ${this.$store.state.token}`)
      console.log(this.user.profile_image)
      axios({
        method: 'put',
        url: `${this.API_URL}/accounts/user/`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${this.$store.state.token}`,
        },
        data: {
          'nickname': this.user.nickname,
          'profile_image': this.user.profile_image,
        },
      })
      .then((res) => {
        console.log(res)
        this.ProfileInputToggle()
      })
      .catch((error) => {
        console.log(error)
      })
    },
    changePassword() {
      axios({
        method: 'post',
        url: `${this.API_URL}/accounts/password/change/`,
        headers: {
          'Authorization': `Token ${this.$store.state.token}`
        },
        data: {
          'new_password1': this.new_password1,
          'new_password2': this.new_password2,
        }
      })
      .then((res) => {
        console.log(res)
        this.PasswordInputToggle()
      })
      .catch((error) => {
        console.log(error)
      })
    }

  }

}
</script>

<style>
.wrap_myPage {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.myPage {
  padding: 30px;
  color: rgb(53, 53, 53);
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: rgb(244 245 243);
  border: 1px solid rgb(202, 202, 202);
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(137, 255, 68, 0.3),
              0 0 15px rgba(137, 255, 68, 0.3),
              0 0 30px rgba(137, 255, 68, 0.3),
              0 0 100px rgba(137, 255, 68, 0.3);
}

.myPage form {
  width: 100%;
  text-align: left;
}

.myPage form label {
  width: 100%;
  margin: 15px 0 3px 0;
}

.myPage input, .myPage button {
  width: 100%;
  height: 40px;
  padding: 5px;
  color: inherit;
  background: white;
  border: 1px solid rgb(214, 214, 214);
  box-sizing: border-box;
}

/* .myPage .active {
  border: 2px solid black;
  background: rgb(240, 248, 255);
  color: black;
} */

/* ------------------------ */

</style>