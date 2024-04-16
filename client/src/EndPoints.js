//Server Address
export const API_BASE_URL = 'http://localhost:3001';

//User Management
export const LOGIN = API_BASE_URL + "/user/login"
export const CHANGE_PASSWORD = API_BASE_URL + "/user/changepassword"

export const CREATE_CUSTOMER = API_BASE_URL + "/customer/create"
export const SEARCH_CUSTOMER_BY_USER = API_BASE_URL + "/customer/search/"
export const UPDATE_CUSTOMER = API_BASE_URL + "/customer/update"
export const DELETE_CUSTOMER = API_BASE_URL + "/customer/delete"

export const CREATE_EMPLOYEE = API_BASE_URL + "/employee/create"
export const SEARCH_EMPLOYEE = API_BASE_URL + "/employee/search/"
export const UPDATE_EMPLOYEE = API_BASE_URL + "/employee/update"
export const GET_EMPLOYEE_ID = API_BASE_URL + "/employee/getid"
export const DELETE_EMPLOYEE = API_BASE_URL + "/employee/delete"
export const GET_EMPLOYEE_COUNT = API_BASE_URL + "/employee/getcount"
export const GET_LOG_REPORT = API_BASE_URL + "/employee/getlog"

//Fleet Management
export const CREATE_VEHCILE = API_BASE_URL + "/vehicle/create"
export const UPDATE_VEHCILE = API_BASE_URL + "/vehicle/update"
export const DELETE_VEHCILE = API_BASE_URL + "/vehicle/delete/"
export const SEARCH_VEHCILE = API_BASE_URL + "/vehicle/search"

export const CREATE_FLEET = API_BASE_URL + "/fleet/create"
export const UPDATE_FLEET = API_BASE_URL + "/fleet/update"
export const DELETE_FLEET = API_BASE_URL + "/fleet/delete/"
export const SEARCH_FLEET = API_BASE_URL + "/fleet/searchall"
export const SEARCH_FLEET_BY_DRIVER_ID = API_BASE_URL + "/fleet/search/"