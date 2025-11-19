<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register' , [AuthController::class, 'register']);
Route::post('/login' , [AuthController::class, 'login']);
Route::get('/logout' , [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::get('/chats' , [ChatController::class, 'index'])->middleware('auth:sanctum');

Route::post('/chats' , [ChatController::class, 'store'])->middleware('auth:sanctum');
Route::delete('/chats/{chatId}' , [ChatController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/chat/{chatId}' , [ChatController::class, 'showChat'])->middleware('auth:sanctum');
Route::post('/chat/{chatId}' , [AIController::class, 'handelMessage'])->middleware('auth:sanctum');
