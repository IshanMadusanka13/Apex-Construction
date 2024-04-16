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
export const GET_BANK_BY_ID = API_BASE_URL + "/finance/getbank/";
export const MAKE_COMPANY_PAYMENT = API_BASE_URL + "/finance/companypay";
export const GET_PAYMENTS = API_BASE_URL + "/finance/get/";

export const CREATE_BILLER = API_BASE_URL + "/biller/create";
export const UPDATE_BILLER = API_BASE_URL + "/biller/update";
export const DELETE_BILLER = API_BASE_URL + "/biller/delete/";
export const GET_ALL_BILLERS = API_BASE_URL + "/biller/getall";
export const GET_BILLER_ID = API_BASE_URL + "/biller/getid";
export const GET_BILLER_BY_TYPE = API_BASE_URL + "/biller/get/";

//Site Management
export const CREATE_SITE = API_BASE_URL + "/site/create"
export const UPDATE_SITE = API_BASE_URL + "/site/update"
export const DELETE_SITE = API_BASE_URL + "/site/delete/"
export const GET_SITE_BY_CUSTOMER_ID = API_BASE_URL + "/site/get/"
export const GENERATE_SITE_ID = API_BASE_URL + "/site/getid"
export const GET_ALL_SITES = API_BASE_URL + "/site/getall"
export const CALCULATE_SITE_STATUS = API_BASE_URL + "/site/getstatus/"
export const REQUEST_STOCK = API_BASE_URL + "/site/request"
export const GET_STOCK_REQUESTS = API_BASE_URL + "/site/getrequest/"

//Stock Management
export const CREATE_STOCK = API_BASE_URL + "/stock/create"
export const UPDATE_STOCK = API_BASE_URL + "/stock/update"
export const DELETE_STOCK = API_BASE_URL + "/stock/delete/"
export const GET_ALL_STOCK = API_BASE_URL + "/stock/getall"
export const GET_STOCK = API_BASE_URL + "/stock/get"
export const GET_STOCK_ID = API_BASE_URL + "/stock/getid"
export const BUY_STOCK = API_BASE_URL + "/stock/buy"
export const GET_BOUGHT_STOCK_DETAILS = API_BASE_URL + "/stock/getbought/"

//Fleet Management
export const CREATE_VEHCILE = API_BASE_URL + "/vehicle/create"
export const UPDATE_VEHCILE = API_BASE_URL + "/vehicle/update"
export const DELETE_VEHCILE = API_BASE_URL + "/vehicle/delete/"
export const SEARCH_VEHCILE = API_BASE_URL + "/vehicle/searchall"
export const SEARCH_VEHCILE_BY_TYPE = API_BASE_URL + "/vehicle/search/"

export const CREATE_FLEET = API_BASE_URL + "/fleet/create"
export const UPDATE_FLEET = API_BASE_URL + "/fleet/update"
export const DELETE_FLEET = API_BASE_URL + "/fleet/delete/"
export const SEARCH_FLEET = API_BASE_URL + "/fleet/searchall"
export const SEARCH_FLEET_BY_DRIVER_ID = API_BASE_URL + "/fleet/search/"