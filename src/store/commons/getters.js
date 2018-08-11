const getters = {
    all_num_and_price (state) {
        let obj = { all_num: 0, all_price: 0 }
        state.goods.forEach(item => {
            obj.all_num += item.num
            var x =  item.price.slice(1,-1)
            obj.all_price += item.num * x
        })
        return obj
    }
}

export default getters