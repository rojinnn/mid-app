import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Joi from "joi";
import './register.css'

const Register = () => {
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [shopContactNo, setShopContactNo] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopVatNO, setShopVatNo] = useState('');

  const schema = Joi.object({
      fullName: Joi.string().min(2).max(25).required(),
      email: Joi.string().required(),
      contactNo: Joi.number(),
      shopName: Joi.string().min(2).max(25).required(),
      shopEmail: Joi.string().required(),
      shopContactNo: Joi.number(),
      shopVatNO: Joi.number(),
      
  })

  const handleValidateField = (e) => {
      const { target: { name: field }}= e
      const {error, value} = schema.validate({ field }).options({ allowUnknown: true });
      console.log('abc', error, value, field);
    console.log('check blur');
  };


    const handleSubmit = () => {
    //   const {error, value} = schema.validate({ fullName, email, contactNo, shopName, shopEmail, shopContactNo, shopVatNO});

    };

  return (
    <div className="form-container">
      <input value={contactNo} name={'contactNo'} onChange={e => setContactNo(e.target.value)} onBlur={e => handleValidateField(e)}/>
      <input value={email} onChange={e => setEmail(e.target.value)} onBlur={handleValidateField}/>
      <input value={fullName} onChange={e => setFullName(e.target.value)} onBlur={handleValidateField}/>
      <input value={shopContactNo} onChange={e => setShopContactNo(e.target.value)} onBlur={handleValidateField}/>
      <input value={shopEmail} onChange={e => setShopEmail(e.target.value)} onBlur={handleValidateField}/>
      <input value={shopName} onChange={e => setShopName(e.target.value)} onBlur={handleValidateField}/>
      <input value={shopVatNO} onChange={e => setShopVatNo(e.target.value)} onBlur={handleValidateField}/>
      <button onClick={handleSubmit}>
        <span>Join</span>
      </button>
      
    </div>
  );
};

export default Register;
