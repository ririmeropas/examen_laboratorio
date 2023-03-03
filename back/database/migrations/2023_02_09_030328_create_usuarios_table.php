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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('id_usuario');
            $table->string('cedula');
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('telefono');
            $table->string('edad');
            $table->string('codigo');
            $table->string('sexo');
            $table->string('correo');
            $table->string('contrasena');
            $table->string('tipo_usuario');
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
        Schema::dropIfExists('usuarios');
    }
};
