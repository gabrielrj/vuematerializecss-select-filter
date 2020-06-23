<template>
    <div>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link type="text/css" media="screen" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

        <div @focus.capture="componentFocusIn" @focusout="componentFocusOut">
            <input-filter :p-text-filter.sync="textFilter"
                          :placeholder="placeholder"
                          :disabled="disabled"></input-filter>

            <list-select v-show="!disabled"
                         ref="listselect"
                         :list-itens="listItens"
                         :p-item-selected.sync="itemSelected"></list-select>
        </div>
    </div>
</template>

<script src="https://code.jquery.com/jquery-3.5.1.min.js" type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" type="text/javascript"></script>

<script>
    import InputFilter from "./InputFilter";
    import ListSelect from "./ListSelect";

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
                //if(this.valueSelected == null || this.valueSelected == undefined)
                    //this.textFilter = ''
                this.$emit('input', newValue)
            },

            value(newValue){
                this.valueSelected = newValue
                this.itemSelected = null

                if(newValue != null){
                    this.itemSelected = this.listItens.find((item) => {
                        return item.value === newValue
                    })

                    this.textFilter = this.itemSelected.text
                }
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

                this.$emit('itemSelectedChange', newValue)
            },

            openList(newValue){
                if(newValue == false)
                    this.$emit('listClosed', true)
                else
                    this.$emit('listOpenned', true)
            }
        },

        methods: {
            componentFocusIn(){
                this.openListSelect()
            },
            componentFocusOut(){
                this.closeListSelect()
            },
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
            inputSetFocusInListSelect(type){
                this.$refs.listselect.setFocusNextOrPrevItem(type)
            },
            selectOptionItemWithEnterKey(){
                this.$refs.listselect.selectOptionItemWithEnterKey()
            }
        }
    }
</script>

<style>
</style>
