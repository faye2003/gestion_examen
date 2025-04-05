<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cours;
use Inertia\Inertia;
use Inertia\Response;

class CoursController extends Controller
{
    // La liste des cours
    public function index(): Response
    {
        return Inertia::render('cours', [
            "cours" => Cours::all()
        ]);
        // return view("cours.index", compact("courses"));
    }
    public function store(Request $request){
        // Validation des données
        $validate_data = $request->validate([
            'designation' => ['required', 'unique:cours', 'max:100'],
            'description' => ['nullable', 'max:255']
        ]);
        Cours::create($validate_data);
        return to_route('cours');
        // return redirect()->route('cours.index')->with('success',"Cours enregistré avec succes");
    }
    // Formulaire de modification
    public function edit(Cours $course){
        return view("cours.edit", compact('cours'));
    }
    // Modification du cours
    public function update(Request $request, int $id ){
        // Validation des données
        $validateData = $request->validate([
            "name" =>'required',
            "description"=>"required"
        ]);
        Cours::where('id', $id)->update($validateData);
        return redirect()->route('cours.index')->with('success',"Cours modifié avec succes");
    }
    // Suppression d'un cours
    public function destroy(Cours $cours){
        $result = $course->delete();
        if ($result) {
            return redirect()->route('cours.index')->with('success',"Cours supprimer avec succés");
        }
        else{
            return redirect()->route('cours.index')->with('error',"Echec de la suppression");
        }
    }
}
