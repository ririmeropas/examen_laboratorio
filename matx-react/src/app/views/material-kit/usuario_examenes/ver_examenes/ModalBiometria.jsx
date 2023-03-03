import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ModalBiometria = ({ closeModal, id_examen, nombre }) => {

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

    const mostrar_examenes = () => {
        Swal.showLoading();
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
                    <h3>Examen de Hematología</h3>
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
                            <th className="datos_paciente"> Edad: <span>{form_biometria.edad} años</span> </th>
                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> Código: <span>{form_biometria.codigo}</span>  </th>
                            <th class="datos_paciente"> Fecha: <span>{form_biometria.fecha}</span>  </th>

                        </tr>
                        <tr className="negrita">
                            <th></th>
                            <th>EXAMEN DE HEMATOLOGÍA </th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr class="negrita">
                            <th > DATOS</th>
                            <th > RESULTADO </th>
                            <th > VALORES DE REFERENCIA </th>

                        </tr>

                        <tr class="negrita">
                            <th class="datos_paciente"> WBC  </th>
                            <th class="datos_paciente"> <span>{form_biometria.WBC}</span> 10^9/mm³ </th>
                            <th class="datos_paciente"> 4,5 - 13 </th>

                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> LYM  </th>
                            <th class="datos_paciente"> <span>{form_biometria.LYM}</span> 10^9/mm³ </th>
                            <th class="datos_paciente"> 1 A 7 </th>

                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> MON </th>
                            <th class="datos_paciente"> <span>{form_biometria.MON}</span> 10^9/mm³ </th>
                            <th class="datos_paciente"> 0 - 1 </th>

                        </tr>

                        <tr class="negrita">
                            <th class="datos_paciente"> GRA </th>
                            <th class="datos_paciente"> <span>{form_biometria.GRA}</span> 10^9/mm³ </th>
                            <th class="datos_paciente"> 1,1 - 6,6 </th>

                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> LYM %  </th>
                            <th class="datos_paciente"> <span>{form_biometria.LYM_P}</span> % </th>
                            <th class="datos_paciente"> 38 - 42 </th>

                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> MON %</th>
                            <th class="datos_paciente"><span>{form_biometria.MON_P}</span> % </th>
                            <th class="datos_paciente"> 0 - 9 </th>

                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> GRA % </th>
                            <th class="datos_paciente">  <span>{form_biometria.GRA_P}</span> % </th>
                            <th class="datos_paciente"> 31 - 51 </th>

                        </tr>


                        <tr class="negrita">
                            <th class="datos_paciente"> RBC  </th>
                            <th class="datos_paciente"> <span>{form_biometria.RBC}</span> 10^9/mm³  </th>
                            <th class="datos_paciente"> 4,1 - 5,3 </th>

                        </tr>

                        <tr class="negrita">
                            <th class="datos_paciente"> HGB  </th>
                            <th class="datos_paciente"> <span>{form_biometria.HGB}</span> g/dl  </th>
                            <th class="datos_paciente"> 12 A 16 </th>

                        </tr>

                        <tr class="negrita">
                            <th class="datos_paciente"> HCT  </th>
                            <th class="datos_paciente">  <span>{form_biometria.HCT}</span> %  </th>
                            <th class="datos_paciente"> 36 - 45 </th>

                        </tr>

                        <tr class="negrita">
                            <th class="datos_paciente"> MCV </th>
                            <th class="datos_paciente"> <span>{form_biometria.MCV}</span> FI  </th>
                            <th class="datos_paciente"> 80 - 99 </th>

                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> MCH   </th>
                            <th class="datos_paciente">  <span>{form_biometria.MCH}</span> pg  </th>
                            <th class="datos_paciente"> 27 - 34 </th>

                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> MCHC   </th>
                            <th class="datos_paciente"> <span>{form_biometria.MCHC}</span> g/dl  </th>
                            <th class="datos_paciente"> 33 - 37 </th>

                        </tr>
                        <tr class="negrita">
                            <th class="datos_paciente"> RDWC </th>
                            <th class="datos_paciente"> <span>{form_biometria.RDWC}</span> %  </th>
                            <th class="datos_paciente"> 10 - 16,5 </th>

                        </tr>


                        <tr class="negrita">
                            <th class="datos_paciente"> PLT </th>
                            <th class="datos_paciente"> <span>{form_biometria.PLT}</span> 10^9/mm³  </th>
                            <th class="datos_paciente"> 130 - 450 </th>

                        </tr>

                        <tr class="negrita">
                            <th class="datos_paciente"> PCT   </th>
                            <th class="datos_paciente"> <span>{form_biometria.PCT}</span> %  </th>
                            <th class="datos_paciente"> </th>

                        </tr>

                        <tr class="negrita">
                            <th class="datos_paciente"> PDW </th>
                            <th class="datos_paciente"> <span>{form_biometria.PDW}</span>  </th>
                            <th class="datos_paciente">  </th>

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

export default ModalBiometria;
