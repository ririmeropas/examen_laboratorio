<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class configurar extends Model
{
    use HasFactory;
    protected $fillable = ['nombre_comercial','logo_empresa'];

}
