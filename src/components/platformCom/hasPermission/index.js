// import store from '@/store'

// const hasPermission = {
//     install (Vue, options){
//         Vue.directive('hasPermission', {
//             inserted (el, binding, vnode, oldVnode) {
//                 let permissionList = store.state.permission.page
//                 if(!permissionList.includes(binding.value)){
//                     el.parentNode.removeChild(el)
//                 }
//             }
//         })
//     }
// }
// import hasPermission from './main'

// hasPermission.install = function(Vue){  
//     Vue.component(hasPermission.name, hasPermission)
// }  

const hasPermission = {
    // eslint-disable-next-line
    install (Vue, options){
        Vue.mixin({
            methods:{
                hasPermission(data){
                    // console.log(this.$route)
                    // let permissionList = this.$route.matched[0].meta.permission
                    let permissionList = this.$route.meta.permission
                    if(permissionList && permissionList.length && permissionList.includes(data)){
                        return true
                    }
                    return false
                }
            }
        })
    }
}

export default hasPermission
