<template>
  <div id="app">
    <input-filter :p-text-filter.sync="textFilter" :placeholder="placeholder" :disabled="disabled"></input-filter>
    <list-select v-show="!disabled" :list-itens="listItens" @optionSelected="optionSelected"></list-select>
  </div>
</template>

<script>

  import M from 'materialize-css'
  import InputFilter from './components/InputFilter'
  import ListSelect from './components/ListSelect'

  export default {
    name: 'VueMaterialCssSelectFilter',
    components: {
      InputFilter,
      ListSelect
    },
    props: {
      value: {
        type: [String, Number],
        default: null
      },

      items: {
        type: Array,
        default: null,
      },

      placeholder: {
        type: String,
        default: "Placeholder",
      },

      disabled: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        principal: this,
      };
    },

    data() {
      return {
        listItens: (this.items != null && this.items != undefined) ? this.items : null,

        openList: false,

        textFilter: '',

        valueSelected: this.value,

        itemSelected: null,
      }
    },

    watch: {
      items(newValue){
        this.listItens = (newValue != null && newValue != undefined) ? newValue : null
      },

      valueSelected(newValue){
        if(valueSelected == null || valueSelected == undefined)
          this.textFilter = ''
        this.$emit('update:value', newValue)
      },

      value(newValue){
        this.valueSelected = newValue
        this.itemSelected = null
      },

      textFilter(newValue){
        if(this.itemSelected != null && this.itemSelected != undefined){
          if(newValue.length != this.itemSelected.text.length){
            this.itemSelected = null
            this.valueSelected = null
          }
        }
      },

      itemSelected(newValue){
        if(newValue != null){
          this.valueSelected = newValue.value
          this.textFilter = newValue.text
        }
      },

      openList(newValue){
        if(newValue == false)
          this.$emit('listClosed', true)
        else
          this.$emit('listOpenned', true)
      }
    },

    mounted () {
      M.AutoInit()
    },

    methods: {
      openListSelect(){
        this.openList = true
      },
      closeListSelect(){
        this.openList = false
      },
      listIsOpenned(){
        return this.openList
      },
      returnTextFilter(){
        return this.textFilter
      },
      optionSelected(item){
        this.itemSelected = item

        this.$emit('itemSelectedChange', item)
      }
    }
  }
</script>

<style>
</style>
