<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Service\AuthService;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(private AuthService $authService)
    {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $res = $this->authService->createUser($request->validated());
        return response()->json($res);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $res = $this->authService->checkUser($request->validated());
        return response()->json($res);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = User::where('id', $request->user()->id)->first();
        if ($user) {
            $user->tokens()->delete();
            return response()->json([
                'message' => 'Logged out',
                'data' => $user
            ]);
        }
        return response()->json([
            'message' => 'warning at out',
        ]);
    }
}
