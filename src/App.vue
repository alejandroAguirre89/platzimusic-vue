<template lang="pug">
  // <div id="app">
    <img src="./assets/logo.png">
    <h1>{ { msg } }</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  //</div> 
  #app
    img(src='./assets/logo.png')
    h1 {{ msg }}
    h2(class='rojo') {{ message}}
    h2 Essential Links
    ul
      li
        a(href='https://vuejs.org', target='_blank') Core Docs
      li
        a(href='https://forum.vuejs.org', target='_blank') Forum
      li
        a(href='https://chat.vuejs.org', target='_blank') Community Chat
      li
        a(href='https://twitter.com/vuejs', target='_blank') Twitter
    h2 Ecosystem
    ul
      li
        a(href='http://router.vuejs.org/', target='_blank') vue-router
      li
        a(href='http://vuex.vuejs.org/', target='_blank') vuex
      li
        a(href='http://vue-loader.vuejs.org/', target='_blank') vue-loader
      li
        a(href='https://github.com/vuejs/awesome-vue', target='_blank') awesome-vue
    br
    select(v-model="countrySelected" @change="mostrarPaisSeleccionado")
      option(v-for="country in countries" v.bind:value="country.value") {{country.name}}
    br
    loader(v-show="mostrarLoader")
    br
    h2 Lista de artistas
    ul
      artist(v-for="artist in artists" v-bind:artist="artist" v-bind:key="artist.mbid") 
      //li(v-for="artist in artists") {{artist.name}}
</template>

<script>
import Artist from './components/Artist.vue'
import Loader from './components/Loader.vue'
import getArtist from './api/index'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: 'Mensaje de prueba',
      artists: [
        // { name: 'Bruno Mars'},
        // { name: 'Red Hot Chili Peppers'},
        // { name: 'Linkin Park'},
        // { name: 'The Rasmus'},
        // { name: 'Rihana'},
        // { name: 'Skillet'},
      ],
      countries: [
        { value: 'Argentina', name: 'argentina'},
        { value: 'Colombia',  name: 'colombia'},
        { value: 'España',    name: 'spain'},
      ],
      countrySelected: 'colombia',
      mostrarLoader: false
    }
  },
  components: {
    //Artistas: Artist
    Artist,
    Loader
  },
  mounted: function () {
    this.obtenerTopArtistas()
  },
  watch: {
    countrySelected() 
    {
      this.obtenerTopArtistas(this.countrySelected)
    }
  },
  methods: {
    mostrarPaisSeleccionado()
    {
      console.log(this.countrySelected);
    },
    obtenerTopArtistas()
    {
      const self = this
      self.mostrarLoader = true
      this.artists = []
      
      getArtist(this.countrySelected)
      .then(function (artists) {
        /* aqui se debe hacer referencia a los atributos de vue usando self que
        contiene el objeto this de vue en vez del this que hace referencia al dom de la pagina*/
        self.artists = artists ,
        self.mostrarLoader = false
      })
    }
  }

}
</script>

<style lang="stylus">

// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }

// h1, h2 {
//   font-weight: normal;
// }

// ul {
//   list-style-type: none;
//   padding: 0;
// }

// li {
//   display: inline-block;
//   margin: 0 10px;
// }

// a {
//   color: #42b983;
// }

.rojo
  color red

#app 
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
	margin-top 60px
h1, h2 
	font-weight normal
ul 
	list-style-type none
	padding 0
li 
	display inline-block
	margin 0 10px
a 
	color #42b983
</style>
