import type { Device } from '@/lib/devices';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  availableDevices = [] 
}: Props) {
  const getRelativePerformance = (value1: number, value2: number) => {
    return ((value1 / value2) * 100 - 100).toFixed(1);
  };

  const getComparisonText = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value}%`;
  };

  const getComparisonColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {availableDevices.length > 0 && [
          { device: device1, onChange: onDevice1Change },
          { device: device2, onChange: onDevice2Change }
        ].map((config, idx) => (
          <ToggleGroup.Root
            key={idx}
            type="single"
            className="flex flex-wrap gap-2"
            value={config.device.id.toString()}
            onValueChange={(value) => {
              const selectedDevice = availableDevices.find(d => d.id === Number(value));
              if (selectedDevice) config.onChange(selectedDevice);
            }}
          >
            {availableDevices.map((device) => (
              <ToggleGroup.Item
                key={device.id}
                value={device.id.toString()}
                className={`px-3 py-2 rounded-md border ${
                  config.device.id === device.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {device.name}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[device1, device2].map((device, index) => {
          const compareWith = index === 0 ? device2 : device1;
          const singleCoreComparison = Number(getRelativePerformance(device.score, compareWith.score));
          const multiCoreComparison = Number(getRelativePerformance(device.multicore_score, compareWith.multicore_score));

          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{device.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{device.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p>Single-Core Score: {device.score}</p>
                    <span className={getComparisonColor(singleCoreComparison)}>
                      {getComparisonText(singleCoreComparison)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Multi-Core Score: {device.multicore_score}</p>
                    <span className={getComparisonColor(multiCoreComparison)}>
                      {getComparisonText(multiCoreComparison)}
                    </span>
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