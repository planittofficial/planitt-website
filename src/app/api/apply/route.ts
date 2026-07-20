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

        // Send the email
        await transporter.sendMail(mailOptions);

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
