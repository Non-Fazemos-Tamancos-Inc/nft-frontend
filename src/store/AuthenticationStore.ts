import {User} from "../api/types.ts";

const LOCAL_STORAGE_TEMP_KEY = 'temp-user'

export function getCurrentUser() {
  const userRaw =  window.localStorage.getItem(LOCAL_STORAGE_TEMP_KEY)

  if (!userRaw) {
    return null
  }

  return JSON.parse(userRaw)
}

export function setCurrentUser(user?: User) {
  if (!user) {
    window.localStorage.removeItem(LOCAL_STORAGE_TEMP_KEY)
    return
  }

  window.localStorage.setItem(LOCAL_STORAGE_TEMP_KEY, JSON.stringify(user))
}