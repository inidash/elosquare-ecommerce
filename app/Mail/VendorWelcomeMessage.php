<?php

namespace App\Mail;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class VendorWelcomeMessage extends Mailable
{
    use Queueable, SerializesModels;

    public $vendor;
    // public $user;
    /**
     * Create a new message instance.
     */
    public function __construct(Vendor $vendor)
    {
        //
        $this->vendor = $vendor;
        // $this->user = $user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
           from: new Address('inalegwusam2@gmail.com', 'Emmanuel Samsom'),
           replyTo: [
            new Address('emmyflames6@gmail.com', 'Samson')
           ],
            subject: 'Thank you for becoming a vendor!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
         return new Content(
            view: 'emails.vendor-welcome',
            with: [
                'vendor' => $this->vendor,
                // 'user' =>$this->user,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
