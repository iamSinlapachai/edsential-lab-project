// app/edsential/[slug]/page.tsx
import { createClient } from "@/lib/supabaseServer";
import EdsentialView from "@/components/EdsentialView";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// 1. แก้ไข Type ของ params ให้เป็น Promise
export default async function EdsentialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 2. ต้อง await params ก่อนดึงค่า slug ออกมา (สำคัญมากใน Next.js 15)
  const { slug } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 3. ดึงข้อมูลหลักสูตร โดยใช้ slug ที่ await มาแล้ว
  const { data: edsential, error: edsentialError } = await supabase
    .from("edsentials")
    .select("*")
    .eq("slug", slug) // ใช้ตัวแปร slug โดยตรง
    .single();

  if (edsentialError || !edsential) {
    console.error("Course not found:", edsentialError);
    return notFound();
  }

  // 4. ดึงเนื้อหา (Nodes)
  const { data: nodes, error: nodesError } = await supabase
    .from("edsential_nodes")
    .select("*")
    .eq("edsential_id", edsential.id)
    .order("sequence_order", { ascending: true });

  if (nodesError) {
    console.error("Nodes error:", nodesError);
    return <div>Error loading content.</div>;
  }

  // 5. ส่งข้อมูลไปให้ Reusable Component
  return (
    <EdsentialView
      title={edsential.title}
      description={edsential.description || ""}
      nodes={nodes || []}
    />
  );
}
