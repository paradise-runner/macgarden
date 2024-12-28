import { getDevices } from "@/lib/devices";
import { DeviceComparison } from "@/components/device-comparison";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { notFound } from "next/navigation";
import { CompareForm } from "@/components/compare-form";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ device1?: string; device2?: string }>
}) {
  const { device1, device2 } = await searchParams;
  const devices = await getDevices();
  const fdevice1 = devices.find(d => d.id.toString() === device1);
  const fdevice2 = devices.find(d => d.id.toString() === device2);

  if (device1 && device2 && (!fdevice1 || !fdevice2)) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-grow bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-5xl mx-auto p-8">
          <CompareForm initialDevices={[fdevice1 || null, fdevice2 || null]} />
          {fdevice1 && fdevice2 && (
            <DeviceComparison 
              device1={fdevice1} 
              device2={fdevice2} 
              onDevice1Change={() => {}} 
              onDevice2Change={() => {}} 
            />
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export const runtime = 'edge';