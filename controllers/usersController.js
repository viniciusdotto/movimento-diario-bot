import User from '../models/user.js';

async function show(username) {
  try {
    const user = await User.findOne({ where: { username: username } });
    return user;
  } catch(err) {
    console.log(err);
  }
}

async function create(username) {
  try {
    console.log('entrou')
    const newUser = await User.create({ username: username });
    console.log('New user created:', newUser.toJSON());
  } catch(err) {
    console.log(err);
  }
}

export default { show, create };