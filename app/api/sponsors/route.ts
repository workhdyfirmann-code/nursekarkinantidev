import { sponsorshipPackages } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const tierOrder = sponsorshipPackages.map((item) => item.name);

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const isEventPage = searchParams.has("showId");
  const showId = searchParams.get("showId") ?? "";
  const sponsors = await prisma.sponsor.findMany({
    where: { status: "published", ...(isEventPage ? { OR: [{ isGeneral: true }, { shows: { some: { id: showId } } }] } : { isGeneral: true }) },
    select: { id: true, name: true, logoImage: true, tier: true },
  });
  sponsors.sort((left, right) => tierOrder.indexOf(left.tier) - tierOrder.indexOf(right.tier) || left.name.localeCompare(right.name));
  return Response.json(sponsors, { headers: { "Cache-Control": "no-store" } });
}
