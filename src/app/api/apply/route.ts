import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const linkedin = (formData.get('linkedin') as string) || 'Not provided';
        const position = formData.get('position') as string;
        const about = formData.get('about') as string;
        const duration = (formData.get('duration') as string) || 'Not provided';
        const resume = formData.get('resume') as File | null;

        // Validate required fields
        if (!name || !email || !phone || !position || !about) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, phone, position, and about are required.' },
                { status: 400 }
            );
        }

        // Validate resume
        if (!resume || resume.size === 0) {
            return NextResponse.json(
                { error: 'Resume file is required.' },
                { status: 400 }
            );
        }

        // Validate file size (5MB max)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (resume.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'Resume file size must be under 5MB.' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (!allowedTypes.includes(resume.type)) {
            return NextResponse.json(
                { error: 'Only PDF, DOC, and DOCX files are allowed.' },
                { status: 400 }
            );
        }

        // Convert the file to a buffer for attachment
        const resumeBuffer = Buffer.from(await resume.arrayBuffer());

        // Configure the SMTP transporter
        // Using Gmail SMTP — requires an App Password (not your regular Gmail password)
        // See: https://support.google.com/accounts/answer/185833
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Compose the email
        const mailOptions = {
            from: `"Planitt Careers" <${process.env.SMTP_EMAIL}>`,
            to: 'planittsolutions@gmail.com',
            replyTo: email,
            subject: `New Job Application: ${position} — ${name}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #b78622, #d4a843); padding: 32px 24px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">📄 New Job Application</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px;">Position: ${position}</p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 32px 24px;">
                        <h2 style="color: #333; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px;">Applicant Details</h2>

                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; width: 140px; vertical-align: top;">Full Name</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Email</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;"><a href="mailto:${email}" style="color: #b78622; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Phone</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;"><a href="tel:${phone}" style="color: #b78622; text-decoration: none;">${phone}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">LinkedIn</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;">${linkedin !== 'Not provided' ? `<a href="${linkedin}" style="color: #b78622; text-decoration: none;">${linkedin}</a>` : '<span style="color: #aaa;">Not provided</span>'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Position</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${position}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Duration (Internship)</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${duration}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">About</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px; white-space: pre-wrap;">${about}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Resume</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;">📎 ${resume.name} (${(resume.size / 1024).toFixed(1)} KB)</td>
                            </tr>
                        </table>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f9f9f9; padding: 20px 24px; text-align: center; border-top: 1px solid #f0f0f0;">
                        <p style="color: #999; font-size: 12px; margin: 0;">This application was submitted via the Planitt Careers page.</p>
                        <p style="color: #999; font-size: 12px; margin: 4px 0 0;">You can reply directly to this email to contact the applicant.</p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: resume.name,
                    content: resumeBuffer,
                    contentType: resume.type,
                },
            ],
        };

        // Send the internal team email
        await transporter.sendMail(mailOptions);

        // ── Candidate auto-reply ──────────────────────────────────────────────
        const candidateMailOptions = {
            from: `"Planitt Solutions" <${process.env.SMTP_EMAIL}>`,
            to: email,
            subject: `Thank you for applying to Planitt Solutions — ${position}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #b78622, #d4a843); padding: 36px 28px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0 0 8px; font-size: 26px; font-weight: 700;">Thank You for Applying!</h1>
                        <p style="color: rgba(255,255,255,0.92); margin: 0; font-size: 15px;">We appreciate your interest in <strong>${position}</strong></p>
                    </div>

                    <!-- Body -->
                    <div style="padding: 36px 28px;">
                        <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
                            Dear <strong>${name}</strong>,
                        </p>

                        <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
                            Thank you for showing interest in the <strong>${position}</strong> role at <strong>Planitt Solutions</strong>.
                            We truly value the time and effort you put into your application.
                        </p>

                        <!-- Current Status Notice -->
                        <div style="background: #fff8e7; border-left: 4px solid #b78622; border-radius: 6px; padding: 16px 20px; margin: 0 0 24px;">
                            <p style="color: #7a5a10; font-size: 15px; font-weight: 600; margin: 0 0 6px;">📢 Current Hiring Status</p>
                            <p style="color: #5c4209; font-size: 14px; line-height: 1.6; margin: 0;">
                                At this point in time, we are <strong>not actively hiring</strong> for the <strong>${position}</strong> role on a full-time basis.
                                We sincerely apologize for any inconvenience this may cause.
                            </p>
                        </div>

                        <!-- Paid Internship Offer -->
                        <div style="background: linear-gradient(135deg, #f9f4e8, #fdf8ef); border: 1px solid #e9c978; border-radius: 10px; padding: 24px; margin: 0 0 24px;">
                            <h2 style="color: #b78622; font-size: 18px; font-weight: 700; margin: 0 0 12px;">🚀 Exciting Alternative — Paid Training + Internship Program</h2>
                            <p style="color: #444; font-size: 14px; line-height: 1.7; margin: 0 0 14px;">
                                However, we do have an excellent opportunity for passionate learners like you! We offer a
                                <strong>Paid Training + Internship Program</strong> where you will:
                            </p>
                            <ul style="color: #444; font-size: 14px; line-height: 1.8; margin: 0 0 14px; padding-left: 20px;">
                                <li>📚 Receive <strong>in-depth, structured training</strong> on the relevant technology &amp; domain</li>
                                <li>💼 Work on a <strong>real-life, live project</strong> under the guidance of experienced mentors</li>
                                <li>🏆 Earn an official <strong>Completion Certificate</strong> upon successful completion</li>
                                <li>🤝 Get an <strong>Offer Letter</strong> from Planitt Solutions</li>
                                <li>🌱 Build a strong <strong>portfolio</strong> with hands-on industry experience</li>
                            </ul>
                            <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0;">
                                This is a great way to gain real-world exposure, sharpen your skills, and position yourself
                                for future full-time opportunities with us!
                            </p>
                        </div>

                        <!-- Contact Section -->
                        <div style="background: #f4f4f4; border-radius: 8px; padding: 20px 24px; margin: 0 0 24px;">
                            <p style="color: #333; font-size: 15px; font-weight: 600; margin: 0 0 12px;">📬 Interested? Get in Touch!</p>
                            <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 12px;">
                                For further details about the Paid Internship Program, fees, duration, and schedule,
                                please feel free to reach out to us:
                            </p>
                            <table style="border-collapse: collapse; width: 100%;">
                                <tr>
                                    <td style="padding: 6px 0; color: #888; font-size: 14px; width: 60px; vertical-align: middle;">✉️ Email</td>
                                    <td style="padding: 6px 0; font-size: 14px;">
                                        <a href="mailto:planittsolutions@gmail.com" style="color: #b78622; text-decoration: none; font-weight: 600;">planittsolutions@gmail.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; color: #888; font-size: 14px; vertical-align: middle;">📞 Call</td>
                                    <td style="padding: 6px 0; font-size: 14px;">
                                        <a href="tel:+918605727484" style="color: #b78622; text-decoration: none; font-weight: 600;">+91 86057 27484</a>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <p style="color: #555; font-size: 14px; line-height: 1.7; margin: 0;">
                            We truly believe in nurturing talent and hope to work with you through this program.
                            Looking forward to hearing from you! 😊
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f9f9f9; padding: 20px 28px; text-align: center; border-top: 1px solid #f0f0f0;">
                        <p style="color: #aaa; font-size: 12px; margin: 0;">This is an automated response from Planitt Solutions.</p>
                        <p style="color: #aaa; font-size: 12px; margin: 4px 0 0;">
                            Planitt Solutions &bull; Nagpur &bull;
                            <a href="mailto:planittsolutions@gmail.com" style="color: #b78622; text-decoration: none;">planittsolutions@gmail.com</a>
                        </p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(candidateMailOptions);
        // ─────────────────────────────────────────────────────────────────────

        return NextResponse.json(
            { message: 'Application submitted successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending application email:', error);
        return NextResponse.json(
            { error: 'Failed to send your application. Please try again later or email us directly at planittsolutions@gmail.com.' },
            { status: 500 }
        );
    }
}
