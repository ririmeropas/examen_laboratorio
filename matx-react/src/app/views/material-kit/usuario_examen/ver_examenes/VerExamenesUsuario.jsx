import { Edit } from "@mui/icons-material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
import { Span } from "app/components/Typography";
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

const input_estilo ={
  cursor: "pointer",
    padding: "3px"
};

const VerExamenesUsuario = () => {

  const [examenes, setexamenes] = useState([]);
  const navigate = useNavigate();
  const [url_back, seturl] = useState('');
  const usuario_local = JSON.parse(localStorage.getItem("usuario"));
  //OBTENER DATOS DE USUARIOS
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);


  const mostrarExamenes = () => {
    fetch(
      `http://localhost:8000/api/Mostar_examens_usuario/${usuario_local.id_usuario}`
    )
      .then((res) => res.json())
      .then((datos_examenes) => {
        setexamenes(datos_examenes);

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
  const crear_pdf = (id_examen, tipo_examen, id_usuario, id_admin, fecha) => {
    Swal.showLoading();
    fetch(
      `http://localhost:8000/api/crear_pdf_hematologia`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_admin: id_admin,
          id_usuario: id_usuario,
          id_examen: id_examen,
          tipo_examen: tipo_examen,
          fecha: fecha,
        }),
      }
    ).then((res) => res.json())
      .then((res_reporte) => {
        console.log(res_reporte.url);
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
      })
  }

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
  useEffect(() => {
    mostrarExamenes();
  }, []);

  return (
    <Box width="100%" overflow="auto">
       <SimpleCard title="">
        <div className="form-col-container">
         
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}>

            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Crear PDF  </Span>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}></Span>
            <PictureAsPdfIcon>   </PictureAsPdfIcon>
          </Button>
          
        </div>
      </SimpleCard>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Tipo</TableCell>
            {/* <TableCell align="center">Correo</TableCell>
            <TableCell align="center">Teléfono</TableCell> */}
            {/* <TableCell align="center">Amount</TableCell> */}
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {examenes.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="left">{item.fecha}</TableCell>
              <TableCell align="center">{item.nombres}</TableCell>
              <TableCell align="center">{item.tipo_examen}</TableCell>
              <TableCell align="center">
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
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default VerExamenesUsuario;
