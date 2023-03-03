<?php

namespace App\Http\Controllers;

use App\Models\orina;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OrinaController extends Controller
{
    public function mostrar_examen_orina()
    {
        $e_orina= orina::all();
        return $e_orina;
    }
    public function crear_examen_orina(Request $request)
    {
        try {
            $rules =
                [
                    'id_usuario' => 'required',
                    'id_admin'=> "required",

                    'color'=>'required',
                    'aspecto'=>'required',

                    'densidad_especifica'=>'required',
                    'ph'=>'required',
                    'creatina'=>'required',
                    'sangre'=>'required',
                    'proteinas'=>'required',
                    'microalbumina'=>'required',
                    'leucocitos'=>'required',
                    'glucosa'=>'required',
                    'urubilinogeno'=>'required',
                    'cetonas'=>'required',
                    'nitritos'=>'required',
                    'bilirrubinas'=>'required',

                    'celulas_redondas'=>'required',
                    'celulas_pavimentosas'=>'required',
                    'piocitos'=>'required',
                    'hematies'=>'required',
                    'bacterias'=>'required',
                    'moco'=>'required',                    
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
                $e_orina = new orina();
                $e_orina->id_usuario = $request->id_usuario;
                $e_orina->id_admin = $request->id_admin;
                $e_orina->tipo_examen = $request->tipo_examen;

                $e_orina->color = $request->color;
                $e_orina->aspecto = $request->aspecto;

                $e_orina->densidad_especifica = $request->densidad_especifica;
                $e_orina->ph = $request->ph;
                $e_orina->creatina = $request->creatina;
                $e_orina->sangre = $request->sangre;
                $e_orina->proteinas = $request->proteinas;
                $e_orina->microalbumina = $request->microalbumina;
                $e_orina->leucocitos = $request->leucocitos;
                $e_orina->glucosa = $request->glucosa;
                $e_orina->urubilinogeno = $request->urubilinogeno;
                $e_orina->cetonas = $request->cetonas;
                $e_orina->nitritos = $request->nitritos;
                $e_orina->bilirrubinas = $request->bilirrubinas;

                $e_orina->celulas_redondas = $request->celulas_redondas;
                $e_orina->celulas_pavimentosas = $request->celulas_pavimentosas;
                $e_orina->piocitos = $request->piocitos;
                $e_orina->hematies = $request->hematies;
                $e_orina->bacterias = $request->bacterias;
                $e_orina->moco = $request->moco;

                $e_orina->fecha = $request->fecha;

                $e_orina->save();
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

    public function mostrar_usuario_examen_orina($id)
    {
        try{
            $examenes_admin = DB::select(
                'SELECT 
                ru.*,
                  u1.id_usuario, u1.nombres AS "nombres_usuario", u1.correo, u1.tipo_usuario, u1.sexo,
                  u1.edad, u1.codigo,
                  u2.id_usuario AS "id_admin", u2.nombres AS "nombres_admin", u2.correo, u2.tipo_usuario
                             FROM orinas ru
                JOIN usuarios u1 ON u1.id_usuario = ru.id_usuario
                JOIN usuarios u2 ON u2.id_usuario = ru.id_admin
                WHERE ru.id_orina =?;',
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

    public function editar_examen_orina(Request $request, $id)
    {
        try{
            $usuario = orina::where('id_orina', '=', $request->id)
            ->update(array(
                // "id_hematologia"=> $request->id,
                // "id_usuario"=> $request->id_usuario,
                // "id_admin"=> $request->id_admin,
                // "tipo_examen"=> "hematologia",
                'color'=> $request->color,
                'aspecto'=> $request->aspecto,

                'densidad_especifica'=> $request->densidad_especifica,
                'ph'=> $request->ph,
                'creatina'=> $request->creatina,
                'sangre'=> $request->sangre,
                'proteinas'=> $request->proteinas,
                'microalbumina'=> $request->microalbumina,
                'leucocitos'=> $request->leucocitos,
                'glucosa'=> $request->glucosa,
                'urubilinogeno'=> $request->urubilinogeno,
                'cetonas'=> $request->cetonas,
                'nitritos'=> $request->nitritos,
                'bilirrubinas'=> $request->bilirrubinas,

                'celulas_redondas'=> $request->celulas_redondas,
                'celulas_pavimentosas'=> $request->celulas_pavimentosas,
                'piocitos'=> $request->piocitos,
                'hematies'=> $request->hematies,
                'bacterias'=> $request->bacterias,
                'moco'=> $request->moco,
                    // 'fecha' => $request->fecha,

            ));

            return $usuario;
        }catch(\Exception $e){
            return response()->json([
                'status' => $e,
            ]);
        }
        
    }

    public function eliminar_examen_orina($id)
    {
        $e_orina = orina::where('id_orina', '=', $id)
            ->delete();
        return $e_orina;
        
    }
}
