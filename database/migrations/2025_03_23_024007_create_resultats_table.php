<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resultats', function (Blueprint $table) {
            $table->id();
            $table->string('note')->default(0);
            $table->unsignedBigInteger('etudiant_id');
            $table->unsignedBigInteger('examen_id');
            $table->string('grade');
            $table->timestamps();

            $table->foreign("etudiant_id")->references("id")->on("etudiants")
            ->onDelete("restrict")
            ->onUpdate("restrict");
            $table->foreign("examen_id")->references("id")->on("examens")
            ->onDelete("restrict")
            ->onUpdate("restrict");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resultats');
    }
};
