<template>
    <div class="list-select">
        <Transition name="fade">
            <ul v-show="toogle"
                class="collection select-filter z-depth-2"
                v-if="(listItens != undefined && listItens != null) && filterListWithText.length > 0">

                <a v-for="(item, item_i) in filterListWithText"
                   class="collection-item select-filter-item black-text waves-effect waves-block"
                   :class="{'active' : (itemSelected != null && item.value === itemSelected.value) , 'selected' : (itemFocused != null && item.value === itemFocused.value) }"
                   :value="item.value"
                   :ref="'option_item_' + item.value"
                   :key="'list_item_key_' + item_i"
                   @click="optionSelected(item)">
                    <i class="material-icons prefix left"
                       v-if="item.hasOwnProperty('icon') && item.icon != undefined && item.icon != null">{{item.icon}}</i>
                    {{item.text}}
                </a>

            </ul>
        </Transition>
    </div>
</template>

<script>
    export default {
        name: 'ListSelect',
        inject: ['principal'],
        props: {
            listItens: {
                type: Array,
                default: undefined
            },
            pItemSelected: {
                type: Object,
                default: null
            },
        },
        data() {
            return {
                itemSelected: this.pItemSelected,
                itemFocused: null,
            }
        },
        watch: {
            itemSelected(newValue){
                this.$emit('update:pItemSelected', newValue)
            },
            pItemSelected(newValue){
                this.itemSelected = newValue
            },
        },
        computed: {
            toogle(){
                return this.principal.listIsOpenned()
            },
            filterListWithText(){
                let self = this
                let textFilter = this.principal.returnTextFilter()

                if(textFilter.length == 0)
                    return this.listItens
                else{
                    let itensForList = self.listItens.filter(function (item) {
                        let searchRegex = new RegExp(textFilter, 'i')

                        return (
                            searchRegex.test(item.text)
                        )
                    })

                    return itensForList
                }
            }
        },
        methods:{
            optionSelected(item){
                this.itemSelected = item
            },
            setFocusNextOrPrevItem(type){
                let itens = this.filterListWithText

                if(itens.length > 0){
                    if(type == 'down'){

                        if(this.itemFocused == null){
                            this.itemFocused = itens[0]
                            this.$refs['option_item_' + this.itemFocused.value][0].focus()
                        } else{
                            let indexFocusedItem = this.filterListWithText.findIndex((item) => {
                                return item.value === this.itemFocused.value
                            })

                            if(this.filterListWithText.length > (indexFocusedItem + 1)){
                                this.itemFocused = itens[indexFocusedItem + 1]
                                this.$refs['option_item_' + this.itemFocused.value][0].focus()
                            }
                        }

                    }else{

                        if(this.itemFocused != null) {
                            let indexFocusedItem = this.filterListWithText.findIndex((item) => {
                                return item.value === this.itemFocused.value
                            })

                            if((indexFocusedItem - 1) !== -1){
                                this.itemFocused = itens[indexFocusedItem - 1]
                                this.$refs['option_item_' + this.itemFocused.value][0].focus()
                            }
                        }
                    }

                }else
                    this.itemFocused = null
            },
            selectOptionItemWithEnterKey(){
                if(this.itemFocused != null){
                    this.itemSelected = this.itemFocused
                    this.itemFocused = null
                    this.principal.closeListSelect()
                }
            }
        }

    }
</script>

<style scoped>
    .list-select {
        position: relative;
    }

    .select-filter {
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        z-index: 9999;
        left: 0;
        right: 0;
        margin-top: 0;
    }

    a.select-filter-item {
        border: none;
        cursor: pointer !important;

    }

    a.select-filter-item.active {
        background-color: #9e9e9e !important;
    }

    a.select-filter-item.selected {
        background-color: #bdbdbd  !important;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
</style>
