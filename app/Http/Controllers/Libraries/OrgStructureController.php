<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\TblGroup1Model;
use App\Models\Libraries\TblGroup2Model;
use App\Models\Libraries\TblGroup3Model;
use Illuminate\Http\Request;

class OrgStructureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $office = TblGroup1Model::get();
        $division = TblGroup2Model::join('tblgroup1','tblgroup1.group1code','=','tblgroup2.group1code')->select(
            'tblgroup1.group1name',
            'tblgroup2.*',
        )
        ->get();
        $unit = TblGroup3Model::join('tblgroup2','tblgroup2.group2code','=','tblgroup3.group2code')
        ->join('tblgroup1','tblgroup1.group1code','=','tblgroup3.group1code')
        ->select(
            'tblgroup1.group1name',
            'tblgroup2.group2name',
            'tblgroup3.*',
        )
        ->get();
        return inertia('Libraries/OrgStructure/Page', ['office' => $office, 'division' => $division, 'unit' => $unit]);
    }

    public function group1Store(Request $request)
    {
        $validated = $request->all();

        TblGroup1Model::create($validated);

        return redirect()->back()->with('success', 'User created successfully!');
    }

    public function group2Store(Request $request)
    {
        $validated = $request->all();

        TblGroup2Model::create($validated);

        return redirect()->back()->with('success', 'User created successfully!');
    }

    public function group3Store(Request $request)
    {
        $validated = $request->all();

        TblGroup3Model::create($validated);

        return redirect()->back()->with('success', 'User created successfully!');
    }

    public function group1Update(Request $request, TblGroup1Model $office)
    {
        sleep(1);

        $fields = $request->all();

        $office->update($fields);

        return redirect()->back()->with('success', 'User update successfully!');
    }

    public function group2Update(Request $request, TblGroup2Model $division)
    {
        sleep(1);

        $fields = $request->all();

        $division->update($fields);

        return redirect()->back()->with('success', 'User update successfully!');
    }

    public function group3Update(Request $request, TblGroup3Model $unit)
    {
        sleep(1);

        $fields = $request->all();

        $unit->update($fields);

        return redirect()->back()->with('success', 'User update successfully!');
    }

    public function group1Delete(TblGroup1Model $office)
    {
        $office->delete();

        return redirect()->back()->with('success', 'User deleted successfully!');
    }
    public function group2Delete(TblGroup2Model $division)
    {
        $division->delete();

        return redirect()->back()->with('success', 'User deleted successfully!');
    }

    public function group3Delete(TblGroup3Model $unit)
    {
        $unit->delete();

        return redirect()->back()->with('success', 'User deleted successfully!');
    }

}
