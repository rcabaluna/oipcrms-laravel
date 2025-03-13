<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class TblGroup2Model extends Model
{
    protected $table = 'tblgroup2';

    protected $fillable = [
        'group1code',
        'group2code',
        'group2name'
    ];
}
