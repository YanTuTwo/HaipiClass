import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import * as getters from "./getters"
import mutations from "./mutations"
import * as actions from "./actions"
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);
const debug=process.env.NODE_ENV!=="prodection"

export default new Vuex.Store({
    state, 
    mutations,
    getters,
    actions,
    strict:debug,
    plugins:debug?[createLogger()]:[]
})