<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\TblGroup1Model;
use App\Models\Libraries\TblGroup2Model;
use App\Models\Libraries\TblGroup3Model;
use App\Models\Libraries\UsersModel;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {

        $tblgroup1 = TblGroup1Model::get();
        $tblgroup2 = TblGroup2Model::get();
        $tblgroup3 = TblGroup3Model::get();
        $users = UsersModel::leftJoin('tblgroup3', 'tblusers.group3code', '=', 'tblgroup3.group3Code')
            ->leftJoin('tblgroup2', 'tblusers.group2code', '=', 'tblgroup2.group2Code')
            ->leftJoin('tblgroup1', 'tblusers.group1code', '=', 'tblgroup1.group1Code')
            ->select(
                'tblusers.*',
                'tblgroup1.group1Name',
                'tblgroup2.group2Name',
                'tblgroup3.group3Name'
            )
            ->get();

        return inertia('Libraries/Users/Page', [
            'users' => $users, 'group1' => $tblgroup1, 'group2' => $tblgroup2, 'group3' => $tblgroup3
        ]);

    }

    public function store(Request $request)
    {
        $validated = $request->all();

        UsersModel::create($validated);

        return redirect()->back()->with('success', 'User created successfully!');
    }

    public function update(Request $request, UsersModel $user)
    {
        sleep(1);

        $fields = $request->all();

        $user->update($fields);

        return redirect()->back()->with('success', 'User update successfully!');
    }

    public function destroy(UsersModel $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully!');
    }
}
