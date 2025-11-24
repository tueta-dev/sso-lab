<?php

use App\Http\Controllers\Auth\CallbackController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/login', LoginController::class)->name('auth.login');

Route::get('/auth/callback', CallbackController::class)->name('auth.callback');
