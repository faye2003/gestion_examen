<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
