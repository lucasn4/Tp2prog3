
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "../css/styles.css";
import { ImagenSoleado, ImagenNublado, ImagenLluvia, ImagenDespejado, Lluviamoderada, Parcialmentenublado } from "../assets/imagenes";
//import ImagenSoleado from "../assets/imagenes.js";

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang=es&q=`;

const fechaHoraActual = new Date();
const fechaHoraFormateada = fechaHoraActual.toLocaleString();
const Componente = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
    horalocal: "",
    fechabusqueda: ""
  });
  const guardarbd = async (e,data,fechaHoraFormateada) => {
    e.preventDefault();

    try {
        let response = await fetch('http://localhost:3000/register', { // Modificado para enviar la solicitud al puerto 3000
            method: "post",
            body: JSON.stringify({ 
              city: data.location.name,
              country: data.location.country,
              temperature: data.current.temp_c,
              condition: data.current.condition.text,
              conditionText: data.current.condition.text,
              icon: data.current.condition.icon,
              horalocal: data.location.localtime,
              searchDateTime: fechaHoraFormateada
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al guardar los datos');
        }

        const data2 = await response.json();
    } catch (error) {
        alert("Error al guardar los datos");
        console.error(error);
    }
};
  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setLoading(true);
    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };
      
      
    // Obteniendo la fecha y hora actual
      const res = await fetch(API_WEATHER + city);
      const data = await res.json();
      if (data.error) {
        throw { message: data.error.message };
      }

      console.log(data);
      cambiarfondo(data);
      guardarbd(e,data,fechaHoraFormateada);
      setWeather({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
        horalocal: data.location.localtime,
        fecha: fechaHoraFormateada,
      });
    } catch (error) {
      console.log(error);
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const cambiarfondo = (data) => {
    const oscuro = document.getElementById("oscuro");
    console.log(data.current.condition.text);
    if(data.current.condition.text == "Soleado"){
      // Eliminamos el fondo existente
    oscuro.style.background = "none";
    // Creamos un elemento de imagen
    const img = document.createElement("img");
    // Establecemos la ruta de la imagen
    img.src = ImagenSoleado;
    // Establecemos estilos para la imagen
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%"; // Añadimos esta línea para que la imagen ocupe el 100% del contenedor
    img.style.objectFit = "cover"; // Añadimos esta línea para que la imagen se ajuste al contenedor sin perder su relación de aspecto
    img.style.zIndex = "-1";
    // Agregamos la imagen al contenedor "oscuro"
    oscuro.appendChild(img);
    // Establecemos otros estilos para el contenedor // Ajustar según sea necesario
    oscuro.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else if(data.current.condition.text == "Despejado"){
      
      // Eliminamos el fondo existente
    oscuro.style.background = "none";
    // Creamos un elemento de imagen
    const img = document.createElement("img");
    // Establecemos la ruta de la imagen
    img.src = ImagenDespejado;
    // Establecemos estilos para la imagen
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%"; // Añadimos esta línea para que la imagen ocupe el 100% del contenedor
    img.style.objectFit = "cover"; // Añadimos esta línea para que la imagen se ajuste al contenedor sin perder su relación de aspecto
    img.style.zIndex = "-1";
    // Agregamos la imagen al contenedor "oscuro"
    oscuro.appendChild(img);
    // Establecemos otros estilos para el contenedor // Ajustar según sea necesario
    oscuro.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    } else if(data.current.condition.text == "Nublado" || data.current.condition.text == "Neblina"){
      // Eliminamos el fondo existente
    oscuro.style.background = "none";
    // Creamos un elemento de imagen
    const img = document.createElement("img");
    // Establecemos la ruta de la imagen
    img.src = ImagenNublado;
    // Establecemos estilos para la imagen
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%"; // Añadimos esta línea para que la imagen ocupe el 100% del contenedor
    img.style.objectFit = "cover"; // Añadimos esta línea para que la imagen se ajuste al contenedor sin perder su relación de aspecto
    img.style.zIndex = "-1";
    // Agregamos la imagen al contenedor "oscuro"
    oscuro.appendChild(img);
    // Establecemos otros estilos para el contenedor // Ajustar según sea necesario
    oscuro.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  } else if(data.current.condition.text == "Parcialmente nublado"){
    
      // Eliminamos el fondo existente
      oscuro.style.background = "none";
      // Creamos un elemento de imagen
      const img = document.createElement("img");
      // Establecemos la ruta de la imagen
      img.src = Parcialmentenublado;
      // Establecemos estilos para la imagen
      img.style.position = "absolute";
      img.style.top = "0";
      img.style.left = "0";
      img.style.width = "100%";
      img.style.height = "100%"; // Añadimos esta línea para que la imagen ocupe el 100% del contenedor
      img.style.objectFit = "cover"; // Añadimos esta línea para que la imagen se ajuste al contenedor sin perder su relación de aspecto
      img.style.zIndex = "-1";
      // Agregamos la imagen al contenedor "oscuro"
      oscuro.appendChild(img);
      // Establecemos otros estilos para el contenedor // Ajustar según sea necesario
      oscuro.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      }else if(data.current.condition.text == "Lluvia moderada a intervalos" || data.current.condition.text == "Ligeras precipitaciones de aguanieve" ||data.current.condition.text == "Lluvias leves" || data.current.condition.text == "Ligeras lluvias"){
      // Eliminamos el fondo existente
    oscuro.style.background = "none";
    // Creamos un elemento de imagen
    const img = document.createElement("img");
    // Establecemos la ruta de la imagen
    img.src = Lluviamoderada;
    // Establecemos estilos para la imagen
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%"; // Añadimos esta línea para que la imagen ocupe el 100% del contenedor
    img.style.objectFit = "cover"; // Añadimos esta línea para que la imagen se ajuste al contenedor sin perder su relación de aspecto
    img.style.zIndex = "-1";
    // Agregamos la imagen al contenedor "oscuro"
    oscuro.appendChild(img);
    // Establecemos otros estilos para el contenedor // Ajustar según sea necesario
    oscuro.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  } else if(data.current.condition.text == "Lluvias" || data.current.condition.text == "Lluvia fuerte" || data.current.condition.text == "Lluvia muy fuerte" || data.current.condition.text == "Tormenta" || data.current.condition.text == "Lluvia intensa"){
  
      // Eliminamos el fondo existente
      oscuro.style.background = "none";
      // Creamos un elemento de imagen
      const img = document.createElement("img");
      // Establecemos la ruta de la imagen
      img.src = ImagenLluvia;
      // Establecemos estilos para la imagen
      img.style.position = "absolute";
      img.style.top = "0";
      img.style.left = "0";
      img.style.width = "100%";
      img.style.height = "100%"; // Añadimos esta línea para que la imagen ocupe el 100% del contenedor
      img.style.objectFit = "cover"; // Añadimos esta línea para que la imagen se ajuste al contenedor sin perder su relación de aspecto
      img.style.zIndex = "-1";
      // Agregamos la imagen al contenedor "oscuro"
      oscuro.appendChild(img);
      // Establecemos otros estilos para el contenedor // Ajustar según sea necesario
      oscuro.style.backgroundColor = "rgba(0, 0, 0, 0.5)";    
  } 
  }

  const [documentos, setDocumentos] = useState(null);

  // Función para cargar el documento al renderizar el componente
  
    const fetchDocumentos = async (fechaHoraFormateada) => {
        try {
            const response = await fetch('http://localhost:3000/register');
            if (!response.ok) {
                throw new Error('Error al recuperar los documentos');
            }
            const data = await response.json();
            setDocumentos(data.data); 
            } catch (error) {
            console.log(error);
            // Manejar el error aquí
        }
    };
    //console.log(documentos.country);

const verbd = async (e,fechaHoraFormateada) => {
  e.preventDefault(); // Previene el comportamiento predeterminado del formulario (enviar a una nueva página).

  fetchDocumentos(fechaHoraFormateada);
};
  // Calcular los documentos para mostrar en la página actual

  return (
    <>
    <style>
      {`
        body {
        }
      `}
    </style>
    <div id="oscuro">
    <div id="contenedor">
      <h1  className="letras"id="titulo"> APP CLIMA </h1>
      <Box
        sx={{
          display: "grid",
          maxWidth: "50%",
          gap: 2,
          margin: "auto",
          padding: 2
        }}
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
        className="letras"
          id="city"
          label="Ciudad"
          variant="outlined"
          size="small"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          error={error.error}
          helperText={error.message}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          loadingIndicator="Buscando..."
        >
          Buscar
        </LoadingButton>
      </Box>
      {weather.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center"
          }}
        >
          <Typography className="letras" variant="h4" component="h2">
            {weather.city}, {weather.country}
          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ margin: "0 auto" }}
          />
          <Typography  className="letras"  variant="h5" component="h3">
            {weather.temperature} °C
          </Typography>
          <Typography className="letras" variant="h6" component="h4">
            {weather.conditionText}
          </Typography>
          <Typography className="letras" variant="h6" component="h4">Fecha y hora de la localidad: 
            {weather.horalocal}
          </Typography>
          <Typography className="letras" variant="h6" component="h4">Fecha y hora de busqueda: 
            {weather.fecha}
          </Typography>
        </Box>
      )}
    </div>

      <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
        Powered by:{" "}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </Typography>


      </div>
    <div>
            <h1 className='historial'>HISTORIAL DE BUSQUEDA</h1>
            <button className='boton' onClick={verbd}>Actualizar historial</button>
    <table  className='tablaarayas' style={{width:"90%"}}>
              <thead>
                <tr>
                  <th className='columna1'>Ciudad</th>
                  <th className='columna'>Pais</th>
                  <th className='columna'>Temperatura</th>
                  <th className='columna'>Condicion</th>
                  <th className='columna'>Hora Localidad</th>
                  <th className='columna'>Fecha de busqueda</th>
                </tr>
              </thead><tbody>
    {documentos && documentos.map(doc => (
        <tr key={doc._id}>
            <td className='columna1'>{doc.city}</td>
            <td className='columna'>{doc.country}</td>
            <td className='columna'>{doc.temperature}</td>
            <td className='columna'>{doc.conditionText}</td>
            <td className='columna'>{doc.horalocal}</td>
            <td className='columna'>{fechaHoraFormateada}</td>
        </tr>
    ))}
</tbody>
            </table></div>
    </>
  );
};
export { Componente };
