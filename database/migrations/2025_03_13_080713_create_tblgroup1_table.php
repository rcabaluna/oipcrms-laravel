<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblgroup1Table extends Migration
{
    public function up()
    {
        Schema::create('tblgroup1', function (Blueprint $table) {
            $table->id()->unsigned(); 
            $table->string('group1name');
            $table->string('group1code')->unique();
            $table->timestamps(0); // created_at and updated_at as timestamp fields
            $table->primary('id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblgroup1');
    }
}
