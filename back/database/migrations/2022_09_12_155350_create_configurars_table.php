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
        Schema::create('configurars', function (Blueprint $table) {
            $table->id();
            // $table->integer('ruc');
            // $table->string('razon_social');
            $table->string('nombre_comercial');
            // $table->integer('numero_establecimientos');
            // $table->boolean('obligacion_contabilidad');
            // $table->boolean('contribuyente_especial');
            // $table->boolean('exportador');
            // $table->boolean('microempresa');
            // $table->boolean('contribuyente_rimpe');
            // $table->boolean('agente_retencion');
            // $table->string('ciudad');
            // $table->integer('telefonos');
            // $table->string('direccion');
            // $table->string('actividad_economica');
            // $table->string('email_notificacion');
            $table->string('logo_empresa');
            // $table->string('firma_proforma');
            // $table->string('garantia');
            // $table->string('forma_pago');
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
        Schema::dropIfExists('configurars');
    }
};
