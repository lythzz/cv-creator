import { forwardRef, useState } from "react";
import './styles/input.css'
const Input = forwardRef(({label, type, ph,  onChange, dataKey, value}, ref) => (
        <div className="inputContainer">
            <label className="formLabel">{label}</label>
            <input className="formInput" ref={ref} value={value} data-key={dataKey} placeholder={ph} type={type} onChange={onChange}></input>
        </div>  
    )
)


export default Input