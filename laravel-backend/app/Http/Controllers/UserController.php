<?php

namespace App\Http\Controllers;

use App\Http\Requests\loginRequste;
use App\Http\Requests\regesterRequest;
use App\Http\Requests\updateRequest;
use App\Service\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct(protected UserService $userService) {}
    public function registerUser(regesterRequest $request) :JsonResponse
    {
        $user = $this->userService->createUser($request->validated());
        return response()->json(['message' => 'ثبت‌نام و ورود موفق', 'user' => $user]);
    }
    public function loginUser(loginRequste $request) : JsonResponse
    {
        $user = $this->userService->login($request->validated());
        return response()->json(['message' => 'ورود موفق' , 'user' => $user]);
    }
    public function logoutUser(Request $request) :JsonResponse
    {
        auth()->guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'خروج با موفقیت انجام شد.']);
    }
    public function getUser(Request $request): JsonResponse
    {
        return response()->json([
            'status' => true,
            'user' => $request->user(),
        ]);
    }
    public function updateUser(UpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $this->userService->updateUser($user, $request->validated());

        return response()->json([
            'status' => true,
            'message' => 'اطلاعات با موفقیت به‌روزرسانی شد',
            'user' => $user->fresh(),
        ]);
    }
    public function deleteUser(Request $request): JsonResponse
    {
        $request->user()->delete();
        return response()->json([
            'status' => true,
            'message' => 'حساب کاربری حذف شد',
        ]);
    }
}
