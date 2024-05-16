import { useState } from "react";
import Input from "./input";
import './styles/forms.css'

export function PersonalForm({onChange, preset}){

   return (
    <>  
        
        <div className="personalContainer">
            <h1 className="title">Personal Details</h1>
            <div></div>
            <Input type={"text"} dataKey={"name"} label={"Full name"} ph={"First and last name"} onChange={onChange} value={preset.name}></Input>
            <Input type={"text"} dataKey={"phone"} label={"Phone number"} ph={"Enter your phone number"} onChange={onChange} value={preset.phone}></Input>
            <Input type={"email"} dataKey={"email"} label={"Email"} ph={"Enter your email"} onChange={onChange} value={preset.email}></Input>
            <Input type={"text"} dataKey={"address"} label={"Address"} ph={"City, State, Country"} onChange={onChange} value={preset.address}></Input>
        </div>
        
    </>
   )
}
