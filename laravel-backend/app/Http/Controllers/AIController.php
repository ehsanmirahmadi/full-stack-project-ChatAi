<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Service\AiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIController extends Controller
{
    public function __construct(private AiService $aiService)
    {
    }
    public function handelMessage(MessageRequest $request , $chatId) :JsonResponse
    {
        $messageUser = $this->aiService->createMessageUser($request->user()->id , $chatId , $request->validated());
        $sendMessage = $this->aiService->sendMessageAi(json_encode($messageUser->message));
        $messageAi = $this->aiService->createMessageAI($chatId,$sendMessage['choices'][0]['message']['content']);
        if (isset($messageAi))   return response()->json([
            "message" => $messageAi->original,
        ]);
        return response()->json([
            "message" => "not message",
        ]);
    }
}
