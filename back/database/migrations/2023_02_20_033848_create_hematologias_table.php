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
        Schema::create('hematologias', function (Blueprint $table) {
            $table->id("id_hematologia");
            $table->integer("id_usuario");
            $table->integer("id_admin");
            $table->string("tipo_examen");
            $table->float("WBC");
            $table->float("LYM");
            $table->float("MON");
            $table->float("GRA");
            $table->float("LYM_P");
            $table->float("MON_P");
            $table->float("GRA_P");

            $table->float("RBC");           
            $table->float("HGB");           
            $table->float("HCT");

            $table->float("MCV");           
            $table->float("MCH");           
            $table->float("MCHC");           
            $table->float("RDWC");  

            $table->float("PLT");           
            $table->float("PCT");           
            $table->float("PDW");

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
        Schema::dropIfExists('hematologias');
    }
};
