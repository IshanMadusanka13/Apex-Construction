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
export const GET_LOG_REPORT = API_BASE_URL + "/employee/getlog";


//Finance Management
export const GET_ALL_BANKS = API_BASE_URL + "/finance/getbanks";
export const MAKE_COMPANY_PAYMENT = API_BASE_URL + "/finance/companypay";
export const GET_PAYMENTS = API_BASE_URL + "/finance/get/";

export const CREATE_BILLER = API_BASE_URL + "/biller/create";
export const UPDATE_BILLER = API_BASE_URL + "/biller/update";
export const DELETE_BILLER = API_BASE_URL + "/biller/delete/";
export const GET_ALL_BILLERS = API_BASE_URL + "/biller/getall";
export const GET_BILLER_ID = API_BASE_URL + "/biller/getid";
export const GET_BILLER_BY_TYPE = API_BASE_URL + "/biller/get/";