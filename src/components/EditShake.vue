<template>
    <div v-if="shake" class="edit-shake container">
        <h2>Edit {{ this.$route.params.shake_slug }} </h2>
        <form @submit.prevent="EditShake">
            <div class="field title">
                <label for="title">Shake Title</label>
                <input type="text" name="title" v-model="shake.title">
            </div>
            <div v-for="(ing, index) in shake.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredients</label>
                <input type="text" name="ingredient" v-model="shake.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i> 
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" name="add-ingredient" v-model="another">
                <i class="material-icons add" @click="addIng">add</i> 
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink"> Update Shake</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditShake',
    data() {
        return {
            shake: null,
            another: null,
            feedback: null
        }
    },
    methods: {
         EditShake(){
             if(this.shake.title){
                this.feedback = null;
                this.shake.slug = slugify(this.shake.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"\-:@]/g,
                    lower: true
                });
                db.collection('Shakes').doc(this.shake.id).update({
                    title: this.shake.title,
                    ingredients: this.shake.ingredients,
                    slug: this.shake.slug
                }).then(() => {
                    this.$router.push( {name: 'Index'} )
                }).catch((err) => {
                    console.log(err);
                })
            } else{
                this.feedback = 'You must enter a shake title!'
            }
         },
         addIng(){
            if(this.another){
                this.shake.ingredients.push(this.another);
                this.another = null;
                this.feedback = null;
            }
            else{
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIng(ing){
            this.shake.ingredients = this.shake.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('Shakes').where('slug', '==', this.$route.params.shake_slug);
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.shake = doc.data();
                this.shake.id = doc.id;
            })
        })
    }
}
</script>

<style scoped>
.edit-shake{
    margin-top:60px;
    padding: 20px;
    max-width: 500px;
}

.edit-shake h2{
    font-size: 2em;
    margin: 20px auto;
}

.edit-shake .field{
    margin: 20px auto;
    position: relative;
}

.edit-shake .delete{
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
}

.edit-shake .add{
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
}
</style>