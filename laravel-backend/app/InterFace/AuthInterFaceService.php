<?php

namespace App\InterFace;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface AuthInterFaceService
{
    public function createUser(array $userData) : JsonResponse;

    public function checkUser(array $userData) : JsonResponse;
}
