"use client";

import { useState } from "react";

type DeleteAction = (formData: FormData) => void | Promise<void>;

type AdminDeleteDialogProps = {
  action: DeleteAction;
  label?: string;
  title?: string;
  description?: string;
};

export function AdminDeleteDialog({ action, label = "Hapus", title = "Hapus item ini?", description = "Tindakan ini tidak dapat dibatalkan." }: AdminDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="admin-delete-trigger" type="button" onClick={() => setOpen(true)}>{label}</button>
      {open ? (
        <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-delete-title">
            <p className="eyebrow">Konfirmasi</p>
            <h2 id="admin-delete-title">{title}</h2>
            <p>{description}</p>
            <div className="admin-modal-actions">
              <button className="button" type="button" onClick={() => setOpen(false)}>Batal</button>
              <button className="button admin-delete-confirm" type="submit" formAction={action}>Hapus</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
