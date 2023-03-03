import { Edit } from "@mui/icons-material";
import RefreshIcon from '@mui/icons-material/Refresh';
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
import { SimpleCard } from "app/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./estilos_busqueda.css";
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
  //Para el buscador
  const [contenedor, setcontenedor] = useState(false);
  const [isMyInputFocus, setIsMyInputFocus] = useState(false);
  const [txtbuscar, setbuscar] = useState("");
  const [usuarios_bus, setUsuarios_bus] = useState([]);
  const [backusuarios, setbackusuarios] = useState([]);
  //OBTENER DATOS DE USUARIOS
  const mostrarUsuarios = () => {
    fetch(
      `http://localhost:8000/api/Mostar_usuario_admin`
    )
      .then((res) => res.json())
      .then((datos_usuarios) => {
        setUsuarios(datos_usuarios);
        setUsuarios_bus(datos_usuarios);
        setbackusuarios(datos_usuarios);
        console.log(datos_usuarios);
      });
  };

  const eliminar_usuario = (id_usuario) => {
    Swal.fire({
      title: 'Seguro desea Eliminar?',
      text: "Esta accion no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    })
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
  const editar_usuario = (id_usuario) => {
    navigate(`/material/editar_usuario/${id_usuario}`);
  }
  const handlechan = e => {
    setbuscar(e.target.value);
    filtrar(e.target.value);
    console.log("busqueda: " + e.target.value);
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = backusuarios.filter((elemento) => {

      if (String(elemento.nombres).toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || String(elemento.cedula).toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        // || String(elemento.apellidos).toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ) {
        console.log(elemento)
        return elemento;
      }
    });

    setUsuarios_bus(resultadosBusqueda);
  }

  const refrescar = () => {
    mostrarUsuarios();
  }
  const handleFocus = () => {
    setIsMyInputFocus(true);
  };
  const mostrarUsuarioUnico = (usuario_unico) => {
    fetch(
      `http://localhost:8000/api/Mostar_usuario_unico/${usuario_unico}`
    )
      .then((res) => res.json())
      .then((datos_usuarios) => {
        // setUsuarios(datos_usuarios);
        setUsuarios(datos_usuarios);
        console.log("USUARIO UNICO");
        console.log(datos_usuarios);
      });
  };

  useEffect(() => {
    mostrarUsuarios();
  }, []);

  return (
    <Box width="100%" overflow="auto">
      <SimpleCard title="Buscar cliente">
        <div className="form-col-container">
          <input
            type="text"
            name="buscador"
            placeholder="Cédula"
            onChange={handlechan}
            value={txtbuscar}
            autocomplete="off"
            className="form-plan-input"
            onFocus={handleFocus}
          />
          <Button onClick={() => refrescar()} >
            <Tooltip title="Recargar">
              <RefreshIcon style={{ color: '#3a86ff' }}></RefreshIcon>
            </Tooltip>
          </Button>

          <div className={isMyInputFocus ? "form-col-container-planes active" : "form-col-container-planes desactive"}>
            <div>
              <div className="content_list_button_planes">
                {Array.isArray(usuarios_bus) && usuarios_bus.map((item, index) => {
                  return (
                    <button value={item.id_usuario} key={index}

                      onClickCapture={() => {
                        console.log("ITEM: " + item.nombres)
                        setbuscar(item.nombres);
                        setcontenedor(false);
                        setIsMyInputFocus(false);
                        console.log("CONTENEDOR: " + contenedor)
                        console.log("ID PLANES: " + item.id_usuario)
                        mostrarUsuarioUnico(item.id_usuario);
                      }}>
                      {item.nombres +" "+ item.apellidos}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </SimpleCard>
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

          {
            Array.isArray(usuarios) && usuarios.map((item) => (
              <TableRow key={item.id_usuario}>
                <TableCell align="left">{item.nombres}</TableCell>
                <TableCell align="center">{item.apellidos}</TableCell>
                <TableCell align="center">{item.cedula}</TableCell>
                <TableCell align="center">{item.correo}</TableCell>
                <TableCell align="center">{item.telefono}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => editar_usuario(item.id_usuario)} >
                    <Tooltip title="Editar">
                      <Edit style={{ color: '#3a86ff' }}></Edit>
                    </Tooltip>
                  </Button>
                  <Button onClick={() => eliminar_usuario(item.id_usuario)} >
                    <Tooltip title="Eliminar">
                      <Icon color="error">close</Icon>
                    </Tooltip>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default VerUsuario;
