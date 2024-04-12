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

//CRM Management
export const CREATE_AUTH = API_BASE_URL + "/auth/create"
export const UPDATE_AUTH = API_BASE_URL + "/auth/update"
export const GET_AUTH = API_BASE_URL + "/auth/get"
export const DELETE_AUTH = API_BASE_URL + "/auth/delete/"

export const CREATE_FFEDBACK = API_BASE_URL + "/feedback/create"
export const UPDATE_FEEDBACK = API_BASE_URL + "/feedback/update"
export const GET_FEEDBACK = API_BASE_URL + "/feedback/get"
export const DELETE_FEEDBACK = API_BASE_URL + "/feedback/delete/"

export const CREATE_COMPLAINT = API_BASE_URL + "/complaint/create"
export const UPDATE_COMPLAINT = API_BASE_URL + "/complaint/update"
export const GET_COMPLAINT = API_BASE_URL + "/complaint/get"
export const DELETE_COMPLAINT = API_BASE_URL + "/complaint/delete/"