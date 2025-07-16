<?php

namespace App\Http\Controllers;

use App\Http\Requests\loginRequste;
use App\Http\Requests\regesterRequest;
use App\Service\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected UserService $userService;
    public function __construct(UserService $userService){$this->userService = $userService;}

    public function registerUser(regesterRequest $request) :JsonResponse
    {
        $user = $this->userService->createUser($request->validated());
        return response()->json(['message' => 'ثبت‌نام و ورود موفق', 'user' => $user]);
    }

    public function loginUser(loginRequste $request) : JsonResponse
    {

        $user = $this->userService->login($request->validated());
        return response()->json(['message' => 'ورود موفق']);
    }

    public function logoutUser()
    {
        Auth::logout();
        return response()->json(['message' => 'خروج موفق']);
    }
}
