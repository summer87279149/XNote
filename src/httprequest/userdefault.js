import storage from 'good-storage'
export function setUserId(userid) {
  return storage.set('user_id', userid)
}
export function getUserId() {
  return storage.get('user_id')
}
export function storageLocalAllDataThisYear(data) {
  return storage.set('set_all_data_this_year', data)
}
export function getStorageLocalAllDataThisYear() {
  return storage.get('set_all_data_this_year')
}
