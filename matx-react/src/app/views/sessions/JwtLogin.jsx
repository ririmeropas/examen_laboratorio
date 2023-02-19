import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 700,
    minHeight: 200,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: 'jason@ui-lib.com',
  password: 'dummyPass',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (e) {

      setLoading(false);
    }
  };

  // const iniciar_sesion = () => {
  //   setLoading(false);
  //   navigate('/');
  // }

  //REGISTRO USUARIO
  const usuario_login = {
    txt_usuario: "",
    txt_pass: "",
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

  //METODOO PARA LOGIN
  const iniciar_sesion = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:8000/api/comprobar_usuario`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: form_usuario.txt_usuario,
          contrasena: form_usuario.txt_pass,
        }),
      }
    )
      .then((res) => res.json())
      .then((datos_usuario) => {
        console.log(datos_usuario);

        if (datos_usuario.status === "ok") {
          if (
            datos_usuario.usuario.correo ===
            form_usuario.txt_usuario &&
            datos_usuario.usuario.contrasena ===
            form_usuario.txt_pass
          ) {
            localStorage.setItem(
              "usuario",
              JSON.stringify({
                id_usuario: datos_usuario.usuario.id_usuario,
              })
            );
            navigate('/');
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Verifique los datos ',
          })
        }
      })
    // const respuesta = fetch(``, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: id,
    //     nombre: producto,
    //     descripcion: descripcion,
    //     contenido: contenido,
    //     precio: precio,
    //     costo: costo,
    //     stock: stock,
    //     id_tipo_impuesto: form.id_tipo_impuesto,
    //     id_tipo_producto: form.id_tipo_producto,
    //     Iva: iva,
    //   }),
    // }).then((res) => {
    //   if (res.ok) {
    //     swal({
    //       title: "OK",
    //       text: "LOS CAMBIOS FUERON GUARDADOS",
    //       icon: "success",
    //     });
    //     navigate("/products");
    //   } else {
    //     swal({
    //       title: "LO SENTIMOS!",
    //       text: "NO SE PUDO GUARDAR LA INFORMACIÓN,INTENTALO MÁS TARDE",
    //       icon: "error",
    //     });
    //   }
    // });
    // console.log(respuesta);
  };


  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>


          <Grid item sm={12} xs={12} >
            <ContentBox>
              <Grid item sm={12} xs={12}>
                <JustifyBox p={0} height="80%" sx={{ minWidth: 320 }}>
                  <img src="/assets/images/logos/logoexalab.png" width="70%" alt="" />
                </JustifyBox>
              </Grid>
              <TextField
                fullWidth
                size="small"
                type="email"
                name="txt_usuario"
                label="Correo"
                variant="outlined"
                // onBlur={handleBlur}
                value={form_usuario.txt_usuario}
                onChange={handleChange_usuario}
                // helperText={touched.email && errors.email}
                // error={Boolean(errors.email && touched.email)}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                size="small"
                name="txt_pass"
                type="password"
                label="Contraseña"
                variant="outlined"
                // onBlur={handleBlur}
                value={form_usuario.txt_pass}
                onChange={handleChange_usuario}
                // helperText={touched.password && errors.password}
                // error={Boolean(errors.password && touched.password)}
                sx={{ mb: 1.5 }}
              />

              <LoadingButton
                // type="submit"
                // color="primary"
                // loading={loading}
                variant="contained"
                onClick={iniciar_sesion}

              >
                Iniciar Sesión
              </LoadingButton>
              {/* <button onClick={iniciar_sesion}>
                  Iniciar Sesión
                </button> */}

            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
