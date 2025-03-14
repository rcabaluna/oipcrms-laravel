<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbluseraccountsTable extends Migration
{
    public function up()
    {
        Schema::create('tbluseraccounts', function (Blueprint $table) {
            $table->id('useraccountid')->unsigned();
            $table->bigInteger('userid')->unsigned();
            $table->string('username');
            $table->string('password');
            $table->tinyInteger('is_active')->default(1);
            $table->string('useraccess');
            $table->timestamps(0);
            $table->primary('useraccountid');
            $table->unique('username');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tbluseraccounts');
    }
}
