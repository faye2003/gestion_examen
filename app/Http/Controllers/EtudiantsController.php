<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filieres;
use App\Models\Etudiants;
use PHPUnit\Framework\MockObject\Builder\Stub;
use Inertia\Inertia;
use Inertia\Response;

class EtudiantsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('etudiant', [
            "filieres" => Filieres::all(),
            "etudiants" => Etudiants::with('filieres')->get()
        ]);
    }
    // Creation d-un étudiant
    public function create(){
        $filieres = Filiere::all();
        return view("etudiant.create", compact("filieres"));
    }
    public function store(Request $request){
        $validataData = $request->validate([
        "prenom" =>"required",
        "nom" =>"required",
        "email" =>"required|email",
        "telephone" =>"required|min:9",
        "date_naissance" => "required|date",
        "filiere_id" =>"required|exists:filieres,id",
        ]);
        Etudiants::create($validataData);
        return Inertia::location('/etudiant');
        // return redirect()->route("etudiant.index")->with("success","Etudiant crée avec succès");
    }
    // Formulaire de modification
    public function edit(Etudiants $etudiant){
        $filieres = Filieres::all();
        return view("etudiant.edit",compact("etudiant", "filieres"));

    }
    // Modification
    public function update(Request $request, int $id){
        $validataData = $request->validate([
            "prenom" =>"required",
            "nom" =>"required",
            "email" =>"required|email ",
            "telephone" =>"required|min:8",
            "filiere_id" =>"required|exists:filieres,id"
        ]);
        Etudiants::where('id',$id)->update($validataData);
        return redirect()->route("etudiant.index")->with("success","Etudiant modifié avec success");
    }
    //Suppression
    public function destroy(Etudiants $etudiant){
        $result = $etudiant->delete();
        if ($result){
            return redirect()->route("etudiant.index")->with("success","Etudiant supprimé avec success");
        }else{
            return redirect()->route("etudiant.index")->with("error","Echec de suppression");

        }
    }
}
