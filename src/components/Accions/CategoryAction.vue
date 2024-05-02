<template>
    <div class="container container-forms">

        <div v-if="edit">
            <h2>Detalles de la Categoría</h2>
            <form>
              <div class="form-group">
                <label for="name">ID: {{ id_category }}</label>
              </div>
              <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" class="form-control" id="name" v-model="name" maxlength="15">
              </div>
              <div class="form-group">
                <label for="status">Estado: {{ status }}</label>
              </div>
              <button @click.prevent="updateCategory(name, id_category)" class="btn btn-primary">Actualizar</button>
              <button @click.prevent="cancelAction" class="btn btn-danger">Cancelar</button>
            </form>
          </div>
  
      <!-- Otros formularios para activar y desactivar -->
      <div v-if="active">
        <h2>Confirmación de Activación</h2>
        <p>¿Está seguro que desea activar la categoría {{ category.name }}?</p>
        <button @click.prevent="StatusCategory(id_category, 1)" class="btn btn-success">Aceptar</button>
        <button @click.prevent="cancelAction" class="btn btn-secondary">Cancelar</button>
      </div>
  
      <div v-if="desactivate">
        <h2>Confirmación de Desactivación</h2>
        <p>¿Está seguro que desea desactivar la categoría {{ category.name }}?</p>
        <button @click.prevent="StatusCategory(id_category, 0)" class="btn btn-warning">Aceptar</button>
        <button @click.prevent="cancelAction" class="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        accion: null,
        edit: false,
        active: false,
        desactivate: false,
        id_category:0,
        status:0,
        name:'',
        category:[]
      };
    },
    created() {

        this.id_category = this.$route.params.id_category;
        this.accion = this.$route.params.accion;

        switch (this.accion){
            case  'e':{                             
                this.getCategoryDetails(this.id_category);    
                this.edit = true;                            
            break
            }
            case  'd':{
                this.desactivate = true;
            break
            }
            case  'a':{
                this.active = true;
            break
            }
        }
    },
    methods: {              
        async getCategoryDetails(id_category) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/getCategoryId', {
                "id_category": id_category
                });
                const values = response.data[0];
                this.id_category = values.id_category;
                this.name = values.name;
                this.status = values.status;
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        },
     
      updateCategory(name, id_category) {

        axios.put('http://127.0.0.1:8000/api/updateCategory',{
            "id_category": id_category,
            "name" : name
            })
            .then(response => {
                alert(response.data.message);
                this.$router.push({ name: 'AdmCategory'});  
            })
            .catch(error => {
                console.error(error.response.data.error); 
            });
      }, 
      StatusCategory(id_category, status){
        axios.put('http://127.0.0.1:8000/api/updateCategoryStatus',{
            "id_category": id_category,
            "status": status
            })
            .then(response => {
                alert(response.data.message);
                this.$router.push({ name: 'AdmCategory'});  
            })
            .catch(error => {
                console.error(error.response.data.error); 
            });
      },

      cancelAction() {
        this.$router.push({ name: 'AdmCategory'});
      }
    }
  };
  </script>
  
  <style>
  
  .container-forms{
    margin-top: 10%;
  }

  .form-group {
    margin-bottom: 20px;
  }
  
  input[type="text"] {
    width: 80%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    margin-right: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: #fff;
  }
  
  .btn-danger {
    background-color: #dc3545;
    color: #fff;
  }
  
  .btn-success {
    background-color: #28a745;
    color: #fff;
  }
  
  .btn-warning {
    background-color: #ffc107;
    color: #000;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: #fff;
  }
  
  /* Estilos para los formularios de confirmación */
  .confirmation-form {
    margin-top: 20px;
  }
  
  .confirmation-form p {
    margin-bottom: 20px;
  }
  </style>
  
  