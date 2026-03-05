<template>
  <v-container>

    <v-card>
      <v-card-title>
        Lista de Productos
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="abrirDialogo">
          Nuevo Producto
        </v-btn>
      </v-card-title>

      <v-table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>% Impuesto</th>
            <th>Precio Final</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.id }}</td>
            <td>{{ producto.codigo }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.impuesto }}</td>
            <td>{{ producto.precio_final }}</td>
            <td>
              <v-btn size="small" color="blue" @click="editar(producto)">
                Editar
              </v-btn>

              <v-btn size="small" color="red" @click="eliminar(producto.id)">
                Eliminar
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- MODAL -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ editando ? "Editar Producto" : "Nuevo Producto" }}
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="form.codigo" label="Código"></v-text-field>
          <v-text-field v-model="form.nombre" label="Nombre"></v-text-field>
          <v-text-field v-model="form.precio" label="Precio" type="number"></v-text-field>
          <v-text-field v-model="form.impuesto" label="% Impuesto" type="number"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardar">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import productoService from "@/services/productoService";

export default {

  data() {
    return {
      productos: [],
      dialog: false,
      editando: false,
      form: {
        id: null,
        codigo: "",
        nombre: "",
        precio: 0,
        impuesto: 0
      }
    };
  },

  mounted() {
    this.obtenerProductos();
  },

  methods: {

    obtenerProductos() {
      productoService.getProductos()
        .then(res => {
          this.productos = res.data;
        });
    },

    abrirDialogo() {
      this.editando = false;
      this.form = {
        id: null,
        codigo: "",
        nombre: "",
        precio: 0,
        impuesto: 0
      };
      this.dialog = true;
    },

    editar(producto) {
      this.editando = true;
      this.form = { ...producto };
      this.dialog = true;
    },

    guardar() {
      if (this.editando) {
        productoService.actualizarProducto(this.form.id, this.form)
          .then(() => {
            this.obtenerProductos();
            this.dialog = false;
          });
      } else {
        productoService.crearProducto(this.form)
          .then(() => {
            this.obtenerProductos();
            this.dialog = false;
          });
      }
    },

    eliminar(id) {
      productoService.eliminarProducto(id)
        .then(() => {
          this.obtenerProductos();
        });
    }

  }

};
</script>
