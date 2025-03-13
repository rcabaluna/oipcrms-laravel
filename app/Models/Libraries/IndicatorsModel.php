<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class IndicatorsModel extends Model
{
    protected $table = "tblindicators";

    protected $primaryKey = 'ind_id';

    protected $fillable = [
        'ind_hierarchy',
        'ind_name',
        'indicator_settings_id',
        'ind_definition',
        'ind_is_deleted'
    ];

    public $timestamps = false;
}
