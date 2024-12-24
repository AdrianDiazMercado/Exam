import {pbkdf2, randomBytes} from 'crypto'

export class EncryptAdapter{

	static async hash(password: string): Promise<string>{
		const salt = randomBytes(16).toString('hex')
		const iterations = 10;
		const keyLength = 32;
		const pbkdf2Code: String = 'pbkdf2$';
		
		return new Promise((resolve, reject) => {
			pbkdf2(password, salt, iterations, keyLength, 'sha256', (err, derivedKey) => {
				if(err){
					reject(err)
				}else{
					const hashedPassword = `${pbkdf2Code}${iterations}$${salt}$${derivedKey.toString('base64')}`
					resolve(hashedPassword)
				}
			})
		})
	}
	
	static compare(password: string, hashDb: string): Promise<boolean> {
		const [, iterations, salt, storedHash] = hashDb.split('$');
		const numIterations = parseInt(iterations, 10);

		return new Promise(resolve => {
			pbkdf2(password, salt, numIterations, 32, 'sha256', (err, derivedKey) => {
				if (err) return resolve(false);
				const derivedKeyHex = derivedKey.toString('base64');
				resolve(derivedKeyHex === storedHash);
			});
		});
	}
}
