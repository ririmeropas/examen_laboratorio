import { Edit } from "@mui/icons-material";
import RefreshIcon from '@mui/icons-material/Refresh';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
import "./estilos_busqueda.css"
import Modal from './Modal';
import ModalBiometria from './ModalBiometria';
import './Modal.css';
import { Span } from "app/components/Typography";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const input_estilo = {
  cursor: "pointer",
  padding: "3px"
};

const VerExamenes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenbiometria, setIsModalOpenbiometria] = useState(false);
  const [data, setData] = useState({
    title: 'Modal Title',
    content: 'Modal Content'
  });
  const [examenes, setexamenes] = useState([]);
  const navigate = useNavigate();
  const [datamodal, setdatamodal] = useState(null);
  const [nombre, setnombre] = useState(null);
  // const [usuario_unico, setusuario_unico] = useState('');
  const [checkedFilter, setCheckedFilter] = useState(true);
  //VARIABLES PARA EL BUSCADOR
  //Para el buscador
  const [contenedor, setcontenedor] = useState(false);
  const [isMyInputFocus, setIsMyInputFocus] = useState(false);
  const [txtbuscar, setbuscar] = useState("");
  const [usuarios_bus, setUsuarios_bus] = useState([]);
  const [backusuarios, setbackusuarios] = useState([]);

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  //OBTENER DATOS DE USUARIOS
  const mostrarExamenes = () => {
    fetch(
      `http://localhost:8000/api/Mostar_examens`
    )
      .then((res) => res.json())
      .then((datos_examenes) => {
        setexamenes(datos_examenes);
        console.log("VARIABLE EXAMENES")
        console.log(examenes);
      });

  };

  const editar_examen = (id_examen, tipo_examen) => {
    console.log("ver examen id: " + id_examen);
    console.log(tipo_examen);

    if (tipo_examen === "hematologia") {
      navigate(`/material/editar_biometria_hematica/${id_examen}`);
    }
    if (tipo_examen === "orina") {
      navigate(`/material/editar_orina/${id_examen}`);
    }

  }
  // const crear_pdf = (id_examen, tipo_examen, id_usuario, id_admin, fecha) => {
  //   Swal.fire({
  //     title: "CARGANDO...",
  //     html: "Espera mientras creamos tu PDF",
  //   });
  //   Swal.showLoading();
  //   fetch(
  //     `http://localhost:8000/api/crear_pdf_hematologia`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id_admin: id_admin,
  //         id_usuario: id_usuario,
  //         id_examen: id_examen,
  //         tipo_examen: tipo_examen,
  //         fecha: fecha,
  //       }),
  //     }
  //   ).then((res) => res.json())
  //     .then((res_reporte) => {
  //       console.log(res_reporte.url);
  //       Swal.close();
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Ok',
  //         footer:
  //           `<a class="btn-crear-pdf" download="reporte_pdf.pdf" target = "_blank" href="http://localhost:8000/${res_reporte.url}">Abrir PDF</a> `,
  //         text: res_reporte.mensaje,
  //         showConfirmButton: false,
  //         // timer: 1500
  //       });
  //     })
  // }

  const eliminar_examen = (id_examen, tipo_examen) => {

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
          fetch(`http://localhost:8000/api/eliminar_examen_${tipo_examen}/${id_examen}`,
            { method: "DELETE" }).then((res) => {
              if (res.ok) {
                Swal.fire({
                  text: "El registro se elimino",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });
                mostrarExamenes();
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

  const mostrarExamenesunicos = (usuario_unico) => {
    setProductosSeleccionados([]);
    fetch(
      `http://localhost:8000/api/Mostar_examens_usuario/${usuario_unico}`
    )
      .then((res) => res.json())
      .then((datos_examenes) => {
        setexamenes(datos_examenes);

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
  const mostrarUsuarios = () => {
    fetch(
      `http://localhost:8000/api/Mostar_usuario_admin`
    )
      .then((res) => res.json())
      .then((datos_usuarios) => {

        let opciones_usuarios = [];
        datos_usuarios.map((item) => {
          opciones_usuarios.push({
            value: item.id_usuario,
            nombres:
              item.nombres +
              " " +
              item.apellidos,
            cedula: item.cedula,
            codigo: item.codigo,
            edad: item.edad,
            sexo: item.sexo,
          });
        });
        setUsuarios_bus(opciones_usuarios);
        setbackusuarios(opciones_usuarios);
        console.log(opciones_usuarios);
      });
  };
  const refrescar = () => {
    setProductosSeleccionados([]);
    setexamenes([]);
    mostrarExamenes();
  }

  const handleOpenModal = (id_examen, tipo_examen,nombre) => {
    if (tipo_examen === "hematologia") {
      setnombre(nombre);
      setdatamodal(id_examen);
      setIsModalOpenbiometria(true);

    }
    if (tipo_examen === "orina") {
      setnombre(nombre);
      setdatamodal(id_examen);
      setIsModalOpen(true);

    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpenbiometria(false);
  };

  useEffect(() => {
    mostrarUsuarios();
    mostrarExamenes();
  }, []);
  const handleFocus = () => {
    setIsMyInputFocus(true);
  };

  const handleBlur = () => {
    setIsMyInputFocus(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "CARGANDO...",
      html: "Espera mientras creamos tu PDF",
    });
    Swal.showLoading();
    const data = {
      examenes: productosSeleccionados.reduce((acc, producto, i) => {
        acc[i] = producto;
        return acc;
      }, {}),
    };
    if (Object.keys(data.examenes).length === 0) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Seleccione al menos un examen',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:8000/api/crear_pdf_hematologia", requestOptions)
      .then((res) => res.json())
      .then((res_reporte) => {
        console.log(res_reporte.url);
        if (res_reporte.status === "ok") {

          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Ok',
            footer:
              `<a class="btn-crear-pdf" download="reporte_pdf.pdf" target = "_blank" href="http://localhost:8000/${res_reporte.url}">Abrir PDF</a> `,
            text: res_reporte.mensaje,
            showConfirmButton: false,
            // timer: 1500
          });
          console.log("DATA");
          console.log(data);
          setProductosSeleccionados([]);
          console.log("PRODUCTOS SELECCIONADOS");
          console.log(productosSeleccionados);
          // setexamenes([]);
          // mostrarExamenes();
         
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo registrar',
            showConfirmButton: false,
            timer: 1500
          });
        }

      })
      .catch((error) => console.log(error));

  };

  const handleCheckboxChange = (e) => {

    const productoId = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      const item = examenes.find((p) => p.id_examen === parseInt(productoId));
      console.log("EXAMENES CHECKBOX-->");
      console.log(item);
      setProductosSeleccionados([
        ...productosSeleccionados,
        {
          id_examen: item.id_examen,
          tipo_examen: item.tipo_examen,
          id_usuario: item.id_usuario,
          id_admin: item.id_admin,
          fecha: item.fecha
        },
      ]);
    } else {
      const newProductosSeleccionados = productosSeleccionados.filter(
        (p) => p.id !== parseInt(productoId)
      );
      setProductosSeleccionados(newProductosSeleccionados);
    }
  };

  return (
    <Box width="100%" overflow="auto">
      <SimpleCard title="Buscar cliente">
        <div className="form-col-container">

          <input
            type="text"
            name="buscador"
            placeholder="Cédula o Nombre"
            onChange={handlechan}
            value={txtbuscar}
            autocomplete="off"
            className="form-plan-input"

            // onFocus={() => {
            //   setIsMyInputFocus(true)
            //   setcontenedor(true)
            // }}
            // onBlur={()=>{
            //   setIsMyInputFocus(false)
            //   setcontenedor(false)
            // }}
            onFocus={handleFocus}
          // onBlur={handleBlur}
          />
          <Button onClick={() => refrescar()} >
            <Tooltip title="Recargar">
              <RefreshIcon style={{ color: '#3a86ff' }}></RefreshIcon>
            </Tooltip>
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}>

            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Crear PDF  </Span>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}></Span>
            <PictureAsPdfIcon>   </PictureAsPdfIcon>
          </Button>
          <div className={isMyInputFocus ? "form-col-container-planes active" : "form-col-container-planes desactive"}>
            <div>
              <div className="content_list_button_planes">
                {usuarios_bus &&
                  usuarios_bus.map((item, index) => {
                    return (
                      <button value={item.id_usuario} key={index}

                        onClickCapture={() => {
                          console.log("ITEM: " + item.nombres)
                          setbuscar(item.nombres);
                          setcontenedor(false);
                          setIsMyInputFocus(false);
                          console.log("CONTENEDOR: " + contenedor)
                          console.log("ID PLANES: " + item.value)
                          mostrarExamenesunicos(item.value);

                        }}>
                        {item.nombres}
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
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Laboratorista</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Tipo</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {examenes.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="left">{item.fecha}</TableCell>
              <TableCell align="left">{item.nombres_admin}</TableCell>
              <TableCell align="center">{item.nombres}</TableCell>
              <TableCell align="center">{item.tipo_examen}</TableCell>
              <TableCell align="center">



                <Button onClick={() => editar_examen(item.id_examen, item.tipo_examen)} >
                  <Tooltip title="Editar">
                    <Edit style={{ color: '#3a86ff' }}></Edit>
                  </Tooltip>
                </Button>
                <Button onClick={() => eliminar_examen(item.id_examen, item.tipo_examen)} >
                  <Tooltip title="Eliminar">
                    <Icon color="error">close</Icon>
                  </Tooltip>
                </Button>
                <Button onClick={() => handleOpenModal(item.id_examen, item.tipo_examen,item.nombres)} >
                  <Tooltip title="Visualizar">
                    <RemoveRedEyeIcon style={{ color: '#3a86ff' }}></RemoveRedEyeIcon>
                  </Tooltip>
                </Button>
                <Tooltip title="Seleccionar">
                  <input
                    style={input_estilo}
                    type="checkbox"
                    id={`producto${item.id_examen}`}
                    value={item.id_examen}
                    onChange={handleCheckboxChange}
                  // checked={checkedFilter}
                  />
                </Tooltip>


              </TableCell>
            </TableRow>
          ))}
          {isModalOpenbiometria && <ModalBiometria closeModal={handleCloseModal} id_examen={datamodal} nombre={nombre}/>}
          {isModalOpen && <Modal closeModal={handleCloseModal} id_examen={datamodal} nombre={nombre} />}

        </TableBody>
      </StyledTable>
      {/* <Modal showModal={showModal}/> */}
    </Box>

  );
};

export default VerExamenes;
