<?php

use App\Http\Controllers\AIChatController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// گرفتن CSRF token از sanctum (خودکار هندل می‌شه)
Route::get('/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});

// ثبت‌نام
Route::post('/register', [UserController::class, 'registerUser']);

// ورود
Route::post('/login', [UserController::class, 'loginUser']);

// خروج
Route::post('/logout', [UserController::class, 'logoutUser']);

/*
|--------------------------------------------------------------------------
| Protected Routes (after login)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'status' => true,
        'user' => $request->user(),
    ]);
});

// routes/api.php
Route::middleware('auth:sanctum')->put('/user', [UserController::class, 'updateUser']);

// routes/api.php
Route::middleware('auth:sanctum')->delete('/user', [UserController::class, 'deleteUser']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chats', [AIChatController::class, 'index']);
    Route::post('/chats', [AIChatController::class, 'store']);
    Route::post('/chats/{chat}/send', [AIChatController::class, 'send']);
    Route::get('/chats/{chat}/messages', [AIChatController::class, 'messages']);
});
