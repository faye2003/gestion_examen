<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\CoursController;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');
Route::get('/home', function () {
    return Inertia::render('events/home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('cours', function () {
        return Inertia::render('cours');
    })->name('cours');
    Route::get('examen', function () {
        return Inertia::render('examen');
    })->name('examen');
    Route::get('filiere', function () {
        return Inertia::render('filiere');
    })->name('filiere');
    Route::get('etudiant', function () {
        return Inertia::render('etudiant');
    })->name('etudiant');

    
    Route::get("/filiere", [FilieresController::class, 'index'])->name("index");
    Route::post("/create_filiere", [FilieresController::class, "store"]);
    Route::post("/", [CoursController::class, 'store']);


    Route::prefix("filiere")->group(function(){
        // Route::inertia("/filiere", "filiere");
        Route::get("/filiere", [FilieresController::class, 'index'])->name("index");
        // Route::post('/', [FiliereController::class, "store"])->name('filieres.store');
        // Route::get('/{filiere}', [FiliereController::class, "edit"])->name("filieres.edit");
        // Route::put('/{id}',[FiliereController::class, "update"])->name("filieres.update");
        // Route::delete('/{filiere}',[FiliereController::class, "destroy"])->name("filieres.destroy");
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
