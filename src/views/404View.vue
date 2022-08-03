<template>
<h1>404 Cette page n'existe pas.</h1>
<a @click="goback" class="btn btn-outline-primary"> « Retour</a>

</template>

<script>
// @ is an alias to /src

export default {
  name: '404View',
  components: {
   },
  data(){
    return{

      }
  },
  created(){

  },
  mounted(){
    
  },
  computed:{
  },
  watch: {
  // whenever searchinput changes, this function will run

  },  
  methods:{
    goback(){
      return this.$router.go(-1)
    },
  } 
}
</script>
