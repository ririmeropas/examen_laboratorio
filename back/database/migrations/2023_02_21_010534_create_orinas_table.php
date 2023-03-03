<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orinas', function (Blueprint $table) {
    

    
    $table->id("id_orina");
    $table->integer("id_usuario");
    $table->integer("id_admin");
    $table->string("tipo_examen");
    
    $table->string("color");
    $table->string("aspecto");

    $table->float("densidad_especifica");
    $table->float("ph");
    $table->string("creatina");
    $table->string("sangre");
    $table->string("proteinas");
    $table->string("microalbumina");
    $table->string("leucocitos");
    $table->string("glucosa");
    $table->string("urubilinogeno");
    $table->string("cetonas");
    $table->string("nitritos");
    $table->string("bilirrubinas");

    $table->string("celulas_redondas");
    $table->string("celulas_pavimentosas");
    $table->string("piocitos");
    $table->string("hematies");
    $table->string("bacterias");
    $table->string("moco");
    
    $table->date("fecha");
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orinas');
    }
};
