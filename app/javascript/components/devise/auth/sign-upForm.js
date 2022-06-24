import React, { useState, useEffect } from "react";
import background from "../../../assets/background.png";
import { routes } from "../../../api";

import {Fn, checkBirthdate, date} from "./helpers";
const RegistrationForm = () => {
  const gender = [{value:"Femenino"}, { value:"Masculino"}];
  const [inputValues, setInputValues] = useState({
    "user[name]": "",
    "user[last_name]":"",
    "user[rut]":"",
    "user[phone]":"",
    "user[gender]":"",
    "user[birthdate]":"",
    "user[email]":"",
    "user[password]":"",
    "user[password_confirmation]":""
  });
  const [validation, setValidation] = useState({
    rut: "",
    birthdate: "",
    email: "",
    pass_confirmation:"",
    phone:""
  });
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const [valid, setValid] = useState({
    rut: false,
    birthdate: false,
    email: false,
    pass_confirmation:false,
    phone: false
  });
  const checkValidation = () =>{
    let err = {...validation};
    let check = {...valid};
    if(inputValues["user[rut]"]!="" && !Fn.validaRut(inputValues["user[rut]"])){
      err.rut = "Rut inválido. Ingresar RUT con formato XXXXXXXX-X"
      check.rut = false;
    }else{
      check.rut = true;
      err.rut = "";
    }if(inputValues["user[email]"]!="" && !inputValues["user[email]"].match(/\S+@\S+\.\S+/)){
      err.email = "Ingresar un e-mail válido";
      check.email =false;
    }else{
      err.email = "";
      check.email = true;
    }if(inputValues["user[birthdate]"]!="" && !checkBirthdate(inputValues["user[birthdate]"])){
      err.birthdate = "Debes ser mayor de edad para registrarse";
      check.birthdate =false
    }else{
      err.birthdate = "";
      check.birthdate=true

    }if(inputValues["user[password_confirmation]"]!="" && inputValues["user[password_confirmation]"]!= inputValues["user[password]"]){
      err.pass_confirmation="Las contraseñas no coinciden";
      check.pass_confirmation =false;
    }else{
      err.pass_confirmation="";
      check.pass_confirmation=true
    }if(inputValues["user[phone]"]!="" 
    && (!inputValues["user[phone]"].match(/(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}/)
    || inputValues["user[phone]"].match(/^[a-zA-Z]+$/))
    ){
      err.phone = "Ingresa un número de teléfono válido. Formato 569XXXXXX o 9XXXXXX";
      check.phone=false;
    }else{
      err.phone="";
      check.phone=true;
    }
    setValidation(err);
    setValid(check);
  }
  const sendData = () =>{
    let data = new FormData(document.getElementById("create-user-form"));
    data.append("authenticity_token",document
    .getElementsByName("csrf-token")[0]
    .getAttribute("content"));
    fetch(routes.users.post(), {
      method:"POST",
      body: data
    }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(valid.birthdate && valid.email 
      && valid.pass_confirmation && valid.rut){
      sendData();
    }
    if(!valid.birthdate){
      setInputValues((prev)=>({
        ...prev,
        ["user[birthdate]"]:""
      }))

    }if(!valid.email){
      setInputValues((prev)=>({
        ...prev,
        ["user[email]"]:""
      }))

    }if(!valid.rut){
      setInputValues((prev)=>({
        ...prev,
        ["user[rut]"]:""
      }))

    }if(!valid.pass_confirmation){
      setInputValues((prev)=>({
        ...prev,
        ["user[password_confirmation]"]:""
      }));
    }
    if(!valid.phone){
      setInputValues((prev)=>({
        ...prev,
        ["user[phone]"]:""
      }));
    }

  }
  useEffect(() => {
    checkValidation();
  }, [inputValues])
    return (
      <div className="card">
        <form name="users" 
          onSubmit={(e) => handleSubmit(e)}
          acceptCharset="UTF-8" 
          id="create-user-form"
          style={{border: "1px solid #f5efef", padding: 10,
          borderRadius: 10, backgroundColor: "#f5efef"}}>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' 
                  name='user[name]' 
                  value={inputValues["user[name]"]}
                  onChange={handleChange}
                  placeholder='Nombre' required/>
                </div>
              </div>
              <div className="field is-expanded">
                <div className="control">
                  <input className="input" 
                  type='text' 
                  name='user[last_name]' 
                  value={inputValues["user[last_name]"]}
                  onChange={handleChange}
                  placeholder='Apellido' required/>
                </div>
              </div>
            </div>
          </div> 
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
              <div className="control">
                <input className="input" 
                type='rut' 
                name='user[rut]'
                onChange={handleChange}
                value={inputValues["user[rut]"]}
                placeholder='RUT' required/>
              </div> 
              {!valid.rut ? <p>{validation.rut}</p> : null}  
            </div>
            <div className="field is-expanded">
              <div className="control">
                <input className="input" 
                type='text' 
                name='user[phone]' 
                onChange={handleChange}
                value={inputValues["user[phone]"]}
                placeholder='Telefono' required/>
              </div>
              {!valid.phone ? <p>{validation.phone}</p> : null} 
            </div>

            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field is-expanded">
              <div className="control">
              <label>Género</label>
              <select
              className="input"
              name="user[gender]"
              >
                {gender.map((g)=>(
                  <option
                  key={g.value} value={g.value}
                  >{g.value}</option>
                 
                ))}
              </select>
              </div> 
            </div>
            <div className="field is-expanded">
              <div className="control">
                <label>
                  Fecha de nacimiento
                  <input className="input" 
                  type='date'
                  name='user[birthdate]' 
                  onChange={handleChange}
                  value={inputValues["user[birthdate]"]}
                  max={date()}
                  placeholder='Fecha de cumpleaños' required/>
                </label>
                
              </div>
              {!valid.birthdate ? <p>{validation.birthdate}</p> : null} 
            </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='email' 
              name='user[email]' 
              onChange={handleChange}
              value={inputValues["user[email]"]}
              placeholder='Email' required/>
            </div> 
            {!valid.email ? <p>{validation.email}</p> : null}  
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='password' 
              name='user[password]' 
              onChange={handleChange}
              value={inputValues["user[password]"]}
              placeholder='Contraseña' required/>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" 
              type='password' 
              name='user[password_confirmation]' 
              onChange={handleChange}
              value={inputValues["user[password_confirmation]"]}
              placeholder='Confirmar contraseña' required/>
            </div>
            {!valid.pass_confirmation ? <p>{validation.pass_confirmation}</p> : null} 
          </div>
          <div className="field">
           <div className="control">
             <button className="button is-primary is-fullwidth" 
             type='submit'>Confirmar</button>
           </div>           
          </div>
        </form>
      </div>
      );
}

const registrationIndex = () => {
  return (
    <>
    <div className="columns is-centered">
      <div className="column has-text-centered is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-half-widescreen is-half-fullhd">
        <div className="hero home-banner">
          <h1 className="title" style={{ marginTop: 25 }}>
            Registrarse
          </h1>
          <figure>
            <img src={background} 
            style={{
              marginTop: -5,
              marginLeft: 'auto',
              marginRight: 'auto',
              height: '25em',
            }}/> 
          </figure>                
        </div>
        <div className="section" style={{ marginTop: 45 }}>
          <RegistrationForm/>
        </div>
      </div>
    </div>
  </>
  )
}

export default registrationIndex;