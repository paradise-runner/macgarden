import type { Device } from "@/lib/devices";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
	device1: Device;
	device2: Device;
	onDevice1Change: (device: Device) => void;
	onDevice2Change: (device: Device) => void;
	availableDevices?: Device[];
}

export function DeviceComparison({
	device1,
	device2,
	onDevice1Change,
	onDevice2Change,
	availableDevices = [],
}: Props) {
	const getRelativePerformance = (value1: number, value2: number) => {
		return ((value1 / value2) * 100 - 100).toFixed(1);
	};

	const getComparisonText = (value: number) => {
		return `${value >= 0 ? "+" : ""}${value}%`;
	};

	const getComparisonColor = (value: number) => {
		return value >= 0 ? "text-green-600" : "text-red-600";
	};

	return (
		<div className="device-comparison space-y-8">
			<div className="grid mt-8 md:grid-cols-2 gap-8">
				{[device1, device2].map((device, index) => {
					const compareWith = index === 0 ? device2 : device1;
					const singleCoreComparison = Number(
						getRelativePerformance(device.score, compareWith.score),
					);
					const multiCoreComparison = Number(
						getRelativePerformance(
							device.multicore_score,
							compareWith.multicore_score,
						),
					);

					// get a new constant that shows the comparison as a whole number comparison like 2x or 3x to make it bit more readable
					const singleCoreComparisonWholeNumber = Number(
						(device.score / compareWith.score).toFixed(1),
					);
					const multiCoreComparisonWholeNumber = Number(
						(device.multicore_score / compareWith.multicore_score).toFixed(1),
					);

					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<Card key={index}>
							<CardHeader>
								<CardTitle>{device.name}</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-gray-600">{device.description}</p>
								<div className="space-y-2">
									<div className="flex justify-between items-center">
										<p>Single-Core Score: {device.score}</p>
										<div className="text-right">
											<span
												className={getComparisonColor(singleCoreComparison)}
											>
												{getComparisonText(singleCoreComparison)}
											</span>
											{singleCoreComparisonWholeNumber > 1 && (
												<span className="ml-2 text-sm text-gray-600">
													({singleCoreComparisonWholeNumber}x)
												</span>
											)}
										</div>
									</div>
									<div className="flex justify-between items-center">
										<p>Multi-Core Score: {device.multicore_score}</p>
										<div className="text-right">
											<span className={getComparisonColor(multiCoreComparison)}>
												{getComparisonText(multiCoreComparison)}
											</span>
											{multiCoreComparisonWholeNumber > 1 && (
												<span className="ml-2 text-sm text-gray-600">
													({multiCoreComparisonWholeNumber}x)
												</span>
											)}
										</div>
									</div>
									<p>Samples: {device.samples}</p>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
