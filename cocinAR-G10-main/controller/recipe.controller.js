import AsyncStorage from '@react-native-async-storage/async-storage';


export const getRecipes= async function(datos)
{
    //url webservices
    var endPoint = "?";
    const listaIngredientes = datos.ingredientes
    const listaNotIngredientes = datos.notIngredientes
    const tipo = datos.tipo
    const user = datos.user
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
    //armo json con datos
    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/recipe'+endPoint,{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });

        
        
        let rdo = response.status;

        let data = await response.json();
        await AsyncStorage.setItem('recetas', JSON.stringify(data))


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
    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/recipeForLater'+'/'+alias,{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        let data = await response.json();
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
    const alias = await AsyncStorage.getItem('alias')

    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/recipeForLater'+'/'+idReceta+'/'+alias,{ // Poner la IPV4 de cada uno.
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        let responsetotal = response

        let rdo = response.status;
        let mensaje = response.message;
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
            case 403:
                {
                    return ({rdo:1,mensaje:"Ok"}); // Ya esta guardada
                }
            case 409:
                    {
                        return ({rdo:2,mensaje:"Ok"}); // Maximo 5 recetas
                    }
            case 400:
                {
                    return({rdo:3, mensaje:'Ok'}) // Receta propia
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


    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/recipeForLater'+'/'+idReceta,{ // Poner la IPV4 de cada uno.
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
        let response = await fetch('http://192.168.0.17:8080/recetasApi/ingredient',{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });

        
        
        let rdo = response.status;

        let data = await response.json();


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

export const submitRecipe= async function(datos)
{


    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/recipe',{ // Poner la IPV4 de cada uno.
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                creatorNickname: datos.creatorNickname,
                receta: datos.receta,
                ingredienteConCantidad: datos.ingredienteConCantidad,
                pasos: datos.pasos,
            })
        });
        
        
        let rdo = response.status;
        console.log(rdo,'rdo post receta')
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
            case 500:
            {
                return ({rdo:1,mensaje:"Ok"});//correcto
            }
    }
}
    catch(error)
    {
        console.log("error",error);
    };


}

export const calificar= async function(data)
{
    //url webservices
    //armo json con datos
    const idReceta = data.idReceta
    const creatorNickname = data.creatorNickname
    const calificacion = data.calificacion

    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/calificacion'+'/'+creatorNickname+'/'+calificacion+'/'+idReceta,{ // Poner la IPV4 de cada uno.
            method: 'POST', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
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
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const getBestRecipes= async function()
{
    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/bestRecipes',{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        let data = await response.json();
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

export const validateRecipe= async function(data)
{
    //url webservices
    //armo json con datos
    const alias = await AsyncStorage.getItem('alias')
    const nombreReceta = await AsyncStorage.getItem('nombreReceta')
    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/validateRecipe?alias='+alias+'&recipeName='+nombreReceta,{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        let data = await response.json();
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
            case 500:{
                return (false)}
    }
}
    catch(error)
    {
        console.log("error",error);
    };
}

export const editRecipe= async function(datos, id)
{


    try
    {
        let response = await fetch('http://192.168.0.17:8080/recetasApi/recipe/'+id,{ // Poner la IPV4 de cada uno.
            method: 'PUT', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                creatorNickname: datos.creatorNickname,
                receta: datos.receta,
                ingredienteConCantidad: datos.ingredienteConCantidad,
                pasos: datos.pasos,
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
    }
}
    catch(error)
    {
        console.log("error",error);
    };


}