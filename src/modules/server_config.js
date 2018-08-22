const  is_proxy = false
const index1 = is_proxy ? '/index1' : 'https://mce.mogucdn.com'
const index2 = is_proxy ? '/index2' : 'http://list.meilishuo.com'
const detail = is_proxy ? '/detail' : 'http://m.meilishuo.com'
const mls = is_proxy ? '/mls' : 'http://simba-api.meilishuo.com'
const list = is_proxy ? '/list' : 'http://list.meilishuo.com/'
const mz = is_proxy ? '/mz' : 'http://m.maizuo.com/'
export default { index1, index2, detail, mls, list, mz}


//process.env.NODE_ENV ==='production'