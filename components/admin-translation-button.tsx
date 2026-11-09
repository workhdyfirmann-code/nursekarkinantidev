"use client";

import { useState, useTransition } from "react";
import type { MouseEvent } from "react";
import { translatePostDraft, translateShowDraft } from "@/app/admin/actions";

type AdminTranslationButtonProps = { kind?: "post" | "show" };

export function AdminTranslationButton({ kind = "post" }: AdminTranslationButtonProps) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form) return;
    setMessage("");
    const data = new FormData(form);
    startTransition(async () => {
      try {
        const translated = kind === "show" ? await translateShowDraft(data) : await translatePostDraft(data);
        for (const [name, value] of Object.entries(translated)) {
          const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
          if (field) {
            field.value = value;
            if (name === "contentEn") {
              const editor = field.parentElement?.querySelector<HTMLElement>("[contenteditable=\"true\"]");
              if (editor) {
                editor.innerHTML = value;
                editor.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText" }));
              }
            }
          }
        }
        setMessage("Draf bahasa Inggris berhasil dibuat. Periksa sebelum menyimpan.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Terjemahan gagal. Periksa LibreTranslate.");
      }
    });
  }

  return <span className="admin-translation-control"><button className="button" type="button" onClick={handleClick} disabled={pending}>{pending ? "Menerjemahkan…" : "Buat versi Inggris"}</button>{message ? <small>{message}</small> : null}</span>;
}
