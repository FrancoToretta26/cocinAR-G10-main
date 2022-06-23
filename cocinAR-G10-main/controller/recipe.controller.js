import AsyncStorage from '@react-native-async-storage/async-storage';


export const getRecipes= async function(data)
{
    //url webservices
    var endPoint = "?";
    const listaIngredientes = data.ingredientes
    const listaNotIngredientes = data.notIngredientes
    const tipo = data.tipo
    const user = data.user
    if(listaIngredientes!=null){
        listaIngredientes.forEach(element => {
            endPoint +="ingredients="+element.nombre+"&"
        });
    }
    if(listaNotIngredientes!=null){
        listaNotIngredientes.forEach(element => {
            endPoint +="notIngredients="+element.nombre+"&"
        });
    }
    if(tipo!=null){
        endPoint +="type="+tipo
    }
    if(user!=null){
        endPoint +="user="+user
    }
    console.log(endPoint,'endpoint previo al fetch')
    //armo json con datos
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/recipe'+endPoint,{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });

        
        
        let rdo = response.status;
        console.log('rdo',rdo)

        let data = await response.json();

        console.log(data,'data')

        switch(rdo)
        {
            case 200:   
            { 
                return (data);//correcto
            }
            case 201:   
            { 
                return (data);//correcto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const getRecipesForLater= async function()
{
    //url webservices
    //armo json con datos
    const alias = await AsyncStorage.getItem('alias')
    console.log(alias, 'alias get')
    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/recipeForLater'+'/'+alias,{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        let data = await response.json();
        console.log(data,'fede')
        switch(rdo)
        {
            case 200:   
            { 
                return (data);//correcto
            }
            case 201:   
            { 
                return (data);//correcto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const saveRecipes= async function(data)
{
    //url webservices
    //armo json con datos
    const idReceta = data
    console.log(idReceta, 'idReCETA')
    const alias = await AsyncStorage.getItem('alias')
    console.log(alias, 'alias save')

    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/recipeForLater'+'/'+idReceta+'/'+alias,{ // Poner la IPV4 de cada uno.
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        console.log(rdo,'rdo')
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
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const deleteRecipeForLater= async function(data)
{
    //url webservices
    //armo json con datos
    const idReceta = data
    console.log(idReceta, 'idReCETA')


    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/recipeForLater'+'/'+idReceta,{ // Poner la IPV4 de cada uno.
            method: 'DELETE', // or 'PUT'
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
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}


export const getIngredients= async function()
{

    try
    {
        let response = await fetch('https://recetas-godio.herokuapp.com/recetasApi/ingredient',{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });

        
        
        let rdo = response.status;
        console.log('rdo',rdo)

        let data = await response.json();

        console.log(data,'data')

        switch(rdo)
        {
            case 200:   
            { 
                return (data);//correcto
            }
            case 201:   
            { 
                return (data);//correcto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}