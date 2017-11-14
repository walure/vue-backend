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
