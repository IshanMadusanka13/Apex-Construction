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

//Site Management
export const CREATE_SITE = API_BASE_URL + "/site/create"
export const UPDATE_SITE = API_BASE_URL + "/site/update"
export const DELETE_SITE = API_BASE_URL + "/site/delete/"
export const GENERATE_SITE_ID = API_BASE_URL + "/site/getid"
export const GET_ALL_SITES = API_BASE_URL + "/site/getall"
export const CALCULATE_SITE_STATUS = API_BASE_URL + "/site/getstatus/"