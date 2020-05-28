<template>
    <div class="add-shake container">
        <h2 class="center-align indigo-text">Add New Shake Recipe</h2>
        <form @submit.prevent="AddShake">
            <div class="field title">
                <label for="title">Shake Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredients</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i> 
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" name="add-ingredient" v-model="another">
                <i class="material-icons add" @click="addIng">add</i> 
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink"> Add Shake</button>
            </div>
        </form>
    </div>
</template>


<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddShake',
    data() {
        return {
            title: '',
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods:{
        AddShake(){
            if(this.title){
                this.feedback = null;
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"\-:@]/g,
                    lower: true
                });
                db.collection('Shakes').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
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
                this.ingredients.push(this.another);
                this.another = null;
                this.feedback = null;
                console.log(this.ingredients)
            }
            else{
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style>

.add-shake{
    margin-top:60px;
    padding: 20px;
    max-width: 500px;
}

.add-shake h2{
    font-size: 2em;
    margin: 20px auto;
}

.add-shake .field{
    margin: 20px auto;
    position: relative;
}

.add-shake .delete{
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
}

.add-shake .add{
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
}

</style>