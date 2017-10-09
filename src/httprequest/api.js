import axios from 'axios'
const url2 = "https://gym.boysummer.top"
const url1 = "/api"
export function regist(username,password) {
  const url = url1+'/users/register'
  return  new Promise((resolve,reject) =>{
    axios.post(url,{username,password})
      .then((res)=>resolve(res.data));
  })
}
export function login(username,password) {
  const url = url1+"/users/login"
  return  new Promise((resolve,reject) =>{
    axios.post(url,{username,password})
      .then((res)=>resolve(res.data));
  })
}
