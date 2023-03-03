<?php

use App\Http\Controllers\Api\ConfigurarController;
use App\Http\Controllers\HematologiaController;
use App\Http\Controllers\OrinaController;
use App\Http\Controllers\UsuariosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::controller(ConfigurarController::class)->group(function(){
    Route::get('/configurars','index');
    //Route::post('/configurars','store');
    Route::post('/configurars','create');
    Route::get('/configurars/{id}','show');
    Route::put('/configurars/{id}','update');

   // Route::get('/configurars/{id}','edit');
    Route::delete('/configurars/{id}','destroy');

});

Route::controller(UsuariosController::class)->group(function(){
    Route::get('/mostrar_usuarios','mostrar_usuarios');
    Route::post('/comprobar_usuario', 'comprobar_usuario');
    Route::get('/Mostar_usuario/{id}', 'Mostar_usuario');
    Route::get('/Mostar_usuario_unico/{id}', 'Mostar_usuario_unico');
    Route::get('/Mostar_usuario_admin', 'Mostar_usuario_admin');
    Route::post('/crear_usuario', 'crear_usuario');
    Route::delete('/eliminar_usuario/{id}', 'eliminar_usuario');
    Route::put('/editar_usuario/{id}', 'editar_usuario');

});

Route::controller(HematologiaController::class)->group(function(){
    Route::post('/crear_examen_hematologia', 'crear_examen_hematologia');
    Route::post('/crear_pdf_hematologia', 'crear_pdf_hematologia');
    Route::get('/Mostar_examen_hematologia_admin', 'Mostar_examen_hematologia_admin');
    Route::get('/mostrar_usuario_examen/{id}', 'mostrar_usuario_examen');
    Route::put('/editar_examen_hematologia/{id}', 'editar_examen_hematologia');
    Route::get('/Mostar_examens', 'Mostar_examens');
    Route::get('/Mostar_examens_usuario/{id}', 'Mostar_examens_usuario');
    Route::delete('/eliminar_examen_hematologia/{id}', 'eliminar_examen_hematologia');
    
});

Route::controller(OrinaController::class)->group(function(){
  
    Route::get('/mostrar_examen_orina', 'mostrar_examen_orina');
    Route::post('/crear_examen_orina', 'crear_examen_orina');
    Route::get('/mostrar_usuario_examen_orina/{id}', 'mostrar_usuario_examen_orina');
    Route::put('/editar_examen_orina/{id}', 'editar_examen_orina');
    Route::delete('/eliminar_examen_orina/{id}', 'eliminar_examen_orina');
   
});



// Route::get('/empresa_config','App\Http\Controllers\EmpresaConfigController@index');// mostrar registros
// Route::post('/empresa_config','App\Http\Controllers\EmpresaConfigController@store');// crear registros
// Route::put('/empresa_config/{id}','App\Http\Controllers\EmpresaConfigController@update');// modificar registros
// Route::delete('/empresa_config/{id}','App\Http\Controllers\EmpresaConfigController@destroy');// eliminar registros
