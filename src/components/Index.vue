<template>
  <div class="index container">
    <div class="card" v-for="(shake, index) in shakes" :key="index">
      <div class="card-content">
        <i class="material-icons delete" @click="delete_shake(shake.id)">delete</i>
        <h2 class="indigo-text">{{ shake.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in shake.ingredients" :key="index">
            <span class="chip"> {{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name : 'EditShake', params: {shake_slug: shake.slug} }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      shakes: []
    }
  },
  methods: {
    delete_shake(shake_id){
      db.collection('Shakes').doc(shake_id).delete()
      .then(() => {
        this.shakes = this.shakes.filter(shake => {
          return shake.id != shake_id
        })
      })
    }
  },
  created(){
    
    db.collection('Shakes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let shake = doc.data();
        shake.id = doc.id;
        this.shakes.push(shake);
      });
    })
    .catch(err => {
      console.log(err);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }

  .index h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }

  .index .ingredients{
    margin: 30px auto;
  }
  .index .ingredients li{
    display: inline-block;
  }
  .index .delete{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
</style>
