import Link from "next/link";
import Image from "next/image";
import { Leaf } from "lucide-react";

export function SiteHeader() {
  return (
    <div className="w-full bg-gradient-to-br from-purple-100 via-pink-50 to-green-100 border-b border-green-100">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50 via-transparent to-blue-50 opacity-60"></div>
        <div className="max-w-5xl mx-auto pb-6 relative">
          <div className="text-center space-y-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-8 hover:opacity-80 transition-opacity"
            >
              <div className="w-[200px] h-[200px] relative shrink-0">
                <Image
                  src="/icon.svg"
                  alt="Mac Garden Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-2 text-left">
                <h1 className="text-4xl font-bold text-gray-800">The</h1>
                <h1 className="text-4xl font-bold text-gray-800">Mac</h1>
                <h1 className="text-4xl font-bold text-gray-800">Garden</h1>
              </div>
            </Link>
            <p className="text-gray-600 flex items-center justify-center">
              <Leaf className="w-4 h-4 mr-2 text-green-500" />
              An easy way to decide if it's time to prune your old Mac and plant
              a new one
            </p>
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-purple-100 via-green-100 to-blue-100"></div>
      </div>
    </div>
  );
}
