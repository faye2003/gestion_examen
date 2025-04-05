<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Documents extends Model
{
    use HasFactory;
    protected $fillable = ['designation', 'file', 'cours_id'];

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }
}
