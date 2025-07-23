<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Service\ChatService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function __construct(private ChatService $chatService)
    {
        //
    }

    public function index(Request $request) : JsonResponse
    {
       $res = $this->chatService->findAllByUser($request->user()->id);
       return $res;
    }

    public function store(Request $request) : JsonResponse
    {
        $res = $this->chatService->createChat($request->user()->id);
        return $res;
    }

    public function destroy(Request $request , $chatId) : JsonResponse
    {
        $res = $this->chatService->deleteChat($request->user()->id , $chatId);
        return $res;
    }
}
