<?php

namespace App\interface;

use App\Models\User;

interface UserInterFace
{
    public function createUser(array $userData) : User;
    public function updateUser($user , array $userData) :  ? User;

    public function login(array $userDate): ? User;
}
