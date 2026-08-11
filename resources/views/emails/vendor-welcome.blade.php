<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Vendor to {{ config('app.name') }}</title>
    <style>
        /* Tailwind-inspired inline styles (for full email client compatibility) */
        body { font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .header { background-color: #4f46e5; padding: 24px; text-align: center; color: white; }
        .content { padding: 32px; color: #1f2937; font-size: 16px; line-height: 1.6; }
        .btn { display: inline-block; background-color: #4f46e5; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 24px; }
        .footer { text-align: center; font-size: 13px; color: #6b7280; padding: 20px; background-color: #f3f4f6; }
        .highlight-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; margin: 20px 0; }
        h1 { font-size: 24px; margin-bottom: 8px; }
        a { color: #4f46e5; }
    </style>
</head>
<body>
    @include('emails.partials.header')
    <div class="container">
        <div class="header">
            <h1>Welcome to {{ config('app.name') }} 🎉</h1>
            <p style="margin: 0; font-size: 15px;">Hello {{ $vendor->business_name }}, your vendor account is live!</p>
        </div>

        <div class="content">
            <p>Hi <strong>{{ $vendor->business_name }}</strong>,</p>

            <p>
                We’re excited to welcome you as one of our trusted vendors at 
                <strong>{{ config('app.name') }}</strong>! 
                Your vendor account is currently pending approval or inactive. 
                Your account will be approved within 24hrs before
                you can start managing your products, orders, and track your performance all in one place.
            </p>

            <div class="highlight-box">
                <p><strong>Account Type:</strong> Vendor</p>
                <p><strong>Current plan:</strong> {{ $vendor->vendor_plan }}</p>
            </div>

            <div class="highlight-box">
                <p>You can upgrade to the <strong>paid plan</strong>  to enjoy unlimited product upload and other previleges</p>
                
            </div>

            <p style="text-align: center;">
                <a href="{{ url('/vendor/dashboard') }}" class="btn">Go to Vendor Dashboard</a>
            </p>

            <p>
                If you have any questions or need help setting up your store, feel free to reply to this email.
                Our support team is always happy to assist.
            </p>

            <p>Welcome aboard — we’re glad to have you with us! 🎊</p>

            <p>— The {{ config('app.name') }} Team</p>
        </div>
    </div>
    @include('emails.partials.footer')
</body>
</html>
