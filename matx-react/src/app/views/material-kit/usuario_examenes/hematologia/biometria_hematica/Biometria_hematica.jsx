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
import { MatxSearchBox } from "app/components";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Biometria_hematica = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ date: new Date() });

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
    // primer_nombre: "",
    // primer_apellido: "",
    // segundo_nombre: "",
    // segundo_apellido: "",
    telefono: "",
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

  const crear_usuario = () => {
    Swal.fire({
      title: "CARGANDO...",
      html: "Espera mientras creamos tu usuario",
    });
    Swal.showLoading();
    fetch(
      `http://localhost:8000/api/crear_usuario`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          cedula: form_usuario.cedula,
          nombres: form_usuario.nombres,
          apellidos: form_usuario.apellidos,
          telefono: form_usuario.telefono,
          correo: form_usuario.correo,
          contrasena: form_usuario.cedula,
          tipo_usuario: "U"
        }),
      }).then((res) => {
        if (res.ok) {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Se registro correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/material/ver_usuario')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo registrar',
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

  return (
    <div>

      <ValidatorForm>
        <TextField
          type="text"
          name="nombres"
          label="buscador"
          onChange={handleChange_usuario}
          value={form_usuario.nombres}
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
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
              label="Histotia clínica"
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

            {/* <TextField
              sx={{ mb: 4 }}
              type="number"
              name="creditCard"
              label="Credit Card"
              onChange={handleChange}
              value={creditCard || ""}
              errorMessages={["this field is required"]}
              validators={["required", "minStringLength:16", "maxStringLength: 16"]}
            /> */}
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>


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


            {/* <RadioGroup
              row
              name="gender"
              sx={{ mb: 2 }}
              value={gender || ""}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Male"
                label="Male"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Female"
                label="Female"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup> */}

            {/* <FormControlLabel
              control={<Checkbox />}
              label="I have read and agree to the terms of service."
            /> */}
          </Grid>
        </Grid>

        <Button
          color="primary"
          variant="contained"
          onClick={crear_usuario}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Registrar</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default Biometria_hematica;
