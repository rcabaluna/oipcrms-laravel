<?php

namespace App\Models\OPCR;

use App\Models\Libraries\IndicatorsModel;
use Illuminate\Database\Eloquent\Model;

class TargetDetailsModel extends Model
{
    protected $table = 'tbltarget_details';
    protected $primaryKey = 'targetdetailsid';
    public $timestamps = false;

    protected $fillable = [
        'targetsummaryid',
        'xvalue',
        'ind_id',
    ];

    public function targetSummary()
    {
        return $this->belongsTo(TargetSummaryModel::class, 'targetsummaryid', 'targetsummaryid');
    }

    public function indicator()
    {
        return $this->belongsTo(IndicatorsModel::class, 'ind_id', 'ind_id');
    }
}
