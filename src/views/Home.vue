<template>
  <div class="home">
    <div class="container my-5">
      <h3>{{ titleState }}</h3>
      <input
        type="text"
        class="form-control my-3"
        v-model="$store.state.nuevaTareaState"
        v-on:keyup.enter="agregarMutations"
      />
      <button
        type="button"
        class="btn btn-primary"
        v-on:click="agregarMutations"
      >
        Primary
      </button>
      <div
        class="alert alert-primary my-3 d-flex justify-content-between"
        role="alert"
        v-bind:class="{
          'alert-success': item.state,
          'alert-danger': !item.state,
        }"
        v-for="(item, index) of tareasState"
        :key="index"
      >
        <div>{{ item.name }} - {{ item.state }}</div>
        <div>
          <button
            type="button"
            class="btn btn-danger btn-sm mx-1"
            v-on:click="eliminarMutations(index)"
          >
            X
          </button>
          <button
            type="button"
            class="btn btn-success btn-sm mx-1"
            v-on:click="editarMutations(index)"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      title: "test",
      tareas: [],
      nuevaTarea: "",
    };
  },
  computed: {
    ...mapState(["titleState", "tareasState", "nuevaTareaState"]),
  },
  methods: {
    agregar() {
      this.tareas.push({
        name: this.nuevaTarea,
        state: true,
      });
      this.nuevaTarea = "";
      localStorage.setItem("data", JSON.stringify(this.tareas));
    },
    editar(index) {
      this.tareas[index].state = !this.tareas[index].state;
      localStorage.setItem("data", JSON.stringify(this.tareas));
    },
    eliminar(index) {
      this.tareas.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(this.tareas));
    },
    ...mapMutations([
      "agregarMutations",
      "editarMutations",
      "eliminarMutations",
    ]),
    ...mapActions(["getData"]),
  },
  created() {
    let datos = JSON.parse(localStorage.getItem("data"));
    this.tareas = datos || [];
    this.$store.dispatch('getData');
  },
};
</script>
