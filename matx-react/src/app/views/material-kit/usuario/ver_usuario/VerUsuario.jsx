import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));



const VerUsuario = () => {

  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  //OBTENER DATOS DE USUARIOS
  const mostrarUsuarios = () => {
    fetch(
      `http://localhost:8000/api/Mostar_usuario_admin`
    )
      .then((res) => res.json())
      .then((datos_usuarios) => {
        setUsuarios(datos_usuarios);
        console.log(datos_usuarios);
      });
  };

  const eliminar_usuario =(id_usuario)=>{
    Swal.fire({
      title: 'Seguro desea Eliminar?',
      text: "Esta accion no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    })
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })
    .then((respuesta) => {
      if (respuesta.isConfirmed) {
        fetch(`http://localhost:8000/api/eliminar_usuario/${id_usuario}`, 
        { method: "DELETE" }).then((res) => {
          if (res.ok) {
            Swal.fire({
              text: "El registro se elimino",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
            mostrarUsuarios();
          } else {
            Swal.fire({
              text: "El registro NO elimino",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  }
  const editar_usuario=(id_usuario)=>{
    navigate(`/material/editar_usuario/${id_usuario}`);
  }
  useEffect(() => {
    mostrarUsuarios();
  }, []);

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombres</TableCell>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Cédula</TableCell>
            <TableCell align="center">Correo</TableCell>
            <TableCell align="center">Teléfono</TableCell>
            {/* <TableCell align="center">Amount</TableCell> */}
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {usuarios.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="left">{item.nombres}</TableCell>
              <TableCell align="center">{item.apellidos}</TableCell>
              <TableCell align="center">{item.cedula}</TableCell>
              <TableCell align="center">{item.correo}</TableCell>
              {/* <TableCell align="center">{subscriber.status}</TableCell> */}
              <TableCell align="center">{item.telefono}</TableCell>
              <TableCell align="center">

                {/* <Button>
                  <Tooltip title="Editar">
                    <Edit style={{ color: '#3a86ff' }}></Edit>
                  </Tooltip>

                  {/* <Edit style={{ color: '#3a86ff' }}
                  >Editar</Edit> 
                </Button> */}


                <Button onClick={() => editar_usuario(item.id_usuario)} >
                  <Tooltip title="Editar">
                  <Edit style={{ color: '#3a86ff' }}></Edit>
                  </Tooltip>
                </Button>
                <Button onClick={() => eliminar_usuario(item.id_usuario)} >
                  <Tooltip title="Eliminar">
                    <Icon  color="error">close</Icon>
                  </Tooltip>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default VerUsuario;
