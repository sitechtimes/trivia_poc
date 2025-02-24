import { SerialPort } from 'serialport';

SerialPort.list().then(
	(ports) => ports.forEach(console.log),
	(err) => console.error(err)
);
