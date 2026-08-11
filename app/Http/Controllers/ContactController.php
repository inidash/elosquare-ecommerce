<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageMail;
use Inertia\Inertia;
class ContactController extends Controller
{

    public function contact(){

        return Inertia::render('contact');
    }
    
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'subject' => 'required|string|max:150',
            'message' => 'required|string',
        ]);

        // Send to admin email (replace with yours)
       $adminEmail = config('mail.admin.address');
    
        Mail::to($adminEmail)->send(new ContactMessageMail($validated));

        return redirect()->back()->with('success', 'Your message has been sent successfully!');

    }
}
