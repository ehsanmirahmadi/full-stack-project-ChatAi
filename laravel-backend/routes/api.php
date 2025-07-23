<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register' , [AuthController::class, 'register']);
Route::post('/login' , [AuthController::class, 'login']);
Route::get('/logout' , [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::post('/chatAi' , [AIController::class, 'chatAi'])->name('message-Ai');
