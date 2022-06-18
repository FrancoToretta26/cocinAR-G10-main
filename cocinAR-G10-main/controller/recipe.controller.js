import AsyncStorage from '@react-native-async-storage/async-storage';


export const getRecipes= async function(getRecipes)
{
    //url webservices
    //armo json con datos
    try
    {
        let response = await fetch('http://192.168.0.17:8080/recipe',{ // Poner la IPV4 de cada uno.
            method: 'GET', // or 'PUT'
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
        });
        
        
        let rdo = response.status;
        let data = await response.json();
        await AsyncStorage.setItem("recetas", JSON.stringify(data))

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
