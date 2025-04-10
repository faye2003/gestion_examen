<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cours;
use App\Models\Examens;
use App\Models\Resultats;
use App\Models\Etudiants;
use Inertia\Inertia;
use Inertia\Response;

class ExamensController extends Controller
{
     // La liste des cours
    public function index(): Response
    {
        return Inertia::render('examen', [
            "cours" => Cours::all(),
            "examens" => Examens::with("cours")->get()
        ]);
    }
    // Creation de cours
    public function create(){
        $cours =Cours::all();
        return view("examen.create", compact("cours"));
    }
    public function store(Request $request){
        $validateData = $request->validate([
            "titre" =>'required',
            "detail" => "required",
            "date"=>"required|date",
            "cours_id"=>"required|exists:cours,id"
        ]);

        Examens::create($validateData);
        return redirect()->route('examen.index')->with('success',"Examen crée avec succes");
    }
    // Formulaire de modification
    public function edit(Examens $examen){
        $cours = Cours::all();

        return view("examen.edit", compact("examen","cours"));
    }

    public function update(Request $request, int $id)
{
    // Validation des données
    $validateData = $request->validate([
        "titre" =>'required',
        "detail" => "required",
        "date" => "required|date",
        "cours_id" => "required|exists:cours,id"
    ]);

    // Récupération de l'examen
    $examen = Examens::findOrFail($id);

    // Mise à jour des données
    $examen->update($validateData);

    return redirect()->route('examen.index')->with('success', "Examen mis à jour avec succès");
}
    public function destroy(Examens $examen){
        $result = $examen->delete();
        if ($result) {
            return redirect()->route('examen.index')->with('success',"Examen supprimer avec succés");
        }
    }
    public function createNote(){
        $etudiants = Etudiants::all();
        $examens = Examens::all();
        return view("examen.store_note", compact("etudiants","examens"));
    }
    public function storeResultat(Request $request){
        $validateData = $request->validate([
            "note" =>'required',
            "etudiant_id"=>"required|exists:students,id",
            "examen_id"=>"required|exists:examens,id"
        ]);
        $note = $request->note;
        $grade = "nulle";
        if($note <= 5){

        }elseif($note <= 7){
            $grade =  "faible";
        }elseif($note <= 9){
            $grade =  "insuffissante";
        }elseif($note <= 11){
            $grade =  "passale";
        }elseif($note <= 13){
            $grade =  "Assez bien";
        }elseif($note <= 15){
            $grade =  "Bien";
        }elseif($note <= 17){
            $grade =  "Très bien";
        }elseif($note <= 19){
            $grade =  "Excellente";
        }elseif($note <= 20){
            $grade =  "Honorable";
        }
        Resultat::create([
            "note"=>$validateData['note'],
            "student_id"=>$validateData['student_id'],
            "examen_id"=>$validateData['examen_id'],
            "grade"=>$grade

        ]);
        return redirect()->route("examen.index")->with("success","Note ou resultat enregistré avec sucèss");

    }
    public function showresultat(){
        $resultats = Resultats::all();
        return view("examen.show_resultat", compact("resultats"));
    }
}
