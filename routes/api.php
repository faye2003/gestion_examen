<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\CoursController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/", [FilieresController::class, "index"]);
Route::post("/create", [FilieresController::class, "store"]);
Route::get('/cours', [CoursController::class, 'index']);
Route::post("/create_cours", [CoursController::class, "store"]);