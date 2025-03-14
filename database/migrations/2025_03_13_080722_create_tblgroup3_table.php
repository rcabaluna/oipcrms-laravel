<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblgroup3Table extends Migration
{
    public function up()
    {
        Schema::create('tblgroup3', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('group1code');
            $table->string('group2code');
            $table->string('group3code')->unique();
            $table->string('group3name');
            $table->timestamps(0);
            $table->primary('id');
            $table->foreign('group1code')->references('group1code')->on('tblgroup1')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('group2code')->references('group2code')->on('tblgroup2')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblgroup3');
    }
}
