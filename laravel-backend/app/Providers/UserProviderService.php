<?php

namespace App\Providers;

use App\interface\UserInterFace;
use App\Service\UserService;
use Illuminate\Support\ServiceProvider;

class UserProviderService extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            UserInterFace::class,
            UserService::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
