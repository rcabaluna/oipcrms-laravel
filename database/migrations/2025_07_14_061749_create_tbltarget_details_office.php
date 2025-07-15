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
        Schema::create('tbltarget_details_office', function (Blueprint $table) {
            $table->id('targetdetails_officeid');
            $table->integer('targetdetailsid');
            $table->double('xvalue');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbltarget_details_office');
    }
};
