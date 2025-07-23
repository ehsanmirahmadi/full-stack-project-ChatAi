<?php

namespace App\InterFace;

use App\Models\Message;
use Illuminate\Http\JsonResponse;

interface AiInterfaceService
{
    public function createMessageUser($userId , $chatId , $data) : Message ;
}
