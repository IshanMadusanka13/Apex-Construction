import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import globalReducer from './state.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true
});


export const getAttendance = data => api.post('admin/view-employee-attendance',data);
export const viewLeaves = data => api.post('admin/view-leave-applications',data);
export const updateLeave = (id,data) => api.post(`admin/update-leave/${id}`,data);

export const markEmployeeAttendance = data => api.post('/employee/mark-employee-attendance',data);
export const viewEmployeeAttendance = data => api.post('/employee/view-employee-attendance',data);
export const applyforleave = data => api.post('/employee/apply-leave-application',data);
export const viewLeaveApplications = data  => api.post('/employee/view-leave-applications',data);

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, globalReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </Provider> 
  </React.StrictMode>
);
