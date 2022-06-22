import AsyncStorage from '@react-native-async-storage/async-storage';


export const registro= async function(registro)
{
    //url webservices
    //armo json con datos
    try
    {
        let response = await fetch('http://192.168.0.17:8080/register',{ // Poner la IPV4 de cada uno.
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
        let response = await fetch('http://192.168.0.17:8080/login',{ // Poner la IPV4 de cada uno.
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

export const finalizarRegistro = async function(data)
{
    //url webservices
    //armo json con datos
    const alias = await AsyncStorage.getItem('alias')
    try
    {
        let response = await fetch('http://192.168.0.17:8080/register/endRegister',{ // Poner la IPV4 de cada uno.
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                nombre: data.nombre,
                apellido: data.apellido,
                password: data.password,
                alias: alias
              })
        });
        
        
        let rdo = response.status;
        alert(rdo)
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