import { SerialPort } from 'serialport';

async function readSerial() {
	let serialPort;
	await SerialPort.list().then(
		(ports) =>
			ports.forEach((port) => {
				if (port.manufacturer === 'Silicon Labs') serialPort = port;
			}),
		(err) => console.error(err)
	);

	const port = new SerialPort({
		path: serialPort.path,
		baudRate: 115200,
	});

	try {
		port.on('readable', () => {
			console.log('Data:', port.read());
		});
	} catch (error) {
		console.log('failed to connect');
	}
}

readSerial();
