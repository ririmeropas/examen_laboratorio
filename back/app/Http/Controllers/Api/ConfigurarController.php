<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\configurar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class ConfigurarController extends Controller
{
   
    public function index()
    {
        $configurar = configurar::all();
        return $configurar;
    }

    
    public function store(Request $request)
    {
        $empresa = new configurar();
      
        // if($request->hasFile('logo_empresa')){
        //     $empresa['logo_empresa']=$request->file('logo_empresa')->store('uploads','public');
        // }
        $empresa->nombre_comercial = $request->nombre_comercial;
        $empresa->logo_empresa = $request->logo_empresa;
       
        //$empresa->logo_empresa = $request->logo_empresa;
       

        $empresa->save();
    }

    public function create(Request $request)
    {
        $empresa = new configurar();
      
        // if($request->hasFile('logo_empresa')){
        //     $empresa['logo_empresa']=$request->file('logo_empresa')->store('uploads','public');
        // }
        $empresa->nombre_comercial = $request->nombre_comercial;
        $empresa->logo_empresa = $request->logo_empresa;
       
        //$empresa->logo_empresa = $request->logo_empresa;
       

        $empresa->save();
    }

    public function edit($id){
        $configurar = configurar::find($id);
        return $configurar;
    }

    public function show($id)
    {
        $configurar = configurar::find($id);
        return $configurar;
    }

   
    public function update(Request $request, $id)
    {
         $empresa = configurar::find($id);
    //     $empresa->nombre_comercial = $request->nombre_comercial;

    //     if($request->hasFile('logo_empresa')){
    //         // $destination = 'uploads/logos/'.$empresa->logo_empresa;
    //         // if(File::exists($destination)){
    //         //     File::delete($destination);
    //         // }

    //         $file =  $request->file('logo_empresa');
    //         $extention= $file ->getClientOriginalExtension();         
    //         $filename = time().'.'.$extention;
    //         $file->move('uploads/logos',$filename);
    //         $empresa->logo_empresa = $filename;
    //     }
       
       // $empresa->logo_empresa = $request->logo_empresa;

        // if($request->hasFile('logo_empresa')){
        //     $empresa['logo_empresa']=$request->file('logo_empresa')->store('uploads','public');
        // }


    //     $empresa->update();

        // $upload_files = $request->file->store('public/uploads');
        // $empresa = configurar::find($id);

        $empresa->nombre_comercial = $request->nombre_comercial;
        $empresa->logo_empresa = $request->logo_empresa;

        $empresa->save();
        return $empresa;
    }
    public function destroy($id)
    {
        $empresa = configurar::destroy($id);
        return $empresa;
    }
}
