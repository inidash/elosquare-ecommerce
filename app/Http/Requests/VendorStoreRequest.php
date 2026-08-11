<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VendorStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array

    {
        return [
            //
            
        'business_name' =>'required|string|max:255', 
        'business_address' =>'required|string|max:255', 
        'business_number' =>'required|string|max:255', 
        'website' =>'nullable|string|max:255',
        'state_of_business' =>'required|string|max:255',
        'tax_identification_number' =>'nullable|string|max:255',
        'business_registration_number' =>'nullable|string|max:255',
        'business_description' =>'required|string',
        'class_of_business' =>'required|string|max:255',
        'vendor_address' =>'required|string|max:255',
        'vendor_city' =>'required|string|max:255',
        'vendor_state' =>'required|string|max:255',
        'vendor_zip_code' =>'nullable|string|max:255',
        'vendor_country' =>'nullable|string|max:255',
        'vendor_phone' =>'required|string|max:255',
        'vendor_plan' =>'nullable|string|max:255',
       
        ];
    }
}
