<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Filieres;

class Etudiants extends Model
{
    use HasFactory;
    protected $fillable = ['prenom', 'nom', 'email', 'telephone', 'date_naissance', 'filiere_id'];

    public function filieres()
    {
        return $this->belongsTo(Filieres::class, 'filiere_id');
    }
}
