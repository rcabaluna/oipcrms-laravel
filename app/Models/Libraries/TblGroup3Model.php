<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class TblGroup3Model extends Model
{
    protected $table = 'tblgroup3';

    protected $fillable = [
        'group1code',
        'group2code',
        'group3code',
        'group3name'
    ];
}
