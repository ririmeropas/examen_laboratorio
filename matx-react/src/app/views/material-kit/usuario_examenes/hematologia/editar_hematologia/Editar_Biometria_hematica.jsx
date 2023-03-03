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
import { useNavigate,useParams } from "react-router-dom";
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


const Editar_Biometria_hematica = (props) => {
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
    WBC: "",
    LYM: "",
    MON: "",
    GRA: "",
    LYM_P: "",
    MON_P: "",
    GRA_P: "",

    RBC: "",
    HGB: "",
    HCT: "",

    MCV: "",
    MCH: "",
    MCHC: "",
    RDWC: "",

    PLT: "",
    PCT: "",
    PDW: "",

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

  const mostrar_examenes = () => {
    fetch(
      `http://localhost:8000/api/mostrar_usuario_examen/${id_examen}`
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

  useEffect(() => {
    // mostrarUsuarios();
    mostrar_examenes();
  }, []);

  const editar_examen = () => {
    Swal.fire({
      title: "CARGANDO...",
      html: "Espera mientras editamos..",
    });
    Swal.showLoading();
    fetch(
      `http://localhost:8000/api/editar_examen_hematologia/${id_examen}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          WBC: form_biometria.WBC,
          LYM: form_biometria.LYM,
          MON: form_biometria.MON,
          GRA: form_biometria.GRA,
          LYM_P: form_biometria.LYM_P,
          MON_P: form_biometria.MON_P,
          GRA_P: form_biometria.GRA_P,

          RBC: form_biometria.RBC,
          HGB: form_biometria.HGB,
          HCT: form_biometria.HCT,

          MCV: form_biometria.MCV,
          MCH: form_biometria.MCH,
          MCHC: form_biometria.MCHC,
          RDWC: form_biometria.RDWC,

          PLT: form_biometria.PLT,
          PCT: form_biometria.PCT,
          PDW: form_biometria.PDW,

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
        {/* <div className="form-col-container">
          <TextFieldbus
            type="text"
            name="buscador"
            label="Ingrese un número de cédula"
            onChange={handlechan}
            value={txtbuscar}
            autocomplete="off"
            className="form-plan-input"

            onFocus={() => {
              setIsMyInputFocus(true)
              setcontenedor(true)
            }}
          />
          <div className={contenedor ? "form-col-container-planes active" : "form-col-container-planes desactive"}>
            <div>
              <div className="content_list_button_planes">
                {usuarios_bus &&
                  usuarios_bus.map((item, index) => {
                    return (
                      <button value={item.id_usuario} key={index}

                        onClickCapture={() => {
                          console.log("ITEM: " + item.nombres)
                          // setporcentaje(item.porcentaje);
                          setbuscar(item.nombres);
                          setcontenedor(false);
                          console.log("CONTENEDOR: " + contenedor)
                          // form.id_planes_cuentas_contables = item.value;
                          console.log("ID PLANES: " + item.value)
                          form_biometria.id_usuario = item.value;
                          form_biometria.nombres = item.nombres;
                          form_biometria.codigo = item.codigo;
                          form_biometria.sexo = item.sexo;
                          form_biometria.edad = item.edad;
                          // form.codigo_sri_impuesto = item.codigo
                        }}>

                        {item.nombres}
                      </button>
                    );
                  })}
              </div>

            </div>
          </div>
        </div> */}

        <SimpleCard title="Datos del paciente">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                type="text"
                name="nombres_usuario"
                label="Nombres"
                disabled
                onChange={handleChange_biometria}
                value={form_biometria.nombres_usuario}
              />

              <TextField
                type="text"
                name="codigo"
                label="Código"
                disabled
                onChange={handleChange_biometria}
                value={form_biometria.codigo}
              />
              <TextField
                type="text"
                name="sexo"
                label="Sexo"
                disabled
                onChange={handleChange_biometria}
                value={form_biometria.sexo}
              />

            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>


              <TextField
                type="text"
                name="edad"
                label="Edad"
                disabled
                onChange={handleChange_biometria}
                value={form_biometria.edad}
              />
              <TextField
                type="date"
                name="fecha"
                // label="Fecha"
                disabled
                onChange={handleChange_biometria}
                value={form_biometria.fecha}
              />
            </Grid>
          </Grid>
        </SimpleCard>

        <br></br>
        <SimpleCard title="Biometría Automática Automatizada">
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

              <SimpleCard title="Resultado">
                <TextField
                  type="text"
                  name="WBC"
                  label="WBC 10^9/mm³"
                  onChange={handleChange_biometria}
                  value={form_biometria.WBC}
                />
                <TextField
                  type="text"
                  name="LYM"
                  label="LYM 10^9/mm³"
                  onChange={handleChange_biometria}
                  value={form_biometria.LYM}
                />
                <TextField
                  type="text"
                  name="MON"
                  label="MON 10^9/mm³"
                  onChange={handleChange_biometria}
                  value={form_biometria.MON}
                />
                <TextField
                  type="text"
                  name="GRA"
                  label="GRA 10^9/mm³"
                  onChange={handleChange_biometria}
                  value={form_biometria.GRA}
                />
                <TextField
                  type="text"
                  name="LYM_P"
                  label="LYM %"
                  onChange={handleChange_biometria}
                  value={form_biometria.LYM_P}
                />
                <TextField
                  type="text"
                  name="MON_P"
                  label="MON %"
                  onChange={handleChange_biometria}
                  value={form_biometria.MON_P}
                />
                <TextField
                  type="text"
                  name="GRA_P"
                  label="GRA %"
                  onChange={handleChange_biometria}
                  value={form_biometria.GRA_P}
                />
                <br /> <br />
                <TextField
                  type="text"
                  name="RBC"
                  label="RBC 10^9/mm³"
                  onChange={handleChange_biometria}
                  value={form_biometria.RBC}
                />
                <TextField
                  type="text"
                  name="HGB"
                  label="HGB g/dl"
                  onChange={handleChange_biometria}
                  value={form_biometria.HGB}
                />
                <TextField
                  type="text"
                  name="HCT"
                  label="HCT %"
                  onChange={handleChange_biometria}
                  value={form_biometria.HCT}
                />

                <br /> <br />
                <TextField
                  type="text"
                  name="MCV"
                  label="MCV FI"
                  onChange={handleChange_biometria}
                  value={form_biometria.MCV}
                /><TextField
                  type="text"
                  name="MCH"
                  label="MCH pg"
                  onChange={handleChange_biometria}
                  value={form_biometria.MCH}
                /><TextField
                  type="text"
                  name="MCHC"
                  label="MCHC g/dl"
                  onChange={handleChange_biometria}
                  value={form_biometria.MCHC}
                /><TextField
                  type="text"
                  name="RDWC"
                  label="RDWC %"
                  onChange={handleChange_biometria}
                  value={form_biometria.RDWC}
                />
                <br />
                <br />
                <TextField
                  type="text"
                  name="PLT"
                  label="PLT 10^9/mm³"
                  onChange={handleChange_biometria}
                  value={form_biometria.PLT}
                /> <TextField
                  type="text"
                  name="PCT"
                  label="PCT %"
                  onChange={handleChange_biometria}
                  value={form_biometria.PCT}
                /> <TextField
                  type="text"
                  name="PDW"
                  label="PDW"
                  onChange={handleChange_biometria}
                  value={form_biometria.PDW}
                />
              </SimpleCard>
            </Grid>


            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <SimpleCard title="Valores de referencia">
                {/* <Text_label
                  type="text"
                  label="4,5 - 13"
                /> */}
                <h3 style={color_text}>4,5 - 13</h3>
                <h3 style={color_text}>1 A 7</h3>
                <h3 style={color_text}>0 - 1</h3>
                <h3 style={color_text}>1,1 - 6,6</h3>
                <h3 style={color_text}>38 - 42</h3>
                <h3 style={color_text}>0 - 9</h3>
                <h3 style={color_text}>31 - 51</h3>
                <br />
                <h3 style={color_text}>4,1 - 5,3</h3>
                <h3 style={color_text}>12 A 16</h3>
                <h3 style={color_text}>36 - 45</h3>
                <br />
                <h3 style={color_text}>80 - 99</h3>
                <h3 style={color_text}>27 - 34</h3>
                <h3 style={color_text}>33 - 37</h3>
                <h3 style={color_text}>10 - 16,5</h3>
                <br />
                <h3 style={color_text}>130 - 450</h3>
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

export default Editar_Biometria_hematica;
