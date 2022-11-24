<template>
<div>
  <div class="row-horizon container">
  <b-card-group class="display: inline-block!important">
    <div
      v-for="actor in actors"
      :key="actor.id"
      :actor="actor"
      >
      <img
      :src="`https://image.tmdb.org/t/p/original/${ actor.profile_path }`"     
      v-if="actor.adult==false"
      width="80px"
      @click="getActorDetail(actor.id)"
      class="actor_img"
      >
    </div>
  </b-card-group>
  </div>

</div>
</template>

<script>

export default {
  name: 'ActorList',
  props: {
    actors: Array,
  },
  components: {
  },
  methods: {
    getActorDetail(actor_id) {
      console.log('배우 클릭')
      this.$router.push({name: 'actor', params: {actor_id}})
    }
  }
}
</script>

<style>
.row-horizon {
  padding: 0 50px;
}
.actor_img{
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 60px;
  margin: 15px;
}
</style>