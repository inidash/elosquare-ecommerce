<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Vendor;

class VendorPlanUpgradedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $vendor;
    public $plan;
    public $amount;

    /**
     * Create a new message instance.
     */ 
    public function __construct(Vendor $vendor, $plan, $amount)
    {
        $this->vendor = $vendor;
        $this->plan = $plan;
        $this->amount = $amount;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Vendor Plan Upgrade Was Successful!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.subscription.vendor-plan-upgrade',
            with: [
                'vendor' => $this->vendor,
                'plan' => $this->plan,
                'amount' => $this->amount,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
