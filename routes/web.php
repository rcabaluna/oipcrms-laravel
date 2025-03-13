<?php

use App\Http\Controllers\Libraries\AccountsController;
use App\Http\Controllers\Libraries\IndicatorsController;
use App\Http\Controllers\Libraries\OrgStructureController;
use App\Http\Controllers\Libraries\UsersController;
use App\Http\Controllers\Opcr\AccomplishmentsController;
use App\Http\Controllers\Opcr\TargetsController;
use Illuminate\Support\Facades\Route;




Route::resource('/libraries/users', UsersController::class);
Route::resource('/libraries/accounts', AccountsController::class);
Route::prefix('libraries/org-structure')->group(function () {
    Route::get('/', [OrgStructureController::class, 'index']);
    Route::post('/group1', [OrgStructureController::class, 'group1Store'])->name('org-structure.group1Store');
    Route::post('/group2', [OrgStructureController::class, 'group2Store'])->name('org-structure.group2Store');
    Route::post('/group3', [OrgStructureController::class, 'group3Store'])->name('org-structure.group3Store');
    Route::put('/group1/{office}', [OrgStructureController::class, 'group1Update'])->name('org-structure.group1Update');
    Route::put('/group2/{division}', [OrgStructureController::class, 'group2Update'])->name('org-structure.group2Update');
    Route::put('/group3/{unit}', [OrgStructureController::class, 'group3Update'])->name('org-structure.group3Update');
    Route::delete('/group1/{office}', [OrgStructureController::class, 'group1Delete'])->name('org-structure.group1Delete');
    Route::delete('/group2/{division}', [OrgStructureController::class, 'group2Delete'])->name('org-structure.group2Delete');
    Route::delete('/group3/{unit}', [OrgStructureController::class, 'group3Delete'])->name('org-structure.group3Delete');
});

Route::resource('/opcr/targets', TargetsController::class);
Route::resource('/opcr/accomplishments', AccomplishmentsController::class);


Route::resource('/libraries/indicators', IndicatorsController::class)->only([
    'index', 'store'
]);
Route::post('/libraries/indicators/add-level', [IndicatorsController::class, 'addLevel'])->name('indicators.addLevel');
Route::post('/libraries/indicators/add-sublevel', [IndicatorsController::class, 'addSubLevel'])->name('indicators.addSubLevel');











require __DIR__.'/api.php';
