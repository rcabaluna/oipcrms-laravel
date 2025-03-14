<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblindicatorsTable extends Migration
{
    public function up()
    {
        Schema::create('tblindicators', function (Blueprint $table) {
            $table->id('ind_id')->unsigned();
            $table->string('ind_hierarchy', 100)->nullable();
            $table->text('ind_name')->nullable();
            $table->integer('indicator_settings_id')->nullable();
            $table->text('ind_definition')->nullable();
            $table->tinyInteger('ind_is_deleted')->default(0);
            $table->tinyInteger('ind_is_saved')->default(0);
            $table->primary('ind_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblindicators');
    }
}
