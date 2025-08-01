<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\Indicators\IndicatorAlignmentsTagged;
use App\Models\Libraries\IndicatorsModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class IndicatorsController extends Controller
{
    public function index()
    {

        $indicators = DB::table('tblindicators')
        ->leftJoin('tblindicator_settings', 'tblindicator_settings.indicator_settings_id', '=', 'tblindicators.indicator_settings_id')
        ->select('*', DB::raw('(
            SELECT GROUP_CONCAT(indicators_alignment_name SEPARATOR \', \')
            FROM tblindicator_alignments_tagged
            JOIN tblindicator_alignments ON tblindicator_alignments.indicators_alignment_id = tblindicator_alignments_tagged.indicator_alignments_id
            WHERE tblindicator_alignments_tagged.ind_id = tblindicators.ind_id
        ) AS tagged_alignments,
        (
            SELECT GROUP_CONCAT(indicators_alignment_id SEPARATOR \',\')
            FROM tblindicator_alignments_tagged
            JOIN tblindicator_alignments 
                ON tblindicator_alignments.indicators_alignment_id = tblindicator_alignments_tagged.indicator_alignments_id
            WHERE tblindicator_alignments_tagged.ind_id = tblindicators.ind_id
        ) AS tagged_alignments_idx'))
        ->where('tblindicators.ind_is_deleted', '!=', 1)
        ->orderByRaw("
            CONCAT(
                LPAD(SUBSTRING_INDEX(ind_hierarchy, '.', 1), 5, '0'), '.',
                LPAD(SUBSTRING_INDEX(ind_hierarchy, '.', 2), 5, '0'), '.',
                LPAD(SUBSTRING_INDEX(ind_hierarchy, '.', 3), 5, '0'), '.',
                LPAD(SUBSTRING_INDEX(ind_hierarchy, '.', 4), 5, '0'), '.',
                LPAD(SUBSTRING_INDEX(ind_hierarchy, '.', 5), 5, '0')
            )
        ")
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
    }
    public function edit(string $id)
    {
    }
    public function update(Request $request, Int $indicator)
    {
        $data = $request->all();
        
        //check if the updatedData key is "indicator_alignments_id"

        if (isset($data['updatedData']['indicator_alignments_id'])) {
            $alignmentsTagged = $data['updatedData']['indicator_alignments_id'];
            unset($data['updatedData']['indicator_alignments_id']);

            // Delete existing alignments for the indicator
            IndicatorAlignmentsTagged::where('ind_id', $indicator)->delete();

            // Insert new alignments
            foreach ($alignmentsTagged as $alignmentId) {
                IndicatorAlignmentsTagged::create([
                    'ind_id' => $indicator,
                    'indicator_alignments_id' => $alignmentId
                ]);
            }
        }
        else{
            $update = IndicatorsModel::where('ind_id', $indicator)->update($data['updatedData']);
        }

        return redirect()->back()->with('success', 'Indicator updated successfully!');
    }

    public function destroy(string $id)
    {
    }
    

    public function addLevel(Request $request)
    {
        $maxHierarchy = IndicatorsModel::max(DB::raw('CAST(ind_hierarchy AS UNSIGNED)'));
        
        $newHierarchy = (int)$maxHierarchy + 1;

        $indicator = IndicatorsModel::create([
            'ind_hierarchy' => (string)$newHierarchy,
            'ind_is_head' => 1
        ]);

        return redirect()->back()->with('success', 'Indicator created successfully!');
    }

    public function addSubLevel(Request $request)
    {
        $input = $request->all();
        $newHierarchy = $input['ind_hierarchy'];

        // Fetch all existing hierarchies that start with the same base
        $existingHierarchies = IndicatorsModel::where('ind_hierarchy', 'LIKE', "$newHierarchy%")
            ->pluck('ind_hierarchy')
            ->toArray();

        if (!empty($existingHierarchies)) {
            // Extract the last sublevel number
            $subLevels = array_map(function ($hierarchy) use ($newHierarchy) {
                return str_replace("$newHierarchy.", "", $hierarchy);
            }, $existingHierarchies);

            // Remove non-numeric values and convert to integers
            $subLevels = array_filter($subLevels, 'is_numeric');
            $subLevels = array_map('intval', $subLevels);

            // Find the highest number and increment it
            $lastNumber = !empty($subLevels) ? max($subLevels) : 0;
            $newHierarchy = "$newHierarchy." . ($lastNumber + 1);
        }

        // Create the new indicator
        IndicatorsModel::create([
            'ind_hierarchy' => $newHierarchy
        ]);

        return redirect()->back()->with('success', 'Indicator created successfully!');
    }


}
