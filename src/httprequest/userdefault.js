import storage from 'good-storage'
export function setUserId(userid) {
  return storage.set('user_id', userid)
}
export function getUserId() {
  return storage.get('user_id')
}
