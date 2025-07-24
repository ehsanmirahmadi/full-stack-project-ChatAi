<?php

namespace App\InterFace;

use App\Models\Message;
use Illuminate\Http\JsonResponse;

interface AiInterfaceService
{
    public function createMessageUser($userId , $chatId , $data) : Message ;
    public function sendMessageAi($userMessage) :array ;
    public function createMessageAI($chat_id ,$AiMessage) :JsonResponse ;
}
