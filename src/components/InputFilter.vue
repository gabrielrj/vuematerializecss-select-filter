<template>
    <div>
        <div class="nav-wrapper card-panel">
            <form>
                <div class="input-field">
                    <input id="search"
                           type="search"
                           :placeholder="placeholder"
                           v-model="textFilter"
                           @focus="inputFocus()"
                           @focusout="inputFocusOut()">
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
                default: 'Placeholder'
            },
            pTextFilter: {
                type: String,
                default: ''
            },
        },
        data () {
            return {
                textFilter: null
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
            inputFocus(){
                this.principal.openListSelect()
            },
            inputFocusOut(){
                this.principal.closeListSelect()
            },
            inputClear(){
                this.textFilter = ''
            }

        }
    }
</script>

<style scoped>
    div.nav-wrapper.card-panel {
        padding: 1px !important;
    }
</style>
