<?php

namespace App\Http\Controllers\Opcr;

use App\Http\Controllers\Controller;
use App\Models\Libraries\IndicatorsModel;
use App\Models\OPCR\TargetDetailsModel;
use App\Models\OPCR\TargetSummaryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TargetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $targetssummaries = TargetSummaryModel::orderBy('targetsummaryid', 'DESC')->get();
        return inertia('Opcr/Targets/Page', ['targetssummaries' => $targetssummaries]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        
        //create a new target summary
        $targetSummary = TargetSummaryModel::create([
            'year' => $data['year'],
        ]);
        $targetsummaryid = $targetSummary->targetsummaryid;

        //create a new target details from indicators
        $indicators = IndicatorsModel::all();

        foreach ($indicators as $indicator) {
          TargetDetailsModel::create([
                'targetsummaryid' => $targetsummaryid,
                'xvalue' => '',
                'ind_id' => $indicator->ind_id,
            ]);
        }


        return redirect()->back()->with('success', 'Success!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $targetsummaryid)
    {
        $targetdetails = DB::table('tbltarget_details as a')
        ->join('tblindicators as b', 'b.ind_id', '=', 'a.ind_id')
        ->leftJoin('tblindicator_settings as c', 'c.indicator_settings_id', '=', 'b.indicator_settings_id')
        ->select(
    'b.ind_hierarchy',
            'a.targetdetailsid',
            'b.ind_name',
            'b.ind_definition',
            'c.indicator_settings_name',
            DB::raw("(
                SELECT GROUP_CONCAT(x2.indicators_alignment_name SEPARATOR ',')
                FROM tblindicator_alignments_tagged x1
                JOIN tblindicator_alignments x2 
                    ON x2.indicators_alignment_id = x1.indicator_alignments_id
                WHERE x1.ind_id = b.ind_id
            ) AS indicators_alignment")
        )
        ->where('b.is_deleted', 0)
        ->where('a.targetsummaryid', $targetsummaryid)
        ->get();

        return inertia('Opcr/Targets/Partials/TargetDetails',['targetdetails' => $targetdetails]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function updateDetailsValue(Request $request, string $targetdetailsid){
        $request = $request->all();

        TargetDetailsModel::where('targetdetailsid', $targetdetailsid)
            ->update(['xvalue' => $request['xvalue']]);


    }
}
