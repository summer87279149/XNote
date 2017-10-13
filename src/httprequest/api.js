import axios from 'axios'
const url2 = "https://gym.boysummer.top"
const url1 = "/api"
export function regist(username,password) {
  const url = url1+'/users/register'
  return  new Promise((resolve,reject) =>{
    axios.post(url,{username,password})
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
export function login(username,password) {
  const url = url1+"/users/login"
  return  new Promise((resolve,reject) =>{
    axios.post(url,{username,password})
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//获取训练项目
export function gettrains(user_id) {
  const url = url1+"/trains/gettrains"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        user_id:user_id
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//添加训练项目
export function addTrainsName(user_id,train_name) {
  const url = url1+"/trains/addtrains"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        train_name:train_name,
        user_id:user_id

      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//添加训练记录
export function addtrains(param) {
  const url = url1+"/trains/add"
  return  new Promise((resolve,reject) =>{
    axios.post(url,param)
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
//获取训练类型,参数uid
export function getTrainKinds(user_id) {
  const url = url1+"/trains/gettrainkinds"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        user_id:user_id
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}



//根据训练类型获得训练日期和id，参数：user_id，train_kind
export function getTrainDateAndID(user_id,train_kind) {
  const url = url1+"/trains/gettraindate"
  return  new Promise((resolve,reject) =>{
    axios.get(url,{
      params:{
        user_id:user_id,
        train_kind:train_kind
      }
    })
      .then((res)=>resolve(res.data)).catch((err)=>{
      reject(err);
    });
  })
}
