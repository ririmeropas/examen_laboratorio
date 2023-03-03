<?php

namespace App\Http\Controllers;

use App\Models\hematologia;
use App\Models\orina;
use App\Models\Usuarios;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;

class HematologiaController extends Controller
{
    public function crear_examen_hematologia(Request $request)
    {
        try {
            $rules =
                [
                    'id_usuario' => 'required',
                    'id_admin'=> "required",
                    'WBC' => 'required',
                    'LYM' => 'required',
                    'MON' => 'required',
                    'GRA' => 'required',
                    'LYM_P' => 'required',
                    'MON_P' => 'required',
                    'GRA_P' => 'required',

                    'RBC' => 'required',
                    'HGB' => 'required',
                    'HCT' => 'required',

                    'MCV' => 'required',
                    'MCH' => 'required',
                    'MCHC' => 'required',
                    'RDWC' => 'required',

                    'PLT' => 'required',
                    'PCT' => 'required',
                    'PDW' => 'required',
                    
                     'fecha' => 'required',
                ];
            $messages = [
                'required' => 'El campo :attribute es requerido',
                'unique' => 'El correo ya existe'
            ];
            $validator =
                Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return response()->json([
                    'status' => "error",
                    'mensaje' => $validator->errors()->first()
                ], 422);
            } else {
                $e_hematologia = new hematologia();
                $e_hematologia->id_usuario = $request->id_usuario;
                $e_hematologia->id_admin = $request->id_admin;
                $e_hematologia->tipo_examen = $request->tipo_examen;
                $e_hematologia->WBC = $request->WBC;
                $e_hematologia->LYM = $request->LYM;
                $e_hematologia->MON = $request->MON;
                $e_hematologia->GRA = $request->GRA;
                $e_hematologia->LYM_P = $request->LYM_P;
                $e_hematologia->MON_P = $request->MON_P;
                $e_hematologia->GRA_P = $request->GRA_P;

                $e_hematologia->RBC = $request->RBC;
                $e_hematologia->HGB = $request->HGB;
                $e_hematologia->HCT = $request->HCT;

                $e_hematologia->MCV = $request->MCV;
                $e_hematologia->MCH = $request->MCH;
                $e_hematologia->MCHC = $request->MCHC;
                $e_hematologia->RDWC = $request->RDWC;

                $e_hematologia->PLT = $request->PLT;
                $e_hematologia->PCT = $request->PCT;
                $e_hematologia->PDW = $request->PDW;

                $e_hematologia->fecha = $request->fecha;

                $e_hematologia->save();
                return response()->json([
                    'status' => "ok",
                    'mensaje' => "se guardo",
                ]);
           
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => $e,
            ]);
        }

    }

    public function Mostar_examen_hematologia_admin(Request $request)
    {
        try{
            $examenes_admin = DB::select(
                'SELECT 
                ru.*,
                  u1.id_usuario, u1.nombres, u1.correo, u1.tipo_usuario,
                  u2.id_usuario, u2.nombres, u2.correo, u2.tipo_usuario
                FROM hematologias ru
                JOIN usuarios u1 ON u1.id_usuario = ru.id_usuario
                JOIN usuarios u2 ON u2.id_usuario = ru.id_admin
                WHERE u1.id_usuario = ? AND u2.id_usuario = ?;',
               [
                $request ->id_usuario,
                $request ->id_admin
               ]
                
            );
            return response()->json($examenes_admin);
        }catch(\Exception $e){
            return response()->json([
                'status' => $e,
            ]);
        }
        
    }
    public function mostrar_usuario_examen($id)
    {
        try{
            $examenes_admin = DB::select(
                'SELECT 
                ru.*,
                  u1.id_usuario, u1.nombres AS "nombres_usuario", u1.correo, u1.tipo_usuario, u1.sexo,
                  u1.edad, u1.codigo,
                  u2.id_usuario AS "id_admin", u2.nombres AS "nombres_admin", u2.correo, u2.tipo_usuario
                             FROM hematologias ru
                JOIN usuarios u1 ON u1.id_usuario = ru.id_usuario
                JOIN usuarios u2 ON u2.id_usuario = ru.id_admin
                WHERE ru.id_hematologia =?;',
               [
                $id,
               ]
                
            );
            return response()->json($examenes_admin);
        }catch(\Exception $e){
            return response()->json([
                'status' => $e,
            ]);
        }
        
    }
    public function Mostar_examens()
    {
        // SELECT hematologias.id_hematologia  as "id_examen",hematologias.tipo_examen,hematologias.fecha,hematologias.id_admin, usuarios.id_usuario,usuarios.cedula,CONCAT(usuarios.nombres," ", usuarios.apellidos) AS "nombres"
        //         FROM hematologias
        //         JOIN usuarios ON hematologias.id_usuario = usuarios.id_usuario
        //         WHERE usuarios.id_usuario = 2
        //      UNION
        //      SELECT orinas.id_orina, orinas.tipo_examen,orinas.fecha,orinas.id_admin, usuarios.id_usuario,usuarios.cedula,CONCAT(usuarios.nombres," ", usuarios.apellidos) AS "nombres"
        //         FROM orinas
        //         JOIN usuarios ON orinas.id_usuario = usuarios.id_usuario
        //         WHERE usuarios.id_usuario = 2;
        try{
            $examenes_admin = DB::select(
            //     'SELECT hematologias.id_hematologia  as "id_examen",hematologias.tipo_examen,hematologias.fecha,hematologias.id_admin,hematologias.created_at AS "fecha_creacion", usuarios.id_usuario,CONCAT(usuarios.nombres," ", usuarios.apellidos) AS "nombres"
            //     FROM hematologias
            //     JOIN usuarios ON hematologias.id_usuario = usuarios.id_usuario
                
            //  UNION
            //  SELECT orinas.id_orina, orinas.tipo_examen,orinas.fecha,orinas.id_admin,orinas.created_at AS "fecha_creacion", usuarios.id_usuario,CONCAT(usuarios.nombres," ", usuarios.apellidos) AS "nombres"
            //     FROM orinas
            //     JOIN usuarios ON orinas.id_usuario = usuarios.id_usuario
            //     ORDER BY fecha_creacion DESC;'  
            'SELECT examenes.id_examen, examenes.tipo_examen, examenes.fecha, examenes.id_admin,
            examenes.created_at AS "fecha_creacion",
            u1.id_usuario, u1.cedula, CONCAT(u1.nombres, " ", u1.apellidos) AS "nombres",
            u2.id_usuario  as "id_admin", u2.cedula, CONCAT(u2.nombres, " ", u2.apellidos) AS "nombres_admin"
            FROM (
                SELECT id_hematologia AS id_examen, tipo_examen, fecha, id_usuario, id_admin, created_at
                FROM hematologias
                UNION
                SELECT id_orina AS id_examen, tipo_examen, fecha, id_usuario, id_admin, created_at
                FROM orinas
            ) examenes
            JOIN usuarios u1 ON examenes.id_usuario = u1.id_usuario
            JOIN usuarios u2 ON examenes.id_admin = u2.id_usuario
            ORDER BY fecha_creacion DESC;'              
            );
            return response()->json($examenes_admin);
        }catch(\Exception $e){
            return response()->json([
                'status' => $e,
            ]);
        }  
    }
    public function Mostar_examens_usuario($id)
    {
        
        try{
            $examenes_admin = DB::select(
            //     'SELECT hematologias.id_hematologia  as "id_examen",hematologias.tipo_examen,hematologias.fecha,hematologias.id_admin,
            //     hematologias.created_at AS "fecha_creacion",
            //      usuarios.id_usuario,usuarios.cedula,CONCAT(usuarios.nombres," ", usuarios.apellidos) AS "nombres"
            //     FROM hematologias
            //     JOIN usuarios ON hematologias.id_usuario = usuarios.id_usuario
            //     WHERE usuarios.id_usuario = ?
            //  UNION
            //  SELECT orinas.id_orina, orinas.tipo_examen,orinas.fecha,orinas.id_admin,
            //  orinas.created_at AS "fecha_creacion",
            //   usuarios.id_usuario,usuarios.cedula,CONCAT(usuarios.nombres," ", usuarios.apellidos) AS "nombres"
            //     FROM orinas
            //     JOIN usuarios ON orinas.id_usuario = usuarios.id_usuario
            //     WHERE usuarios.id_usuario = ?
            //     ORDER BY fecha_creacion DESC',
                'SELECT examenes.id_examen, examenes.tipo_examen, examenes.fecha, examenes.id_admin,
                examenes.created_at AS "fecha_creacion",
                u1.id_usuario, u1.cedula, CONCAT(u1.nombres, " ", u1.apellidos) AS "nombres",
                u2.id_usuario  as "id_admin", u2.cedula, CONCAT(u2.nombres, " ", u2.apellidos) AS "nombres_admin"
                FROM (
                    SELECT id_hematologia AS id_examen, tipo_examen, fecha, id_usuario, id_admin, created_at
                    FROM hematologias
                    UNION
                    SELECT id_orina AS id_examen, tipo_examen, fecha, id_usuario, id_admin, created_at
                    FROM orinas
                ) examenes
                JOIN usuarios u1 ON examenes.id_usuario = u1.id_usuario
                JOIN usuarios u2 ON examenes.id_admin = u2.id_usuario
                WHERE u1.id_usuario = ?
                ORDER BY fecha_creacion DESC;',
                [
                    $id
                ]                
            );
            return response()->json($examenes_admin);
        }catch(\Exception $e){
            return response()->json([
                'status' => $e,
            ]);
        }  
    }

    public function editar_examen_hematologia(Request $request, $id)
    {
        $usuario = hematologia::where('id_hematologia', '=', $request->id)
            ->update(array(
          
                    'WBC' => $request->WBC,
                    'LYM' => $request->LYM,
                    'MON' => $request->MON,
                    'GRA' => $request->GRA,
                    'LYM_P' => $request->LYM_P,
                    'MON_P' => $request->MON_P,
                    'GRA_P' => $request->GRA_P,

                    'RBC' => $request->RBC,
                    'HGB' => $request->HGB,
                    'HCT' => $request->HCT,

                    'MCV' => $request->MCV,
                    'MCH' => $request->MCH,
                    'MCHC' => $request->MCHC,
                    'RDWC' => $request->RDWC,

                    'PLT' => $request->PLT,
                    'PCT' => $request->PCT,
                    'PDW' => $request->PDW,
          

            ));

        return $usuario;
    }
    public function eliminar_examen_hematologia($id)
    {
        $e_hematologia = hematologia::where('id_hematologia', '=', $id)
            ->delete();
        return $e_hematologia;
        
    }
    public function crear_pdf_hematologia(Request $request)
    {
        $fecha = Carbon::now()->format('mdyH:i:s');
        $fecha = str_replace(':', '_', $fecha);
        $datosurl = array();
        foreach ($request->examenes as $item) {
            $usuario = Usuarios::where('id_usuario', '=', $item["id_usuario"])->first();
            $usuario_admin= Usuarios::where('id_usuario', '=', $item["id_admin"])->first();
           
            if($item["tipo_examen"]=="hematologia"){
                $examenes = hematologia::where('id_hematologia', '=', $item["id_examen"])->first();
    
                $data_reportes = [
                    'nombres'=>mb_convert_case($usuario->nombres, MB_CASE_TITLE, "UTF-8") ." ". mb_convert_case($usuario->apellidos, MB_CASE_TITLE, "UTF-8"),
                    'nombres_admin'=>mb_convert_case($usuario_admin->nombres, MB_CASE_TITLE, "UTF-8") . " ".  mb_convert_case($usuario_admin->apellidos, MB_CASE_TITLE, "UTF-8"),
                    'edad'=>$usuario->edad,
                    'codigo'=>$usuario->codigo,
                    'fecha'=>$item["fecha"],
                    'WBC' => $examenes->WBC,
                            'LYM' => $examenes->LYM,
                            'MON' => $examenes->MON,
                            'GRA' => $examenes->GRA,
                            'LYM_P' => $examenes->LYM_P,
                            'MON_P' => $examenes->MON_P,
                            'GRA_P' => $examenes->GRA_P,
        
                            'RBC' => $examenes->RBC,
                            'HGB' => $examenes->HGB,
                            'HCT' => $examenes->HCT,
        
                            'MCV' => $examenes->MCV,
                            'MCH' => $examenes->MCH,
                            'MCHC' => $examenes->MCHC,
                            'RDWC' => $examenes->RDWC,
        
                            'PLT' => $examenes->PLT,
                            'PCT' => $examenes->PCT,
                            'PDW' => $examenes->PDW,
                ];
        
                $pdf = PDF::loadView('Examenes.examen_hematologia',$data_reportes );
                $url = "./examenes/" . (str_replace(" ", "","") . "/hematologia/hematologia" .$fecha. $usuario->nombres.".pdf");
                $datosurl[] = $url;
                $pdf->save($url);


                // $urlf= "./examenes/" . (str_replace(" ", "","") . "/unidos/hematologia" .date("mdyH"). $usuario->nombres.".pdf");
              
                // $pdfMerger = new \Clegginabox\PDFMerger\PDFMerger;
                // $pdfMerger->addPDF(public_path($url), 'all');
                // $pdfMerger->addPDF(public_path($url), 'all');
                // $pdfMerger->merge('file', public_path($urlf));
    
                // echo json_encode([
                //     "status" => "ok",
                //     "mensaje" => "PDF GENERADO",
                //     "url" =>  $urlf,
                // ]);
            }
            
            if($item["tipo_examen"]=="orina"){
                $examenes = orina::where('id_orina', '=', $item["id_examen"])->first();
    
                $data_reportes = [
                    'nombres'=>mb_convert_case($usuario->nombres, MB_CASE_TITLE, "UTF-8") ." ". mb_convert_case($usuario->apellidos, MB_CASE_TITLE, "UTF-8"),
                    'nombres_admin'=>mb_convert_case($usuario_admin->nombres, MB_CASE_TITLE, "UTF-8") . " ".  mb_convert_case($usuario_admin->apellidos, MB_CASE_TITLE, "UTF-8"),
                    'edad'=>$usuario->edad,
                    'codigo'=>$usuario->codigo,
                    'fecha'=>$item["fecha"],
    
                    'color'=> $examenes->color,
                    'aspecto'=> $examenes->aspecto,
    
                    'densidad_especifica'=> $examenes->densidad_especifica,
                    'ph'=> $examenes->ph,
                    'creatina'=> $examenes->creatina,
                    'sangre'=> $examenes->sangre,
                    'proteinas'=> $examenes->proteinas,
                    'microalbumina'=> $examenes->microalbumina,
                    'leucocitos'=> $examenes->leucocitos,
                    'glucosa'=> $examenes->glucosa,
                    'urubilinogeno'=> $examenes->urubilinogeno,
                    'cetonas'=> $examenes->cetonas,
                    'nitritos'=> $examenes->nitritos,
                    'bilirrubinas'=> $examenes->bilirrubinas,
    
                    'celulas_redondas'=> $examenes->celulas_redondas,
                    'celulas_pavimentosas'=> $examenes->celulas_pavimentosas,
                    'piocitos'=> $examenes->piocitos,
                    'hematies'=> $examenes->hematies,
                    'bacterias'=> $examenes->bacterias,
                    'moco'=> $examenes->moco,
                ];
        
                $pdf = PDF::loadView('Examenes.examen_orina',$data_reportes );
        
                $url = "./examenes/" . (str_replace(" ", "","") . "/orina/orina" .$fecha. $usuario->nombres.".pdf");
                $datosurl[] = $url;
                $pdf->save($url);
                
             }
            
        
        }
        

        $urlf= "./examenes/" . (str_replace(" ", "","") . "/unidos/unido" .$fecha.".pdf");
        $pdfMerger = new \Clegginabox\PDFMerger\PDFMerger;

        foreach ($datosurl as $key => $value) {
            $pdfMerger->addPDF(public_path($value), 'all'); 
        }
        
        $pdfMerger->merge('file', public_path($urlf));

        echo json_encode([
            "status" => "ok",
            "mensaje" => "PDF GENERADO",
            "url" =>  $urlf,
        ]);
    }


}
