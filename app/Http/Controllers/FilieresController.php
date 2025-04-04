<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filieres;
use Inertia\Inertia;
use Inertia\Response;

class FilieresController extends Controller
{
    public function index(): Response
    {
        // dd($request->all());
        return Inertia::render('filiere', [
            "filiere" => Filieres::all()
        ]);
    }

    // Formulaire de cration d'une filiere
    public function create(){
        return view("filiere.create");
    }

    public function store(Request $request)
    {
        Filieres::create($request->validate([
            'designation' => ['required', 'unique:filieres', 'max:100'],
            'description' => ['nullable', 'max:255']
        ]));

        return to_route('filiere');
        // Filiere::create($validateData);
        // return redirect()->route('filieres.index')->with('success',"Filiere enregistrée avec succés");
    }

    public function edit(Filieres $filiere){
        return view('filiere.edit',compact('filiere'));
    }

    public function update(Request $request, int $id){
        $validateData = $request->validate([
            'name'=> "required"
          ]);
          Filieres::where('id',$id)->update($validateData);
          return redirect()->route('filiere.index')->with('success',"Filiere modifiée avec succés");
    }

    public function destroy(Filieres $filiere){
        $resultat = $filiere->delete();
        if ($resultat) {
            return redirect()->route('filiere.index')->with('success',"Filiere supprimer avec succés");
        }
        else{
            return redirect()->route('filiere.index')->with('error',"Echec de la suppression");
        }
    }
}
