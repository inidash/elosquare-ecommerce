<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'Arial', sans-serif; background-color: #f9fafb; padding: 30px; }
  .card { background-color: #fff; border-radius: 8px; padding: 25px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
  .title { font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 10px; }
  .text { color: #374151; line-height: 1.6; font-size: 14px; }
  .highlight { font-weight: 600; color: #1f2937; }
</style>
</head>
<body>
    @include('emails.partials.header')
  <div class="card">
    <h1 class="title">Vendor Plan Upgrade Notification 🚀</h1>
    <p class="text">
      Vendor <strong>{{ $vendor->business_name }}</strong> has successfully upgraded to the <strong>{{ $plan }}</strong> plan.
    </p>
    <p class="text">
      Amount Paid: <strong>₦{{ number_format($amount / 100, 2) }}</strong><br>
      Vendor Email: <a href="mailto:{{ $vendor->email }}">{{ $vendor->email }}</a>
    </p>
    <p class="text">You can review this vendor’s details in your admin dashboard.</p>
  </div>

  @include('emails.partials.footer')
</body>
</html>
