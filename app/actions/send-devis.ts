"use server";

import { Resend } from "resend";
import type { DevisFormData } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDevis(
  data: DevisFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const attachments = data.photos.map((photo, i) => ({
      filename: `photo_${i + 1}.jpg`,
      content: photo.base64.split(",")[1],
    }));

    if (data.plan) {
      attachments.push({
        filename: `plan.jpg`,
        content: data.plan.base64.split(",")[1],
      });
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #C0392B;">Nouvelle demande de devis</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Nom</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.prenom} ${data.nom}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Téléphone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.tel}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Adresse</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.adresse}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Pièces</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.pieces.join(", ")}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Style</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.style || "Non précisé"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Budget</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.budget}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Délai</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.delai}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Description</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.description}</td></tr>
          ${data.contraintes ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Contraintes</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.contraintes}</td></tr>` : ""}
        </table>
        <p style="margin-top: 16px; color: #666;">${data.photos.length} photo(s) en pièce jointe${data.plan ? " + 1 plan" : ""}</p>
      </div>
    `;

    await resend.emails.send({
      from: "AIMAN Devis <onboarding@resend.dev>",
      to: "contact@aiman-renovation.fr",
      subject: `Nouveau devis — ${data.prenom} ${data.nom} — ${data.pieces.join(", ")}`,
      html,
      attachments,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Erreur lors de l'envoi" };
  }
}
