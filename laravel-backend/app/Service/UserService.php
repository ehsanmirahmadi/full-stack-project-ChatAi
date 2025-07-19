<?php

namespace App\Service;

use App\interface\UserInterFace;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService implements UserInterFace
{
    /**
     * Create a new class instance.
     */
    public function __construct(){}
    public function createUser(array $userData) : User
    {
        $data = [
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => Hash::make($userData['password'])
        ];
        $user = User::create($data);
        Auth::login($user);
        return $user;
    }
    public function updateUser( $user , array $userData) :  ?User
    {
        if (isset($userData['password'])) {
            $userData['password'] = Hash::make($userData['password']);
        }

        $user->update($userData);
        return $user;
    }
    public function login(array $userDate) :  ?User
    {

        $user = User::where('email', $userDate['email'])->first();

        if (! $user || ! Hash::check($userDate['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['اطلاعات وارد شده اشتباه است.'],
            ]);
        }
        Auth::login($user);
        return $user;
    }


}
