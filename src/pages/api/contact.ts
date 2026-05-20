import type { APIRoute } from 'astro';
import { z } from 'astro:schema';
import { Resend } from 'resend';

export const prerender = false;

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(160).optional().default(''),
  message: z.string().trim().min(10).max(5000),
  // Honeypot — bots fill this; humans don't see it. Accept any value so we can
  // silently swallow spam after parsing (returning a validation error would
  // tell bots the field exists).
  website: z.string().optional().default(''),
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  const ct = request.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) {
    body = await request.json().catch(() => null);
  } else if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
    const form = await request.formData();
    body = Object.fromEntries(form);
  } else {
    return Response.json({ ok: false, error: 'Unsupported content type' }, { status: 415 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  // Honeypot tripped — silently accept (don't reveal spam detection)
  if (website && website.length > 0) {
    return Response.json({ ok: true });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM;
  const to = import.meta.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error('[contact] Missing env vars: RESEND_API_KEY, RESEND_FROM, CONTACT_TO_EMAIL');
    return Response.json({ ok: false, error: 'Server misconfigured' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const finalSubject = subject ? `[Blog] ${subject}` : `[Blog] Mensaje de ${name}`;

  const html = `
    <h2>Nuevo mensaje del formulario de contacto</h2>
    <p><strong>De:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    ${subject ? `<p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>` : ''}
    <hr>
    <pre style="font-family: inherit; white-space: pre-wrap;">${escapeHtml(message)}</pre>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: finalSubject,
      replyTo: email,
      html,
      text: `De: ${name} <${email}>\n${subject ? `Asunto: ${subject}\n` : ''}\n${message}`,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return Response.json({ ok: false, error: 'Email delivery failed' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return Response.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
};
