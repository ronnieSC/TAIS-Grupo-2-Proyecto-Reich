import "./App.css";
import { AdminRutas } from "./routers/AdminRutas";
import credencialesApi from "./api/credenciales.api";
import { PublicRutas } from "./routers/PublicRutas";
import { useEffect, useState } from "react";
import { DocenteRutas } from "./routers/DocenteRutas";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { obtener_tokens } from "./api/sesion.api";
registerLocale("es", es);

function App() {
  const user_tokens = obtener_tokens();
  const [rol, setRol] = useState("");

  useEffect(() => {
    const obtener_datos = async () => {
      const user = await credencialesApi.obtener_datos();
      setRol(user.usuario.rol.nombre);
    };

    if (user_tokens === null) {
      setRol("undefined");
    } else {
      obtener_datos();
    }
  }, []);

  switch (rol) {
    case "undefined": {
      return <PublicRutas />;
    }
    case "Administrador": {
      return <AdminRutas />;
    }
    case "Secretaria": {
      return <></>;
    }
    case "Docente": {
      return <DocenteRutas />;
    }
    case "Apoderado": {
      return <></>;
      //return <ApoderadoRutas />;
    }
    case "Estudiante": {
      return <></>; //<EstudianteRutas />;
    }
  }
}

export default App;
