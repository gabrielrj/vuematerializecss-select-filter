<template>
    <div>
        <div class="nav-wrapper card-panel">
            <form @submit.prevent>
                <div class="input-field">
                    <input id="search"
                           type="search"
                           @keyup.enter="inputSelectOptionItemWithEnterKey($event)"
                           @keyup.up="inputKeyUppedDownClicked('up')"
                           @keyup.down="inputKeyUppedDownClicked('down')"
                           :placeholder="placeholder"
                           :disabled="disabled"
                           v-model="textFilter">
                    <label class="label-icon" for="search">
                        <i class="material-icons">search</i>
                    </label>
                    <i class="material-icons" @click="inputClear">close</i>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputFilter',
        inject: ['principal'],
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            pTextFilter: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                textFilter: null,
            }
        },
        watch: {
            textFilter(newValue){
                this.$emit('update:pTextFilter', newValue)
            },
            pTextFilter(newValue){
                this.textFilter = newValue
            }
        },
        methods: {
            inputClear(){
                this.textFilter = ''
            },
            inputKeyUppedDownClicked(type){
                this.principal.inputSetFocusInListSelect(type)
            },
            inputSelectOptionItemWithEnterKey(event){
                event.target.blur()
                this.principal.selectOptionItemWithEnterKey()
            }

        }
    }
</script>

<style scoped>
    div.nav-wrapper.card-panel {
        padding: 1px !important;
        margin-bottom: 0;
    }
</style>
