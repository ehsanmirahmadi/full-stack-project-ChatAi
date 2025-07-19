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
    protected UserService $userService;
    public function __construct(UserService $userService){$this->userService = $userService;}

    public function getUser()
    {

    }
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

    public function logoutUser() :JsonResponse
    {
        Auth::logout();
        return response()->json(['message' => 'خروج موفق']);
    }

    public function updateUser(updateRequest $request) :JsonResponse
    {
        $user = auth()->user();
        $this->userService->updateUser($user , $request->validated());
        return response()->json([
                'status' => true,
                'message' => 'اطلاعات با موفقیت به‌روزرسانی شد',
                'user' => $user,
            ]);
    }

    public function deleteUser() : JsonResponse
    {
        $user = auth()->user();
        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'حساب کاربری حذف شد',
        ]);
    }
}
