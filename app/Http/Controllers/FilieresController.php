<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filieres;

class FilieresController extends Controller
{
    public function index()
    {
        return Inertia::render('filiere', [
            'filieres' => Filieres::all(),
        ]);
    }

    public function store(Request $request)
    {
        Filieres::create($request->validate([
            'designation' => ['required', 'unique:filieres', 'max:100'],
            'description' => ['nullable', 'max:255']
        ]));

        return to_route('filiere');
    }
}
