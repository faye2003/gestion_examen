<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filieres;
use App\Models\Etudiants;
use PHPUnit\Framework\MockObject\Builder\Stub;

class EtudiantsController extends Controller
{
    // Liste des étudiants et de leurs filieres
    public function index(){
        $etudiants = Etudiants::with("filieres")->get();
        //
        return view("etudiant.index", compact("etudiants"));

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
        "filiere_id" =>"required|exists:filieres,id"
        ]);
        Student::create($validataData);
        return redirect()->route("etudiant.index")->with("success","Etudiant crée avec succès");
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
