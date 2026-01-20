import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    const resendKeyRaw = Deno.env.get("RESEND_API_KEY") ?? "";
    const resendKey = resendKeyRaw
      .trim()
      .replace(/^Bearer\s+/i, "")
      .replace(/^['\"]|['\"]$/g, "");

    if (!resendKey) {
      console.error("RESEND_API_KEY is missing or empty");
      return new Response(
        JSON.stringify({ error: "Email service is not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!resendKey.startsWith("re_")) {
      console.error("RESEND_API_KEY does not look like a Resend key", {
        prefix: resendKey.slice(0, 3),
        len: resendKey.length,
      });
      return new Response(
        JSON.stringify({
          error:
            "Email service API key is invalid. Please paste your Resend API key (it starts with re_).",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(
      "Sending contact email from:",
      email,
      "(resendKeyPrefix:",
      resendKey.slice(0, 3),
      "len:",
      resendKey.length,
      ")"
    );

    const customerTypeText = customerType 
      ? `Customer Type: ${customerType === 'yes' ? 'Existing Customer' : customerType === 'no' ? 'New Customer' : 'On Trial'}`
      : 'Not specified';

    // Send email using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "MyCiti Contact <onboarding@resend.dev>",
        to: ["aniket.parkar@vibecopilot.ai"],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>${customerTypeText}</strong></p>
          <h3>Message:</h3>
          <p>${message}</p>
        `,
      }),
    });

    const raw = await emailResponse.text();
    let data: any = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = { raw };
    }

    if (!emailResponse.ok) {
      console.error("Resend API error:", {
        status: emailResponse.status,
        body: data,
      });
      throw new Error(
        typeof data?.message === "string"
          ? data.message
          : "Failed to send email"
      );
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
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
