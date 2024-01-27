import {API_URL} from "@env"

export const ENDPOINTS = {
  AUTH: API_URL + '/auth/authenticate',
  REGISTER: API_URL + '/auth/register',
  LOGIN: API_URL + '/auth/login',
  LOGOUT: API_URL + '/auth/logout',
}

export const SCREENS = {
    HOME: 'Home',
    FAMILY_MEMBERS: 'FamilyMembers',
    TASKS: 'Tasks',
    WEEKLY_MEEETINGS: 'WeeklyMeetings',
    REEDEM_POINTS: 'RedeemPoints',
    BANK: 'Bank',
  };
  
  export const MMKV_KEYS = {
    USER: 'USER',
    WATCHEDLANDINGPAGE: 'WATCHEDLANDINGPAGE',
    TOKEN: 'TOKEN',
    CURRENTROOM: 'CURRENTROOM',
    FCMTOKEN: 'FCMTOKEN',
  };