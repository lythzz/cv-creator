import { useState } from "react";
import './styles/input.css'

export default function Input({label, type, ph,  onChange, dataKey, value}){
 
    return (
        <div className="inputContainer">
            <label className="formLabel">{label}</label>
            <input className="formInput" value={value} data-key={dataKey} placeholder={ph} type={type} onChange={onChange}></input>
        </div>  
    )
}
