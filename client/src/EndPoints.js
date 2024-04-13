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

//Stock Management
export const CREATE_STOCK = API_BASE_URL + "/stock/create"
export const UPDATE_STOCK = API_BASE_URL + "/stock/update"
export const DELETE_STOCK = API_BASE_URL + "/stock/delete/"
export const GET_ALL_STOCK = API_BASE_URL + "/stock/getall"
export const GET_STOCK = API_BASE_URL + "/stock/get"
export const GET_STOCK_ID = API_BASE_URL + "/stock/getid"
export const BUY_STOCK = API_BASE_URL + "/stock/buy"
export const GET_BOUGHT_STOCK_DETAILS = API_BASE_URL + "/stock/getbought/"