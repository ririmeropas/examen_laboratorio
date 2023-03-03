<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facturación Cliente</title>
    <style>
        * {
            color: rgb(54, 54, 54);
            font-family: sans-serif;
            font-size: 12px;
            margin-right: 20px;
            font-weight: 400;
        }

        .estado1 {
            background-color: #ffff99 !important;
        }

        h1 {
            font-size: 19px
        }

        h2 {
            font-size: 19px
        }

        .contenedor {
            width: 100%;
            text-align: center;
            margin: 0px auto;
        }

        .bordes {
            border: 1px solid gray;
            border-collapse: collapse;
        }

        .enlace {
            text-decoration: none;
            background: blue;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
        }

        .contenedor2 {
          
            margin: 10px auto;
        }

        .contenedor1 {
        
            text-align: left;
            margin: auto;
        }

        .contenedor_paciente {

            width: 100%;
        }

        .contenedor_paciente tr {
            text-align: start;
            width: 100%;
        }

        .contenedor_paciente .negrita th {
            font-weight: bold;
            text-align: left;
        }
        .contenedor_resultados .negrita th {
            font-weight: bold;
            text-align: left;
        }

        .datos_paciente {
            padding: 10px 10px 10px 0px;
        }
        
        .titulos th{
            width: 100%;
            font-size: 12px;
            padding: 10px;
            font-weight: bold;
        }
        
        .contenedor_resultados {
            text-align: left;
            width: 100%;
        }
        
        .datos_resultados{
            padding: 5px 5px 5px 0px;
        }
        .datos_encargado{
             padding: 30px 20px 1px 0px;
        }
        table{
            width: 100%;
                     
        }
    </style>
</head>

<body>

    <table  class="contenedor_paciente">
        <tr>
            <th>
                <div class="contenedor2">
                    <img class="img"
                        src="https://res.cloudinary.com/museoq/image/upload/v1675428608/samples/Chemistry_Lab_Chemical_Logo__2_-removebg-preview_huxf18.png"
                        alt="" style="height: 150px; width:150px; margin: auto;">
                </div>
            </th>
            <th>
                <div class="contenedor1">
                    <h1>LABORATORIO CLÍNICO</h1>
                </div>
            </th>

        </tr>

    </table>

    <table class="contenedor_paciente">

        <tr class="negrita">
            <th> DATOS DEL PACIENTE </th>
        </tr>
        <tr class="negrita">
            <th class="datos_paciente"> Nombre: <span>{{$nombres}}</span> </th>
            <th class="datos_paciente"> Edad: <span>{{$edad}} años</span></th>

        </tr>

        <tr class="negrita">
            <th class="datos_paciente"> Código: <span>{{$codigo}}</span>  </th>
            <th class="datos_paciente"> Fecha: <span>{{$fecha}}</span>  </th>

        </tr>
    </table>
    
    <table>
        <tr class="titulos">
            
            <th>EXAMEN HEMATOLOGÍA </th>
            
        </tr>
    </table>

    <table class="contenedor_resultados">

        
        <tr class="negrita">
            <th class="datos_paciente"> DATOS</th>
            <th class="datos_paciente"> RESULTADO </th>
            <th class="datos_paciente"> VALORES DE REFERENCIA </th>

        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> WBC  </th>
            <th class="datos_resultados"> <span>{{$WBC}}</span> 10^9/mm³ </th>
            <th class="datos_resultados"> 4,5 - 13 </th>

        </tr> 
        <tr class="negrita">
            <th class="datos_resultados"> LYM  </th>
            <th class="datos_resultados"> <span>{{$LYM}}</span> 10^9/mm³ </th>
            <th class="datos_resultados"> 1 A 7 </th>

        </tr> 
        <tr class="negrita">
            <th class="datos_resultados"> MON </th>
            <th class="datos_resultados"> <span>{{$MON}}</span> 10^9/mm³ </th>
            <th class="datos_resultados"> 0 - 1 </th>

        </tr> 
        
        <tr class="negrita">
            <th class="datos_resultados"> GRA </th>
            <th class="datos_resultados"> <span>{{$GRA}}</span> 10^9/mm³ </th>
            <th class="datos_resultados"> 1,1 - 6,6 </th>

        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> LYM %  </th>
            <th class="datos_resultados"> <span>{{$LYM_P}}</span> % </th>
            <th class="datos_resultados"> 38 - 42 </th>

        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> MON %</th>
            <th class="datos_resultados"><span>{{$MON_P}}</span> % </th>
            <th class="datos_resultados"> 0 - 9 </th>

        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> GRA % </th>
            <th class="datos_resultados">  <span>{{$GRA_P}}</span> % </th>
            <th class="datos_resultados"> 31 - 51 </th>

        </tr>
        <br>
        
        <tr class="negrita">
            <th class="datos_resultados"> RBC  </th>
            <th class="datos_resultados"> <span>{{$RBC}}</span> 10^9/mm³  </th>
            <th class="datos_resultados"> 4,1 - 5,3 </th>

        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> HGB  </th>
            <th class="datos_resultados"> <span>{{$HGB}}</span> g/dl  </th>
            <th class="datos_resultados"> 12 A 16 </th>

        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> HCT  </th>
            <th class="datos_resultados">  <span>{{$HCT}}</span> %  </th>
            <th class="datos_resultados"> 36 - 45 </th>

        </tr>
        <br>
        <tr class="negrita">
            <th class="datos_resultados"> MCV </th>
            <th class="datos_resultados"> <span>{{$MCV}}</span> FI  </th>
            <th class="datos_resultados"> 80 - 99 </th>

        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> MCH   </th>
            <th class="datos_resultados">  <span>{{$MCH}}</span> pg  </th>
            <th class="datos_resultados"> 27 - 34 </th>

        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> MCHC   </th>
            <th class="datos_resultados"> <span>{{$MCHC}}</span> g/dl  </th>
            <th class="datos_resultados"> 33 - 37 </th>

        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> RDWC </th>
            <th class="datos_resultados"> <span>{{$RDWC}}</span> %  </th>
            <th class="datos_resultados"> 10 - 16,5 </th>

        </tr>
        <br>
        
        <tr class="negrita">
            <th class="datos_resultados"> PLT </th>
            <th class="datos_resultados"> <span>{{$PLT}}</span> 10^9/mm³  </th>
            <th class="datos_resultados"> 130 - 450 </th>

        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> PCT   </th>
            <th class="datos_resultados"> <span>{{$PCT}}</span> %  </th>
            <th class="datos_resultados"> </th>

        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> PDW </th>
            <th class="datos_resultados"> <span>{{$PDW}}</span>  </th>
            <th class="datos_resultados">  </th>

        </tr>
        <br>
       
        
        
    </table>
    
    
    <table class="contenedor_paciente">

         <tr >
            <th class="datos_encargado"> __________________________ </th>

        </tr>
        <tr >
            <th > Encargado: <span>{{$nombres_admin}}</span> </th>

        </tr>

       
    </table>
    
   
</body>

</html>