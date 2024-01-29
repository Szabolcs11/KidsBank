import {API_URL} from "@env"

export const ENDPOINTS = {
  AUTH: API_URL + '/auth/authenticate',
  REGISTER: API_URL + '/auth/register',
  LOGIN: API_URL + '/auth/login',
  LOGOUT: API_URL + '/auth/logout',
  ADD_FAMILY_MEMBER: API_URL + '/family/add',
  GET_FAMILY_MEMBERS: API_URL + '/family/get',
  UPDATE_FAMILY_MEMBER: API_URL + '/family/update',
  DELETE_FAMILY_MEMBER: API_URL + '/family/delete',
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