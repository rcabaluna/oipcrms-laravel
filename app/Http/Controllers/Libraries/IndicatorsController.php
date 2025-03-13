<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\Indicators\IndicatorAlignmentsTagged;
use App\Models\Libraries\IndicatorsModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class IndicatorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $indicators = DB::table('tblindicators')
            ->leftJoin('tblindicator_settings', 'tblindicator_settings.indicator_settings_id', '=', 'tblindicators.indicator_settings_id')
            ->select('*', DB::raw('(
                SELECT GROUP_CONCAT(indicators_alignment_name SEPARATOR \', \')
                FROM tblindicator_alignments_tagged
                JOIN tblindicator_alignments ON tblindicator_alignments.indicators_alignment_id = tblindicator_alignments_tagged.indicator_alignments_id
                WHERE tblindicator_alignments_tagged.ind_id = tblindicators.ind_id
            ) AS tagged_alignments'))
            ->where('tblindicators.ind_is_deleted', '!=', 1)
            ->orderBy('ind_id','ASC')
            ->orderBy('ind_hierarchy','ASC')


            
            ->get();
        

        
        return inertia('Libraries/Indicators/Page', ['indicators' => $indicators]);
    }

    public function store(Request $request)
    {

        $validated = $request->all();
        $alignments = [];

        $alignmentsTagged = $validated['indicator_alignments_id'];

        unset($validated['indicator_alignments_id']);

        $indicator = IndicatorsModel::create($validated);

        foreach ($alignmentsTagged as $alignmentsTaggedRow) {
            $alignments = array(
                'ind_id' => $indicator->ind_id,
                'indicator_alignments_id' => $alignmentsTaggedRow
            );


            IndicatorAlignmentsTagged::create($alignments);
        }

        return redirect()->back()->with('success', 'Indicator created successfully!');

    }

   
    public function show(string $id)
    {
        //
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


    public function addLevel(Request $request)
    {
        $maxHierarchy = IndicatorsModel::max(DB::raw('CAST(ind_hierarchy AS UNSIGNED)'));
        
        $newHierarchy = (int)$maxHierarchy + 1;

        $indicator = IndicatorsModel::create([
            'ind_hierarchy' => (string)$newHierarchy,  // Store the new hierarchy as a string
        ]);

        return redirect()->back()->with('success', 'Indicator created successfully!');
    }

    public function addSubLevel(Request $request)
    {
        $newId = $request->all();

        dd($request);

        return redirect()->back()->with('success', 'Indicator created successfully!');
    }

}
