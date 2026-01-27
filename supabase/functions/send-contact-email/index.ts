// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
  customerType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, customerType }: ContactEmailRequest = await req.json();

    // Validate inputs
    if (!name || !email || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, message: !!message });
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // SMTP Configuration for myciti.life
    // const smtpConfig = {
    //   hostname: "smtpout.secureserver.net",
    //   port: 587,
    //   username: Deno.env.get("SMTP_USERNAME") || "noreply@myciti.life",
    //   password: Deno.env.get("SMTP_PASSWORD") || "",
    // };

    // if (!smtpConfig.password) {
    //   console.error("SMTP_PASSWORD is missing");
    //   return new Response(
    //     JSON.stringify({ error: "Email service is not configured" }),
    //     {
    //       status: 500,
    //       headers: { "Content-Type": "application/json", ...corsHeaders },
    //     }
    //   );
    // }

    console.log("Sending contact email via SMTP from:", email);

    const customerTypeText = customerType
      ? `Customer Type: ${customerType === 'yes' ? 'Existing Customer' : customerType === 'no' ? 'New Customer' : 'On Trial'}`
      : 'Not specified';

    // Create SMTP client
    // const client = new SMTPClient({
    //   connection: {
    //     hostname: smtpConfig.hostname,
    //     port: smtpConfig.port,
    //     tls: false,
    //     auth: {
    //       username: smtpConfig.username,
    //       password: smtpConfig.password,
    //     },
    //   },
    // });

    // Send email
//     await client.send({
//       from: "MyCiti Contact <noreply@myciti.life>",
//       to: `${email}`,
//       subject: `New Contact Form Submission from ${name}`,
//       content: `
// New Contact Form Submission
// Name: ${name}
// Email: ${email}
// ${customerTypeText}
// Message:
// ${message}
//       `,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>${customerTypeText}</strong></p>
//         <h3>Message:</h3>
//         <p>${message}</p>
//       `,
//     });

//     await client.close();

    console.log("Email sent successfully via SMTP");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
