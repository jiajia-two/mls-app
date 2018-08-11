
import Cookies from 'vue-cookies'

const state = {

    user_state: getUserStateFromCookies(),
    user_info: null,
    goods: getGoodsStateFromLocalStorage()

}

function getUserStateFromCookies() {
    let user_state = {
        id : "",
        isMainAccount : "",
        mobile : "",
        name : "",
        sessionKey : ""
    }

    for (const key in user_state) {
        let value = Cookies.get(key)
        if ( !value ) {
            user_state = null;
            break;
        }else {
            user_state[key] = value
        }
    }

    return user_state
}
function getGoodsStateFromLocalStorage(){
    let goods = []
    let value = localStorage.getItem('goods')
    var obj = JSON.parse(value)
    for(const key in obj){
        if(!value){
            goods = [];
            break; 
        }else{
            goods.push({good_id:obj[key].good_id,name:obj[key].name,price:obj[key].price,num:obj[key].num,pic:obj[key].pic,color:obj[key].color,size:obj[key].size}) 
        }
    }
    return goods
}

export default state