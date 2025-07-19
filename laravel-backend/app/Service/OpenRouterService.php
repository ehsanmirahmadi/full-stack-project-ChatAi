<?php

namespace App\Service;

use App\Models\Chat;
use Illuminate\Support\Facades\Http;

class OpenRouterService
{
    protected string $apiKey;
    protected string $model;
    public function __construct()
    {
        $this->apiKey = config('services.openrouter.key');
        $this->model = config('services.openrouter.model');
    }
    public function sendMessage(Chat $chat): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'HTTP-Referer' => 'http://laravel-api.local/', // الزامی توسط OpenRouter
            'X-Title' => 'ChatAI Laravel',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => $this->model,
            'messages' => $this->buildMessages($chat),
        ]);

        if ($response->successful()) {
            return $response['choices'][0]['message']['content'];
        }

        return '❌ خطایی در ارتباط با مدل رخ داد.';
    }
    private function buildMessages(Chat $chat): array
    {
        return $chat->messages()
            ->orderBy('created_at')
            ->get()
            ->map(function ($message) {
                return [
                    'role' => $message->user_id ? 'user' : 'assistant',
                    'content' => $message->content,
                ];
            })->toArray();
    }
}
