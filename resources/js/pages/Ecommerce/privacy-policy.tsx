import { Card, CardContent, CardHeader } from '@/components/ui/card'
import EcomLayout from '@/layouts/ecom-layout'
import { motion } from 'framer-motion'
import React from 'react'

export default function PrivacyPolicy() {
  return (
    <EcomLayout>
        <div className="bg-gray-400 py-4">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-6 space-y-6"
          >
            <h1 className="text-4xl font-bold mb-4">Elosquare Privacy Policy</h1>
            <Card className="p-4 rounded-2xl shadow-md bg-white">
              <CardContent className="space-y-6 text-gray-700 leading-relaxed">
                <section>
                  <p>
                    This site operates a privacy policy as it gathers data from members of the public
                  </p>
                  <p>
                    The data collected from people are basically for the purpose of identification and easy differentiation for 
                    an error free process of awarding points, rewards and benefits to qualified eligible users. 
                  </p>
                  <p>
                    The data requested from users are names of business, name of owners, contact information, 
                    email and a account details this account details do not not include PIN, password or OTP
                  </p>
                  <p>
                    The data are requested basically to enable managers of the site monitor 
                    and ensure safety of transactions and also identify users for relevant benefits. 
                  </p>
                  <p>
                  The data collection is not meant for sale to a third party user. Even though survey of participation of usres on the site may be used for economic predictions the personal data of users remain private and shall 
                  be protected in line with the relevant data protection laws of the federal Republic of Nigeria
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                  <p>
                    For questions or requests regarding this Privacy Policy, please contact
                    our customer support team.
                  </p>
                </section>
              </CardContent>
            </Card>
          </motion.div>
        </div>
    </EcomLayout>
  )
}
