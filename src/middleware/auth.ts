const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie');

const jwtSecret = 'your-secret-key'; // Replace with your secret key


export async function loginAndAuthenticate(request, response, next) {
  const { email, password } = request.body;

  const user = await this.userRepository.findOne({ where: { email } });

  if (!user) {
    return response.json({ message: 'Authentication failed. User not found.' });
  }

  var passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return response.json({ message: 'Authentication failed. Incorrect password.' });
  }

  const token = jwt.sign({ userId: user.id, username: user.fullName }, jwtSecret, {
    expiresIn: '1h',
  });

  const sessionCookie = cookie.serialize('session', token, {
    httpOnly: true,
    maxAge: 3600,
    sameSite: 'strict',
    secure: true,
    path: '/',
    domain: 'localhost:8080', 
  });

  response.setHeader('Set-Cookie', [sessionCookie]);

  response.status(200).json({ message: 'Authentication successful', token: token });
}




// export const auth=()=>{

// }