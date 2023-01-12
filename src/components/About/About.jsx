import React from "react";
import "./About.css";

function About() {
  return (
    <div className="background">
      <div className="about-container">
        <h1 className="about-title">About us </h1>
        <p className="about-description">
          We are an online technology store that distributes its products to
          buyers from all over Latin America. We offer guarantee and security in
          the purchase.
        </p>
        <h2 className="about-faq-title">Frequently asked questions</h2>
        <ul className="about-faq-list">
          <li className="about-faq-item">
            <h3 className="about-faq-question">What is our return policy?</h3>
            <p className="about-faq-answer">
              We offer refund and/or exchange within the first 30 days of your
              purchase. If 30 days have passed since your purchase, you will not
              be will offer a refund and/or exchange of any kind. Eligibility
              for refunds and exchanges Your item must be unused and in the same
              condition in which you received it. The item must be in the
              original packaging. To complete your return, we require a receipt
              or proof of purchase. You can only refund regular priced items;
              sale items cannot be reimburse. If the item in question was marked
              as a gift when it was purchased and shipped directly to you, you
              will receive a gift credit for the value of your return. changes
              (if applicable) We only replace items if they are defective or
              damaged. If you need to exchange it for the same item, send us a
              email to (Add relevant email address) and send your item to:
              (Relevant Address).
            </p>
          </li>
          <h2 className="about-faq-title">Privacy policy</h2>
          <ul className="about-faq-list">
            <li className="about-faq-item">
              <h3 className="about-faq-question">What is our return policy?</h3>
              <p className="about-faq-answer">
                Privacy Policy Last Updated: 14/12/2022 At ACMEtronics, we are
                committed to protecting your privacy and personal information.
                This privacy policy applies to any personal information that we
                collect from you or that you provide to us through our website
                [Website]. Collection of Personal Information We may collect the
                following personal information from you: - Your name - Your
                email address - Your phone number - Your payment information Use
                of Personal Information We may use the personal information we
                collect from you for the following purposes: - To process and
                fulfill your orders - To send you updates about your order - To
                respond to your inquiries - To improve our website and services
                Sharing of Personal Information We may share your personal
                information with third parties for the following purposes: - To
                process and fulfill your orders - To send you updates about your
                order - To respond to your inquiries - To improve our website
                and services We will not sell, rent, or share your personal
                information with third parties for their marketing purposes
                without your consent. Security of Personal Information We take
                the security of your personal information seriously. We use
                appropriate security measures to protect against unauthorized
                access, alteration, disclosure, or destruction of your personal
                information. We will retain your personal information for as
                long as necessary to fulfill the purposes for which it was
                collected, or as required by law. Your Rights You have the right
                to access, update, and correct your personal information. You
                also have the right to withdraw your consent to the collection,
                use, and sharing of your personal information at any time. To
                exercise these rights, or if you have any questions or concerns
                about our privacy policy, please contact us at [contact
                information].
              </p>
            </li>

            <h2 className="about-faq-title">Terms and Conditions</h2>
            <ul className="about-faq-list">
              <li className="about-faq-item">
                <p className="about-faq-answer">
                  Terms and Conditions Last Updated: 14/12/2022 By accessing and
                  using ACMEtronics , you agree to be bound by these terms and
                  conditions and our privacy policy. If you do not agree with
                  these terms and conditions, please do not use [Website].
                  Eligibility You must be at least 18 years old to use
                  ACMEtronics. By using ACMEtronics, you represent and warrant
                  that you are [age] years old or older. Purchases All purchases
                  made on ACMEtronics are subject to our acceptance. We reserve
                  the right to refuse any order placed on [Website]. Payment We
                  accep t the following forms of payment on ACMEtronics:
                  [payment methods]. Shipping and Delivery We offer [shipping
                  options] for deliveries within [geographical area]. Delivery
                  times are estimates and are not guaranteed. We are not
                  responsible for any delays in delivery due to unforeseen
                  circumstances or events beyond our control. Returns and
                  Refunds We offer returns and refunds on ACMEtronics under the
                  following conditions: - The product is defective or damaged -
                  The product does not match its description - The product was
                  not the product you ordered To request a return or refund,
                  please contact us at [contact information] within [timeframe]
                  of receiving the product. Intellectual Property All content on
                  ACMEtronics, including text, graphics, logos, images, and
                  software, is the property of [Website] or its content
                  suppliers and protected by international copyright and
                  trademark laws. These of any content on ACMEtronics without
                  our express written consent is strictly prohibited. Liability
                  We make no representations or warranties of any kind, express
                  or implied, about the completeness, accuracy, reliability,
                  suitability, or availability of [Website] or the products
                  offered on [Website]. We will not be liable for any loss or
                  damage, direct or indirect, arising from the use of [Website]
                  or the products offered on [Website]. Governing Law These
                  terms and conditions shall be governed by and construed in
                  accordance with the laws of [jurisdiction]. Changes to These
                  Terms and Conditions We reserve the right to change these
                  terms and conditions at any time. Any changes to these terms
                  and conditions will be effective immediately upon posting on
                  [Website]. By continuing to use ACMEtronics after any changes
                  are made, you are indicating your acceptance of those changes.
                </p>
              </li>

              <li className="about-faq-item">
                <h3 className="about-faq-question">
                  What payment methods do we accept?
                </h3>
                <p className="about-faq-answer">
                  We work with stripe, Stripe supports several card brands, from
                  large global networks like Visa and Mastercard to local
                  networks like Cartes Bancaires in France or Interac in Canada.
                  When you integrate Stripe, you can begin accepting a diversity
                  of card brands without any additional configurations,
                  including: American Express China UnionPay (CUP) Discover &
                  Diners Japan Credit Bureau (JCB) Mastercard Visa.
                </p>
              </li>
            </ul>
          </ul>
          <h2 className="about-social-title">Follow us</h2>
          <ul className="about-social-list">
            <li className="about-social-item">
              <a href="https://facebook.com/acmetronicstore">Facebook</a>
            </li>
            <li className="about-social-item">
              <a href="https://twitter.com/acmetronicstore">Twitter</a>
            </li>
          </ul>
          <div />{" "}
        </ul>
      </div>
    </div>
  );
}

export default About;
