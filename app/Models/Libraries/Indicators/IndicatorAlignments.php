<?php

namespace App\Models\Libraries\Indicators;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IndicatorAlignments extends Model
{
    use HasFactory;

    protected $table = 'tblindicator_alignments';

    protected $primaryKey = 'indicators_alignment_id';

    protected $fillable = [
        'indicators_alignment_name',
    ];
}
