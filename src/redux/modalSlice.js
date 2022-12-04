import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal:(state,action)=>{
        state.isOpen=true
    },
    closeModal:(state,action)=>{
        state.isOpen=false
    },
    toggleModal:(state,action)=>{
        state.isOpen=!state.isOpen
    }
  },
});
export const {openModal,closeModal,toggleModal}=modalSlice.actions
export default modalSlice.reducer