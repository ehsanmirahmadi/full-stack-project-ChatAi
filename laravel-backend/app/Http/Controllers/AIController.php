<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIController extends Controller
{
    public function chatAi(Request $request) : JsonResponse
    {
        $apiKey = env('AI_API_KEY');
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'HTTP-Referer' => 'http://laravel-api.local',
            'X-Title' => 'ChatAi',
        ])->post("https://openrouter.ai/api/v1/chat/completions" , [
            'model'=>"qwen/qwen3-235b-a22b-07-25:free",
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $request->input('message' , 'hi'),
                ],
            ],
        ]);
        return response()->json($response->json());
    }
}
