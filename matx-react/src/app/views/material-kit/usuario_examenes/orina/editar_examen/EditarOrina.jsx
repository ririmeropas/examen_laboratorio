import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { MatxSearchBox, SimpleCard } from "app/components";
import { Span } from "app/components/Typography";
import { color } from "echarts";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
const TextFieldbus = styled(TextValidator)(() => ({
  width: "200%",
  marginBottom: "16px",
}));

const color_text = {
  width: "100%",

  color: "black",
  // border: "1px solid red",
  padding: "13.5px"
}


const EditarOrina = () => {
  const navigate = useNavigate();
  const { id_examen } = useParams();
  console.log("ID EXAMEN:" + id_examen);
  const [state, setState] = useState({ date: new Date() });
  const usuario_local = JSON.parse(localStorage.getItem("usuario"));

  //Para el buscador
  const [contenedor, setcontenedor] = useState(false);
  const [isMyInputFocus, setIsMyInputFocus] = useState(false);
  const [txtbuscar, setbuscar] = useState("");
  const [usuarios_bus, setUsuarios_bus] = useState([]);
  const [backusuarios, setbackusuarios] = useState([]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const biometria = {
    id_usuario: "",
    id_admin: "",

    color: "",
    aspecto: "",

    densidad_especifica: "",
    ph: "",
    creatina: "",
    sangre: "",
    proteinas: "",
    microalbumina: "",
    leucocitos: "",
    glucosa: "",
    urubilinogeno: "",
    cetonas: "",
    nitritos: "",
    bilirrubinas: "",

    celulas_redondas: "",
    celulas_pavimentosas: "",
    piocitos: "",
    hematies: "",
    bacterias: "",
    moco: "",

    nombres_usuario: "",
    nombres_admin: "",
    codigo: "",
    sexo: "",
    edad: "",
    fecha: ""


  };
  const [form_biometria, setForm_biometria] =
    useState(biometria);

  //USUARIO METODO PARA ESCUCHAR EL EVENTO 
  const handleChange_biometria = (e) => {
    setForm_biometria({
      ...form_biometria,
      [e.target.name]: e.target.value,
    });
  };
  const handlechan = e => {
    setbuscar(e.target.value);
    filtrar(e.target.value);
    console.log("busqueda: " + e.target.value);
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = backusuarios.filter((elemento) => {

      if (String(elemento.nombres).toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || String(elemento.cedula).toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        console.log(elemento)
        return elemento;
      }
    });

    setUsuarios_bus(resultadosBusqueda);
  }

  useEffect(() => {
    mostrar_examenes();
  }, []);

  const mostrar_examenes = () => {
    fetch(
      `http://localhost:8000/api/mostrar_usuario_examen_orina/${id_examen}`
    )
      .then((res) => res.json())
      .then((datos_examen) => {
        console.log("datos_examens");
        // console.log(datos_examen[0]);
        // console.log(datos_examen[0].GRA);
        setForm_biometria(datos_examen[0]);

        console.log(form_biometria);
      });
  }

  const editar_examen = () => {
    Swal.fire({
      title: "CARGANDO...",
      html: "Espera mientras editamos..",
    });
    Swal.showLoading();
    fetch(
      `http://localhost:8000/api/editar_examen_orina/${id_examen}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          color: form_biometria.color,
          aspecto: form_biometria.aspecto,

          densidad_especifica: form_biometria.densidad_especifica,
          ph: form_biometria.ph,
          creatina: form_biometria.creatina,
          sangre: form_biometria.sangre,
          proteinas: form_biometria.proteinas,
          microalbumina: form_biometria.microalbumina,
          leucocitos: form_biometria.leucocitos,
          glucosa: form_biometria.glucosa,
          urubilinogeno: form_biometria.urubilinogeno,
          cetonas: form_biometria.cetonas,
          nitritos: form_biometria.nitritos,
          bilirrubinas: form_biometria.bilirrubinas,

          celulas_redondas: form_biometria.celulas_redondas,
          celulas_pavimentosas: form_biometria.celulas_pavimentosas,
          piocitos: form_biometria.piocitos,
          hematies: form_biometria.hematies,
          bacterias: form_biometria.bacterias,
          moco: form_biometria.moco,

        }),
      }).then((res) => {
        if (res.ok) {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Se edito correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/material/ver_examenes');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo editar',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  return (
    <div>

      <ValidatorForm autoComplete="off">


        <SimpleCard title="Datos del paciente">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="nombres"
                label="Nombres"
                onChange={handleChange_biometria}
                value={form_biometria.nombres_usuario}
              />

              <TextField
                type="text"
                name="codigo"
                label="Código"
                onChange={handleChange_biometria}
                value={form_biometria.codigo}
              />
              <TextField
                type="text"
                name="sexo"
                label="Sexo"
                onChange={handleChange_biometria}
                value={form_biometria.sexo}
              />

            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>


              <TextField
                type="text"
                name="edad"
                label="Edad"
                onChange={handleChange_biometria}
                value={form_biometria.edad}
              />
              <TextField
                type="date"
                name="fecha"
                // label="Fecha"
                onChange={handleChange_biometria}
                value={form_biometria.fecha}
              />
            </Grid>
          </Grid>
        </SimpleCard>


        <br></br>
        <SimpleCard title="Éxamen Físico">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="color"
                label="Color"
                onChange={handleChange_biometria}
                value={form_biometria.color}
              />

              <TextField
                type="text"
                name="aspecto"
                label="Aspecto"
                onChange={handleChange_biometria}
                value={form_biometria.aspecto}
              />

            </Grid>


          </Grid>
        </SimpleCard>
        <br></br>
        <SimpleCard title="Éxamen Químico">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

              <SimpleCard title="Resultado">
                <TextField
                  type="text"
                  name="densidad_especifica"
                  label="Densidad especifica"
                  onChange={handleChange_biometria}
                  value={form_biometria.densidad_especifica}
                />
                <TextField
                  type="text"
                  name="ph"
                  label="PH"
                  onChange={handleChange_biometria}
                  value={form_biometria.ph}
                />
                <TextField
                  type="text"
                  name="creatina"
                  label="Creatina"
                  onChange={handleChange_biometria}
                  value={form_biometria.creatina}
                />
                <TextField
                  type="text"
                  name="sangre"
                  label="Sangre"
                  onChange={handleChange_biometria}
                  value={form_biometria.sangre}
                />
                <TextField
                  type="text"
                  name="proteinas"
                  label="Proteinas"
                  onChange={handleChange_biometria}
                  value={form_biometria.proteinas}
                />
                <TextField
                  type="text"
                  name="microalbumina"
                  label="Microalbumina"
                  onChange={handleChange_biometria}
                  value={form_biometria.microalbumina}
                />
                <TextField
                  type="text"
                  name="leucocitos"
                  label="Leucocitos"
                  onChange={handleChange_biometria}
                  value={form_biometria.leucocitos}
                />
                <TextField
                  type="text"
                  name="glucosa"
                  label="Glucosa"
                  onChange={handleChange_biometria}
                  value={form_biometria.glucosa}
                />
                <TextField
                  type="text"
                  name="urubilinogeno"
                  label="Urubilinogeno"
                  onChange={handleChange_biometria}
                  value={form_biometria.urubilinogeno}
                />
                <TextField
                  type="text"
                  name="cetonas"
                  label="Cetonas"
                  onChange={handleChange_biometria}
                  value={form_biometria.cetonas}
                />
                <TextField
                  type="text"
                  name="nitritos"
                  label="Nitritos"
                  onChange={handleChange_biometria}
                  value={form_biometria.nitritos}
                />
                <TextField
                  type="text"
                  name="bilirrubinas"
                  label="Bilirrubinas"
                  onChange={handleChange_biometria}
                  value={form_biometria.bilirrubinas}
                />

                <br />
                <br />

              </SimpleCard>
            </Grid>


            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <SimpleCard title="Valores de referencia">
                <h3 style={color_text}> - </h3>
                <h3 style={color_text}> - </h3>
                <h3 style={color_text}>&lt; a 50 mg/dl negativo </h3>
                <h3 style={color_text}>Negativo</h3>
                <h3 style={color_text}>&lt; a 30 mg/dl negativo </h3>
                <h3 style={color_text}>&lt; a 30 mg/dl negativo </h3>
                <h3 style={color_text}>Negativo</h3>
                <h3 style={color_text}>Negativo</h3>
                <h3 style={color_text}>&lt; a 0.9 mg/dl negativo </h3>

                <h3 style={color_text}>Negativo</h3>
                <h3 style={color_text}>Negativo</h3>
                <h3 style={color_text}>Negativo</h3>



              </SimpleCard>
            </Grid>



          </Grid>
        </SimpleCard>
        <br /> <br />
        <SimpleCard title="Éxamen Microscopico">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

              <SimpleCard title="Resultado">
                <TextField
                  type="text"
                  name="celulas_redondas"
                  label="Células redondas"
                  onChange={handleChange_biometria}
                  value={form_biometria.celulas_redondas}
                />
                <TextField
                  type="text"
                  name="celulas_pavimentosas"
                  label="Células pavimentosas"
                  onChange={handleChange_biometria}
                  value={form_biometria.celulas_pavimentosas}
                />
                <TextField
                  type="text"
                  name="piocitos"
                  label="Piocitos"
                  onChange={handleChange_biometria}
                  value={form_biometria.piocitos}
                />
                <TextField
                  type="text"
                  name="hematies"
                  label="Hematies"
                  onChange={handleChange_biometria}
                  value={form_biometria.hematies}
                />
                <TextField
                  type="text"
                  name="bacterias"
                  label="Bacterias"
                  onChange={handleChange_biometria}
                  value={form_biometria.bacterias}
                />
                <TextField
                  type="text"
                  name="moco"
                  label="Moco"
                  onChange={handleChange_biometria}
                  value={form_biometria.moco}
                />

                <br />
                <br />

              </SimpleCard>
            </Grid>


            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <SimpleCard title="Valores de referencia">
                <h3 style={color_text}>/campo</h3>
                <h3 style={color_text}>/campo</h3>
                <h3 style={color_text}>/campo</h3>
                <h3 style={color_text}>/campo</h3>
                <h3 style={color_text}> - </h3>
                <h3 style={color_text}> - </h3>

              </SimpleCard>
            </Grid>



          </Grid>
        </SimpleCard>
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={editar_examen}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Editar Examen</Span>
        </Button>

      </ValidatorForm>

    </div>
  );
};

export default EditarOrina;
