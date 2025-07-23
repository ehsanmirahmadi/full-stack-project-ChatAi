<?php

namespace App\InterFace;

use Illuminate\Http\JsonResponse;

interface ChatInterFaceService
{
    public function findAllByUser($userId) : JsonResponse ;
    public function createChat($userId) : JsonResponse ;
    public function deleteChat($userId ,$chatId) : JsonResponse ;
    public function showChatByChatId($userId,$chatId) : JsonResponse ;
    public function createMessage($userId , $chatId , $data) : JsonResponse ;

}

