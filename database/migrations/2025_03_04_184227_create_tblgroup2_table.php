<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('tblgroup2', function (Blueprint $table) {
            $table->id();
            $table->string('group1code');
            $table->string('group2code')->unique();
            $table->string('group2name');
            $table->timestamps();

            $table->foreign('group1code')->references('group1code')->on('tblgroup1')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblgroup2');
    }
};