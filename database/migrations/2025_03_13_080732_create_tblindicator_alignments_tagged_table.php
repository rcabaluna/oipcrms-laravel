<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblindicatorAlignmentsTaggedTable extends Migration
{
    public function up()
    {
        Schema::create('tblindicator_alignments_tagged', function (Blueprint $table) {
            $table->id('indicator_alignments_tagged_id');
            $table->integer('ind_id')->nullable();
            $table->integer('indicator_alignments_id')->nullable();
            $table->primary('indicator_alignments_tagged_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblindicator_alignments_tagged');
    }
}
