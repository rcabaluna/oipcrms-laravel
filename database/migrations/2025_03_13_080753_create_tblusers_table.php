<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblusersTable extends Migration
{
    public function up()
    {
        Schema::create('tblusers', function (Blueprint $table) {
            $table->id('userid')->unsigned();
            $table->string('lastname');
            $table->string('firstname');
            $table->string('middlename')->nullable();
            $table->string('extension')->nullable();
            $table->string('group1code')->nullable();
            $table->string('group2code')->nullable();
            $table->string('group3code')->nullable();
            $table->string('position')->nullable();
            $table->tinyInteger('is_head')->default(0);
            $table->timestamps(0);
            $table->primary('userid');
            $table->foreign('group1code')->references('group1code')->on('tblgroup1')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('group2code')->references('group2code')->on('tblgroup2')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('group3code')->references('group3code')->on('tblgroup3')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblusers');
    }
}

