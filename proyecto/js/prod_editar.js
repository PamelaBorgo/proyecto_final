console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substring(4)
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        objeto:"",
        modelo:"",
        imagen:"",
        stock:0,
        precio:0,
        url:'http://127.0.0.1:5000/productos/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.objeto=data.objeto;
                    this.modelo=data.modelo;
                    this.imagen=data.imagen
                    this.stock=data.stock
                    this.precio=data.precio                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                objeto:this.objeto,
                modelo:this.modelo,
                precio: this.precio,
                stock: this.stock,
                imagen:this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href="../index.html";             
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')