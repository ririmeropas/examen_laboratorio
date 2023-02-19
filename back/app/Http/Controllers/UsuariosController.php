<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UsuariosController extends Controller
{
    public function mostrar_usuarios()
    {
        $usuarios = Usuarios::all();
        return $usuarios;
    }
    
    public function comprobar_usuario(Request $request, Usuarios $usuario)
    {
        $usuario = $usuario->where('correo', $request->correo)
            ->where('contrasena',  $request->contrasena)->first();
            if($usuario==null){
                return response()->json([
                    'status' => "error",
                    'mensaje' => "Datos erroneos",
                    'usuario' => $usuario
                ]);
            }else{
                return response()->json([
                    'status' => "ok",
                    'mensaje' => "se ingreso correctamente",
                    'usuario' => $usuario
                ]);
               
            }
        
    }
   
    public function Mostar_usuario($id)
    {
        $usuario = Usuarios::where('id_usuario', '=', $id)->first();
        return response()->json($usuario);
    }
    public function Mostar_usuario_admin()
    {
        $usuarios_admin = DB::select(
            'SELECT *
            FROM usuarios
           WHERE usuarios.tipo_usuario="U"',
            
        );
        return response()->json($usuarios_admin);
    }

    public function crear_usuario(Request $request)
    {
        try {
            $rules =
                [
                    'cedula' => 'required',
                    'nombres' => 'required',
                    'apellidos' => 'required',
                    'telefono' => 'required',
                    'correo' => 'required|unique:Usuarios',
                    'contrasena' => 'required',
                    'tipo_usuario' => 'required',
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
                $empresa = new Usuarios();
            //     $table->id('id_usuario');
            // $table->string('cedula');
            // $table->string('nombres');
            // $table->string('apellidos');
            // $table->string('telefono');
            // $table->string('correo');
            // $table->string('contrasena');
            // $table->string('tipo_usuario');
                $empresa->cedula = $request->cedula;
                $empresa->nombres = $request->nombres;
                $empresa->apellidos = $request->apellidos;
                $empresa->telefono = $request->telefono;
                $empresa->correo = $request->correo;
                $empresa->contrasena = $request->contrasena;
                $empresa->tipo_usuario = $request->tipo_usuario;
                $empresa->save();
                return response()->json([
                    'status' => "ok",
                    'mensaje' => "se guardo",
                ]);
           
            }
        } catch (\Exception $e) {
        }

    }

    public function eliminar_usuario($id)
    {
        $usuario = Usuarios::where('id_usuario', '=', $id)
            ->delete();
        return $usuario;
        
    }
    public function editar_usuario(Request $request, $id)
    {
        $usuario = Usuarios::where('id_usuario', '=', $request->id)
            ->update(array(

                'cedula' => $request->cedula,
                'nombres' => $request->nombres,
                'apellidos' => $request->apellidos,
                'telefono'=> $request->telefono,
                'correo' =>$request->correo,
                'contrasena' => $request->contrasena,
                'tipo_usuario' => $request->tipo_usuario,
            ));

        return $usuario;
        // $caja = caja::findOrFail($request->id);
        // $caja->nombre_caja=$request->nombre_caja;
        // $caja->estado_caja = $request->estado_caja;
        // $caja->id_sucursal = $request->id_sucursal;
        // $caja->save();
        // return $caja;
    }

    

}
