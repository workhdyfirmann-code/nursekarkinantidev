"use client";

import { useRef } from "react";

type RichTextEditorProps = { name: string; label: string; defaultValue?: string };

export function RichTextEditor({ name, label, defaultValue = "" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLTextAreaElement>(null);

  function sync() {
    if (editorRef.current && valueRef.current) valueRef.current.value = editorRef.current.innerHTML;
  }

  function command(name: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(name, false, value);
    sync();
  }

  return <div className="rich-editor"><label>{label}</label><div className="rich-toolbar"><button type="button" title="Tebal" aria-label="Tebal" onClick={() => command("bold")}><strong>B</strong></button><button type="button" title="Miring" aria-label="Miring" onClick={() => command("italic")}><em>I</em></button><button type="button" title="Judul 2" aria-label="Judul 2" onClick={() => command("formatBlock", "h2")}>H2</button><button type="button" title="Daftar" aria-label="Daftar" onClick={() => command("insertUnorderedList")}>Daftar</button><button type="button" title="Tautan" aria-label="Tautan" onClick={() => { const href = window.prompt("URL tautan"); if (href) command("createLink", href); }}>Tautan</button></div><div className="rich-editor-area" ref={editorRef} contentEditable suppressContentEditableWarning onInput={sync} dangerouslySetInnerHTML={{ __html: defaultValue }} /><textarea ref={valueRef} name={name} defaultValue={defaultValue} hidden /></div>;
}
