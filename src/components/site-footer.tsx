import { Github, Code2, Sprout, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
	return (
		<footer className="bg-gradient-to-br from-purple-100 via-pink-50 to-green-100 border-t border-green-100">
			<div className="relative">
				<div className="absolute inset-0 bg-gradient-to-tr from-yellow-50 via-transparent to-blue-50 opacity-60" />
				<div className="max-w-5xl mx-auto px-8 py-6 flex flex-col items-center gap-4 relative">
					<p className="text-sm text-gray-600">
						An open source project using data from Geekbench Browser. This site
						is not affiliated with Apple Inc. or Primate Labs Inc.
					</p>
					<div className="flex flex-col items-center gap-4">
						<div className="flex items-center gap-4">
							<Button variant="outline" asChild size="sm">
								<a
									href="https://github.com/paradise-runner/macgarden"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5"
								>
									<Github size={16} />
									<span>GitHub</span>
								</a>
							</Button>
							<Button variant="outline" asChild size="sm">
								<a
									href="https://hec.works"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5"
								>
									<Code2 size={16} />
									<span>Developer</span>
								</a>
							</Button>
						</div>
						<div className="flex items-center gap-1.5 text-sm text-gray-500">
							<span>Made with</span>
							<Sprout size={14} className="text-green-600" />
							<span>in</span>
							<span className="flex items-center gap-1">
								Colorado
								<MapPin size={14} className="text-blue-500" />
							</span>
						</div>
					</div>
				</div>
				<div className="h-1 w-full bg-gradient-to-r from-purple-100 via-green-100 to-blue-100" />
			</div>
		</footer>
	);
}
