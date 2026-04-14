/**
 * Remove sensitive fields (password) from a user object.
 * @param {object|null} user - The user object from database
 * @returns {object|null} User object without password field
 */
function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...userSansPassword } = user;
  return userSansPassword;
}

module.exports = { sanitizeUser };
