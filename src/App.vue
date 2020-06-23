<template>
  <div id="app">
    <Principal :items="itens" v-model="valueSel"></Principal>
  </div>
</template>


<script>
  import Principal from "./components/Principal";

  export default {
    name: 'App',
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Principal
    },
    data() {
      return {
        itens: [{value: 0, text: 'Gabriel Angelo', icon: 'android'},
          {value: 1, text: 'Izabelle Mota', icon: 'assignment_ind'},
          {value: 2, text: 'Eduardo Garcia', icon: 'attach_money'},
          {value: 3, text: 'Luciano Menezes', icon: ''},
          {value: 4, text: 'Geraldo Militão', icon: ''}],

        valueSel: null,
      }
    }
  }
</script>

<style>
</style>
