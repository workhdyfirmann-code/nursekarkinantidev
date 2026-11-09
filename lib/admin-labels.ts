const statusLabels: Record<string, string> = {
  draft: "Draf",
  published: "Terbit",
  upcoming: "Akan datang",
  completed: "Selesai",
};

export function adminStatusLabel(status: string) {
  return statusLabels[status] || status;
}
