import { Card, CardContent, CardHeader } from '@/components/ui/card'
import EcomLayout from '@/layouts/ecom-layout'

import { motion } from "framer-motion";
import React from 'react'

export default function TermsAndConditions() {
  return (
    <EcomLayout>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 w-full mx-auto"
    >
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
         <Card className="p-4 rounded-2xl shadow-md bg-white">
        <CardContent className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
              The site 'elosquare.com ' belongs to the company Ever Legit Operator 
              Square and it is used for the purpose of marketing, sales promotion and trading by the 
              company and vendors  that subscribe to the initiatives of the company for marketing, 
              sales promotion and trading services the company offers for interested members of the public
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Purpose of site</h2>
            <p>
              The site elosquare. Com is specially designed to promote trading activities on the 
              basis of location and population strength and this is done by awarding points to 
              vendors and buyers that transact on the platform. 
              The awarding of points is a key feature of the site used in measuring performances of users of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Intellectual property policy</h2>
            <p>
              Contents and strategies deployed in running this site and the initiatives 
              it promotes are unique to this platform and use of such by any other site 
              without permission from the owners of this site shall amount to 
              violation of intellectual property laws and such act shall be treated accordingly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Users registration </h2>
            <p>
              There are two types of users of this site I.e vendors and buyers. 
              Users of this site are to register on this platform for the points awarded to them to be taken as eligible for 
              them to enjoy the benefits and rewards that are made available on this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. User's Right</h2>
            <p>
              Only vendors that are on paid plan can benefit from the rewards offered by this platform. 
              Free users can be removed at anytime from the platform without notice. 
              Users on paid plans can only be removed after the expiration of their 
              paid plan or after any prohibited use of the platform by such user is noticed.. 
              Only three days notice will be given for such removal.
            </p>
            <p> 
              Removal of paid plan vendors on basis of fraudulent use or trading in unlawful products will 
              attract forfeiture of plan and money paid. 
              Appeal of such removal should be presented not later than 7 days of removal. 
              Failure to do so means final forfeiture of plan and money paid. Only paid plan vendors can appeal removal
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Acceptable use</h2>
            <p>
              The site has zero tolerance for unlawful commodities and services. 
              This site can only be used for lawful activities. Any sale of unlawful commodities or 
              services on the platform will not be permitted. Any of such act may be reported to the 
              appropriate law enforcement agency without any prior notice sent to the violating user.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Rewards for users</h2>
            <p>
              The several rewards promised on this site remain a privilege and not a right and the determination 
              of who is eligible rest solely on the managers of this site after confirming that a user worthy of 
              rewards has kept to the rules and regulations guiding the activities to be rewarded
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Payment Policy</h2>
            <p>
              The payments to be made on this site shall be strictly done through account details registered by users. 
              The use of any other account details shall be treated as fraud alert. 
              Any other account details to be used must be presented to the site managers and confirmed safe before use. 
              This confirmation must be done through email which can also serves as proof
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">9. Pricing policy</h2>
            <p>
              On every transaction, there's a percentage charged by the platform. 
              This percentage is between 7.5% to 15% as deemed appropriate by the management of this site. 
              This charge will form part of what is used as a basis for computing the points of the users.
              The percentage charge does not cover relevant taxes such as vat, withholding tax or any other 
              taxes or levies that are stipulated in the relevant tax laws of location of every transaction
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">10.  Complaints policy</h2>
            <p>
              Complaint about a transaction can only be honored by managers of the site where 
              there is a record of completion of such transaction on the site. 
              Any transaction  completed elsewhere apart from the site will not be attended to by managers of  the site
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">11. Cancellation of orders </h2>
            <p>
              Orders cancelled after dispatch will attract payment for dispatch by the user placing the order. 
              Failure to pay the cost of dispatch may make the buyer get banned from using the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">12.  Product return and money back policy </h2>
            <p>
              In returning a product, it must be done within 7days of receipt of such product. 
              Refund of money can only be done after product returned has been certified to be in 
              good shape and such refund has a fulfillment period of 21days from the date of 
              certification of good state of returned product. 
              Such certification is to be communicated via email
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">13.  Awarding of points to users </h2>
            <p>
              Users both vendors and buyers are to be awarded points which serves as the basis for determining  
              eligibility for rewards and benefits by users of the site. The point is to be awarded on the 
              basis of one point for every ten thousand naira (₦10,000) transaction successfully conducted and completed 
              on the site elosquare.com. Any other transactions conducted or completed by users of this site outside of 
              the site will not be taken into consideration in awarding points. To have such transactions taken into 
              consideration for awarding of points, the user requesting such will have to satisfy some conditions which 
              shall be determined by the managers of this site and clearly communicated to such a user. However, 
              acceptance of such transactions remains largely the prerogative of the managers of this site  upon 
              fulfillment of the requested conditions as demanded of the user. 
              Rewards and benefits to be enjoyed by users on the platform will depend largely on the points 
              garnered by users and locations they are based. Any other criteria may be specified by the managers 
              of the site as considered fitting for the situation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">12.  Termination of use  </h2>
            <p>
              The users registered on the site can terminate their registration at any time they so wish However, 
              there will be no refund of money when such a user has been registered for up to thirty days on the site. 
              Also, refund of money can only be made if the value of trading/transactions recorded for the user on the 
              site is lower than the amount of money paid for registration. In a situation where the value of transactions 
              credited to a user (vendor) is higher than money paid for registration, it will be taken that the user has already 
              realised money back and then there shall be no refund of money for registration. Only a vendor that has not 
              recorded transactions up to the value of the money paid for registration can have refund of such money, 
              provided it can be established that such case of no transactions is traceable to fault from 
              the site or the site managers and not the inability of the user to meet orders received through the site
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">12. Contact Information</h2>
            <p>
              For inquiries regarding these terms, please contact our support team.
            </p>
          </section>
        </CardContent>
      </Card>
        </motion.div>
    </EcomLayout>
  )
}
