<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Vendor Registration to {{ config('app.name')}}</title>
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
            <h1>New Vendor Registration to {{ config('app.name') }} 🎉</h1>
            <p style="margin: 0; font-size: 15px;">A new vendor has registered: {{ $vendor->business_name }}</p>
        </div>

        <div class="content">
            <p>Dear Admin,</p>

            <p>
                A new vendor has just registered on <strong>{{ config('app.name') }}</strong>.
                Here are the details of the new vendor:
            </p>

            <div class="highlight-box">
                <p><strong>Business Name:</strong> {{ $vendor->business_name }}</p>
                <p><strong>Account Type:</strong> Vendor</p>
                <p><strong>Current plan:</strong> {{ $vendor->vendor_plan }}</p>
            </div>

            <p>
                Please review and approve their account within the next 24 hours so they can start managing their products and orders.
            </p>

            <p>Thank you for your attention to this matter.</p>

            <p>— The {{ config('app.name') }} Team</p>
        </div>
    </div>
    @include('emails.partials.footer')
</body>
</html>