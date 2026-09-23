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

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address.' },
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

        // Verify SMTP configuration
        if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
            console.error('SMTP configuration missing: SMTP_EMAIL or SMTP_PASSWORD is not set.');
            return NextResponse.json(
                { error: 'Email service is not configured. Please contact planittsolutions@gmail.com directly.' },
                { status: 500 }
            );
        }

        // Convert the file to a buffer for attachment
        const resumeBuffer = Buffer.from(await resume.arrayBuffer());

        // Escape HTML to prevent injection in email templates
        const escapeHtml = (str: string) =>
            str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');

        const escapedName = escapeHtml(name);
        const escapedEmail = escapeHtml(email);
        const escapedPhone = escapeHtml(phone);
        const escapedPosition = escapeHtml(position);
        const escapedAbout = escapeHtml(about);
        const escapedDuration = escapeHtml(duration);
        const escapedLinkedin = escapeHtml(linkedin);
        const escapedResumeName = escapeHtml(resume.name);

        const submissionDate = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        // Configure the SMTP transporter (Gmail SMTP)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // 1. Internal notification email (sent to Planitt team with resume attached)
        const internalMailOptions = {
            from: `"Planitt Careers" <${process.env.SMTP_EMAIL}>`,
            to: 'planittsolutions@gmail.com',
            replyTo: email,
            subject: `New Job Application: ${escapedPosition} — ${escapedName}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <div style="background: linear-gradient(135deg, #b78622, #d4a843); padding: 32px 24px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">📄 New Job Application</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px;">Position: ${escapedPosition}</p>
                    </div>

                    <div style="padding: 32px 24px;">
                        <h2 style="color: #333; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px;">Applicant Details</h2>

                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; width: 140px; vertical-align: top;">Full Name</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${escapedName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Email</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;"><a href="mailto:${escapedEmail}" style="color: #b78622; text-decoration: none;">${escapedEmail}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Phone</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;"><a href="tel:${escapedPhone}" style="color: #b78622; text-decoration: none;">${escapedPhone}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">LinkedIn</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;">${linkedin !== 'Not provided' ? `<a href="${escapedLinkedin}" style="color: #b78622; text-decoration: none;">${escapedLinkedin}</a>` : '<span style="color: #aaa;">Not provided</span>'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Position</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${escapedPosition}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Duration (Internship)</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${escapedDuration}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">About</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px; white-space: pre-wrap;">${escapedAbout}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Resume</td>
                                <td style="padding: 10px 0; color: #333; font-size: 14px;">📎 ${escapedResumeName} (${(resume.size / 1024).toFixed(1)} KB)</td>
                            </tr>
                        </table>
                    </div>

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

        // 2. Branded confirmation receipt email (sent directly to applicant)
        const applicantMailOptions = {
            from: `"Planitt Careers" <${process.env.SMTP_EMAIL}>`,
            to: email,
            replyTo: 'planittsolutions@gmail.com',
            subject: `Application Received: ${escapedPosition} at Planitt`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Application Received</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #f6f8fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                    <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
                        Thank you for applying for the ${escapedPosition} role at Planitt. We have received your application.
                    </div>

                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f8fb; padding: 32px 12px;">
                        <tr>
                            <td align="center">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06); border: 1px solid #eef1f6;">
                                    <!-- Brand Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #b78622 0%, #d4a843 100%); padding: 36px 30px; text-align: center;">
                                            <div style="color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0;">
                                                PLANITT
                                            </div>
                                            <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.22); padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; color: #ffffff; letter-spacing: 0.5px;">
                                                Careers &amp; Talent
                                            </div>
                                        </td>
                                    </tr>

                                    <!-- Main Body -->
                                    <tr>
                                        <td style="padding: 36px 32px 28px 32px;">
                                            <h1 style="color: #1a1a1a; font-size: 22px; font-weight: 700; margin: 0 0 16px 0;">
                                                Application Received &#127881;
                                            </h1>
                                            <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                                                Hi <strong>${escapedName}</strong>,
                                            </p>
                                            <p style="color: #4a5568; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                                                Thank you for your interest in joining Planitt! We are writing to confirm that we have successfully received your application for the <strong>${escapedPosition}</strong> role.
                                            </p>

                                            <!-- Summary Card -->
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fbf9f4; border: 1px solid #fae8c3; border-radius: 12px; margin: 0 0 24px 0;">
                                                <tr>
                                                    <td style="padding: 20px;">
                                                        <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #b78622; margin-bottom: 12px;">
                                                            Application Summary
                                                        </div>
                                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px;">
                                                            <tr>
                                                                <td style="color: #718096; padding: 6px 0; width: 140px;">Position</td>
                                                                <td style="color: #1a202c; font-weight: 600; padding: 6px 0;">${escapedPosition}</td>
                                                            </tr>
                                                            ${duration !== 'Not provided' ? `
                                                            <tr>
                                                                <td style="color: #718096; padding: 6px 0;">Duration</td>
                                                                <td style="color: #1a202c; font-weight: 600; padding: 6px 0;">${escapedDuration}</td>
                                                            </tr>` : ''}
                                                            <tr>
                                                                <td style="color: #718096; padding: 6px 0;">Resume Received</td>
                                                                <td style="color: #1a202c; font-weight: 600; padding: 6px 0;">&#128206; ${escapedResumeName}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="color: #718096; padding: 6px 0;">Date Submitted</td>
                                                                <td style="color: #1a202c; padding: 6px 0;">${submissionDate}</td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>

                                            <!-- What's Next Box -->
                                            <div style="background-color: #f7fafc; border-left: 4px solid #b78622; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                                                <div style="font-weight: 700; font-size: 14px; color: #2d3748; margin-bottom: 8px;">
                                                    What happens next?
                                                </div>
                                                <p style="color: #4a5568; font-size: 13.5px; line-height: 1.5; margin: 0 0 8px 0;">
                                                    <strong>1. Application Review:</strong> Our team will review your profile, experience, and uploaded resume.
                                                </p>
                                                <p style="color: #4a5568; font-size: 13.5px; line-height: 1.5; margin: 0 0 8px 0;">
                                                    <strong>2. Next Steps:</strong> If your profile aligns with our requirements, we'll reach out to schedule an interview or introductory discussion.
                                                </p>
                                                <p style="color: #4a5568; font-size: 13.5px; line-height: 1.5; margin: 0;">
                                                    <strong>3. Contact:</strong> If you have questions or need to make updates, you can reply directly to this email.
                                                </p>
                                            </div>

                                            <p style="color: #4a5568; font-size: 14px; line-height: 1.6; margin: 0;">
                                                Warm regards,<br>
                                                <strong style="color: #1a202c;">The Planitt Team</strong>
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f8fafc; padding: 22px 30px; text-align: center; border-top: 1px solid #edf2f7; font-size: 12px; color: #a0aec0;">
                                            <p style="margin: 0 0 6px 0;">
                                                Planitt &bull; Empowering Financial &amp; Technical Growth
                                            </p>
                                            <p style="margin: 0;">
                                                Questions? Contact us at <a href="mailto:planittsolutions@gmail.com" style="color: #b78622; text-decoration: none;">planittsolutions@gmail.com</a>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        };

        // Send both emails concurrently
        const [internalResult, applicantResult] = await Promise.allSettled([
            transporter.sendMail(internalMailOptions),
            transporter.sendMail(applicantMailOptions),
        ]);

        if (internalResult.status === 'rejected') {
            console.error('Error sending internal application email:', internalResult.reason);
            return NextResponse.json(
                { error: 'Failed to send your application. Please try again later or email us directly at planittsolutions@gmail.com.' },
                { status: 500 }
            );
        }

        if (applicantResult.status === 'rejected') {
            console.warn('Applicant confirmation email delivery failed:', applicantResult.reason);
        }

        return NextResponse.json(
            { message: 'Application submitted successfully! A confirmation email has also been sent to your inbox.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing application submission:', error);
        return NextResponse.json(
            { error: 'Failed to process your application. Please try again later or email us directly at planittsolutions@gmail.com.' },
            { status: 500 }
        );
    }
}
