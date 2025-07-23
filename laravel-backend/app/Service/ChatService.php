<?php

namespace App\Service;


use App\InterFace\ChatInterFaceService;
use App\Models\Chat;
use Illuminate\Http\JsonResponse;

class ChatService implements ChatInterFaceService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function findAllByUser($userId) : JsonResponse
    {
        $res = Chat::where("user_id", "=", $userId)->get();
        if (isset($res[0])){
            return response()->json([
                'message' => 'success get',
                'chat' => $res
            ]);
        }
        return response()->json([
            'message' => 'failed get',
        ]);
    }

    public function createChat($userId) : JsonResponse
    {
        $data = [
            "user_id" => $userId,
            "title" => "new chat",
        ];
        $res = Chat::create($data);

        if (isset($res)){
            return response()->json([
                'message' => 'success create chat',
                'chat' => $res
            ]);
        }
        return response()->json([
            'message' => 'failed create chat',
        ]);
    }

    public function deleteChat($userId ,$chatId) : JsonResponse
    {
        $res = Chat::where("user_id" , $userId)->where("id" , $chatId)->delete();
        if ($res){
            return response()->json([
                'message' => 'success delete chat',
            ]);
        }
        return response()->json([
            'message' => 'failed delete chat',
        ]);
    }
}
