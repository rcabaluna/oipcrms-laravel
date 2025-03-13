<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\AccountsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccountsController extends Controller
{
    public function index()
    {
        $accounts = AccountsModel::join('tblusers', 'tblusers.userid', '=', 'tbluseraccounts.userid')
            ->select(
                'tbluseraccounts.*','tblusers.*',
            )
            ->get();

        return inertia('Libraries/Accounts/Page', [
            'accounts' => $accounts
        ]);
    }
    

    public function store(Request $request)
    {
        $validated = $request->all();
        
        $validated['password'] = Hash::make($validated['password']);
        
        if (isset($validated['useraccess']) && is_array($validated['useraccess'])) {
            $validated['useraccess'] = implode(';', $validated['useraccess']);
        }

        AccountsModel::create($validated);

        return redirect()->back()->with('success', 'User account created successfully!');
    }


    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }
    public function update(Request $request, AccountsModel $account)
    {
        sleep(1);

        $fields = $request->all();

        if($request['password']){
            $fields['password'] = Hash::make($fields['password']);
        }else{
            unset($fields['password']);
        }
        $account->update(attributes: $fields);

        return redirect()->back()->with('success', 'User update successfully!');
    }
    public function destroy(AccountsModel $account)
    {
        $account->delete();

        return redirect()->back()->with('success', 'User deleted successfully!');
    }
}
