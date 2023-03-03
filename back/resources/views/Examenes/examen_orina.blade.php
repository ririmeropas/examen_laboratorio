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

    <table>
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
            <th class="datos_paciente"> Edad: <span>{{$edad}} años</span> </th>

        </tr>

        <tr class="negrita">
            <th class="datos_paciente"> Código: <span>{{$codigo}}</span>  </th>
            <th class="datos_paciente"> Fecha: <span>{{$fecha}}</span>  </th>

        </tr>
    </table>
    <table>
        <tr class="titulos">
            
            <th>EXAMEN DE ORINA </th>
            
        </tr>
    </table>

    <table class="contenedor_paciente">

        <tr class="negrita">
            <th class="titulos" >ÉXAMEN FÍSICO </th>
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Color  </th>
            <th class="datos_resultados"> <span>{{$color}}</span> </th>
           
        
        </tr> 
        <tr class="negrita">
            <th class="datos_resultados"> Aspecto  </th>
            <th class="datos_resultados"> <span>{{$aspecto}}</span></th>
           
        
        </tr>
        
        <tr class="negrita">
            <th class="datos_paciente"> ÉXAMEN QUÍMICO </th>
            <th class="datos_paciente"> RESULTADO </th>
            <th class="datos_paciente"> VALORES DE REFERENCIA </th>
        
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Densidad especifica  </th>
            <th class="datos_resultados"> <span>{{$densidad_especifica}}</span> </th>
            <th class="datos_resultados">  </th>
        
        </tr> 
        <tr class="negrita">
            <th class="datos_resultados"> PH  </th>
            <th class="datos_resultados"> <span>{{$ph}}</span> </th>
            <th class="datos_resultados"> </th>
        
        </tr> 
        <tr class="negrita">
            <th class="datos_resultados"> Creatina </th>
            <th class="datos_resultados"> <span>{{$creatina}}</span> </th>
            <th class="datos_resultados"> &lt; a 50 mg/dl negativo </th>
        
        </tr> 
        
        <tr class="negrita">
            <th class="datos_resultados"> Sangre </th>
            <th class="datos_resultados"> <span>{{$sangre}}</span> </th>
            <th class="datos_resultados"> Negativo </th>
        
        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> Proteinas  </th>
            <th class="datos_resultados"> <span>{{$proteinas}}</span> </th>
            <th class="datos_resultados"> &lt; a 50 mg/dl negativo</th>
        
        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> Microalbumina</th>
            <th class="datos_resultados"><span>{{$microalbumina}}</span> </th>
            <th class="datos_resultados"> &lt; a 50 mg/dl negativo </th>
        
        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> Leucocitos</th>
            <th class="datos_resultados">  <span>{{$leucocitos}}</span> </th>
            <th class="datos_resultados"> Negativo</th>
        
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Glucosa  </th>
            <th class="datos_resultados"> <span>{{$glucosa}}</span>  </th>
            <th class="datos_resultados"> Negativo </th>
        
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Urubilinogeno </th>
            <th class="datos_resultados"> <span>{{$urubilinogeno}}</span>  </th>
            <th class="datos_resultados"> &lt; a 50 mg/dl negativo </th>
        
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Cetonas </th>
            <th class="datos_resultados">  <span>{{$cetonas}}</span>  </th>
            <th class="datos_resultados"> Negativo</th>
        
        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> Nitritos </th>
            <th class="datos_resultados"> <span>{{$nitritos}}</span>  </th>
            <th class="datos_resultados"> Negativo </th>
        
        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> Bilirrubinas  </th>
            <th class="datos_resultados">  <span>{{$bilirrubinas}}</span> </th>
            <th class="datos_resultados"> Negativo </th>
        
        </tr>
        <tr class="negrita">
            <th class="titulos" >ÉXAMEN MICROSCOPICO </th>
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Celulas Redondas   </th>
            <th class="datos_resultados"> <span>{{$celulas_redondas}}</span>  </th>
            <th class="datos_resultados"> /campo</th>
        
        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> Celulas Pavimentosas </th>
            <th class="datos_resultados"> <span>{{$celulas_pavimentosas}}</span>  </th>
            <th class="datos_resultados">/campo </th>
        
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Piocitos </th>
            <th class="datos_resultados"> <span>{{$piocitos}}</span>  </th>
            <th class="datos_resultados"> /campo </th>
        
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Hematies   </th>
            <th class="datos_resultados"> <span>{{$hematies}}</span> </th>
            <th class="datos_resultados"> /campo</th>
        
        </tr>
        
        <tr class="negrita">
            <th class="datos_resultados"> Bacterias </th>
            <th class="datos_resultados"> <span>{{$bacterias}}</span> </th>
            <th class="datos_resultados">  </th>
        
        </tr>
        <tr class="negrita">
            <th class="datos_resultados"> Moco </th>
            <th class="datos_resultados"> <span>{{$moco}}</span>  </th>
            <th class="datos_resultados">  </th>
        
        </tr>

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