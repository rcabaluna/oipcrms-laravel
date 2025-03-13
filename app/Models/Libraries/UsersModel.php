<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersModel extends Model
{
    use HasFactory;

    protected $table = 'tblusers';

    protected $primaryKey = 'userid';

    protected $fillable = [
        'userid',
        'lastname',
        'firstname',
        'middlename',
        'extension',
        'group1code',
        'group2code',
        'group3code',
        'position',
        'is_head'
    ];

    public $timestamps = true;
}
