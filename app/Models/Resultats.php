<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resultats extends Model
{
    use HasFactory;
    protected $fillable = ['note', 'etudiant_id', 'examen_id', 'grade'];

    public function etudiants()
    {
        return $this->belongsTo(Etudiants::class);
    }

    public function examens()
    {
        return $this->belongsTo(Examens::class);
    }
}
