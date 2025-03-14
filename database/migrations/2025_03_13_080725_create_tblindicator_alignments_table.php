<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblindicatorAlignmentsTable extends Migration
{
    public function up()
    {
        Schema::create('tblindicator_alignments', function (Blueprint $table) {
            $table->id('indicators_alignment_id')->unsigned();
            $table->primary('indicators_alignment_id');
            $table->string('indicators_alignment_name');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblindicator_alignments');
    }
}
