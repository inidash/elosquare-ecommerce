import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import IndexLayout from '@/layouts/IndexLayout'
import { useForm, usePage } from '@inertiajs/react'
import { AlertCircle, MailCheck, MapIcon, PhoneCall } from 'lucide-react'
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast"; 

export default function Contact() {

  const {data, setData, processing, errors, post} = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
       
        
  });
 const { props } = usePage();

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("contact.message"), {
      onSuccess: () => reset(),
    });
  };

  useEffect(() => {
    if (props.flash?.success) {
      toast.success(props.flash.success, {
        duration: 3000,
        position: "bottom-right",
        
      });
    }
  }, [props.flash]);
  const contactItems = [
    {
      icon: <MapIcon />,
      text: 'No. 298, isheri idimu road Alimosho,  Lagos State, Nigeria.'
    },
     {
      icon: <PhoneCall />,
      text: '+2347043007794'
    },
     {
      icon: <MailCheck />,
      text: 'contact@elosquare.com'
    },
  ]
  return (
    <IndexLayout>
        <div className="">
           <div className="container mx-auto flex flex-col px-4 gap-5 md:flex-row justify-between mt-2 md:mt-[40px]">
            <div className="left flex flex-col items-start text-gray-700">
              <div className="container mx-auto">
              <h1 className='text-gray-800 text-4xl md:text-5xl font-bold mb-4'>Contact Us</h1>
              
              <p>
                Feel free to contact us our support team are eagerly waiting to attend to your calls, messages and chats.
              </p>
            </div>
                <h3 className='text-2xl text-gray-700 font-semibold mt-4'>Our Contact Info</h3>
              <div className="items flex flex-col items-start g-2  p-2">
                {contactItems.map(({icon, text}, index)=>(
               
                    <div className='flex items-center gap-2 justify-center rounded-lg mb-3 p-2'>
                      <div  key={index} className='icon justify-center bg-indigo-400  rounded-full p-4 text-2xl'>
                        <span className=" flex items-center text-white justify-center text-2xl">{icon}</span>
                      </div>
                      <div className="info">
                        <span>{text}</span>
                      </div>
                    </div>
                ))}

              </div>
            </div>
            <div className="right w-full text-gray-700 max-w-[500px] my-4">
               <Toaster />
              <Card className='bg-white text-gray-700 mt-[40px]'>
                <CardHeader>
                  <CardTitle>
                    <h3 className='text-2xl text-gray-700 font-semibold'>Leave a Message</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  
               <form onSubmit={handleSubmit} className='w-full'>
                <div className="form-group w-full mb-4">
                  {/* <Label htmlFor="name">
                    Your Name */}
                    <Input
                      type="text"
                      className='w-full text-lg '
                      id="name"
                      name="name"
                      placeholder='Your fullname'
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                    />
                  {/* </Label> */}
                </div>
                {errors.name && (
                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle size={14} />
                        <span>{errors.name}</span>
                    </div>
                )}
                <div className="form-group mb-4">
                  {/* <Label htmlFor="email">
                    Your Email */}
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder='name@gmail.com'
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                    />
                  {/* </Label> */}
                </div>
                {errors.email && (
                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle size={14} />
                        <span>{errors.email}</span>
                    </div>
                )}
                <div className="form-group mb-4">
                  {/* <Label htmlFor="subject">
                    Subject */}
                    <Input
                      type="text"
                      id="subject"
                      placeholder='Message subject'
                      name="subject"
                      value={data.subject}
                      onChange={(e) => setData('subject', e.target.value)}
                    />
                  {/* </Label> */}
                </div>
                {errors.subject && (
                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle size={14} />
                        <span>{errors.subject}</span>
                    </div>
                )}
                <div className="form-group mb-4">
                  {/* <Label htmlFor="message">
                    Your message */}
                    <Textarea
                      className='min-h-[250px]'
                      id="message"
                      name="message"
                      placeholder='type your message'
                      value={data.message}
                      onChange={(e) => setData('message', e.target.value)}
                    />
                  {/* </Label> */}
                </div>
                {errors.message && (
                    <div className="mt-2 flex items-center gap-2 rounded-md bg-red-50 p-2 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle size={14} />
                        <span>{errors.message}</span>
                    </div>
                )}
                
                <Button variant={'outline'} disabled={processing} className='cursor-pointer transition-color duration-200 text-white w-full bg-gray-800 shadow' type="submit">
                  {processing ? "Sending..." : 'Send Message'}
                </Button>
                
              </form>
                </CardContent>
              </Card>
            </div>
           </div>
        </div>
    </IndexLayout>
  )
}
