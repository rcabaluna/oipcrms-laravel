<?php

namespace App\Models\Libraries\Indicators;

use Illuminate\Database\Eloquent\Model;

class IndicatorSettings extends Model
{
    protected $table = 'tblindicator_settings';
    
    protected $primaryKey = 'indicator_settings_id';
    
    protected $fillable = ['indicator_settings_name'];
    public $timestamps = false;  // Set to true if you have created_at/updated_at columns
}
