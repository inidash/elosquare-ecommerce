<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Category;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
         Inertia::share('categories', function () {
        return Category::with('children:id,name,slug,parent_id')
            ->whereNull('parent_id')
            ->select('id', 'name', 'slug')
            ->orderBy('name')
            ->get();
    });
    }
}
