import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './Terms.css';

function Terms({ terms, contact }) {
  const title = terms?.title || 'Terms and Conditions - Freelance Services';
  const contentHtml = terms?.contentHtml;
  const contentHtmlAr = terms?.contentHtmlAr;
  const email = contact?.email || 'hello@example.com';
  const whatsappNumber = contact?.whatsappNumber || '';
  const whatsappUrl =
    contact?.whatsappUrl ||
    (whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}` : '');

  if (contentHtml || contentHtmlAr) {
    return (
      <div className="terms-page">
        <div className="container">
          <h1 className="page-title">{title}</h1>
          {contentHtml ? (
            <section
              className="terms-section"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : null}
          {contentHtmlAr ? (
            <section
              className="terms-section arabic"
              dir="rtl"
              dangerouslySetInnerHTML={{ __html: contentHtmlAr }}
            />
          ) : null}
          <section className="terms-contact">
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-subtitle">
              For inquiries or to start a project, reach out via:
            </p>
            <div className="contact-links">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link whatsapp"
                >
                  <span className="contact-icon"><FaWhatsapp /></span>
                  <span>WhatsApp: {whatsappNumber || whatsappUrl}</span>
                </a>
              ) : null}
              <a
                href={`mailto:${email}`}
                className="contact-link email"
              >
                <span className="contact-icon"><FaEnvelope /></span>
                <span>{email}</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="terms-page">
      <div className="container">
        <h1 className="page-title">{title}</h1>
        
        {/* English Version */}
        <section className="terms-section">
          <h2>1. Engagement Outside Freelance Platforms</h2>
          <p>These Terms apply to projects executed outside freelancing platforms.</p>
          <p>All payments, milestones, and communications are handled directly between the client and the freelancer.</p>

          <h2>2. Milestones, Advance Payment, and Deposit</h2>
          <p>The project is divided into predefined milestones agreed upon before work begins.</p>
          <p><strong>The first milestone must be paid in advance before any work starts.</strong></p>
          <p>A deposit is required to reserve time, availability, and preparation.</p>
          <p>The deposit does not represent full payment for the project.</p>
          <p>If the project does not proceed after analysis, preparation, or partial work, the freelancer is entitled to retain all or part of the deposit, proportional to the effort, time, and resources already spent.</p>
          <p>Any unused portion of the deposit, if applicable, may be refunded at the freelancer's sole discretion.</p>
          <p><strong>Failure to pay any agreed milestone on time results in immediate suspension and may lead to contract termination.</strong></p>

          <h2>3. Project Start & Cancellation Policy</h2>
          <p>The project is considered officially started once 10% of the estimated effort is completed or the first milestone work begins.</p>
          <p>After this point, the project cannot be canceled, except under Section 9.</p>
          <p>If a milestone is unpaid after work has started, the freelancer may:</p>
          <ul>
            <li>Stop work immediately</li>
            <li>Retain all payments made</li>
            <li>Terminate the agreement without further obligation</li>
          </ul>

          <h2>4. Scope Control & Change Requests</h2>
          <p>Work is limited strictly to the agreed written scope.</p>
          <p>No changes or additions are accepted unless:</p>
          <ul>
            <li>Documented in writing</li>
            <li>Cost and timeline are re-approved</li>
          </ul>
          <p>Any unapproved request is out of scope and treated as a new project.</p>

          <h2>5. Parallel Work Disclosure & Payment Obligation</h2>
          <p>By requesting any task, fix, or solution, the client confirms the request is made in good faith.</p>
          <p>If the client assigns or later assigns the same or a similar task to another freelancer without prior written disclosure, this does not remove the obligation to pay for the freelancer's completed work.</p>
          <p>If the freelancer completes and delivers the task before being informed of parallel work, the work is considered valid, billable, and payable in full.</p>
          <p>The client may not refuse payment, cancel a milestone, or request a refund on the basis that:</p>
          <ul>
            <li>another freelancer completed the same work, or</li>
            <li>the solution was no longer needed after delivery.</li>
          </ul>
          <p><strong>Any work completed upon the client's request is deemed accepted upon delivery.</strong></p>

          <h2>6. Code Quality Review & Refund Policy</h2>
          <p>The client must review each milestone immediately upon delivery.</p>
          <p>Quality concerns must be raised within the milestone review period only.</p>
          <p><strong>Refunds are valid only during the active milestone review window.</strong></p>
          <p>No refunds are accepted after weeks, months, or extended usage.</p>

          <h2>7. Delivery & Limitation of Responsibility</h2>
          <p>The freelancer delivers work meeting professional standards.</p>
          <p>The freelancer is not responsible for:</p>
          <ul>
            <li>Business outcomes, profits, or losses</li>
            <li>Client misuse or misconfiguration</li>
            <li>Third-party services, APIs, or hosting</li>
            <li>Issues arising months or years later due to updates or environment changes</li>
          </ul>

          <h2>8. Support & Maintenance</h2>
          <p><strong>Two (2) weeks of free support after final delivery.</strong></p>
          <p>Support includes only bugs caused by the freelancer's code.</p>
          <p>Excludes:</p>
          <ul>
            <li>Other developers' changes</li>
            <li>Client-side modifications</li>
            <li>New features or enhancements</li>
          </ul>
          <p>Any request outside bug fixes is treated as a new project.</p>

          <h2>9. Exceptional Cancellation Conditions</h2>
          <p>Cancellation is permitted only if:</p>
          <ul>
            <li>The client faces serious financial hardship, or</li>
            <li>The business is permanently closing due to continuous losses</li>
          </ul>
          <p>Such cancellation must be formally justified and approved at the freelancer's discretion.</p>

          <h2>10. Acceptance of Terms</h2>
          <p><strong>Payment of the deposit, approval of any milestone, or project start constitutes full acceptance of these Terms and Conditions.</strong></p>
        </section>

        {/* Arabic Version */}
        <section className="terms-section arabic" dir="rtl">
          <h1 className="section-title-ar">الشروط والأحكام – خدمات العمل الحر</h1>

          <h2>1. العمل خارج منصات العمل الحر</h2>
          <p>تسري هذه الشروط على المشاريع التي يتم تنفيذها خارج منصات العمل الحر، ويتم التعامل والدفع مباشرة مع المستقل.</p>

          <h2>2. مراحل العمل والدفع المسبق والعربون</h2>
          <p>يتم تقسيم المشروع إلى مراحل متفق عليها مسبقًا.</p>
          <p><strong>يجب دفع المرحلة الأولى مقدمًا قبل بدء أي عمل.</strong></p>
          <p>يُدفع عربون لحجز الوقت والتفرغ والتحضير.</p>
          <p>لا يُعتبر العربون دفعة كاملة من قيمة المشروع.</p>
          <p>في حال عدم استكمال المشروع بعد التحليل أو التحضير أو تنفيذ جزء من العمل، يحق للمستقل الاحتفاظ بكامل العربون أو بجزء منه بما يتناسب مع الجهد والوقت والموارد التي تم إنفاقها.</p>
          <p>يجوز رد الجزء غير المستخدم من العربون — إن وُجد — وفق تقدير المستقل فقط.</p>
          <p><strong>عدم دفع أي مرحلة يؤدي إلى إيقاف العمل فورًا وقد يؤدي إلى إنهاء العقد.</strong></p>

          <h2>3. بدء المشروع وسياسة الإلغاء</h2>
          <p>يُعتبر المشروع قد بدأ رسميًا بعد إنجاز 10٪ من الجهد التقديري أو بدء المرحلة الأولى.</p>
          <p>بعد ذلك لا يحق للعميل الإلغاء إلا وفق البند (9).</p>
          <p>عند عدم دفع أي مرحلة بعد بدء العمل، يحق للمستقل:</p>
          <ul>
            <li>إيقاف العمل فورًا</li>
            <li>الاحتفاظ بجميع الدفعات</li>
            <li>إنهاء العقد دون أي التزام إضافي</li>
          </ul>

          <h2>4. نطاق العمل والتعديلات</h2>
          <p>يقتصر العمل على ما تم الاتفاق عليه كتابيًا فقط.</p>
          <p>لا تُقبل أي إضافات أو تعديلات إلا بعد:</p>
          <ul>
            <li>توثيقها كتابيًا</li>
            <li>الموافقة على تكلفة ومدة جديدة</li>
          </ul>
          <p>أي طلب غير معتمد يُعتبر خارج نطاق العمل.</p>

          <h2>5. العمل المتوازي والالتزام بالدفع</h2>
          <p>بمجرد طلب العميل تنفيذ مهمة أو حل مشكلة، يُعتبر الطلب بحسن نية.</p>
          <p>إذا قام العميل بتكليف مستقل آخر بنفس المهمة أو بمهمة مشابهة دون إخطار مسبق، فإن ذلك لا يعفيه من الالتزام بالدفع.</p>
          <p>في حال قيام المستقل بإنهاء وتسليم العمل قبل إخباره بوجود عمل متوازي، يُعتبر العمل مستحق الأجر بالكامل.</p>
          <p>لا يحق للعميل الامتناع عن الدفع أو إلغاء المرحلة أو طلب استرداد المبلغ بحجة:</p>
          <ul>
            <li>أن مستقلاً آخر نفذ نفس العمل، أو</li>
            <li>أن الحل لم يعد مطلوبًا بعد التسليم.</li>
          </ul>
          <p><strong>أي عمل يتم بناءً على طلب العميل يُعد مقبولًا ومستحق الدفع فور تسليمه.</strong></p>

          <h2>6. مراجعة الجودة وسياسة الاسترداد</h2>
          <p>يجب مراجعة كل مرحلة فور تسليمها.</p>
          <p>تُقبل الملاحظات فقط خلال فترة مراجعة المرحلة.</p>
          <p><strong>لا يُقبل أي طلب استرداد بعد مرور وقت طويل أو الاستخدام الفعلي.</strong></p>

          <h2>7. حدود المسؤولية</h2>
          <p>يلتزم المستقل بتقديم عمل احترافي.</p>
          <p>لا يتحمل المستقل مسؤولية:</p>
          <ul>
            <li>نتائج تجارية أو خسائر</li>
            <li>سوء استخدام النظام</li>
            <li>خدمات طرف ثالث</li>
            <li>مشاكل تظهر بعد شهور أو سنوات</li>
          </ul>

          <h2>8. الدعم الفني</h2>
          <p><strong>دعم مجاني لمدة أسبوعين (14 يومًا) بعد التسليم النهائي.</strong></p>
          <p>يقتصر الدعم على أخطاء كود المستقل فقط.</p>
          <p>أي طلب خارج ذلك يُعد مشروعًا جديدًا.</p>

          <h2>9. حالات الإلغاء الاستثنائية</h2>
          <p>يُسمح بالإلغاء فقط في حال:</p>
          <ul>
            <li>أزمة مالية حقيقية</li>
            <li>قرار إغلاق النشاط نهائيًا بسبب خسائر مستمرة</li>
          </ul>
          <p>ويخضع القبول لتقدير المستقل.</p>

          <h2>10. الموافقة</h2>
          <p><strong>يُعد دفع العربون أو بدء العمل قبولًا كاملًا لجميع الشروط والأحكام.</strong></p>
        </section>

                {/* Contact Section */}
        <section className="terms-contact">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">For inquiries or to start a project, reach out via:</p>
          <div className="contact-links">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link whatsapp"
              >
                <span className="contact-icon"><FaWhatsapp /></span>
                <span>WhatsApp: {whatsappNumber || whatsappUrl}</span>
              </a>
            ) : null}
            <a href={`mailto:${email}`} className="contact-link email">
              <span className="contact-icon"><FaEnvelope /></span>
              <span>{email}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Terms;

