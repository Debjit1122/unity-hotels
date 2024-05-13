const crypto = require('crypto');

// Generate a random JWT secret
const generateJWTSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

// Print the generated JWT secret
console.log('Generated JWT Secret:');
console.log(generateJWTSecret());
