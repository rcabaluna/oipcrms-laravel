<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('tblusers', function (Blueprint $table) {
            $table->id('userid');
            $table->string('lastname');
            $table->string('firstname');
            $table->string('middlename')->nullable();
            $table->string('extension')->nullable();
            $table->string('group1code')->nullable();
            $table->string('group2code')->nullable();
            $table->string('group3code')->nullable();
            $table->string('position')->nullable();
            $table->boolean('is_head')->default(false);
            $table->timestamps();

            $table->foreign('group1code')->references('group1code')->on('tblgroup1')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('group2code')->references('group2code')->on('tblgroup2')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('group3code')->references('group3code')->on('tblgroup3')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblusers');
    }
};
