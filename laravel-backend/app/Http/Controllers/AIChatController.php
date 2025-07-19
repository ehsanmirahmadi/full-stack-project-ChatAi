<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Service\OpenRouterService;
use Illuminate\Http\Request;

class AIChatController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $chats = $user->chats()
            ->latest()
            ->withCount('messages')
            ->get()
            ->map(function ($chat) {
                return [
                    'id' => $chat->id,
                    'title' => $chat->title ?? 'بدون عنوان',
                    'updated_at' => $chat->updated_at->toIso8601String(),
                ];
            });

        return response()->json([
            'chats' => $chats,
        ]);
    }

    public function send(Request $request, Chat $chat, OpenRouterService $openRouter)
    {
        $request->validate([
            'message' => 'required|string|max:2000',
        ]);

        if ($chat->user_id !== $request->user()->id) {
            abort(403, 'دسترسی غیرمجاز');
        }

        // ذخیره پیام کاربر
        $chat->messages()->create([
            'user_id' => $request->user()->id,
            'role' => 'user',
            'content' => $request->input('message'),
        ]);

        // گرفتن پاسخ از مدل
        $reply = $openRouter->sendMessage($chat);

        // ذخیره پیام مدل
        $chat->messages()->create([
            'user_id' => null,
            'role' => 'assistant',
            'content' => $reply,
        ]);

        return response()->json([
            'reply' => $reply,
        ]);
    }

    public function messages(Chat $chat)
    {
        if ($chat->user_id !== auth()->id()) {
            abort(403, 'دسترسی غیرمجاز');
        }
        $messages = $chat->messages()
            ->orderBy('created_at')
            ->get()
            ->map(function ($message) {
                return [
                    'id' => $message->id,
                    'role' => $message->user_id ? 'user' : 'assistant',
                    'content' => $message->content,
                    'timestamp' => $message->created_at->toIso8601String(),
                ];
            });

        return response()->json([
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $title = $request->input('title', 'چت جدید');

        $chat = $user->chats()->create([
            'title' => $title,
        ]);

        return response()->json([
            'chat' => [
                'id' => $chat->id,
                'title' => $chat->title,
                'created_at' => $chat->created_at->toIso8601String(),
            ],
            'message' => 'چت جدید با موفقیت ساخته شد.',
        ], 201);
    }

}
