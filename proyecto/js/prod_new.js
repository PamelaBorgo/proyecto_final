const { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        url:'http://127.0.0.1:5000/productos', 
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        objeto:"",
        modelo:"", 
        imagen:"",
        stock:0,
        precio:0,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(producto) {
            const url = this.url+'/' + producto;
            var options = {
                method: 'DELETE',
            }
                
            fetch(url, options)
            .then(function () {
                confirm("El producto será eliminado. ¿Está seguro de que desea continuar?")
                    alert("Producto eliminado")
                    window.location.href = "../index.html"; 
                })
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar(){
            let producto = {
                objeto:this.objeto,
                modelo:this.modelo,
                precio: this.precio,
                stock: this.stock,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Su registro se ha realizado con éxito. Haga click en 'Aceptar' para volver a la página principal.")
                    window.location.href = "../index.html";  
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al guardar el registro. Intente nuevamente.")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')