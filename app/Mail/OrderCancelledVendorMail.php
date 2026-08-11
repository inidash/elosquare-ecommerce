<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\OrderItem;

class OrderCancelledVendorMail extends Mailable
{
    public function __construct(public OrderItem $item) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Order Cancellation Notification',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.vendor.order-cancelled',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}