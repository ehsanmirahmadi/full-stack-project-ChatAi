<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $table = 'chats';
<<<<<<< HEAD
    protected $guarded = [] ;
=======
    protected $guarded = [];

    public function message()
    {
        return $this->hasMany(Message::class,'chat_id','id');
    }
>>>>>>> dev-ehsan
}
