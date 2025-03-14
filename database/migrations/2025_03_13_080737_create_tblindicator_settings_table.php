<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblindicatorSettingsTable extends Migration
{
    public function up()
    {
        Schema::create('tblindicator_settings', function (Blueprint $table) {
            $table->id('indicator_settings_id')->unsigned();
            $table->string('indicator_settings_name');
            $table->primary('indicator_settings_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblindicator_settings');
    }
}
