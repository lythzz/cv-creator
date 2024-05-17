import { forwardRef, useState } from "react";
import './styles/input.css'
const Input = forwardRef(({label, type, ph, req,  onChange, dataKey, value, id}, ref) => (
        <div className="inputContainer" id={id}>
            <label className="formLabel">{label}{req ? <span>Required</span>:''}</label>
            <input className="formInput" ref={ref} value={value} data-key={dataKey} placeholder={ph} type={type} onChange={onChange}></input>
        </div>  
    )
)


export default Input