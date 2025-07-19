<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Models\Chat;
use App\Service\OpenRouterService;
use Illuminate\Http\Request;

class AIChatController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $chats = ChatResource::collection(
            $user->chats()->latest()->withCount('messages')->get()
        );

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
        $reply = $openRouter->handleChatReply($chat, $request->user(), $request->input('message'));
        return response()->json([
            'reply' => $reply,
        ]);
    }

    public function messages(Chat $chat)
    {
        if ($chat->user_id !== auth()->id()) {
            abort(403, 'دسترسی غیرمجاز');
        }
        $messages = MessageResource::collection(
            $chat->messages()->orderBy('created_at')->get()
        );
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
            'chat' => new ChatResource($chat),
            'message' => 'چت جدید با موفقیت ساخته شد.',
        ], 201);
    }

}
