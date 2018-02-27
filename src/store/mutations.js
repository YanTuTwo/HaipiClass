import * as types from "./mutation-type"
const mutations={
    [types.SET_SHOWUSER](state,showuser){
        state.showuser=showuser
    },
    [types.SET_NAVINDEX](state,navindex){
        state.navindex=navindex
    },
}
export default mutations;