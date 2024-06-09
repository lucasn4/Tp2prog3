
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useState,useEffect } from "react";
import "../css/styles.css";

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


  const [documentos, setDocumentos] = useState(null);

  // Estado para almacenar el documento de la API
  //const [documento, setDocumento] = useState(null);
  // Función para manejar el envío del formulario.
  
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
    <div id="contenedor">
      <h1 id="titulo"> APP CLIMA </h1>
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
          <Typography variant="h4" component="h2">
            {weather.city}, {weather.country}
          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ margin: "0 auto" }}
          />
          <Typography variant="h5" component="h3">
            {weather.temperature} °C
          </Typography>
          <Typography variant="h6" component="h4">
            {weather.conditionText}
          </Typography>
          <Typography variant="h6" component="h4">Fecha y hora de la localidad: 
            {weather.horalocal}
          </Typography>
          <Typography variant="h6" component="h4">Fecha y hora de busqueda: 
            {weather.fecha}
          </Typography>
        </Box>
      )}

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
