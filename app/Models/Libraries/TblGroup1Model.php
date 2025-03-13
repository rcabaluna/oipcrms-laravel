<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class TblGroup1Model extends Model
{
    protected $table = 'tblgroup1';

    protected $fillable = [
        'group1name',
        'group1code',
    ];
}
