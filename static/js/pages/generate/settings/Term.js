import React, { useState } from "react";
import "./style.css";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import SidebarSettingMobile from "../../../components/SideBar/SidebarSettingMobile";
import { useToggle } from "../../../hooks/useToggle";
const Term = ({ margin = 500 }) => {
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
          <div
            className="page-container"
            style={{
              width: "100%",
              maxWidth: "1000px",
              lineHeight: 2,
              padding: 20,
            }}
          >
            {" "}
            <Link
              style={{ paddingBottom: 20 }}
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
              &nbsp;Terms of Service
            </h1>
            <p>
              <strong>Version Effective Date: January, 3,2024</strong>
            </p>
            <p style={{ textAlign: "justify" }}>
              Thank you for utilizing our website, app, and services
              (hereinafter collectively referred to as the "Services"). We
              kindly request that you carefully review these Terms of Service
              ("TOS") as they govern your access to and utilization of our
              Services and carry legal obligations.
            </p>
            <p style={{ textAlign: "justify" }}>
              By accessing our Services, you confirm that you are at least 12
              years of age and meet the minimum age of digital consent required
              in your country. In the event that you meet the age criteria to
              access the Services in your country but lack the authority to
              consent to our terms, it is imperative that your parent or legal
              guardian agrees to these terms on your behalf.
            </p>
            <p style={{ textAlign: "justify" }}>
              We encourage parents or legal guardians to review these terms
              together with their teenagers if the Services are being used by
              teenagers under their supervision. If you are a parent or legal
              guardian and you permit your teenager to use the Services, please
              note that these terms also apply to you, and you bear
              responsibility for your teenager's activities on the Services.
            </p>
            <p style={{ textAlign: "justify" }}>
              THIS TOS INCLUDES A MANDATORY INDIVIDUAL ARBITRATION AND
              CLASS-ACTION WAIVER PROVISION. BOTH YOU AND US AGREE TO RESOLVE
              DISPUTES THROUGH BINDING INDIVIDUAL ARBITRATION, WAIVING THE RIGHT
              TO PURSUE INDIVIDUAL COURT ACTIONS OR PARTICIPATE IN CLASS-ACTION
              LAWSUITS. YOU AND US FURTHER RENOUNCE ANY RIGHT TO ENGAGE IN
              CLASS-ACTION LAWSUITS OR CLASS-WIDE ARBITRATION.
            </p>
            <p style={{ textAlign: "justify" }}>
              By accessing or using our Services, or by downloading or posting
              any content through our Services, you acknowledge and agree that
              you have read, comprehended, and consent to abide by these terms,
              regardless of whether you have registered as a member (as defined
              below). If you do not agree with these terms, we recommend
              refraining from accessing or utilizing our Services.
            </p>
            <h4 style={{ textAlign: "justify" }}>1. Modification&nbsp;</h4>
            <p style={{ textAlign: "justify" }}>
              We retain the sole discretion to alter, discontinue, or terminate
              our Services, in whole or in part, either globally or
              individually. Additionally, we reserve the right to amend these
              terms without prior notice. If any modifications to these terms
              occur, we will either post the updated terms or inform you of the
              changes.
            </p>
            <p style={{ textAlign: "justify" }}>
              By continuing to access or use our Services after we have posted
              modified terms or provided notice of changes, you are expressing
              your consent to be bound by the updated terms. If you find the
              revised terms unacceptable, we recommend discontinuing your use of
              our Services.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              2. No Unlawful or Prohibited Use&nbsp;
            </h4>
            <p style={{ textAlign: "justify" }}>
              By utilizing our Services, you affirm and guarantee to us that you
              will refrain from employing our Services or any content acquired
              through them for any illegal or forbidden purposes as outlined in
              these terms. You pledge not to engage in reverse engineering of
              the Services or employ automated tools to access, interact with,
              or generate images and other assets through our Services.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              3. Registration and Accessibility
            </h4>
            <p style={{ textAlign: "justify" }}>
              To unlock the complete access of all features within our Services
              and to submit User Content through our Services, you may register
              for our Services using your email address or by linking your
              Google or Facebook account. As part of the registration process,
              you consent to supplying precise, up-to-date, and comprehensive
              information. Furthermore, you commit to maintaining the accuracy,
              currency, and completeness of this information by promptly
              updating it as needed.
            </p>
            <h4 style={{ textAlign: "justify" }}>4. Privacy&nbsp;</h4>
            <p style={{ textAlign: "justify" }}>
              Use of our Services is also governed by Privacy Policy, please
              review our Privacy Policy.
            </p>
            <h4 style={{ textAlign: "justify" }}>5. Content Policy</h4>
            <p style={{ textAlign: "justify" }}>
              You represent and warrant that you own all right, title and
              interest in and to the Content (including the texts and image
              prompts) you upload, post, publish, display, input or otherwise
              made available on or through our Services, or otherwise have the
              right to do so. You must be aware that your Content shall adhere
              to the Content Policy:
            </p>
            <p style={{ textAlign: "justify" }}>
              Do not attempt to create, upload, or share images that are not
              G-rated or that could cause harm.
            </p>
            <p style={{ textAlign: "justify" }}>
              Do not attempt to create, upload, or share images, including but
              not limited to:
            </p>
            <p style={{ textAlign: "justify" }}>
              Hate: hateful symbols, negative stereotypes, comparing certain
              groups to animals/objects, or otherwise expressing or promoting
              hate based on identity.
            </p>
            <p style={{ textAlign: "justify" }}>
              Harassment: mocking, threatening, or bullying an individual.
            </p>
            <p style={{ textAlign: "justify" }}>
              Violence: violent acts and the suffering or humiliation of others.
            </p>
            <p style={{ textAlign: "justify" }}>
              Self-harm: suicide, cutting, eating disorders, and other attempts
              at harming oneself.
            </p>
            <p style={{ textAlign: "justify" }}>
              Shocking: bodily fluids, obscene gestures, or other profane
              subjects that may shock or disgust.
            </p>
            <p style={{ textAlign: "justify" }}>
              Illegal activity: drug use, theft, vandalism, and other illegal
              activities.
            </p>
            <p style={{ textAlign: "justify" }}>
              Deception: major conspiracies or events related to major ongoing
              geopolitical events.
            </p>
            <p style={{ textAlign: "justify" }}>
              Political: politicians, ballot-boxes, protests, or other content
              that may be used to influence the political process or to
              campaign.
            </p>
            <p style={{ textAlign: "justify" }}>
              Public and personal health: the treatment, prevention, diagnosis,
              or transmission of diseases, or people experiencing health
              ailments.
            </p>
            <p style={{ textAlign: "justify" }}>
              Spam: unsolicited bulk content.
            </p>
            <p style={{ textAlign: "justify" }}>
              Don’t mislead your audience about AI involvement.
            </p>
            <p style={{ textAlign: "justify" }}>
              Respect the rights (including the intellectual property rights) of
              others.
            </p>
            <p style={{ textAlign: "justify" }}>
              Do not upload images of people without their consent.
            </p>
            <p style={{ textAlign: "justify" }}>
              Do not upload images to which you do not hold appropriate usage
              rights.
            </p>
            <p style={{ textAlign: "justify" }}>
              Do not create images of public figures.
            </p>
            <p style={{ textAlign: "justify" }}>
              We encourage you to report any suspected breaches of these
              guidelines to us via our Platform. Please note that
              while we retain the right, we are not obliged to mediate or
              intervene in user disputes. Depending on the specific
              circumstances, we may choose to take actions, including but not
              limited to issuing warnings, restricting communications,
              temporarily or permanently suspending, deactivating, or banning
              your Account, blocking login access, disabling or deleting
              Content, or undertaking other measures at our sole discretion,
              with or without prior notice. The final interpretation of these
              actions and their implementation will rest with us, based on the
              pertinent circumstances of inappropriate conduct.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              6. Intellectual Property and Content License&nbsp;
            </h4>
            <p style={{ textAlign: "justify" }}>
              6.1 You acknowledge and agree that any content (including but not
              limited to models, images, text, and any other forms) you upload
              and/or publish when using our Services is either your original
              creation or has been legally authorized (including sublicensing),
              and does not infringe upon any third-party intellectual property
              rights. The intellectual property rights of the content you upload
              and /or publish belong to you or the original copyright owner.
            </p>
            <p style={{ textAlign: "justify" }}>
              6.2 We retain the ownership (including the intellectual property
              rights) of the Services and all its embedded elements, including
              but not limited to the data, technology, software, code, UI,
              trademarks, logos, and any derivative works therein.
            </p>
            <p style={{ textAlign: "justify" }}>
              6.3 The third-party software owners shall retain all rights to
              software used to provide online services (including but not
              limited to any images, photographs, animations, videos,
              recordings, music, text, and accompanying materials).
            </p>
            <p style={{ textAlign: "justify" }}>
              6.4 If you set your content to public, it will be visible to other
              users. Therefore, you agree to grant us, our affiliates and each
              user a worldwide, perpetual, non-exclusive, royalty-free,
              sublicensable license to use, store, distribute, create derivative
              works from, publicly display your content and any derivative works
              in any form, through our Services, on any devices, platforms and
              in current or future media on the internet.
            </p>
            <p style={{ textAlign: "justify" }}>
              If you set your content to private, we will take reasonable and
              appropriate measures to keep your content confidential and prevent
              unauthorized access or disclosure.
            </p>
            <p style={{ textAlign: "justify" }}>
              Above licenses survive termination of this Agreement by any party,
              for any reason.
            </p>
            <p style={{ textAlign: "justify" }}>
              6.5 When you download files or images from our Service, or copy
              content generated by other users or create derivative content from
              the aforementioned content (referred to as “User Generated
              Content” or “UGC”), you understand and agree that you do noy
              inherit any rights from the original content creator.
            </p>
            <p style={{ textAlign: "justify" }}>
              When you using UGC, you shall abide by the following:
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Personal, Non-commercial Use</strong>: Except for the
              specific rights granted by the content creator or allowed by this
              TOS, You may use UGC for personal, non-commercial purposes.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Fair Use</strong>: You may use UGC in accordance with fair
              use as defined by Copyright Law, provided that you attribute the
              content to “StabilityWorld.ai” in the appropriate context.
            </p>
            <p style={{ textAlign: "justify" }}>
              <strong>Risk and Warranties</strong>: You assume the risk of using
              UGC. You understand and acknowledge that we cannot guarantee that
              UGC is free of infringing. If your use of UGC causes us any
              infringement losses, you will be liable for such compensation.
            </p>
            <p style={{ textAlign: "justify" }}>
              The above terms apply in addition to any specific licensing terms
              provided by the content creator and are not intended to limit any
              rights granted by such licensing terms. Furthermore, when content
              contains reasonable and customary license notices (such as open
              source licenses), the content will continue to be governed by
              those license terms when further accessing, distributing, or using
              the content.
            </p>
            <p style={{ textAlign: "justify" }}>
              6.6 You acknowledge and agree that in order to protect your
              legitimate rights and interests on our service in a timely and
              effectively manner, you specifically grant us a right to take
              legal actions, either independently or through professional
              third-party organizations, in our own name, to prevent potential
              infringement of your legal rights (including but not limited to
              copyright and trademark rights) and our interests. Such authorized
              legal actions may include but are not limited to: infringement
              monitoring, sending warning letters, filing administrative
              complaints, reporting to public security authorities, initiating
              legal proceedings, applying for arbitration, mediation, and
              settlement.
            </p>
            <h4 style={{ textAlign: "justify" }}>7. Copyright Complaints</h4>
            <p>
              We hold a deep regard for the intellectual property rights of
              others. If you believe that your intellectual property rights have
              been violated, please forward your claim via email to
              our Platform, with the subject line: "Copyright
              Infringement." In your email, provide a comprehensive description
              of the alleged infringement as outlined below. We may take
              actions, including removing or disabling content that is claimed
              to be infringing and potentially terminating the Accounts of
              repeat infringers.
            </p>
            <p>
              Written claims related to copyright infringement should contain
              the following information:
            </p>
            <p>
              (i) A physical or electronic signature of the individual
              authorized to represent the copyright holder.&nbsp;
            </p>
            <p>
              (ii) An explanation of the copyrighted work you believe has been
              infringed upon.&nbsp;
            </p>
            <p>
              (iii) A description of the precise location of the material you
              allege is infringing on the site.
            </p>
            <p>
              (iv) Your contact details, including your address, telephone
              number, and email address.&nbsp;
            </p>
            <p>
              (v) A statement from you asserting that you genuinely believe the
              disputed use is not authorized by the copyright owner, its agent,
              or the law.&nbsp;
            </p>
            <p>
              (vi) A declaration, made under penalty of perjury, that the
              information provided in your notice is accurate, and that you
              either own the copyright or are authorized to act on behalf of the
              copyright owner.
            </p>
            <p>
              Upon receipt of a compliant complaint, as described above, we
              retain the right to:
            </p>
            <ul>
              <li>Remove or disable access to the material in question.</li>
              <li>
                Notify the party accused of infringement that access to the
                identified material has been removed or disabled.
              </li>
              <li>
                Terminate access to and usage of the Services for any user who
                engages in repeated instances of infringement.
              </li>
            </ul>
            <h4 style={{ textAlign: "justify" }}>
              8. Interactions between Users
            </h4>
            <p style={{ textAlign: "justify" }}>
              You bear sole responsibility for your interactions with other
              users, including the resolution of any disputes that may arise.
              Even if we opt to provide features such as reporting a user or
              blocking a user within our Services, you will retain sole
              responsibility for your actions. It is imperative that you
              exercise caution, discretion, common sense, and sound judgment
              when using our Services and sharing personal information with
              other users.
            </p>
            <p style={{ textAlign: "justify" }}>
              You also commit to taking reasonable precautions in all your
              interactions with fellow users, particularly when it comes to
              safeguarding your personal information. We maintain the right to
              contact you, as permitted by applicable law, for the purpose of
              assessing compliance with these terms and any other relevant
              rules. You agree to cooperate fully with us in investigating any
              suspected instances of unlawful, fraudulent, or improper activity,
              which may include granting authorized representatives access to
              password-protected areas of your Account.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              9. Termination of Your Account&nbsp;
            </h4>
            <p style={{ textAlign: "justify" }}>
              While not limiting other available remedies, we reserve the right,
              at any point, to suspend or terminate your Account and deny access
              to our Services if we have suspicions or reasonably determine, at
              our discretion, that you may have:
            </p>
            <p style={{ textAlign: "justify" }}>
              (i) Failed to adhere to any stipulation within these terms or any
              established policies or Rules by us.&nbsp;
            </p>
            <p style={{ textAlign: "justify" }}>
              (ii) Participated in actions, while using our Services, that may
              potentially be unlawful or result in liability, harm,
              embarrassment, harassment, abuse, or disruption for you, our
              users, us, or any other third parties associated with our
              Services.&nbsp;
            </p>
            <p style={{ textAlign: "justify" }}>
              (iii) Violated the proprietary rights, privacy rights, or
              Intellectual Property Rights of any individual, including repeated
              instances of infringement.
            </p>
            <p style={{ textAlign: "justify" }}>
              Furthermore, in the event of any of the above, we may, without
              prior notice to you, opt to notify authorities or take any other
              actions we deem suitable.
            </p>
            <p style={{ textAlign: "justify" }}>
              You have the option to terminate your Account at any time and for
              any reason by sending an email to service.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              10. Effects of Termination, Suspension of Account
            </h4>
            <p style={{ textAlign: "justify" }}>
              Upon the termination of your Account, whether initiated by you or
              us, you will forfeit all access to said Account. Terminated
              Accounts cannot be reinstated. You acknowledge and accept that any
              credits awarded to your Account at the time of termination will be
              forfeited and no longer accessible to you, with no entitlement
              thereto. In the event of termination, whether initiated by you or
              us, you comprehend and consent to our potential redemption and
              utilization of the credits present in your Account at the time of
              termination for any purpose of our choosing.
            </p>
            <p style={{ textAlign: "justify" }}>
              FURTHERMORE, UPON ANY TERMINATION OR SUSPENSION OF YOUR ACCOUNT,
              ANY CONTENT THAT YOU HAVE SUBMITTED ON OUR SERVICES OR THAT IS
              CONNECTED TO YOUR ACCOUNT MAY BECOME INACCESSIBLE TO YOU.
              Additionally, we will bear no obligation to retain any information
              stored in our database that pertains to your Account, nor will we
              be obligated to forward any such information to you or any third
              party. Please note that any suspension, termination, or
              cancellation will not affect your obligations to us under these
              terms, including but not limited to matters related to proprietary
              rights, ownership, indemnification, and limitation of liability.
              These obligations are intended to endure such suspension,
              termination, or cancellation as evident from their context and
              nature.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              11. Disclaimers of Warranty
            </h4>
            <p style={{ textAlign: "justify" }}>
              Our Services are provided on an "as is" basis, with no warranties
              of any kind, whether express or implied. To the fullest extent
              permitted by applicable law, we explicitly disclaim any warranties
              of merchantability, fitness for a particular purpose,
              non-infringement, and any warranties arising from course of
              dealing or usage of trade. We do not guarantee that our Services
              will meet your specific requirements or operate on an
              uninterrupted, secure, or error-free basis. We also do not warrant
              the quality, accuracy, timeliness, truthfulness, completeness, or
              reliability of any services obtained through our Services.
            </p>
            <p style={{ textAlign: "justify" }}>
              Any advice or information, whether oral or written, obtained from
              our Services, shall not create any warranty not expressly stated
              in this document.
            </p>
            <h4 style={{ textAlign: "justify" }}>12.Indemnity&nbsp;</h4>
            <p style={{ textAlign: "justify" }}>
              You consent to defend, indemnify, and protect us, along with our
              officers, directors, employees, and agents, from any claims,
              liabilities, damages, losses, and expenses, including, but not
              limited to, reasonable legal and accounting fees. This
              indemnification pertains to any claims arising from or related to
              the Content you submit on or through our Services, as well as any
              breaches of these terms committed by you.
            </p>
            <h4 style={{ textAlign: "justify" }}>
              13. Limitation of Liability&nbsp;
            </h4>
            <p style={{ textAlign: "justify" }}>
              You acknowledge and agree that, to the fullest extent allowed by
              law, the entire risk associated with your access to and use of our
              Services remains your responsibility. We shall not be liable for
              any incidental, special, exemplary, or consequential damages,
              including lost profits, loss of data, or loss of goodwill, service
              disruptions, computer damage, system failures, or the cost of
              alternative products or services. These damages may arise from or
              be connected to these terms or the use of our Services, regardless
              of whether the claims are based on warranty, contract, negligence,
              product liability, or any other legal theory, and even if we have
              been informed of the possibility of such damages. In cases where a
              limited remedy as stated herein is determined to have failed its
              essential purpose, you specifically acknowledge that we are not
              responsible for the defamatory, offensive, or unlawful conduct of
              other users or third parties, and that the risk of harm from such
              conduct rests entirely with you. Furthermore, we shall have no
              liability to you or any third party for any Content or third-party
              Content uploaded to or downloaded from our Services. In no event
              will our total liability arising from or connected to these terms
              or the use of our Services exceed one hundred U.S. dollars ($100).
              These limitations of liability outlined above constitute
              fundamental components of the agreement between us and you.
            </p>
            <h4 style={{ textAlign: "justify" }}>14. Dispute Resolution</h4>
            <p>
              You and we both agree that the dispute resolution processes
              outlined in this agreement shall apply to any disputes or claims
              arising from the Terms of Service, the Privacy Policy, or the
              Service. These disputes encompass claims of all kinds, including
              but not limited to legal, equitable, or statutory claims. The
              dispute resolution processes will remain applicable even if you
              cease using your Account, delete your Account, or discontinue
              using the Service. They also pertain to disputes that existed
              prior to our acceptance of this agreement.
            </p>
            <p>
              <strong>14.1 Informal Resolution:</strong>
              Most issues can typically be resolved quickly and amicably by
              reaching out to our customer service. However, if you feel that
              your disputes are not adequately addressed by customer service,
              the sections below outline how we agree to resolve such disputes,
              including the option for binding individual arbitration where
              applicable.
            </p>
            <p>
              <strong>14.2 Informal Resolution:</strong>
              In the event of any dispute, we will first attempt to resolve it
              informally for a minimum of 60 calendar days before initiating
              arbitration proceedings. The informal dispute resolution process
              will commence when one party receives a "Notice of Dispute" from
              the other party. This notice must include the full name, Account
              information, and contact details of the complainant, along with a
              description of the issue and the desired resolution. You will send
              the Notice of Dispute to [contact], and we will send our Notice of
              Dispute to your billing or registered email address.
            </p>
            <p>
              <strong>14.3 Binding Individual Arbitration:</strong>
              If we are unable to resolve a dispute informally, you or we may
              choose to finally and exclusively settle the dispute through
              binding arbitration. This arbitration will be administered by the
              Singapore International Arbitration Centre ("SIAC") in accordance
              with SIAC's arbitration rules. Singapore law will govern the
              proceedings, excluding all conflicts of law provisions. The
              arbitral award will be considered final and binding on both
              parties. If the arbitration terms outlined above cannot be
              enforced for any dispute, both parties agree that the dispute
              shall be brought before a court in Singapore. You hereby consent
              to and waive any defenses related to personal jurisdiction and
              forum non-convenience, whether in arbitration or judicial
              judgment.
            </p>
            <p>
              <strong>14.4 Exceptions to Arbitration:</strong>
              This arbitration clause does not require arbitration for the
              following claims: (i) individual claims filed in small claims
              court; and (ii) requests for injunctive or other equitable relief
              to halt unauthorized use or abuse of the Services or address
              intellectual property infringement.
            </p>
            <p>
              <strong>14.5 Class Action Waiver:</strong>
              You agree that both parties can only bring claims against each
              other in their individual capacity and not as a plaintiff or
              member of any purported class or representative action in any
              jurisdiction. Additionally, if a dispute is resolved through
              arbitration, the arbitrator may not consolidate your claims with
              those of another person and may not oversee any form of a
              representative or class proceeding. If this specific subsection is
              deemed unenforceable, the entire arbitration provision shall be
              null and void. In such cases, the parties acknowledge that any
              dispute shall be exclusively resolved in a court in Singapore and
              in accordance with Singaporean law, excluding all conflicts of law
              provisions.
            </p>
            <h4 style={{ textAlign: "justify" }}>15. Entire Agreement&nbsp;</h4>
            <p style={{ textAlign: "justify" }}>
              These terms represent the complete and exclusive understanding and
              agreement between us and you with respect to our Services, and
              they override and replace any previous oral or written
              understandings or agreements between us and you concerning our
              Services.
            </p>
            <h4 style={{ textAlign: "justify" }}>16. Assignment</h4>
            <p style={{ textAlign: "justify" }}>
              You may not assign or transfer these terms, whether by operation
              of law or any other means, without obtaining our prior written
              consent. Any attempt by you to assign or transfer these terms
              without such consent will be deemed null and void. On the other
              hand, we reserve the right to freely assign these terms. Despite
              this, these terms will remain binding and advantageous to the
              parties, their successors, and authorized assigns, as long as it
              is within the confines of the aforementioned conditions.
            </p>
            <h4 style={{ textAlign: "justify" }}>17. General</h4>
            <p style={{ textAlign: "justify" }}>
              The failure of us to enforce any right or provision outlined in
              these terms shall not be interpreted as a waiver of our ability to
              enforce that right or provision in the future. Any waiver of such
              a right or provision will be valid only if it is made in writing
              and signed by a duly authorized representative of us. With the
              exception of what is explicitly stated in these terms, the
              exercise of any of the remedies by either party under these terms
              shall not diminish their other remedies under these terms or
              otherwise.
            </p>
            <p style={{ textAlign: "justify" }}>
              In the event that a court of competent jurisdiction determines any
              provision of these terms to be invalid or unenforceable, that
              provision shall be enforced to the maximum extent permissible, and
              the other provisions of these terms will remain fully effective
              and binding.
            </p>
            <h4 style={{ textAlign: "justify" }}>18. Contacting Us</h4>
            <p style={{ textAlign: "justify" }}>
              If you have any inquiries or concerns regarding these terms,
              please reach out to us via our Platform. We recommend
              that your email include the following details:&nbsp;
            </p>
            <p style={{ textAlign: "justify" }}>
              (i) your Account information;&nbsp;
            </p>
            <p style={{ textAlign: "justify" }}>
              (ii) your contact information;&nbsp;
            </p>
            <p style={{ textAlign: "justify" }}>
              (iii) a clear description of the action or resolution you are
              requesting. Feel free to attach any relevant documents to support
              your concerns, as they would be greatly appreciated.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Term;
