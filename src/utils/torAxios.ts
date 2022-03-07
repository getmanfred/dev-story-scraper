import {SocksProxyAgent} from 'socks-proxy-agent';
import axios, {AxiosInstance} from 'axios';

export const torSetup = (ip: string, port: number): AxiosInstance => {
  return axios.create({
    httpAgent: httpAgent(ip, port),
    httpsAgent: httpsAgent(ip, port),
  });
};

const httpAgent = (ip: string, port: number): SocksProxyAgent => {
  return new SocksProxyAgent(`socks5h://${ip}:${port}`);
};

const httpsAgent = (ip: string, port: number): SocksProxyAgent => {
  return new SocksProxyAgent(`socks5h://${ip}:${port}`);
};

// export const torIPC = (commands: string[]) => {
//   return new Promise(function (resolve, reject) {
//     const socket = net.connect(
//       {
//         host: torConfig.ip || '127.0.0.1',
//         port: torConfig.controlPort || 9051,
//       },
//       () => {
//         const commandString = commands.join('\n') + '\n';
//         socket.write(commandString);
//         //resolve(commandString);
//       },
//     );
//
//     socket.on('error', function (err) {
//       reject(err);
//     });
//
//     let data = '';
//     socket.on('data', function (chunk) {
//       data += chunk.toString();
//     });
//
//     socket.on('end', function () {
//       resolve(data);
//     });
//   });
// };

// export const torNewSession = () => {
//   const commands = [
//     'authenticate "' + torConfig.controlPassword + '"', // authenticate the connection
//     'signal newnym', // send the signal (renew Tor session)
//     'quit', // close the connection
//   ];
//
//   return new Promise(function (resolve, reject) {
//     torIPC(commands)
//       .then((data: string) => {
//         const lines = data.split(os.EOL).slice(0, -1);
//         const success = lines.every(function (val, ind, arr) {
//           // each response from the ControlPort should start with 250 (OK STATUS)
//           return val.length <= 0 || val.indexOf('250') >= 0;
//         });
//
//         if (!success) {
//           const err = new Error('Error communicating with Tor ControlPort\n' + data);
//           reject(err);
//         }
//
//         resolve('Tor session successfully renewed!!');
//         //resolve(data);
//       })
//       .catch(function (err) {
//         reject(err);
//       });
//   });
// };
