<?php

namespace App\Providers;

use App\InterFace\AuthInterFaceService;
use App\InterFace\ChatInterFaceService;
use App\Service\AuthService;
use App\Service\ChatService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthInterFaceService::class, AuthService::class);
        $this->app->bind(ChatInterFaceService::class, ChatService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
