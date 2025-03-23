<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filieres extends Model
{
    use HasFactory;
    protected $table = 'filieres';
    protected $fillable = ['id', 'designation', 'description'];

    public function etudiants()
    {
        return $this->hasMany('etudiants');
    }
}
