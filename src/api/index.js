import axios from 'axios'
//默认url
axios.defaults.baseURL = 'http://localhost:3000';

//获取轮播图方法
export let getSliders = ()=>{
  return axios.get('/sliders')
};

//获取热门图书数据
export let getHotBook = ()=>{
  return axios.get('/hot');
};

//获取所有图书
export let getAllBook = ()=>{
  return axios.get('/book');
}

//删除某一本图书
export let removeBook=(id)=>{
  return axios.delete(`/book?id=${id}`)
}

//查询图书详情信息
export let findBookInfoById=(id)=>{
  return axios.get(`/book?id=${id}`);
}

/**
 * 修改图书
 * @param id
 * @param data 数据
 * @returns {Promise<AxiosResponse<T>>}
 */
export let editBookInfo=(id,data)=>{
 return axios.put(`/book?id=${id}`,data);
}


//新增图书
export let addBookInfo=(data)=>{
  return axios.post('/book',data);
}


//实现全局加载
// export let getAll=()=>{
//   return axios.all([getSliders(),getHotBook()]);
// }

//数据下拉
export let moreData =(offset)=>{
  return axios.get(`/page?offset=${offset}`);
}
