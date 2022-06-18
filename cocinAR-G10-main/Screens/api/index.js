import _ from "lodash";

export const contains = ({ nombre }, query) => {
  const { first } = nombre;
  if (first.includes(query)) {
    return true;
  }

  return false;
};

export const getUsers = (limit = 2, query = "") => {
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(users, limit));
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(users, user => {
        return contains(user, formattedQuery);
      });
      resolve(_.take(results, limit));
    }
  });
};

export default getUsers;