<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    use HasFactory;
    protected $fillable = ['designation', 'file', 'cours_id'];

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }
}
