import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Modal = ({ closeModal, id_examen, nombre }) => {

    const orina = {
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
    const [form_orina, setForm_orina] =
        useState(orina);

    const mostrar_examenes = () => {
        Swal.showLoading();
        fetch(
            `http://localhost:8000/api/mostrar_usuario_examen_orina/${id_examen}`
        )
            .then((res) => res.json())
            .then((datos_examen) => {
                console.log("datos_examens");
                // console.log(datos_examen[0]);
                // console.log(datos_examen[0].GRA);
                setForm_orina(datos_examen[0]);
                console.log(form_orina);
                Swal.close();
            });
    }
    useEffect(() => {
        mostrar_examenes();
    }, []);

    return (
        <div className="modal">
            <div className="modal-contenedor">
                <div className="modal-cabeza">
                    <h3>Examen de Orina</h3>
                    <button onClick={closeModal}>X</button>
                </div>
                <div class="contenedor2">
                    <img className='imagen' src="https://res.cloudinary.com/museoq/image/upload/v1675428608/samples/Chemistry_Lab_Chemical_Logo__2_-removebg-preview_huxf18.png"
                        alt="" />
                    <h1>LABORATORIO CLÍNICO</h1>
                </div>
                <table className='tabla'>

                    <thead >
                        <tr className="negrita">
                            <th> DATOS DEL PACIENTE </th>
                        </tr>
                        <tr className='negrita'>
                            <th className="datos_paciente"> Nombre: <span>{nombre}</span> </th>
                            <th className="datos_paciente"> Edad: <span>{form_orina.edad} años</span> </th>
                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> Código: <span>{form_orina.codigo}</span>  </th>
                            <th class="datos_paciente"> Fecha: <span>{form_orina.fecha}</span>  </th>

                        </tr>
                        <tr className="negrita">
                            <th></th>
                            <th>EXAMEN DE ORINA </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="negrita">
                            <th className="titulos" >ÉXAMEN FÍSICO </th>
                        </tr>

                        <tr className="negrita">
                            <th className="datos_paciente"> Color  </th>
                            <th className="datos_paciente"> <span>{form_orina.color}</span> </th>


                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Aspecto  </th>
                            <th className="datos_paciente"> <span>{form_orina.aspecto}</span></th>


                        </tr>
                        <tr className="negrita">
                            <th > ÉXAMEN QUÍMICO </th>
                        </tr>

                        <tr className="negrita">
                            <th > DATOS</th>
                            <th > RESULTADO </th>
                            <th > VALORES DE REFERENCIA </th>
                        </tr>


                        <tr className="negrita">
                            <th className="datos_paciente"> Densidad especifica  </th>
                            <th className="datos_paciente"> <span>{form_orina.densidad_especifica}</span> </th>
                            <th className="datos_paciente">  </th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> PH  </th>
                            <th className="datos_paciente"> <span>{form_orina.ph}</span> </th>
                            <th className="datos_paciente"> </th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Creatina </th>
                            <th className="datos_paciente"> <span>{form_orina.creatina}</span> </th>
                            <th className="datos_paciente"> &lt; a 50 mg/dl negativo </th>

                        </tr>

                        <tr className="negrita">
                            <th className="datos_paciente"> Sangre </th>
                            <th className="datos_paciente"> <span>{form_orina.sangre}</span> </th>
                            <th className="datos_paciente"> Negativo </th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Proteinas  </th>
                            <th className="datos_paciente"> <span>{form_orina.proteinas}</span> </th>
                            <th className="datos_paciente"> &lt; a 50 mg/dl negativo</th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Microalbumina</th>
                            <th className="datos_paciente"><span>{form_orina.microalbumina}</span> </th>
                            <th className="datos_paciente"> &lt; a 50 mg/dl negativo </th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Leucocitos</th>
                            <th className="datos_paciente">  <span>{form_orina.leucocitos}</span> </th>
                            <th className="datos_paciente"> Negativo</th>

                        </tr>

                        <tr className="negrita">
                            <th className="datos_paciente"> Glucosa  </th>
                            <th className="datos_paciente"> <span>{form_orina.glucosa}</span>  </th>
                            <th className="datos_paciente"> Negativo </th>

                        </tr>

                        <tr className="negrita">
                            <th className="datos_paciente"> Urubilinogeno </th>
                            <th className="datos_paciente"> <span>{form_orina.urubilinogeno}</span>  </th>
                            <th className="datos_paciente"> &lt; a 50 mg/dl negativo </th>

                        </tr>

                        <tr className="negrita">
                            <th className="datos_paciente"> Cetonas </th>
                            <th className="datos_paciente">  <span>{form_orina.cetonas}</span>  </th>
                            <th className="datos_paciente"> Negativo</th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Nitritos </th>
                            <th className="datos_paciente"> <span>{form_orina.nitritos}</span>  </th>
                            <th className="datos_paciente"> Negativo </th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Bilirrubinas  </th>
                            <th className="datos_paciente">  <span>{form_orina.bilirrubinas}</span> </th>
                            <th className="datos_paciente"> Negativo </th>

                        </tr>
                        <tr className="negrita">
                            <th className="titulos" >ÉXAMEN MICROSCOPICO </th>
                        </tr>
                        <tr className="negrita">
                            <th > DATOS</th>
                            <th > RESULTADO </th>
                            <th > VALORES DE REFERENCIA </th>
                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Celulas Redondas   </th>
                            <th className="datos_paciente"> <span>{form_orina.celulas_redondas}</span>  </th>
                            <th className="datos_paciente"> /campo</th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Celulas Pavimentosas </th>
                            <th className="datos_paciente"> <span>{form_orina.celulas_pavimentosas}</span>  </th>
                            <th className="datos_paciente">/campo </th>

                        </tr>

                        <tr className="negrita">
                            <th className="datos_paciente"> Piocitos </th>
                            <th className="datos_paciente"> <span>{form_orina.piocitos}</span>  </th>
                            <th className="datos_paciente"> /campo </th>

                        </tr>

                        <tr className="negrita">
                            <th className="datos_paciente"> Hematies   </th>
                            <th className="datos_paciente"> <span>{form_orina.hematies}</span> </th>
                            <th className="datos_paciente"> /campo</th>

                        </tr>

                        <tr className="negrita">
                            <th className="datos_paciente"> Bacterias </th>
                            <th className="datos_paciente"> <span>{form_orina.bacterias}</span> </th>
                            <th className="datos_paciente">  </th>

                        </tr>
                        <tr className="negrita">
                            <th className="datos_paciente"> Moco </th>
                            <th className="datos_paciente"> <span>{form_orina.moco}</span>  </th>
                            <th className="datos_paciente">  </th>

                        </tr>

                    </tbody>
                </table>
                {/* <div className="modal-header">
                    <h3>Tabla 2</h3>
                </div>
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Columna 1</th>
                            <th>Columna 2</th>
                            <th>Columna 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Fila 1, Columna 1</td>
                            <td>Fila 1, Columna 2</td>
                            <td>Fila 1, Columna 3</td>
                        </tr>
                        <tr>
                            <td>Fila 2, Columna 1</td>
                            <td>Fila 2, Columna 2</td>
                            <td>Fila 2, Columna 3</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </div>
    );
};

export default Modal;
