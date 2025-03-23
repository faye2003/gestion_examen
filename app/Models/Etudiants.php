<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiants extends Model
{
    use HasFactory;
    protected $fillable = ['prenom', 'nom', 'email', 'telephone', 'filiere_id'];

    public function filieres()
    {
        return $this->belongsTo(Filieres::class, 'filiere_id');
    }
}
