<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblgroup2Table extends Migration
{
    public function up()
    {
        Schema::create('tblgroup2', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('group1code');
            $table->string('group2code')->unique();
            $table->string('group2name');
            $table->timestamps(0);
            $table->primary('id');
            $table->foreign('group1code')->references('group1code')->on('tblgroup1')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblgroup2');
    }
}
