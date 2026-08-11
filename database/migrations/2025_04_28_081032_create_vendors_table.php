<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('business_name');
            $table->string('business_number');
            $table->string('business_address');
            $table->string('website')->nullable();
            $table->string('state_of_business');
            $table->string('tax_identification_number')->nullable();
            $table->string('business_registration_number')->nullable();
            $table->text('business_description');
            $table->string('class_of_business');
            $table->string('vendor_address');
            $table->string('vendor_city');
            $table->string('vendor_state');
            $table->string('vendor_zip_code');
            $table->string('vendor_country');
            $table->string('vendor_phone');
            $table->string('vendor_status')->default('Pending'); // Pending, Approved, Rejected
            $table->string('vendor_plan')->default('free');
            $table->timestamps();

           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
