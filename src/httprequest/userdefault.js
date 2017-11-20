import storage from 'good-storage'
export function setUserId(userid) {
  return storage.set('user_id', userid)
}
export function getUserId() {
  return storage.get('user_id')
}
export function storageLocalAllDataThisYear(year,data) {
  console.log("set data = ",data )
  return storage.set('set_all_data_this_year'+year, data)
}
export function getStorageLocalAllDataThisYear(year) {
  return storage.get('set_all_data_this_year'+year)
}
export function isFirstLogin() {
  return storage.get('set_first_login1')
}
export function setNotFirstLogin() {
  return storage.set('set_first_login1',true);
}
