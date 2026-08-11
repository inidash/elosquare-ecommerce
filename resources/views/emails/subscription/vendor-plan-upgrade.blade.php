<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Arial', sans-serif; background-color: #f9fafb; padding: 30px; }
  .card { background-color: #fff; border-radius: 8px; padding: 25px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
  .title { font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 10px; }
  .text { color: #374151; line-height: 1.6; font-size: 14px; }
  .button { display: inline-block; background-color: #2563eb; color: #fff; text-decoration: none; padding: 10px 18px; border-radius: 6px; margin-top: 15px; }
</style>
</head>
<body>
  @include('emails.partials.header')
  <div class="card">
    <h1 class="title">Plan Upgrade Successful 🎉</h1>
    <p class="text">
      Hello <strong>{{ $vendor->business_name }}</strong>,<br><br>
      Your vendor plan has been successfully upgraded to the <strong>{{ $plan }}</strong> plan.
    </p>
    <p class="text">
      Payment Amount: <strong>₦{{ number_format($amount, 2) }}</strong>
    </p>
    <a href="{{ route('vendor.dashboard') }}" class="button">Go to Dashboard</a>
    <p class="text" style="margin-top: 20px;">Thank you for choosing {{ config('app.name') }}!</p>
  </div>

  @include('emails.partials.footer')
</body>
</html>
