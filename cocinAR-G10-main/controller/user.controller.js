import AsyncStorage from '@react-native-async-storage/async-storage';


export const registro= async function(registro)
{
    //url webservices
    //armo json con datos
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/register',{ // Poner la IPV4 de cada uno.
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                alias: registro.alias,
                mail: registro.mail
              })
        });
        
        
        let rdo = response.status;
        let data = await response.json();
        switch(rdo)
        {
            case 200:   
            { 
                return ({rdo:0,mensaje:"Ok"});//correcto
            }
            case 201:   
            { 
                return ({rdo:0,mensaje:"Ok"});//correcto
            }
            case 400:
                {
                    return({rdo:1, mensaje:"Alias ya existente"}) //Alias ya existente
    
                }
                case 409:
                    {
                    return({rdo:2, mensaje:"Correo electronico ya existente"}) // Mail ya existente
        
                    }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const login= async function(login)
{
    //url webservices
    //armo json con datos
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/login',{ // Poner la IPV4 de cada uno.
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                mail: login.mail,
                password: login.password
              })
        });

        let data = await response.json();
        let rdo = response.status;
        switch(rdo)
        {
            case 200:   
            { 
                const setAlias = await AsyncStorage.setItem('alias', data.alias)
                const idUsuario = String(data.id)
                const setIdUsuario = await AsyncStorage.setItem('idUsuario', idUsuario)
                return ({rdo:0});//correcto
            }
            case 201:   
            { 
                const setAlias = await AsyncStorage.setItem('alias', data.alias)
                const idUsuario = String(data.id)
                const setIdUsuario = await AsyncStorage.setItem('idUsuario', idUsuario)
                return ({rdo:0});//correcto
            }
            case 409:
                {
                    return ({rdo:1});//correcto
                }


    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const finalizarRegistro = async function(data)
{
    //url webservices
    //armo json con datos
    const alias = await AsyncStorage.getItem('alias')
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/register/endRegister',{ // Poner la IPV4 de cada uno.
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                nombre: data.nombre,
                apellido: data.apellido,
                password: data.password,
                alias: alias,
                avatar: data.avatar
              })
        });
        
        
        let rdo = response.status;
        switch(rdo)
        {
            case 200:   
            { 
                return ({rdo:0,mensaje:"Ok"});//correcto
            }
            case 201:   
            { 
                return ({rdo:0,mensaje:"Ok"});//correcto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const getToken = async function(tokenUser)
{

    //url webservices
    //armo json con datos
    var token = tokenUser;
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/registrationConfirm?token='+token,{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        switch(rdo)
        {
            case 200:   
            { 
                return ({rdo:0});//correcto
            }
            case 201:   
            { 
                return ({rdo:0});//correcto
            }
            case 500:   
            { 
                return ({rdo:1});//Incorrecto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const recuperarPass = async function(email)
{

 
    const mail = email;
    const mailcache = await AsyncStorage.setItem('mailNP', mail)
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/validationToken?mail='+mail,{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        switch(rdo)
        {
            case 200:   
            { 
                return ({rdo:0});//correcto
            }
            case 201:   
            { 
                return ({rdo:0});//correcto
            }
            case 500:   
            { 
                return ({rdo:1});//Incorrecto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const confirmToken = async function(token)
{
    var tokenUser = token;
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/confirmToken?token='+tokenUser,{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        switch(rdo)
        {
            case 200:   
            { 
                return ({rdo:0});//correcto
            }
            case 201:   
            { 
                return ({rdo:0});//correcto
            }
            case 500:   
            { 
                return ({rdo:1});//Incorrecto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const resetPassword = async function(data)
{
    //url webservices
    //armo json con datos
    const mail = await AsyncStorage.getItem('mailNP')
    const newPassword = data
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/resetPassword?mail='+mail+'&newPassword='+newPassword,{ // Poner la IPV4 de cada uno.
            method: 'PUT', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        switch(rdo)
        {
            case 200:   
            { 
                return ({rdo:0,mensaje:"Ok"});//correcto
            }
            case 201:   
            { 
                return ({rdo:0,mensaje:"Ok"});//correcto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}