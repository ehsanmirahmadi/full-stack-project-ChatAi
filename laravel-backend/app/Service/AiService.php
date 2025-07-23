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

    public function sendMessageAi($userMessage) :array
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
    public function createMessageAI()
    {

    }
}
