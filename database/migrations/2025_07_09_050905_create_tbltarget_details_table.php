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
        Schema::create('tbltarget_details', function (Blueprint $table) {
            $table->id('targetdetailsid');
            $table->unsignedBigInteger('targetsummaryid');
            $table->foreign('targetsummaryid')
                  ->references('targetsummaryid')
                  ->on('tbltarget_summary')
                  ->onDelete('cascade');
            
            $table->integer('xvalue');
            
            $table->unsignedBigInteger('ind_id');
            $table->foreign('ind_id')
                  ->references('ind_id')
                  ->on('tblindicators')
                  ->onDelete('cascade');
        }); // This closing brace was misplaced in your code
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbltarget_details');
    }
};
