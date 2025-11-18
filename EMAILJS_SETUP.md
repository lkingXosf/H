# EmailJS Setup Instructions

To enable the contact form functionality, you need to configure EmailJS:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy your **Service ID**

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use these template variables in your email template:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{phone}}` - Sender's phone number
   - `{{company}}` - Sender's company name
   - `{{message}}` - The message content

Example template:
```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

Message:
{{message}}
```

4. Copy your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" in your dashboard
2. Find your **Public Key** (also called API Key)

## Step 5: Update the Code

Open `src/components/ContactForm.tsx` and replace:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',      // Replace with your Service ID
  'YOUR_TEMPLATE_ID',     // Replace with your Template ID
  { ... },
  'YOUR_PUBLIC_KEY'       // Replace with your Public Key
);
```

## Testing

After configuration, test the contact form by:
1. Filling out all required fields
2. Submitting the form
3. Checking your email inbox for the message

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- EmailJS branding in emails
- Basic support

For production use, consider upgrading to a paid plan.
