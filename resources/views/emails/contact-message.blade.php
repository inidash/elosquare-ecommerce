<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Contact Message</title>
</head>
<body style="font-family: Arial, sans-serif; background-color:#f9fafb; padding: 30px; color: #111827;">
    @include('emails.partials.header')
    <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #2563eb; color: white; padding: 20px 30px;">
            <h2 style="margin: 0;">📩 New Contact Message</h2>
        </div>

        <div style="padding: 25px 30px;">
            <p><strong>Name:</strong> {{ $data['name'] }}</p>
            <p><strong>Email:</strong> {{ $data['email'] }}</p>
            <p><strong>Subject:</strong> {{ $data['subject'] }}</p>

            <hr style="margin: 20px 0; border-color: #e5e7eb;">

            <p style="white-space: pre-line;">{{ $data['message'] }}</p>

            <div style="margin-top: 30px;">
                <a href="mailto:{{ $data['email'] }}" style="background-color: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
                    Reply to {{ $data['name'] }}
                </a>
            </div>
        </div>
    </div>
    @include('emails.partials.footer')
</body>
</html>
