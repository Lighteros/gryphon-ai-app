import React, { useState } from "react";
import "./style.css";

import SidebarSettingMobile from "../../../components/SideBar/SidebarSettingMobile";
import { Link } from "react-router-dom";
import { useToggle } from "../../../hooks/useToggle";
const SettingPolicy = ({ margin = 500 }) => {
  const [showSidebarSetting, setShowSidebarSetting] = useToggle(false);

  return (
    <>
      {/* <NavBar /> */}
      <div className="p-content">
        <div style={{ position: "fixed", zIndex: 50, top: 78, left: 0 }}>
          <SidebarSettingMobile
            showSidebarSetting={showSidebarSetting}
            setShowSidebarSetting={setShowSidebarSetting}
          />
        </div>

        <div
          id="page-term-policy"
          style={{
            background: "rgba(255, 255, 255, 0.10)",
            // height: '100vh',

            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: margin,
          }}
        >
          {" "}
          <div
            className="page-container"
            style={{
              width: "100%",
              maxWidth: "1000px",
              lineHeight: 2,
              padding: 20,
            }}
          >
            <Link
              style={{ paddingLeft: 20 }}
              className="back-mobile"
              // to="/setting-full"
              onClick={() => setShowSidebarSetting(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M13 16.25L6.75 10L13 3.75"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p style={{ fontSize: 16, fontWeight: 600 }}>Go back </p>
            </Link>
            <h1
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              Privacy Policy
            </h1>
            <p>
              <strong>Version Effective Date: January, 3,2024</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              We highly value the confidentiality of our users and online
              visitors and understand the significance of ensuring a safe and
              secure online environment for them. This Privacy Assurance and
              Terms of Service ("this assurance," "assurance") elucidate the
              procedures for gathering, safeguarding, and employing the data you
              furnish us.
            </p>
            <p style={{ textAlign: "justify" }}>
              By using our services, you confirm that you have perused and
              comprehended this privacy assurance. If you do not concur with
              this assurance, please refrain from utilizing our services.
            </p>
            <p style={{ textAlign: "justify" }}>
              It is important to note that this privacy assurance is an integral
              component of the Terms of Service we offer.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              1. What Data We Gather&nbsp;
            </h4>
            <p>
              In this section, we outline the various categories of personal
              information we collect and the methods by which we acquire them.
              We will obtain and employ the following details related to you:
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Information You Share With Us</strong>
            </p>
            <ul>
              <li>
                When you sign up for our Services, which includes your chosen
                username or custom account settings. Additionally, we may import
                information from your connected social media accounts (such as
                Facebook or Google) to establish your profile. This imported
                data may include your name as displayed on your social media
                profile and your profile image.
              </li>
              <li>
                Information you furnish when seeking assistance from our team,
                which may encompass your name, phone number, and records
                detailing the issues you have encountered.
              </li>
              <li>
                Billing information, including your name, payment card number,
                and payment account particulars.
              </li>
              <li>Your email address.</li>
            </ul>
            <p style={{ textAlign: "justify" }}>
              <strong>Data Obtained from Third Parties</strong>
            </p>
            <ul>
              <li>
                Data we receive if you link a third-party tool with our
                Services, such as Facebook or Google.
              </li>
              <li>
                Demographic data, which helps us determine the approximate
                location of your IP address.
              </li>
              <li>
                Data utilized for combatting fraud, such as identifying click
                fraud in advertising.
              </li>
              <li>
                Data used for advertising and analytical purposes, allowing us
                to provide you with an enhanced service.
              </li>
            </ul>
            <p style={{ textAlign: "justify" }}>
              <strong>Cookies Usage</strong>
              We employ cookies and similar technologies (such as web beacons,
              log files, scripts, and eTags) collectively referred to as
              "Cookies" to enrich your experience when using our Services.
              Cookies are compact files that, once stored on your device, enable
              us to offer specific features and functionality. You retain the
              choice to either allow or disable the installation of these
              Cookies. You can accept or decline all Cookies by adjusting the
              relevant cookie retention settings on your device. Nevertheless,
              should you choose to refuse the installation of Cookies, our
              Services may not function as intended.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              2. How we use your personal information&nbsp;
            </h4>
            <p style={{ textAlign: "justify" }}>
              We will use your information in the following ways:
            </p>
            <div>
              <table
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid white",
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid white" }}>
                      <strong>Personal Information</strong>
                    </td>
                    <td style={{ border: "1px solid white" }}>
                      <strong>Use</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>Nickname</td>
                    <td style={{ border: "1px solid white" }}>
                      We use this information to create your Account for the
                      Services in accordance with your request.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>
                      Social Connect Information including but not limited
                      to:&nbsp; （Facebook）Name, Facebook ID, profile
                      picture;（Google） Nickname, profile picture
                    </td>
                    <td style={{ border: "1px solid white" }}>
                      We use this information to: create your Account for the
                      Services in accordance with your request; share photos on
                      Facebook at your request.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>
                      Generated Open ID
                    </td>
                    <td style={{ border: "1px solid white" }}>
                      We generate this and use this to store your Service data
                      with your profile.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>IP Address</td>
                    <td style={{ border: "1px solid white" }}>
                      We use this information to improve our Services, including
                      the functionality of the Services.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>Chat Data</td>
                    <td style={{ border: "1px solid white" }}>
                      If you enable chat services (audio or text) then we will
                      process such data in order to deliver your messages to
                      other users.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>
                      Transaction Records: payments on third party payment
                      services
                    </td>
                    <td style={{ border: "1px solid white" }}>
                      We use this information to maintain a record of your
                      transaction history.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>
                      Customer Support Ticket ID &amp; User Communications with
                      Support
                    </td>
                    <td style={{ border: "1px solid white" }}>
                      We use this information to: improve our Services; provide
                      troubleshooting such as addressing and remediating
                      technical issues and bugs.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>
                      Security-Related Information
                    </td>
                    <td style={{ border: "1px solid white" }}>
                      We use this information: for security and verification
                      purposes; identify and address bugs and assess function
                      for optimize action; solve crashes and optimize
                      compatibility of devices; and to combat users registering
                      for multiple accounts.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: "1px solid white" }}>
                      Survey Information and content of survey responses
                    </td>
                    <td style={{ border: "1px solid white" }}>
                      We use this information to improve our Services.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 style={{ textAlign: "justify" }}>
              analyze, profile, and segment.
            </h4>
            <p style={{ textAlign: "justify" }}>
              In all of the above cases and purposes, we may analyze, profile
              and segment all collected data.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              3. How We Share Your Data&nbsp;
            </h4>
            <p>
              This section outlines the entities with which we share your
              personal information and the circumstances under which such
              sharing occurs. Your data may be shared with selected third
              parties, both within and outside your country, including:
            </p>
            <p>
              <strong>Other Users</strong>
            </p>
            <ul>
              <li>
                Social features are an integral part of our Services.
                Consequently, other users may have access to your profile
                information, your activities on the platform, and the messages
                you've posted.
              </li>
            </ul>
            <p>
              <strong>Partners Collaborating With Us</strong>
            </p>
            <ul>
              <li>
                We collaborate with partners to carry out various services on
                our behalf. These partners process your data exclusively based
                on our instructions and solely for the purpose of providing the
                Service. This may include tasks such as hosting, support,
                advertising, and analysis.
              </li>
            </ul>
            <p>
              <strong>Other Companies and Public Authorities</strong>
            </p>
            <ul>
              <li>
                To combat fraudulent activities and illegal conduct, we may
                share data with other companies and organizations. We may also
                disclose information to public authorities in response to lawful
                requests. Your data may be disclosed with your consent or to
                comply with legal obligations, safeguard our rights, property,
                or the safety of us, our users, or others.
              </li>
            </ul>
            <p>
              <strong>Related Group Companies</strong>
            </p>
            <ul>
              <li>
                We may share your personal information with related group
                companies as necessary to operate our Services effectively.
              </li>
            </ul>
            <p>
              <strong>Law Enforcement Agencies and Judicial Bodies</strong>
            </p>
            <ul>
              <li>
                In certain circumstances, we may share your data with law
                enforcement agencies, public authorities, or other judicial
                bodies and organizations as required by law.
              </li>
            </ul>
            <p>
              <strong>Third Parties in Business Transactions</strong>
            </p>
            <ul>
              <li>
                In the event of selling, buying, merging, or partnering with
                other companies or businesses, or transferring some or all of
                our assets, we may disclose your information to third parties.
                This includes scenarios where we sell or buy a business, undergo
                a merger, or transfer ownership. In such transactions, user data
                may be among the assets transferred.
              </li>
            </ul>
            <p style={{ textAlign: "justify" }}>
              <strong>4. How long do we retain your information</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Data Retention</strong>
              We retain personal information until the completion of its life
              cycle, unless compelled otherwise by applicable law. When
              disposing of personal information, we implement measures to render
              it irretrievable and irreplicable. Electronic files containing
              personal data are permanently deleted using a technical method
              that ensures their irreproducibility.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Extended Retention</strong>
              In cases where the processing and retention period has concluded,
              but the ongoing retention of personal information is necessitated
              by other factors, including legal requirements, we securely store
              and maintain the relevant personal information separately from
              other data.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Request for Early Data Destruction</strong>
              If you wish to have your personal information destroyed before the
              end of its stipulated life cycle, as indicated in our retention
              policy, please contact us at our Platform. We will
              ensure the proper destruction of your personal data in accordance
              with local laws.
            </p>
            <p>
              <strong>
                5. How can I exercise my rights over my information
              </strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              You possess specific rights concerning the personal information we
              hold about you, although some of these rights are applicable only
              under specific circumstances (outlined in more detail below). We
              are committed to promptly addressing any requests you make to
              exercise these rights, with a response timeframe of no longer than
              one month (though this may be extended by an additional two months
              in certain cases). To exercise any of these rights, please reach
              out to us via email.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Access</strong>
              You have the right to access the personal information we have on
              record for you, including details about its usage and sharing. You
              can retrieve the personal information you've provided as part of
              your Account. If you suspect we possess additional personal
              information about you, please email us at our Platform.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Portability</strong>
              You are entitled to receive a copy of specific personal
              information we process pertaining to you. This encompasses any
              data processed with your consent (e.g., certain survey responses)
              or pursuant to our contractual agreement with you, as described in
              the "How We Use Your Personal Information" section. You may
              request this information in a structured, commonly used, and
              machine-readable format. Additionally, you have the right to
              request the transfer of such personal information to another
              party, provided it is technically feasible. Please note that we
              may be unable to provide you with certain personal information if
              doing so would infringe upon another person's rights or disclose
              trade secrets or intellectual property.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Correction</strong>
              Should you encounter any inaccuracies in the personal information
              we maintain, you have the right to rectify them. You can access
              the personal information you've shared through your Account by
              logging in. If you believe we possess additional inaccurate
              personal information about you, please contact us at
              our Platform.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Erasure</strong>
              You have the option to delete your Account or remove specific
              personal information by logging into your Account. If you wish to
              erase any other personal information we may have, please email us
              at our Platform. However, please be aware that we may
              be required to retain certain personal information if valid legal
              grounds exist for doing so (e.g., for legal defense or the
              protection of freedom of expression). In cases where you've
              requested erasure of publicly available personal information on
              our Services and valid grounds for erasure are established, we
              will make reasonable efforts to inform other parties displaying or
              linking to this information, requesting them to erase it as well.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Restriction of Processing to Storage Only</strong>
              Under specific circumstances, you have the right to compel us to
              cease processing your personal information except for storage
              purposes. However, if there are valid legal grounds for us to
              resume processing this information (e.g., for legal defense or
              another person's protection), we may do so. When we agree to halt
              processing your personal information, we will attempt to notify
              any third parties to whom we've disclosed this information,
              allowing them to cease processing it as well. You may request the
              cessation of processing and storage-only treatment for your
              personal information when:
            </p>
            <ul>
              <li>
                You believe the personal information is inaccurate, during the
                verification period.
              </li>
              <li>
                You wish to erase the personal information due to unlawful
                processing, but you prefer retention for storage.
              </li>
              <li>
                You want to erase the personal information as it is no longer
                necessary for our purposes, but you require it to be stored for
                legal claims.
              </li>
            </ul>
            <p style={{ textAlign: "justify" }}>
              <strong>Objection</strong>
              You retain the right to object to our processing of your personal
              information. We will consider your request in accordance with the
              detailed circumstances provided below by contacting us at
              our Platform.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Announcements</strong>
              From time to time, we may send you necessary announcements (e.g.,
              during temporary Service suspensions for maintenance, or for
              security, privacy, or administrative-related communications). You
              cannot opt out of these non-promotional service announcements.
            </p>
            <h4 style={{ textAlign: "justify" }}>6. Information security</h4>
            <p style={{ textAlign: "justify" }}>
              We have put in place a comprehensive array of administrative,
              physical, and technical security measures meticulously designed to
              safeguard your information. These measures are specifically
              engineered to protect against loss, theft, misuse, unauthorized
              access, disclosure, alteration, and destruction of your data. It
              is essential to recognize, however, that despite our best efforts,
              no security system can offer an absolute guarantee of
              impenetrability.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              7. Links to Sites and Service Operated by Others
            </h4>
            <p style={{ textAlign: "justify" }}>
              Our Services may include links to other websites, applications,
              and services. Please be aware that when you click on a link
              leading to these external sites from our Services, our privacy
              policy no longer applies, and we cannot regulate the activities
              carried out on those external sites. We strongly advise you to
              carefully review the privacy policy of any third-party website you
              may be redirected to before disclosing any personally identifiable
              information.
            </p>
            <h4 style={{ textAlign: "justify" }}>8. Changes</h4>
            <p style={{ textAlign: "justify" }}>
              We reserve the right to periodically update this privacy policy.
              Should we introduce substantial alterations in how we gather,
              utilize, retain, or share your personal information, we will
              inform you via email at the most recent email address you have
              provided us. Additionally, we may post notices about these changes
              on the Services governed by this privacy policy. Your ongoing use
              of the Services will indicate your acceptance of these
              modifications.
            </p>
            <h4 style={{ textAlign: "justify" }}>9. International Transfer</h4>
            <p style={{ textAlign: "justify" }}>
              We may transfer the information we gather about you to affiliated
              entities or third parties situated in different countries or
              jurisdictions across the globe, extending beyond your country or
              jurisdiction. It is important to note that these countries and
              jurisdictions may not have data protection laws identical to those
              in your own jurisdiction. However, we take specific measures to
              ensure that there are adequate safeguards in place, permitting the
              transfer, usage, and disclosure of information about you,
              including personal information, as elaborated in this Policy. Your
              data privacy and security remain paramount to us, and we work
              diligently to uphold the necessary safeguards for such transfers.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>10. Contact</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              We encourage you to reach out with any questions, comments, or
              requests pertaining to this policy. Please don't hesitate to
              contact us via email at our Platform. When composing
              your email, kindly include the following information:
            </p>
            <p style={{ textAlign: "justify" }}>
              (i) Details about your Account.&nbsp;
            </p>
            <p style={{ textAlign: "justify" }}>
              (ii) Your contact information.&nbsp;
            </p>
            <p style={{ textAlign: "justify" }}>
              (iii) A concise description of your specific request or concern.
              We also appreciate any supporting documents you may attach to aid
              us in addressing your inquiries effectively.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPolicy;
