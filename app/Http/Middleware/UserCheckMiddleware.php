<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserCheckMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && Auth::user()->role == 'user')
            return $next($request);
        else
            return redirect()->route('login');
        // if (Auth::check() && in_array(Auth::user()->role, ['user', 'vendor'])) {
        //     return $next($request);

        // }
        // Must be logged in
//         $user = Auth::user();
// dd($user->role);

        // if (!Auth::check()) {
        //     return redirect()->route('login');
        // }

        // if (Auth::check() && in_array(Auth::user()->role, ['user', 'vendor'])) {
        //     // dd(Auth::user()->role);

        //     return $next($request);

        // }
        // return redirect()->route('login');
    }
}
