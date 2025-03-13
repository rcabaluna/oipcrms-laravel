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
        Schema::create('tblindicators', function (Blueprint $table) {
            $table->id('ind_id');
            $table->string('ind_name');
            $table->string('ind_tarsttngs_id');
            $table->string('ind_definition');
            $table->string('ind_hierarchy');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tblindicators');
    }
};
