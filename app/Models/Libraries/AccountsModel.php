<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountsModel extends Model
{
    use HasFactory;

    protected $table = 'tbluseraccounts';

    protected $primaryKey = 'useraccountid';

    protected $fillable = [
        'useraccountid',
        'userid',
        'username',
        'password',
        'is_active',
        'useraccess'
    ];

    public $timestamps = true;
}
