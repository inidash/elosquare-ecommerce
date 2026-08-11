<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorAccountDetail extends Model
{
    protected $fillable = [
        'vendor_id',
        'account_name',
        'account_number',
        'bank_name',
        'bank_branch',
        'swift_code',
        'account_type',
    ];

  public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }


}
