<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('tblgroup3', function (Blueprint $table) {
            $table->id();
            $table->string('group1code');
            $table->string('group2code');
            $table->string('group3code')->unique();
            $table->string('group3name');
            $table->timestamps();

            $table->foreign('group1code')->references('group1code')->on('tblgroup1')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('group2code')->references('group2code')->on('tblgroup2')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblgroup3');
    }
};