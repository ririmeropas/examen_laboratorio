<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class hematologia extends Model
{
    use HasFactory;

    protected $fillable = [
    'id_usuario',
    'cedula',
    'nombres',
    'apellidos',
    'telefono',
    'edad',
    'codigo',
    'sexo',
    'correo',
    'contrasena',
    'tipo_usuario',];

}
