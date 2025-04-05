<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Examens extends Model
{
    use HasFactory;
    protected $fillable = ['titre', 'detail', 'date', 'cours_id'];

    public function cours()
    {
        return $this->belongsTo(Cours::class, 'cours_id');
    }
}
