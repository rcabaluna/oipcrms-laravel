<?php

namespace App\Models\OPCR;

use Illuminate\Database\Eloquent\Model;

class TargetSummaryModel extends Model
{
    protected $table = 'tbltarget_summary';

    protected $primaryKey = 'targetsummaryid';
    protected $fillable = [
        'year',
        'xstatus',
    ];
    public $timestamps = true;
}
