<template>
    <div class="navbar">
        <nav class="nav-extended indigo darken-2">
            <div class="nav-content">
                <router-link :to="{name: 'Index'}">
                    <span class="nav-title">Protein Shakes</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{name: 'AddShake'}">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
    .nav-title{
        margin-left: 3%;
    }
</style>