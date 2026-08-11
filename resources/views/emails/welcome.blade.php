<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Elosquare Market</title>
    <style>
        /* Inline TailwindCSS-like styles for email clients (they don't load external CSS) */
        body { font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .header { background-color: #2563eb; padding: 24px; text-align: center; color: white; }
        .content { padding: 32px; color: #1f2937; font-size: 16px; line-height: 1.6; }
        .btn { display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 24px; }
        .footer { text-align: center; font-size: 13px; color: #6b7280; padding: 20px; background-color: #f3f4f6; }
        h1 { font-size: 24px; margin-bottom: 8px; }
    </style>
</head>
<body>
    @include('emails.partials.header')
    <div class="container">
        <div class="header">
            <h1>Welcome to Elosquare Marketplace 🎉</h1>
        </div>

        <div class="content">
            <p>Hi <strong>{{ $user->name }}</strong>,</p>

            <p>We’re thrilled to have you join <strong>Elosquare</strong>! You’re all set to explore your dashboard and start using our features.</p>

            <p style="text-align: center;">
                <a href="{{ url('/login') }}" class="btn">Go to Dashboard</a>
            </p>

            <p>If you have any questions, reply to this email — we’re always happy to help.</p>

            <p>Welcome aboard! 🎊</p>

            <p>— The Elosquare Team</p>
        </div>
    </div>
    @include('emails.partials.footer')
</body>
</html>
