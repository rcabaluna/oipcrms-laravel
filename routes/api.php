<?php

use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Route;

Route::get('/api/group1', [ApiController::class, 'group1']);
Route::get('/api/group2', [ApiController::class, 'group2']);
Route::get('/api/group3', [ApiController::class, 'group3']);
Route::get('/api/indicators/settings', [ApiController::class, 'indicatorSettings']);
Route::get('/api/indicators/alignments', [ApiController::class, 'indicatorAlignments']);

Route::get('/api/available-users', [ApiController::class, 'availableUsers']);


