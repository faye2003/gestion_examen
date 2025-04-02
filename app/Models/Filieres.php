<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Filieres extends Model
{
    use HasFactory;
    protected $fillable = ['designation', 'description'];

    public function etudiants()
    {
        return $this->hasMany('etudiants');
    }
}
