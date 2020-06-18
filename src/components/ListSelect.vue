<template>
    <div style="position: relative">
        <Transition name="fade">
            <div v-show="toogle" class="collection select-filter z-depth-2" v-if="(listItens != undefined && listItens != null) && filterListWithText.length > 0">
                <a v-for="(item, item_i) in filterListWithText"
                   class="collection-item select-filter-item black-text waves-effect waves-block"
                   :value="item.value"
                   :key="'list_item_key_' + item_i"
                   @click="optionSelected(item)">
                    <i class="material-icons prefix left"
                       v-if="item.hasOwnProperty('icon') && item.icon != undefined && item.icon != null">{{item.icon}}</i>
                    {{item.text}}
                </a>
            </div>
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
            }
        },
        data() {
            return {
                itensForList: [],
            }
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
                this.$emit('optionSelected', item)
            }
        }

    }
</script>

<style scoped>
    .select-filter {
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        z-index: 9999;
        left: 0;
        right: 0;
    }
    a.select-filter-item {
        border: none;
        cursor: pointer !important;

    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
</style>
