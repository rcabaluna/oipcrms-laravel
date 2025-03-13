<?php

namespace App\Models\Libraries\Indicators;


use Illuminate\Database\Eloquent\Model;

class IndicatorAlignmentsTagged extends Model
{
    protected $table = 'tblindicator_alignments_tagged';

    protected $primaryKey = 'indicator_alignments_tagged_id';

    protected $fillable = [
                    'ind_id',
                    'indicator_alignments_id'
                ];

    public $timestamps = false;
}
