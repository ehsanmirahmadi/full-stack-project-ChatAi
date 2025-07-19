<?php

use App\Http\Controllers\AIChatController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::get('/csrf-cookie', function () {return response()->json(['message' => 'CSRF cookie set']);});
    Route::post('/register', [UserController::class, 'registerUser']);
    Route::post('/login', [UserController::class, 'loginUser']);
    Route::post('/logout', [UserController::class, 'logoutUser'])->middleware('auth:sanctum');
});
/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::put('/user', [UserController::class, 'updateUser']);
    Route::delete('/user', [UserController::class, 'deleteUser']);
});
/*
|--------------------------------------------------------------------------
| Chat Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chats', [AIChatController::class, 'index']);
    Route::post('/chats', [AIChatController::class, 'store']);
    Route::post('/chats/{chat}/send', [AIChatController::class, 'send']);
    Route::get('/chats/{chat}/messages', [AIChatController::class, 'messages']);
});
