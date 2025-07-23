<?php

namespace App\Service;

use App\InterFace\AuthInterFaceService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService implements AuthInterFaceService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }

    public function createUser(array $userData) : JsonResponse
    {
        $user = [
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => Hash::make($userData['password'])
        ];
        if (!User::where('email' , $userData['email'])->exists()) {
            $res = User::create($user);
            if ($res){
                return response()->json([
                    'message' => 'User successfully created',
                ]);
            }
            return response()->json([
                'message' => 'User warning at create '
            ]);
        }
        return response()->json(['message' => 'User reapet']);
    }
    public function checkUser(array $userData) : JsonResponse
    {
        $user = User::where('email', $userData['email'])->first();
        if (!$user || !Hash::check($userData['password'], $user['password'])) {
            return response()->json([
                    'message' => 'User not exists ',
                ] ,401);
        }

        $token = $user->createToken($user->name .'auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User successfully exists',
            'token' => $token,
            ], 200);

    }
}
