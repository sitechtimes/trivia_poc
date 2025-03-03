import { SerialPort, ReadlineParser } from 'serialport';

// Define the COM port and baud rate
export default readSerial();
function openSerial() {
	const port = new SerialPort({
		path: 'COM5', // Change to your actual port
		baudRate: 115200, // Adjust baud rate as needed
	});

	// Create a parser to read incoming data line by line
	const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

	return { port, parser };
	// Open the port
	// port.on('open', () => {
	// 	console.log('Serial port COM5 opened.');
	// });

	// // Read incoming data
	// parser.on('data', (data) => {
	// 	console.log('Received:', data);
	// });

	// // Handle errors
	// port.on('error', (err) => {
	// 	console.error('Serial Port Error:', err.message);
	// });
}
