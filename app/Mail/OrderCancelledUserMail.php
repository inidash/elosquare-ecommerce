<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class OrderCancelledUserMail extends Mailable
{
    public function __construct(public Order $order) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Order Has Been Cancelled',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.user.order-cancelled',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
