<template>
  <div class='review_list'>
    <p style="font-size:30px; text-align: center; margin-bottom: 20px;">Reviews</p>
    <div class="wrap_review_item">
      <div class="review_item row"
      v-for="(review, idx) in review_list"
      :key="`review_${idx}`"
      :review="review"
      >
        <div class="col-10" style="display: flex; flex-direction: row; align-items: flex-start">
          <b-form-rating id="rating rating-no-border-inline"  variant="warning" inline no-border value="value" v-model="review.rating"></b-form-rating>
          <div class="ps-3">
            <p class="review_info">{{ review.user }} <span class="review_info_created">{{ review.created_at }}</span></p>
            <p>{{ review.content }}</p>
          </div>
        </div>
        <div class="col-2" style="text-align: right;">
          <a class="review_delbtn" v-if="review.user==user.email" @click="deleteReview(review.id)">삭제</a>
        </div>
      </div>
    </div>
    <form @submit.prevent="createComment" method="POST">
      <div class="textarea">
        <div>
          <label for="rating rating-no-border"></label>
          <b-form-rating id="rating rating-no-border"  variant="warning" no-border value="value" v-model="rating"></b-form-rating>
        </div>
        <input class="textarea_input" placeholder="Fixed height textarea" v-model="content" no-resize>
        <input class="textarea_submit" type="submit" value="입력">
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReviewList',
  components: {
  },
  data() {
    return {
      content: null,
      rating: null,
      user: {
        email: null,
      },
      API_URL: this.$store.state.API_URL
    }
  },
  created() {
    this.getUser()
  },
  props: {
    reviews: Array,
    movie_id: Number,
  },
  computed: {
    review_list() {
      return this.reviews
    },
  },
  methods: {
    createComment() {
      axios({
        method: 'POST',
        url: `${this.API_URL}/api/v1/movies/${this.movie_id}/comment_create/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
        data: {
          content: this.content,
          rating: this.rating,
        }
      })
      .then((res) => {
        const review = res.data
        this.review_list.push(review)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    deleteReview(review_id) {
      if (confirm("댓글을 삭제하시겠습니까?") === true) {
        axios({
          method: 'delete',
          url: `${this.API_URL}/api/v1/movies/comments/${review_id}/`,
          headers: {
            'Authorization': `Token ${this.$store.state.token}`
          },
        })
        .then((res) => {
          console.log(res)
          const itemToFind = this.review_list.find(function(item) {return item.id === review_id})
          const idx = this.review_list.indexOf(itemToFind)
          if (idx > -1) this.review_list.splice(idx, 1)
        })
        .catch((error) => {
          console.log(error)
        })
      } 
    },
    getUser() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/user/`,
        headers: {
          'Authorization': `Token ${this.$store.state.token}`
        },
      })
      .then((res) => {
        console.log(res)
        this.user = res.data
        console.log(res.data)
        console.log('회원정보')
      })
      .catch((error) => {
        console.log('회원정보 실패')
        console.log(error)
      })
    },
    
  }
}
</script>

<style>
/*
=====
DEPENDENCES
=====
*/

.screen-reader{
  width: var(--screenReaderWidth, 1px) !important;
  height: var(--screenReaderHeight, 1px) !important;
  padding: var(--screenReaderPadding, 0) !important;
  border: var(--screenReaderBorder, none) !important;

  position: var(--screenReaderPosition, absolute) !important;
  clip: var(--screenReaderClip, rect(1px, 1px, 1px, 1px)) !important;
  overflow: var(--screenReaderOverflow, hidden) !important;
}

/*
=====
CORE STYLES
=====
*/


/*
=====
DEMO
=====
*/

/* body{
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Open Sans, Ubuntu, Fira Sans, Helvetica Neue, sans-serif;
  font-size: 1rem;
  margin: 0;
} */

.rating, .form-control {
  background: transparent !important;
}

.review_list {
  text-align: left;
}

.review_list .wrap_review_item {
  padding: 0 30px 0 0;
}
.review_list .review_item {
  padding: 10px 0;
  font-weight: 300;
  border-bottom: 1px solid rgb(16 16 16);
  color: rgb(173, 173, 173);
}
.review_info {
  font-size: 14px;
  margin-bottom: 10px;
}
.review_info_created {
  padding-left: 10px;
  color: rgb(105, 105, 105);
}
.review_delbtn {
  color: rgb(105, 105, 105);
  cursor: pointer;
}
.review_delbtn:hover {
  color: white;
}

.textarea {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid rgb(63, 63, 63);
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}

.textarea_input {
  background: transparent;
  color: white;
  padding: 0 60px 0 20px;
  width: 100%;
  border: none;
}
.textarea_submit {
  background: rgb(0, 0, 0);
  border: 1px solid rgb(63, 63, 63);
  color: rgb(163, 163, 163);;
  font-weight: 600;
  padding: 0 30px;
  height: 50px;
  margin: 10px;
  transition: 0.1s;
}

.textarea_submit:hover {
  background: white;
  border: 1px solid white;
  color: black;
}

.page{
  min-height: 100vh;
  display: flex;
}

.page__demo{
  margin: auto;  
}

.page__group{
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.page__hint{
  display: block;
  font-weight: 700;
  margin-top: 1rem;
}

@media (min-width: 641px){
  .page__demo{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .page__group{
    margin-left: 3.5rem;
    margin-right: 3.5rem;
  }
}

</style>