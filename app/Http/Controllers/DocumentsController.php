<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Documents;
use App\Models\Cours;

class DocumentsController extends Controller
{
    public function index()
    {
        $documents = Documents::with("cours")->get();
        return Inertia::render('document', [
            "documents" => $documents
        ]);
    }

    public function store(Request $request)
    {
        $validateData = $request->validate([
            'designation' => ['required', 'max:255'],
            'cours_id' => "required|exists:cours,id"
        ]);
        if ($request->hasFile('file')->isValid()) 
        {
            $path = $request->file('file');
            if(!Storage::disk('public_uploads')->put($path, $file->getClientOriginalExtension())) {
                return false;
            }
        }
        Documents::create([
            'designation' => $validateData['designation'],
            'cours_id' => $validateData['cours_id'],
            'file' => $path,
        ]);
        return to_route("document");
    }
}
