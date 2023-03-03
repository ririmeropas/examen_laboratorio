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
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Editar_usuario = (props) => {
  const navigate = useNavigate();
  const { id_usuario } = useParams();
  const [state, setState] = useState({ date: new Date() });
  const [usuarios, setUsuarios] = useState([]);

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

  const usuario_login = {
    cedula: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    edad: "",
    codigo: "",
    sexo: "",
    correo: "",
    contrasena: "",
    tipo_usuario: "U"
  };
  const [form_usuario, setFormusuario_empresa] =
    useState(usuario_login);

  //USUARIO METODO PARA ESCUCHAR EL EVENTO 
  const handleChange_usuario = (e) => {
    setFormusuario_empresa({
      ...form_usuario,
      [e.target.name]: e.target.value,
    });
  };


  const mostrar_usuario = () => {
    fetch(
      `http://localhost:8000/api/Mostar_usuario/${id_usuario}`
    )
      .then((res) => res.json())
      .then((datos_usuarios) => {
        setFormusuario_empresa({
          ...form_usuario,
          cedula: datos_usuarios.cedula,
          nombres: datos_usuarios.nombres,
          apellidos: datos_usuarios.apellidos,
          telefono: datos_usuarios.telefono,
          edad: datos_usuarios.edad,
          codigo: datos_usuarios.codigo,
          sexo: datos_usuarios.sexo,
          correo: datos_usuarios.correo,
          contrasena: datos_usuarios.contrasena,
          tipo_usuario: datos_usuarios.tipo_usuario,
        });
        console.log(form_usuario);
      });
  }

  const editar_usuario = () => {
    Swal.fire({
      title: "CARGANDO...",
      html: "Espera mientras editammos..",
    });
    Swal.showLoading();
    fetch(
      `http://localhost:8000/api/editar_usuario/${id_usuario}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          cedula: form_usuario.cedula,
          nombres: form_usuario.nombres,
          apellidos: form_usuario.apellidos,
          telefono: form_usuario.telefono,
          edad: form_usuario.edad,
          codigo: form_usuario.codigo,
          sexo: form_usuario.sexo,
          correo: form_usuario.correo,
          contrasena: form_usuario.cedula,
          tipo_usuario: "U"
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
          navigate('/material/ver_usuario');
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

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    username,
    firstName,
    creditCard,
    mobile,
    password,
    confirmPassword,
    gender,
    date,
    email,
  } = state;

  useEffect(() => {
    mostrar_usuario();
  }, []);

  return (
    <div>
      <ValidatorForm>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="nombres"
              label="Nombres"
              onChange={handleChange_usuario}
              value={form_usuario.nombres}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="apellidos"
              label="Apellidos"
              onChange={handleChange_usuario}
              value={form_usuario.apellidos}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="cedula"
              label="Cedúla"
              onChange={handleChange_usuario}
              value={form_usuario.cedula}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="edad"
              label="Edad"
              onChange={handleChange_usuario}
              value={form_usuario.edad}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <TextField
              type="text"
              name="sexo"
              label="Sexo"
              onChange={handleChange_usuario}
              value={form_usuario.sexo}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="codigo"
              label="Código"
              onChange={handleChange_usuario}
              value={form_usuario.codigo}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="correo"
              label="Correo"
              onChange={handleChange_usuario}
              value={form_usuario.correo}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              type="text"
              name="telefono"
              label="Teléfono"
              onChange={handleChange_usuario}
              value={form_usuario.telefono}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />



          </Grid>
        </Grid>

        <Button
          color="primary"
          variant="contained"
          onClick={editar_usuario}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Editar</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default Editar_usuario;
