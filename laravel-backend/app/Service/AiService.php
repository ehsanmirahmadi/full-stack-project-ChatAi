<?php

namespace App\Service;

use App\InterFace\AiInterfaceService;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class AiService implements AiInterfaceService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function createMessageUser($userId , $chatId , $data) : Message
    {
        $chatData = [
            "chat_id" => $chatId ,
            "message" => $data["message"],
            "role" => 0 ,
        ];
        $res = Message::create($chatData);
        return $res ;
    }

    public function sendMessageAi($userMessage) : array
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer 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',
            'HTTP-Referer' => 'http://laravel-api.local',
            'X-Title' => 'ChatAi',
        ])->post("https://openrouter.ai/api/v1/chat/completions" , [
            'model'=>"qwen/qwen3-4b:free",
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $userMessage,
                ],
            ],
        ]);
        return $response->json();
    }
    public function createMessageAI($chat_id ,$AiMessage) :JsonResponse
    {
        $chatData = [
            "chat_id" => $chat_id,
            'message' =>  $AiMessage,
            'role' => 1 ,
        ];
        $res = Message::create($chatData);
        return response()->json($res) ;
    }
}
