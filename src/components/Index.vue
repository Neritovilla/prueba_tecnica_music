<template>
    <div class="container-fluid">
      <header class="row align-items-center hearder_col">
        <div class="row">
          <div class="col">
            <button class="btn btn-menu" @click="toggleMenu">
              <span v-if="showMenu">&#x2630;</span>
              <span v-else>&#9776;</span>
            </button>
          </div>
          <div class="col">
            <h3>Sistema web Music</h3>
          </div>
          <div class="col col-profile">
            <button class="btn btn-menu" @click="goProfile">Perfil</button> 
            <button class="btn btn-menu" @click="closeSession">Salir</button>
          </div>
        </div>
      </header>
  
      <div class="offcanvas offcanvas-start lateral-menu" :class="{ 'show': showMenu }" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div class="offcanvas-header div-title-lm">
          <h5 class="offcanvas-title" id="staticBackdropLabel">Menu</h5>
          <button type="button" class="btn-close btn-close-lateral-menu" @click="toggleMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="mynav nav nav-pills flex-column mb-auto">
            <li class="nav-item mb-1"><router-link to="/Index"><i class="fa fa-indent font-icon-list"></i> Dashboard</router-link></li>
            <li class="nav-item mb-1"><router-link to="/AdmSong"><i class="fa fa-music font-icon-list" aria-hidden="true"></i> Canciones</router-link></li>
            <li class="nav-item mb-1"><router-link to="/AdmCategory"><i class="fa fa-folder-open font-icon-list" aria-hidden="true"></i> Categorías</router-link></li>
        </ul>
        </div>
      </div>
  

      <div class="row mt-3 button-row">
        <div class="col text-center">
            <button class="btn mx-2" @click="showSongs">
                <h5 class="card-title">
                    <i class="fa fa-music font-icon" aria-hidden="true"></i>
                    <label class="card-text">{{songsCount}}</label>
                </h5>
                <p class="card-text">Canciones</p>
            </button>
        </div>
        <div class="col text-center">
            <button class="btn mx-2" @click="showCategories">
                <h5 class="card-title">
                    <i class="fa fa-folder-open font-icon" aria-hidden="true"></i>
                    <label class="card-text">{{activeCategoriesCount}}</label>
                </h5>
                <p class="card-text">Categorías</p>
            </button>
        </div>
    </div>
  
      <div v-if="showSongsTable" class="element-category">
        <label class="title-label">Listado de Canciones</label>
        <table class="table table-song dark-table">
          <thead>
            <tr>              
              <th>Nombre</th>
              <th>Cantante</th>
              <th>Album</th>
              <th>Caategoría</th>
              <th>Año Lanzamiento</th>
              <th>Duración</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="song in songs" :key="song.id_song">
              <td>{{ song.title }}</td>
              <td>{{ song.composer }}</td>
              <td>{{ song.album }}</td>
              <td>{{ song.id_category }}</td>
              <td>{{ song.release_year }}</td>
              <td>{{ song.duration }}</td>
              <td><button class="btn" @click="playAudio(song.audio_file)"><i class="fa fa-solid fa-play"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-else-if="showCategoriesTable" class="element-category">
        <label class="title-label">Listado de Categorias</label>
        <table class="table table-category dark-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Número Canciones</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categorieswithSong" :key="category.id_category">
                    <td>{{ category.name }}</td>
                    <td>{{ category.song_count }}</td>
                    <td><button class="btn btn-gey" @click="showSongsModal(category.id_category, category.name)"><i class="fa fa-solid fa-eye"></i></button></td>
                </tr>
            </tbody>
        </table>
      </div>

    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    data() {
      return {
        activeCategoriesCount: 0,
        songsCount:0,
        showMenu: false,
        showSongsTable: false,
        showCategoriesTable: false,
        songs: [],
        categorieswithSong: [],
        relatedSongs:[],
      };
    },
  
    created() {
    this.count();
    },

    methods: {

        async count() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/count');
                const list = response.data;
                this.activeCategoriesCount = list.activeCategoriesCount;
                this.songsCount = list.songsCount;
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        },

      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
  
      async showSongs() {
        try {
                const response = await axios.get('http://127.0.0.1:8000/api/songs');
                this.songs = response.data;      
                this.showCategoriesTable = false;
                this.showSongsTable = true;               
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
      },
      async showCategories() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categoriesNumberSongs');
                this.categorieswithSong = response.data;              
                this.showCategoriesTable = true;
                this.showSongsTable = false;               
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        },

        showSongsModal(id_category, name) {            
            this.$router.push({ name: 'SongCategory', params: { id_category, name } });
        },
        playAudio(audioFile) {
          alert('reproduciendo: '  + audioFile);
          /*
          audioFile = '';
          const audio = new Audio();
          audio.src = audioFile;    
          audio.play();
          */
        },        
        goProfile(){
          this.$router.push({ name: 'Profile' });
        },
        closeSession(){
          document.isAuthenticated = false;
          this.$router.push({ name: 'Login' });
        }

    }
  };
  </script>
  
  <style scoped>

  .col-profile{
    text-align: right;
  }

  #staticBackdropLabel {
    color: #fff;
  }

  .hearder_col{
    background-color: #000000;
    color: #fff;
  }

  header {
    padding: 10px;
  }

  .div-title-lm{
    background-color: #383838;
  }

  .btn-close-lateral-menu{
    color: #fff;        
 }

  button {
    margin-top: 10px;
  }

  .btn-menu{
    color: #fff;
  }

  .lateral-menu{
    background-color: #0f0f0f;
  }

  .list-group-item {
    cursor: pointer;
  }
  
  .list-group-item:hover {
    background-color: #1a75d1;
  }
  
  .text-light {
    color: #fff !important;
  }

  .colum_menu{
    background-color: aqua;
    align-items: center;
  }

  
.mynav li a { 
    color: #fff; 
    text-decoration: none; 
    width: 100%; 
    display: block; 
    border-radius: 5px; 
    padding: 8px 5px; 
} 
  
.mynav li a.active { 
    background: rgba(255, 255, 255, 0.2); 
} 
  
.mynav li a:hover { 
    background: rgba(255, 255, 255, 0.2); 
} 
  
.mynav li a i { 
    width: 25px; 
    text-align: center; 
} 
  
.notification-badge { 
    background-color: rgba(255, 255, 255, 0.7); 
    float: right; 
    color: #222; 
    font-size: 14px; 
    padding: 0px 8px; 
    border-radius: 2px; 
}

.button-row {
    padding: 20px;
    width: 80%;
    margin-left: 10%;
    border-radius: 1.5%;
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.2);
}

.element-category {
    width: 90%;
    margin: 2% auto;
    padding: 10px;
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.2);
  }

  .table-category {
    width: 40%;
    margin-left: 30%;
    padding: 10px; 
    margin-top: 2%;
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.2);
  } 

  .table-song {
    padding: 10px; 
    margin-top: 5%;
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.2);
  } 


  .font-icon{
    font-size: 600%;
  }

  .title-label{
    font-size: 20px;
    font-weight: bold;
    text-shadow: 20px 15px 7px rgba(0, 0, 0, 0.2);
  }

  .card-text{
    font-size: 150%;
    font-weight: bold;
    text-shadow: 20px 15px 7px rgba(0, 0, 0, 0.2);
  }

  .dark-table {
    background-color: #343a40;
    color: #353535;
    text-align: center;
    }
    .dark-table th{
        color: #fff;
    }
    .dark-table th,
    .dark-table td {
        border-color: #00000054; 
    }

    .dark-table th {
        background-color: #3f3f3f;
    }

    .dark-table tbody tr:nth-of-type(odd) {
        background-color: #454d55;
    }

    .dark-table tbody tr:hover {
        background-color: #5a6268;
    }


  </style>
  